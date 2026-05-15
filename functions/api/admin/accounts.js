import { hashPassword, json, passwordPolicyError, requireAdmin, safeUsername } from "../auth/_shared.js";

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

function publicAccount(user = {}) {
  return {
    username: user.username,
    role: user.role || "actor",
    actorId: user.actorId || "",
    name: user.name || "",
    status: user.status || "active",
    createdAt: user.createdAt || "",
  };
}

export async function onRequestGet({ request, env }) {
  if (!(await requireAdmin(request, env))) return json({ error: "Unauthorized" }, 401);
  if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

  const [requests, users] = await Promise.all([
    readJsonObjects(env.CHIPS_MEDIA, "auth/signup-requests/"),
    readJsonObjects(env.CHIPS_MEDIA, "auth/users/"),
  ]);

  return json({
    requests: requests
      .filter((item) => item.status === "pending")
      .sort((a, b) => `${b.requestedAt || ""}`.localeCompare(`${a.requestedAt || ""}`)),
    users: users.map(publicAccount).sort((a, b) => `${a.username}`.localeCompare(`${b.username}`)),
  });
}

export async function onRequestPost({ request, env }) {
  try {
    if (!(await requireAdmin(request, env))) return json({ error: "Unauthorized" }, 401);
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

    const body = await request.json();
    const action = `${body.action || ""}`;

    if (action === "create") {
      const username = safeUsername(body.username);
      const password = `${body.password || ""}`;
      const role = body.role === "admin" ? "admin" : "actor";
      const name = `${body.name || username}`.trim();
      const actorId = role === "admin" ? `${body.actorId || ""}`.trim() : username;

      if (!username || username.length < 3) return json({ error: "아이디는 3자 이상이어야 합니다." }, 400);
      const passwordError = passwordPolicyError(password);
      if (passwordError) return json({ error: passwordError }, 400);

      const userKey = `auth/users/${username}.json`;
      const existing = await env.CHIPS_MEDIA.get(userKey);
      if (existing) return json({ error: "이미 사용 중인 아이디입니다." }, 409);

      const salt = crypto.randomUUID();
      const user = {
        username,
        passwordHash: await hashPassword(password, salt),
        salt,
        role,
        actorId,
        name,
        status: "active",
        createdAt: new Date().toISOString(),
        createdBy: "admin",
      };
      await env.CHIPS_MEDIA.put(userKey, JSON.stringify(user, null, 2), {
        httpMetadata: { contentType: "application/json; charset=utf-8" },
      });
      return json({ ok: true, action, user: publicAccount(user) });
    }

    if (action === "delete") {
      const username = safeUsername(body.username);
      if (!username) return json({ error: "Username is required." }, 400);
      if (!env.ADMIN_TOKEN) return json({ error: "Developer token is not configured." }, 500);
      if (`${body.developerToken || ""}` !== env.ADMIN_TOKEN) return json({ error: "Developer token is invalid." }, 403);

      const userKey = `auth/users/${username}.json`;
      const storedUser = await env.CHIPS_MEDIA.get(userKey);
      if (!storedUser) return json({ error: "Account not found." }, 404);

      const user = await storedUser.json();

      await env.CHIPS_MEDIA.delete(userKey);
      return json({ ok: true, action, deleted: publicAccount(user) });
    }

    const key = `${body.key || ""}`;
    if (!key.startsWith("auth/signup-requests/")) return json({ error: "Invalid signup request key." }, 400);

    const stored = await env.CHIPS_MEDIA.get(key);
    if (!stored) return json({ error: "Signup request not found." }, 404);
    const signup = await stored.json();

    if (action === "reject") {
      const rejected = { ...signup, status: "rejected", rejectedAt: new Date().toISOString() };
      await env.CHIPS_MEDIA.put(`auth/rejected/${signup.id}.json`, JSON.stringify(rejected, null, 2), {
        httpMetadata: { contentType: "application/json; charset=utf-8" },
      });
      await env.CHIPS_MEDIA.delete(key);
      return json({ ok: true, action, request: rejected });
    }

    if (action !== "approve") return json({ error: "Invalid action." }, 400);

    const username = safeUsername(signup.username);
    const role = body.role || "actor";
    const userKey = `auth/users/${username}.json`;
    const existing = await env.CHIPS_MEDIA.get(userKey);
    if (existing) return json({ error: "이미 사용 중인 아이디입니다." }, 409);

    const user = {
      username,
      passwordHash: signup.passwordHash,
      salt: signup.salt,
      role,
      actorId: role === "admin" ? `${body.actorId || ""}`.trim() : username,
      name: `${body.name || signup.requestedName || username}`.trim(),
      status: "active",
      createdAt: new Date().toISOString(),
      approvedFrom: key,
    };

    await env.CHIPS_MEDIA.put(userKey, JSON.stringify(user, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });
    await env.CHIPS_MEDIA.put(`auth/approved/${signup.id}.json`, JSON.stringify({ ...signup, approvedAt: new Date().toISOString() }, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });
    await env.CHIPS_MEDIA.delete(key);

    return json({ ok: true, action, user: publicAccount(user) });
  } catch (error) {
    return json({ error: error.message || "Account action failed." }, 500);
  }
}
