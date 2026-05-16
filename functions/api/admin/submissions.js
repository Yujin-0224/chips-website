import { json, requireAdmin } from "../auth/_shared.js";

async function readJsonObjects(bucket, prefix) {
  const listed = await bucket.list({ prefix });
  const rows = [];
  for (const object of listed.objects) {
    if (!object.key.endsWith(".json")) continue;
    const stored = await bucket.get(object.key);
    if (!stored) continue;
    try {
      rows.push({ key: object.key, ...(await stored.json()) });
    } catch {
      rows.push({ key: object.key, error: "Invalid JSON" });
    }
  }
  return rows;
}

async function loadCms(bucket) {
  const stored = await bucket.get("cms/cms-data.json");
  if (!stored) return { actors: [] };
  return stored.json();
}

function normalize(value = "") {
  return `${value || ""}`.trim();
}

function profileChanges(profile = {}, actor = {}) {
  if (!actor?.id) return [{ field: "profile", before: "", after: "New profile request" }];
  const fields = [
    ["name", "Name"],
    ["nameEn", "English name"],
    ["bio", "Intro"],
    ["career", "Career"],
    ["capabilities", "Work options"],
    ["profileImage", "Profile image"],
  ];
  return fields
    .map(([field, label]) => {
      const nextValue = field === "profileImage" ? profile.profileImageUrl || profile.profileImage : profile[field];
      const prevValue = actor[field];
      return normalize(nextValue) === normalize(prevValue)
        ? null
        : { field, label, before: normalize(prevValue), after: normalize(nextValue) };
    })
    .filter(Boolean);
}

export async function onRequestGet({ request, env }) {
  if (!(await requireAdmin(request, env))) return json({ error: "Unauthorized" }, 401);
  if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

  const [profiles, audio, cms] = await Promise.all([
    readJsonObjects(env.CHIPS_MEDIA, "submissions/profiles/"),
    readJsonObjects(env.CHIPS_MEDIA, "submissions/audio/"),
    loadCms(env.CHIPS_MEDIA),
  ]);
  const actors = Array.isArray(cms.actors) ? cms.actors : [];
  const decoratedProfiles = profiles.map((profile) => {
    const actor = actors.find((item) => item.id === profile.actorId);
    return {
      ...profile,
      currentActorName: actor?.name || "",
      changeSummary: profileChanges(profile, actor),
    };
  });

  return json({
    profiles: decoratedProfiles.sort((a, b) => `${b.requestedAt || b.submittedAt || ""}`.localeCompare(`${a.requestedAt || a.submittedAt || ""}`)),
    audio: audio.sort((a, b) => `${b.uploadedAt || ""}`.localeCompare(`${a.uploadedAt || ""}`)),
  });
}
