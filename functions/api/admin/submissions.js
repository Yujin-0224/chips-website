function json(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function authorized(request, env) {
  const expected = env.ADMIN_TOKEN;
  if (!expected) return false;
  const header = request.headers.get("Authorization") || "";
  return header === `Bearer ${expected}`;
}

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

export async function onRequestGet({ request, env }) {
  if (!authorized(request, env)) return json({ error: "Unauthorized" }, 401);
  if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

  const [profiles, audio] = await Promise.all([
    readJsonObjects(env.CHIPS_MEDIA, "submissions/profiles/"),
    readJsonObjects(env.CHIPS_MEDIA, "submissions/audio/"),
  ]);

  return json({
    profiles: profiles.sort((a, b) => `${b.submittedAt || ""}`.localeCompare(`${a.submittedAt || ""}`)),
    audio: audio.sort((a, b) => `${b.uploadedAt || ""}`.localeCompare(`${a.uploadedAt || ""}`)),
  });
}
