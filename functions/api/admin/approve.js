import { json, requireAdmin, slugify } from "../auth/_shared.js";

function flattenCategories(categories = {}) {
  return Object.values(categories).flat().filter(Boolean);
}

async function loadCms(bucket) {
  const stored = await bucket.get("cms/cms-data.json");
  if (!stored) {
    return { enabled: true, sampleAudioSources: [], actors: [], newsArticles: [] };
  }
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
  const categories = profile.categories || {};
  const tags = flattenCategories(categories);
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
    tags,
    capabilities: profile.capabilities || "",
    demos: [],
    colors: ["#ffc857", "#3bb7a3"],
    profileImage: profile.profileImageUrl || "assets/sample_profile-optimized.webp",
    audioSources: [],
    sortOrder: currentLength + 1,
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
    };
    return cms.actors[index];
  }
  cms.actors.push(actor);
  return actor;
}

function approveAudio(cms, audio) {
  cms.actors = Array.isArray(cms.actors) ? cms.actors : [];
  const actor = cms.actors.find((item) => item.id === audio.actorId);
  if (!actor) throw new Error(`Actor '${audio.actorId}' does not exist. Approve the profile first.`);

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
  return source;
}

export async function onRequestPost({ request, env }) {
  try {
    if (!(await requireAdmin(request, env))) return json({ error: "Unauthorized" }, 401);
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

    const { type, key } = await request.json();
    if (!key || !["profile", "audio"].includes(type)) return json({ error: "Invalid approval request." }, 400);

    const stored = await env.CHIPS_MEDIA.get(key);
    if (!stored) return json({ error: "Submission not found." }, 404);
    const submission = await stored.json();
    const cms = await loadCms(env.CHIPS_MEDIA);

    let approved;
    if (type === "profile") {
      approved = ensureActor(cms, profileToActor(submission, cms.actors?.length || 0));
    } else {
      approved = approveAudio(cms, submission);
    }

    await saveCms(env.CHIPS_MEDIA, cms);
    await env.CHIPS_MEDIA.put(`approved/${key}`, JSON.stringify({ ...submission, approvedAt: new Date().toISOString() }, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });
    await env.CHIPS_MEDIA.delete(key);

    return json({ ok: true, type, key, approved, cmsKey: "cms/cms-data.json" });
  } catch (error) {
    return json({ error: error.message || "Approve failed." }, 500);
  }
}
