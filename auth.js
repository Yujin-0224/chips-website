const authResult = document.getElementById("auth-result");
const loginGreeting = document.getElementById("login-account-greeting");

function showAuthResult(value) {
  if (!authResult) return;
  authResult.hidden = false;
  authResult.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function cachedAuthUser() {
  try {
    return JSON.parse(localStorage.getItem("chipsAuthUser") || "null");
  } catch {
    return null;
  }
}

function saveSession(payload) {
  localStorage.setItem("chipsAuthToken", payload.token);
  localStorage.setItem("chipsAuthUser", JSON.stringify(payload.user));
}

function renderLoginGreeting() {
  const user = cachedAuthUser();
  if (!loginGreeting || !user) return;
  loginGreeting.hidden = false;
  loginGreeting.innerHTML = `<strong>${user.name || user.username}</strong>님 반갑습니다.`;
}

function formPayload(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function passwordPolicyError(password = "") {
  if (password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
  if (!/[^A-Za-z0-9]/.test(password)) return "비밀번호에는 특수문자가 1개 이상 포함되어야 합니다.";
  return "";
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
  button.textContent = "로그인 중...";

  try {
    const payload = await postJson("/api/auth/login", formPayload(form));
    saveSession(payload);
    showAuthResult({ message: "로그인 완료", user: payload.user });
    window.location.href = payload.user.role === "admin" ? "admin.html" : "profile-create.html";
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
  const data = formPayload(form);
  const passwordError = passwordPolicyError(data.password || "");
  if (passwordError) {
    showAuthResult({ error: passwordError });
    return;
  }
  if (data.password !== data.passwordConfirm) {
    showAuthResult({ error: "비밀번호 확인이 일치하지 않습니다." });
    return;
  }
  delete data.passwordConfirm;

  button.disabled = true;
  button.textContent = "요청 중...";

  try {
    const payload = await postJson("/api/auth/signup-request", data);
    showAuthResult(payload);
    form.reset();
  } catch (error) {
    showAuthResult({ error: error.message });
  } finally {
    button.disabled = false;
    button.textContent = "가입 요청 보내기";
  }
});

renderLoginGreeting();
