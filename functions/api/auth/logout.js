import { bearerToken, cors, json } from "./_shared.js";

export async function onRequestOptions() {
  return cors();
}

export async function onRequestPost({ request, env }) {
  if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);
  const token = bearerToken(request);
  if (token) await env.CHIPS_MEDIA.delete(`auth/sessions/${token}.json`);
  return json({ ok: true });
}
