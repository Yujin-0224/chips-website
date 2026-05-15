const authResult = document.getElementById("auth-result");

function showAuthResult(value) {
  if (!authResult) return;
  authResult.hidden = false;
  authResult.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function saveSession(payload) {
  localStorage.setItem("chipsAuthToken", payload.token);
  localStorage.setItem("chipsAuthUser", JSON.stringify(payload.user));
}

function formPayload(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Request failed");
  return payload;
}

document.getElementById("login-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector(".primary-button");
  button.disabled = true;
  button.textContent = "로그인 중";

  try {
    const payload = await postJson("/api/auth/login", formPayload(form));
    saveSession(payload);
    showAuthResult({ message: "로그인 완료", user: payload.user });
    window.location.href = payload.user.role === "admin" ? "admin.html" : "profile-edit.html";
  } catch (error) {
    showAuthResult({ error: error.message });
  } finally {
    button.disabled = false;
    button.textContent = "로그인";
  }
});

document.getElementById("signup-request-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector(".primary-button");
  button.disabled = true;
  button.textContent = "요청 중";

  try {
    const payload = await postJson("/api/auth/signup-request", formPayload(form));
    showAuthResult(payload);
    form.reset();
  } catch (error) {
    showAuthResult({ error: error.message });
  } finally {
    button.disabled = false;
    button.textContent = "가입 요청 보내기";
  }
});
