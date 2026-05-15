import { cors, hashPassword, json, publicUser, randomId, safeUsername } from "./_shared.js";

export async function onRequestOptions() {
  return cors();
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

    const body = await request.json();
    const username = safeUsername(body.username);
    const password = `${body.password || ""}`;
    if (!username || !password) return json({ error: "아이디와 비밀번호를 입력해주세요." }, 400);

    const storedUser = await env.CHIPS_MEDIA.get(`auth/users/${username}.json`);
    if (!storedUser) return json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, 401);

    const user = await storedUser.json();
    if (user.status !== "active") return json({ error: "활성화되지 않은 계정입니다." }, 403);

    const passwordHash = await hashPassword(password, user.salt);
    if (passwordHash !== user.passwordHash) return json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, 401);

    const token = randomId("session");
    const session = {
      token,
      username,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    };
    await env.CHIPS_MEDIA.put(`auth/sessions/${token}.json`, JSON.stringify(session, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });

    return json({ ok: true, token, user: publicUser(user) });
  } catch (error) {
    return json({ error: error.message || "Login failed." }, 500);
  }
}
