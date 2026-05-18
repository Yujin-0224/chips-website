import { cors, getSessionUser, json } from "./auth/_shared.js";

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

function canManageActor(user, actorId) {
  return user?.role === "admin" || user?.actorId === actorId;
}

function publicActor(actor = {}) {
  return {
    id: actor.id || "",
    name: actor.name || "",
    nameEn: actor.nameEn || "",
    sortOrder: actor.sortOrder || 9999,
  };
}

function summarizeCategories(categories = {}) {
  return Object.values(categories)
    .map((values) => (Array.isArray(values) ? values.filter(Boolean).join(", ") : ""))
    .filter(Boolean)
    .join(" / ");
}

function normalizeCategories(categories = {}) {
  if (!categories || typeof categories !== "object" || Array.isArray(categories)) return {};
  return Object.entries(categories).reduce((normalized, [key, values]) => {
    normalized[key] = Array.isArray(values) ? values.map((value) => `${value}`.trim()).filter(Boolean) : [];
    return normalized;
  }, {});
}

function publicAudio(source = {}) {
  return {
    id: source.id || "",
    title: source.title || "",
    audioKind: source.audioKind || "sample",
    category: source.category || "",
    categories: normalizeCategories(source.categories),
    src: source.src || "",
    r2Key: source.r2Key || "",
    type: source.type || "audio/mpeg",
  };
}

function publicManageActor(actor = {}) {
  return {
    ...publicActor(actor),
    introAudio: Array.isArray(actor.introAudio) ? actor.introAudio.map(publicAudio) : [],
    audioSources: Array.isArray(actor.audioSources) ? actor.audioSources.map(publicAudio) : [],
  };
}

function mediaKeys(sources = []) {
  return sources.map((source) => source?.r2Key).filter(Boolean);
}

export async function onRequestOptions() {
  return cors();
}

export async function onRequestGet({ request, env }) {
  if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);
  const user = await getSessionUser(env.CHIPS_MEDIA, request);
  if (!user) return json({ error: "Login is required." }, 401);

  const cms = await loadCms(env.CHIPS_MEDIA);
  const actors = Array.isArray(cms.actors) ? cms.actors : [];
  const visibleActors = user.role === "admin" ? actors : actors.filter((actor) => actor.id === user.actorId);
  const url = new URL(request.url);
  const actorId = url.searchParams.get("actorId") || visibleActors[0]?.id || "";
  const actor = visibleActors.find((item) => item.id === actorId) || visibleActors[0] || null;

  return json({
    actors: visibleActors
      .map(publicActor)
      .sort((a, b) => Number(a.sortOrder || 9999) - Number(b.sortOrder || 9999) || `${a.name || a.id}`.localeCompare(`${b.name || b.id}`, "ko")),
    actor: actor ? publicManageActor(actor) : null,
  });
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);
    const user = await getSessionUser(env.CHIPS_MEDIA, request);
    if (!user) return json({ error: "Login is required." }, 401);

    const body = await request.json();
    if (`${body.action || ""}` !== "save") return json({ error: "Invalid action." }, 400);
    const actorId = `${body.actorId || ""}`.trim();
    if (!actorId || !canManageActor(user, actorId)) return json({ error: "Unauthorized actor." }, 403);

    const cms = await loadCms(env.CHIPS_MEDIA);
    cms.actors = Array.isArray(cms.actors) ? cms.actors : [];
    const actor = cms.actors.find((item) => item.id === actorId);
    if (!actor) return json({ error: "Actor not found." }, 404);

    const currentSources = Array.isArray(actor.audioSources) ? actor.audioSources : [];
    const currentById = new Map(currentSources.map((source) => [source.id, source]));
    const nextSources = [];
    const seen = new Set();

    for (const item of Array.isArray(body.audioSources) ? body.audioSources : []) {
      const id = `${item.id || ""}`.trim();
      if (!id || seen.has(id)) continue;
      const current = currentById.get(id);
      if (!current) continue;
      const categories = normalizeCategories(item.categories);
      const title = `${item.title || current.title || ""}`.trim() || current.title || id;
      nextSources.push({
        ...current,
        title,
        categories,
        category: summarizeCategories(categories),
        audioKind: current.audioKind || "sample",
      });
      seen.add(id);
    }

    const deletedSources = currentSources.filter((source) => !seen.has(source.id));
    actor.audioSources = nextSources;
    actor.demos = nextSources.map((source) => source.title).filter(Boolean);
    actor.updatedAt = new Date().toISOString();
    actor.updatedBy = user.username;

    await saveCms(env.CHIPS_MEDIA, cms);
    for (const key of mediaKeys(deletedSources)) {
      await env.CHIPS_MEDIA.delete(key).catch(() => {});
    }

    return json({
      ok: true,
      actor: publicManageActor(actor),
      deletedAudio: deletedSources.map(publicAudio),
      cmsKey: "cms/cms-data.json",
    });
  } catch (error) {
    return json({ error: error.message || "Audio manage failed." }, 500);
  }
}
