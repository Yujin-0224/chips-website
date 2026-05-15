import { cors, getSessionUser, json } from "./_shared.js";

export async function onRequestOptions() {
  return cors();
}

export async function onRequestGet({ request, env }) {
  if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);
  const user = await getSessionUser(env.CHIPS_MEDIA, request);
  if (!user) return json({ user: null }, 401);
  return json({ user });
}
