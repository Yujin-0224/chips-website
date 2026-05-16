import { getSessionUser } from "./auth/_shared.js";

const PUBLIC_BASE_URL = "https://pub-5389c605b3bf46fea66c1657cc99e91d.r2.dev";

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

function profileToActor(profile, currentLength) {
  return {
    id: profile.actorId || slugify(profile.name, "actor"),
    name: profile.name,
    nameEn: profile.nameEn || "",
    gender: "",
    ageRange: "",
    tone: "",
    style: "",
    category: "",
    mood: "",
    bio: profile.bio || "",
    career: Array.isArray(profile.career) ? profile.career : [],
    tags: [],
    capabilities: profile.capabilities || "",
    demos: [],
    colors: ["#ffc857", "#3bb7a3"],
    profileImage: profile.profileImageUrl || "assets/sample_profile-optimized.webp",
    profileImageKey: profile.profileImageKey || "",
    audioSources: [],
    sortOrder: currentLength + 1,
    createdAt: profile.submittedAt,
  };
}

function ensureActor(cms, actor) {
  cms.actors = Array.isArray(cms.actors) ? cms.actors : [];
  const index = cms.actors.findIndex((item) => item.id === actor.id);
  if (index >= 0) {
    cms.actors[index] = {
      ...cms.actors[index],
      ...actor,
      audioSources: cms.actors[index].audioSources || actor.audioSources || [],
      demos: cms.actors[index].demos || actor.demos || [],
      sortOrder: cms.actors[index].sortOrder || actor.sortOrder,
    };
    return cms.actors[index];
  }
  cms.actors.push(actor);
  return actor;
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
    const name = `${form.get("name") || ""}`.trim();
    if (!name) return json({ error: "name is required." }, 400);

    const actorId = user && user.role !== "admin" ? user.actorId : slugify(form.get("actor_id") || name, "actor");
    let profileImageUrl = "";
    let profileImageKey = "";
    const image = form.get("profile_image");

    if (image && typeof image !== "string" && image.size > 0) {
      const extension = image.name.split(".").pop() || "jpg";
      profileImageKey = `profiles/${actorId}/profile.${extension}`;
      await env.CHIPS_MEDIA.put(profileImageKey, await image.arrayBuffer(), {
        httpMetadata: { contentType: image.type || "image/jpeg" },
      });
      profileImageUrl = publicUrl(profileImageKey);
    }

    const metadata = {
      kind: "profile",
      actorId,
      name,
      nameEn: `${form.get("name_en") || ""}`,
      bio: `${form.get("bio") || ""}`,
      career: parseJson(form.get("career_json"), []).filter(Boolean),
      capabilities: `${form.get("capabilities") || ""}`,
      profileImageKey,
      profileImageUrl,
      submittedAt: new Date().toISOString(),
    };
    const metadataKey = `approved/profiles/${actorId}-${Date.now()}.json`;
    const cms = await loadCms(env.CHIPS_MEDIA);
    const actor = ensureActor(cms, profileToActor(metadata, cms.actors?.length || 0));
    await saveCms(env.CHIPS_MEDIA, cms);
    await env.CHIPS_MEDIA.put(metadataKey, JSON.stringify({ ...metadata, approvedAt: new Date().toISOString() }, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });

    return json({
      ok: true,
      profileId: actorId,
      metadataKey,
      actor,
      cmsKey: "cms/cms-data.json",
      profileImageUrl,
    });
  } catch (error) {
    return json({ error: error.message || "Profile submit failed." }, 500);
  }
}
