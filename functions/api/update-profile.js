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

function publicUrl(key) {
  return `${PUBLIC_BASE_URL}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

async function loadCms(bucket) {
  const stored = await bucket.get("cms/cms-data.json");
  if (!stored) return { enabled: true, sampleAudioSources: [], actors: [], newsArticles: [] };
  return stored.json();
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(`${value || ""}`);
  } catch {
    return fallback;
  }
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
    const actorId = user.role === "admin" ? `${form.get("actor_id") || ""}`.trim() : user.actorId;
    if (!actorId) return json({ error: "actor_id is required." }, 400);
    if (user.role !== "admin" && actorId !== user.actorId) return json({ error: "You can only edit your own profile." }, 403);

    const cms = await loadCms(env.CHIPS_MEDIA);
    cms.actors = Array.isArray(cms.actors) ? cms.actors : [];
    const actorIndex = cms.actors.findIndex((actor) => actor.id === actorId);
    if (actorIndex < 0) return json({ error: `Actor '${actorId}' was not found.` }, 404);

    const currentActor = cms.actors[actorIndex];
    let profileImage = `${form.get("existing_profile_image") || currentActor.profileImage || ""}`;
    let profileImageKey = currentActor.profileImageKey || "";
    const image = form.get("profile_image");

    if (image && typeof image !== "string" && image.size > 0) {
      const extension = image.name.split(".").pop() || "jpg";
      profileImageKey = `profiles/${actorId}/profile.${extension}`;
      await env.CHIPS_MEDIA.put(profileImageKey, await image.arrayBuffer(), {
        httpMetadata: { contentType: image.type || "image/jpeg" },
      });
      profileImage = publicUrl(profileImageKey);
    }

    const updatedActor = {
      ...currentActor,
      name: `${form.get("name") || currentActor.name || ""}`.trim(),
      nameEn: `${form.get("name_en") || ""}`.trim(),
      bio: `${form.get("bio") || ""}`.trim(),
      career: parseJson(form.get("career_json"), []).filter(Boolean),
      capabilities: `${form.get("capabilities") || ""}`.trim(),
      profileImage: profileImage || currentActor.profileImage || "assets/sample_profile-optimized.webp",
      profileImageKey,
      updatedAt: new Date().toISOString(),
    };

    const metadataKey = `submissions/profiles/${actorId}.json`;
    await env.CHIPS_MEDIA.put(
      metadataKey,
      JSON.stringify(
        {
          kind: "profile",
          ...updatedActor,
          actorId,
          profileImageUrl: updatedActor.profileImage,
          requestedBy: user.username,
          requestedAt: new Date().toISOString(),
        },
        null,
        2,
      ),
      { httpMetadata: { contentType: "application/json; charset=utf-8" } },
    );

    return json({
      ok: true,
      actor: currentActor,
      requestedActor: updatedActor,
      metadataKey,
      approvalRequired: true,
    });
  } catch (error) {
    return json({ error: error.message || "Profile update failed." }, 500);
  }
}
