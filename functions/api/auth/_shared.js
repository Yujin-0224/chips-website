export function json(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function cors() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}

export function slugify(value, fallback = "item") {
  const slug = `${value || ""}`
    .trim()
    .toLowerCase()
    .replace(/[\\/]+/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

export function safeUsername(value = "") {
  return `${value}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function randomId(prefix = "id") {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function bearerToken(request) {
  const header = request.headers.get("Authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

export async function getSessionUser(bucket, request) {
  const token = bearerToken(request);
  if (!token) return null;

  const storedSession = await bucket.get(`auth/sessions/${token}.json`);
  if (!storedSession) return null;
  const session = await storedSession.json();
  if (session.expiresAt && new Date(session.expiresAt).getTime() < Date.now()) {
    await bucket.delete(`auth/sessions/${token}.json`);
    return null;
  }

  const storedUser = await bucket.get(`auth/users/${safeUsername(session.username)}.json`);
  if (!storedUser) return null;
  const user = await storedUser.json();
  if (user.status !== "active") return null;
  return { ...publicUser(user), token };
}

export function publicUser(user = {}) {
  return {
    username: user.username,
    role: user.role || "actor",
    actorId: user.actorId || "",
    name: user.name || "",
    status: user.status || "active",
  };
}

export function requireAdminToken(request, env) {
  const expected = env.ADMIN_TOKEN;
  if (!expected) return false;
  return request.headers.get("Authorization") === `Bearer ${expected}`;
}

export async function requireAdmin(request, env) {
  if (!env.CHIPS_MEDIA) return null;
  const user = await getSessionUser(env.CHIPS_MEDIA, request);
  return user?.role === "admin" ? user : null;
}
