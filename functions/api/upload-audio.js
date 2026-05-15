import { getSessionUser } from "./auth/_shared.js";

const PUBLIC_BASE_URL = "https://pub-5389c605b3bf46fea66c1657cc99e91d.r2.dev";

const mimeExtensions = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/mp4": "m4a",
  "audio/aac": "aac",
  "audio/ogg": "ogg",
  "audio/flac": "flac",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function slugify(value, fallback = "item") {
  const slug = `${value || ""}`
    .trim()
    .toLowerCase()
    .replace(/[\\/]+/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function publicUrl(key) {
  return `${PUBLIC_BASE_URL}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(`${value || ""}`);
  } catch {
    return fallback;
  }
}

function flattenCategories(categories = {}) {
  return Object.values(categories).flat().filter(Boolean);
}

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

function addAudioToCms(cms, audio) {
  cms.actors = Array.isArray(cms.actors) ? cms.actors : [];
  const actor = cms.actors.find((item) => item.id === audio.actorId);
  if (!actor) throw new Error(`Actor '${audio.actorId}' does not exist. Create the profile first.`);

  actor.audioSources = Array.isArray(actor.audioSources) ? actor.audioSources : [];
  const source = {
    id: audio.sampleId,
    title: audio.sampleTitle,
    category: flattenCategories(audio.categories).join(", "),
    src: audio.r2Url,
    type: audio.audioType || "audio/mpeg",
  };
  const index = actor.audioSources.findIndex((item) => item.id === source.id || item.src === source.src);
  if (index >= 0) actor.audioSources[index] = source;
  else actor.audioSources.push(source);

  actor.demos = Array.from(new Set([...(actor.demos || []), audio.sampleTitle].filter(Boolean)));
  actor.updatedAt = new Date().toISOString();
  return source;
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);
    const user = await getSessionUser(env.CHIPS_MEDIA, request);
    if (!user) return json({ error: "Login is required." }, 401);

    const form = await request.formData();
    const file = form.get("audio_file");
    if (!file || typeof file === "string") return json({ error: "audio_file is required." }, 400);
    if (!file.type.startsWith("audio/")) return json({ error: "Only audio files are allowed." }, 400);

    const actorName = user.role === "admin" ? `${form.get("actor_name") || ""}`.trim() : user.name;
    const actorId = user.role === "admin" ? slugify(form.get("actor_id") || actorName, "actor") : user.actorId;
    const sampleTitle = `${form.get("sample_title") || ""}`.trim();
    if (!actorName || !sampleTitle) return json({ error: "actor_name and sample_title are required." }, 400);
    if (user.role !== "admin" && actorId !== user.actorId) return json({ error: "You can only upload audio to your own profile." }, 403);

    const sampleId = slugify(form.get("sample_id") || `${actorId}-${sampleTitle}`, "sample");
    const extension = mimeExtensions[file.type] || file.name.split(".").pop() || "mp3";
    const r2Key = `${form.get("r2_key") || `audio/${actorId}/${sampleId}.${extension}`}`.replace(/^\/+/, "");

    await env.CHIPS_MEDIA.put(r2Key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type || "audio/mpeg" },
      customMetadata: {
        actorName,
        actorId,
        sampleTitle,
        categories: `${form.get("categories_json") || "{}"}`,
      },
    });

    const r2Url = publicUrl(r2Key);
    const metadata = {
      kind: "audio",
      actorName,
      actorId,
      sampleTitle,
      sampleId,
      categories: parseJson(form.get("categories_json"), {}),
      notes: `${form.get("notes") || ""}`,
      r2Key,
      r2Url,
      audioType: file.type || "audio/mpeg",
      originalFileName: file.name,
      uploadedAt: new Date().toISOString(),
    };
    const metadataKey = `approved/audio/${actorId}/${sampleId}-${Date.now()}.json`;
    const cms = await loadCms(env.CHIPS_MEDIA);
    const source = addAudioToCms(cms, metadata);
    await saveCms(env.CHIPS_MEDIA, cms);
    await env.CHIPS_MEDIA.put(metadataKey, JSON.stringify({ ...metadata, approvedAt: new Date().toISOString() }, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });

    return json({
      ok: true,
      r2Key,
      r2Url,
      metadataKey,
      source,
      cmsKey: "cms/cms-data.json",
      metadata,
    });
  } catch (error) {
    return json({ error: error.message || "Upload failed." }, 500);
  }
}
