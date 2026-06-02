import { cors, json, requireAdmin } from "../auth/_shared.js";

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

function publicProfile(actor = {}) {
  return {
    id: actor.id || "",
    name: actor.name || "",
    nameEn: actor.nameEn || "",
    audioCount: Array.isArray(actor.audioSources) ? actor.audioSources.length : 0,
    sortOrder: actor.sortOrder || 9999,
  };
}

function mediaKeys(actor = {}) {
  const keys = new Set();
  if (actor.profileImageKey) keys.add(actor.profileImageKey);
  (actor.audioSources || []).forEach((source) => {
    if (source?.r2Key) keys.add(source.r2Key);
  });
  return [...keys].filter(Boolean);
}

export async function onRequestOptions() {
  return cors();
}

export async function onRequestGet({ request, env }) {
  if (!(await requireAdmin(request, env))) return json({ error: "Unauthorized" }, 401);
  if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

  const cms = await loadCms(env.CHIPS_MEDIA);
  const actors = Array.isArray(cms.actors) ? cms.actors : [];
  return json({
    profiles: actors
      .map(publicProfile)
      .sort((a, b) => Number(a.sortOrder || 9999) - Number(b.sortOrder || 9999) || `${a.id}`.localeCompare(`${b.id}`)),
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const user = await requireAdmin(request, env);
    if (!user) return json({ error: "Unauthorized" }, 401);
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

    const body = await request.json();
    const action = `${body.action || ""}`;
    if (action !== "delete") return json({ error: "Invalid action." }, 400);

    const actorId = `${body.actorId || ""}`.trim();
    if (!actorId) return json({ error: "Actor ID is required." }, 400);

    const cms = await loadCms(env.CHIPS_MEDIA);
    cms.actors = Array.isArray(cms.actors) ? cms.actors : [];
    const index = cms.actors.findIndex((actor) => actor.id === actorId);
    if (index < 0) return json({ error: "Profile not found." }, 404);

    const [deleted] = cms.actors.splice(index, 1);
    const deletedAt = new Date().toISOString();
    const deletedProfile = {
      ...deleted,
      deletedAt,
      deletedBy: user.username,
    };

    await env.CHIPS_MEDIA.put(`deleted/profiles/${actorId}-${Date.now()}.json`, JSON.stringify(deletedProfile, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });
    await saveCms(env.CHIPS_MEDIA, cms);

    const deletedMediaKeys = [];
    for (const key of mediaKeys(deleted)) {
      await env.CHIPS_MEDIA.delete(key).catch(() => {});
      deletedMediaKeys.push(key);
    }

    return json({
      ok: true,
      action,
      deleted: publicProfile(deleted),
      deletedMediaKeys,
      cmsKey: "cms/cms-data.json",
    });
  } catch (error) {
    return json({ error: error.message || "Profile action failed." }, 500);
  }
}
