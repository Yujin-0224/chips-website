import { cors, hashPassword, json, passwordPolicyError, randomId, safeUsername } from "./_shared.js";

export async function onRequestOptions() {
  return cors();
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

    const body = await request.json();
    const username = safeUsername(body.username);
    const password = `${body.password || ""}`;
    const name = `${body.name || ""}`.trim();
    const contact = `${body.contact || ""}`.trim();
    const note = `${body.note || ""}`.trim();

    if (!username || username.length < 3) return json({ error: "아이디는 3자 이상이어야 합니다." }, 400);
    const passwordError = passwordPolicyError(password);
    if (passwordError) return json({ error: passwordError }, 400);
    if (!name) return json({ error: "멤버 이름을 입력해 주세요." }, 400);

    const existingUser = await env.CHIPS_MEDIA.get(`auth/users/${username}.json`);
    if (existingUser) return json({ error: "이미 사용 중인 아이디입니다." }, 409);

    const requestId = randomId("signup");
    const salt = crypto.randomUUID();
    const passwordHash = await hashPassword(password, salt);
    const signup = {
      id: requestId,
      username,
      passwordHash,
      salt,
      requestedName: name,
      actorId: username,
      contact,
      note,
      status: "pending",
      requestedAt: new Date().toISOString(),
    };

    await env.CHIPS_MEDIA.put(`auth/signup-requests/${requestId}.json`, JSON.stringify(signup, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });

    return json({ ok: true, requestId, actorId: username, message: "가입 요청이 접수되었습니다." });
  } catch (error) {
    return json({ error: error.message || "Signup request failed." }, 500);
  }
}
