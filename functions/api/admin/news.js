import { cors, json, requireAdmin, slugify } from "../auth/_shared.js";

const PUBLIC_BASE_URL = "https://pub-5389c605b3bf46fea66c1657cc99e91d.r2.dev";

const imageExtensions = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

async function loadCms(bucket) {
  const stored = await bucket.get("cms/cms-data.json");
  if (!stored) return { enabled: true, sampleAudioSources: [], actors: [], newsArticles: [] };
  return stored.json();
}

async function saveCms(bucket, cms) {
  cms.enabled = true;
  cms.source = {
    ...(cms.source || {}),
    r2Managed: true,
    syncedAt: new Date().toISOString(),
  };
  await bucket.put("cms/cms-data.json", JSON.stringify(cms, null, 2), {
    httpMetadata: { contentType: "application/json; charset=utf-8" },
  });
}

function publicUrl(key) {
  return `${PUBLIC_BASE_URL}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

function splitCategories(value = []) {
  const source = Array.isArray(value) ? value.join(",") : `${value || ""}`;
  return source
    .split(/[,/]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitBody(value = "") {
  return `${value || ""}`
    .split(/\n{2,}|\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function displayDate(value = "") {
  return `${value || ""}`.trim().replaceAll("-", ".");
}

function sortNews(news = []) {
  return news
    .sort((a, b) => {
      const dateSort = `${b.datetime || b.date || ""}`.localeCompare(`${a.datetime || a.date || ""}`);
      if (dateSort) return dateSort;
      return Number(a.sortOrder || 9999) - Number(b.sortOrder || 9999);
    })
    .map((article, index) => ({ ...article, sortOrder: index + 1 }));
}

function uniqueArticleId(news, value) {
  const base = slugify(value, "news");
  let id = base;
  let index = 2;
  const existing = new Set(news.map((article) => article.id).filter(Boolean));
  while (existing.has(id)) {
    id = `${base}-${index}`;
    index += 1;
  }
  return id;
}

function publicArticle(article = {}) {
  return {
    id: article.id || "",
    title: article.title || "",
    lead: article.lead || "",
    datetime: article.datetime || "",
    date: article.date || "",
    categories: Array.isArray(article.categories) ? article.categories : splitCategories(article.categories || article.category),
    image: article.image || "",
    imageKey: article.imageKey || "",
    body: Array.isArray(article.body) ? article.body : splitBody(article.body),
    sortOrder: article.sortOrder || 9999,
    updatedAt: article.updatedAt || "",
  };
}

async function storeImage(bucket, file, articleId) {
  if (!file || !file.size) return null;
  const type = file.type || "application/octet-stream";
  const ext = imageExtensions[type] || file.name?.split(".").pop()?.toLowerCase() || "bin";
  if (!type.startsWith("image/")) throw new Error("이미지 파일만 업로드할 수 있습니다.");
  const key = `approved/news/${slugify(articleId, "news")}/${Date.now().toString(36)}.${ext}`;
  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: type, cacheControl: "public, max-age=31536000, immutable" },
  });
  return { key, url: publicUrl(key) };
}

export async function onRequestOptions() {
  return cors();
}

export async function onRequestGet({ request, env }) {
  if (!(await requireAdmin(request, env))) return json({ error: "Unauthorized" }, 401);
  if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

  const cms = await loadCms(env.CHIPS_MEDIA);
  const newsArticles = Array.isArray(cms.newsArticles) ? sortNews(cms.newsArticles).map(publicArticle) : [];
  return json({ newsArticles });
}

export async function onRequestPost({ request, env }) {
  try {
    const admin = await requireAdmin(request, env);
    if (!admin) return json({ error: "Unauthorized" }, 401);
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

    const form = await request.formData();
    const action = `${form.get("action") || ""}`.trim();
    const cms = await loadCms(env.CHIPS_MEDIA);
    cms.newsArticles = Array.isArray(cms.newsArticles) ? cms.newsArticles : [];

    if (action === "delete") {
      const id = `${form.get("id") || ""}`.trim();
      const index = cms.newsArticles.findIndex((article) => article.id === id);
      if (index < 0) return json({ error: "뉴스를 찾을 수 없습니다." }, 404);
      const [removed] = cms.newsArticles.splice(index, 1);
      cms.newsArticles = sortNews(cms.newsArticles);
      await saveCms(env.CHIPS_MEDIA, cms);
      if (removed.imageKey) await env.CHIPS_MEDIA.delete(removed.imageKey).catch(() => {});
      return json({ ok: true, action, deleted: publicArticle(removed), newsArticles: cms.newsArticles.map(publicArticle) });
    }

    if (action !== "save") return json({ error: "Invalid action." }, 400);

    const existingId = `${form.get("id") || ""}`.trim();
    const title = `${form.get("title") || ""}`.trim();
    const lead = `${form.get("lead") || ""}`.trim();
    const datetime = `${form.get("datetime") || ""}`.trim();
    const categories = splitCategories(form.getAll("categories"));
    const body = splitBody(form.get("body"));

    if (!title) return json({ error: "제목을 입력해 주세요." }, 400);
    if (!lead) return json({ error: "부제목을 입력해 주세요." }, 400);
    if (!datetime) return json({ error: "날짜를 입력해 주세요." }, 400);
    if (!categories.length) return json({ error: "뉴스 카테고리를 1개 이상 입력해 주세요." }, 400);
    if (!body.length) return json({ error: "내용을 입력해 주세요." }, 400);

    const id = existingId || uniqueArticleId(cms.newsArticles, `${datetime}-${title}`);
    const index = cms.newsArticles.findIndex((article) => article.id === id);
    const previous = index >= 0 ? cms.newsArticles[index] : {};
    const uploadedImage = await storeImage(env.CHIPS_MEDIA, form.get("image_file"), id);

    const article = {
      ...previous,
      id,
      title,
      lead,
      datetime,
      date: displayDate(datetime),
      categories,
      image: uploadedImage?.url || previous.image || "",
      imageKey: uploadedImage?.key || previous.imageKey || "",
      body,
      updatedAt: new Date().toISOString(),
      updatedBy: admin.username,
      createdAt: previous.createdAt || new Date().toISOString(),
    };

    if (!article.image) return json({ error: "이미지 파일을 업로드해 주세요." }, 400);

    if (index >= 0) cms.newsArticles[index] = article;
    else cms.newsArticles.push(article);
    cms.newsArticles = sortNews(cms.newsArticles);

    await saveCms(env.CHIPS_MEDIA, cms);
    return json({ ok: true, action, article: publicArticle(article), newsArticles: cms.newsArticles.map(publicArticle) });
  } catch (error) {
    return json({ error: error.message || "News action failed." }, 500);
  }
}
