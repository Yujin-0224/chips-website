const loadButton = document.getElementById("load-submissions");
const profileList = document.getElementById("profile-submissions");
const audioList = document.getElementById("audio-submissions");
const signupList = document.getElementById("signup-requests");
const accountList = document.getElementById("account-list");
const accountForm = document.getElementById("admin-account-form");
const resultBox = document.getElementById("admin-result");

function showResult(value) {
  resultBox.hidden = false;
  resultBox.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function authToken() {
  return localStorage.getItem("chipsAuthToken") || "";
}

function adminHeaders(extra = {}) {
  const bearer = authToken();
  return {
    ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
    ...extra,
  };
}

function authUser() {
  try {
    return JSON.parse(localStorage.getItem("chipsAuthUser") || "null");
  } catch {
    return null;
  }
}

function hasAdminSession() {
  return authUser()?.role === "admin" && Boolean(authToken());
}

function escapeHtml(value = "") {
  return `${value}`
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function roleLabel(role = "") {
  if (role === "admin") return "관리자";
  if (role === "actor") return "멤버";
  return role || "-";
}

function submissionCard(item, type) {
  const title = type === "profile" ? item.name : item.sampleTitle;
  const subtitle = type === "profile" ? item.nameEn || item.actorId : `${item.actorName || ""} / ${item.actorId || ""}`;
  const media =
    type === "profile" && item.profileImageUrl
      ? `<img class="admin-thumb" src="${escapeHtml(item.profileImageUrl)}" alt="" />`
      : "";
  const audio = type === "audio" && item.r2Url ? `<audio controls preload="none" src="${escapeHtml(item.r2Url)}"></audio>` : "";

  return `
    <article class="submission-card">
      ${media}
      <div>
        <strong>${escapeHtml(title || "(제목 없음)")}</strong>
        <span>${escapeHtml(subtitle || "")}</span>
      </div>
      ${audio}
      <small>${escapeHtml(item.submittedAt || item.uploadedAt || "")}</small>
      <button class="primary-button" type="button" data-approve="${type}" data-key="${escapeHtml(item.key)}">승인</button>
    </article>
  `;
}

function signupCard(item) {
  return `
    <article class="submission-card">
      <div>
        <strong>${escapeHtml(item.requestedName || item.username)}</strong>
        <span>${escapeHtml(item.username)} / actorId: ${escapeHtml(item.actorId || "")}</span>
        <span>${escapeHtml(item.contact || "")}</span>
      </div>
      <small>${escapeHtml(item.requestedAt || "")}</small>
      <button class="primary-button" type="button" data-account-action="approve" data-key="${escapeHtml(item.key)}">승인</button>
      <button class="secondary-button" type="button" data-account-action="reject" data-key="${escapeHtml(item.key)}">거절</button>
    </article>
  `;
}

function accountCard(item) {
  return `
    <article class="submission-card">
      <div>
        <strong>${escapeHtml(item.name || item.username)}</strong>
        <span>${escapeHtml(item.username)} / ${escapeHtml(roleLabel(item.role))} / ${escapeHtml(item.actorId || "-")}</span>
      </div>
      <small>${escapeHtml(item.createdAt || "")}</small>
    </article>
  `;
}

function requireAdminSession() {
  if (hasAdminSession()) return true;
  showResult({
    error: "운영자 계정으로 로그인해야 사용할 수 있습니다.",
    action: "login.html에서 운영자 계정으로 로그인해 주세요.",
  });
  return false;
}

async function loadSubmissions() {
  if (!requireAdminSession()) return;

  profileList.innerHTML = "불러오는 중...";
  audioList.innerHTML = "불러오는 중...";
  if (signupList) signupList.innerHTML = "불러오는 중...";
  if (accountList) accountList.innerHTML = "불러오는 중...";

  const [submissionsResponse, accountsResponse] = await Promise.all([
    fetch("/api/admin/submissions", { headers: adminHeaders() }),
    fetch("/api/admin/accounts", { headers: adminHeaders() }),
  ]);
  const payload = await submissionsResponse.json();
  const accountsPayload = await accountsResponse.json();
  if (!submissionsResponse.ok) throw new Error(payload.error || "Load failed");
  if (!accountsResponse.ok) throw new Error(accountsPayload.error || "Accounts load failed");

  profileList.innerHTML = payload.profiles.length
    ? payload.profiles.map((item) => submissionCard(item, "profile")).join("")
    : '<p class="empty-note">대기 중인 프로필 제출이 없습니다.</p>';
  audioList.innerHTML = payload.audio.length
    ? payload.audio.map((item) => submissionCard(item, "audio")).join("")
    : '<p class="empty-note">대기 중인 오디오 제출이 없습니다.</p>';
  if (signupList) {
    signupList.innerHTML = accountsPayload.requests.length
      ? accountsPayload.requests.map(signupCard).join("")
      : '<p class="empty-note">대기 중인 가입 요청이 없습니다.</p>';
  }
  if (accountList) {
    accountList.innerHTML = accountsPayload.users.length
      ? accountsPayload.users.map(accountCard).join("")
      : '<p class="empty-note">활성 계정이 없습니다.</p>';
  }
  showResult({
    message: "운영 데이터를 불러왔습니다.",
    auth: "operator-login",
    counts: {
      profiles: payload.profiles.length,
      audio: payload.audio.length,
      signupRequests: accountsPayload.requests.length,
      accounts: accountsPayload.users.length,
    },
  });
}

async function approve(type, key) {
  if (!requireAdminSession()) return;
  const response = await fetch("/api/admin/approve", {
    method: "POST",
    headers: adminHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ type, key }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Approve failed");
  showResult(payload);
  await loadSubmissions();
}

async function accountAction(action, key) {
  if (!requireAdminSession()) return;
  const response = await fetch("/api/admin/accounts", {
    method: "POST",
    headers: adminHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ action, key }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Account action failed");
  showResult(payload);
  await loadSubmissions();
}

async function createAccount(form) {
  if (!requireAdminSession()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const response = await fetch("/api/admin/accounts", {
    method: "POST",
    headers: adminHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ action: "create", ...data }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Create account failed");
  form.reset();
  showResult(payload);
  await loadSubmissions();
}

loadButton.addEventListener("click", () => {
  loadSubmissions().catch((error) => showResult({ error: error.message }));
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-approve]");
  if (!button) return;
  button.disabled = true;
  button.textContent = "승인 중...";
  approve(button.dataset.approve, button.dataset.key).catch((error) => {
    button.disabled = false;
    button.textContent = "승인";
    showResult({ error: error.message });
  });
});

accountForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = accountForm.querySelector(".primary-button");
  button.disabled = true;
  button.textContent = "생성 중...";
  createAccount(accountForm)
    .catch((error) => showResult({ error: error.message }))
    .finally(() => {
      button.disabled = false;
      button.textContent = "계정 생성";
    });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-account-action]");
  if (!button) return;
  button.disabled = true;
  button.textContent = "처리 중...";
  accountAction(button.dataset.accountAction, button.dataset.key).catch((error) => {
    button.disabled = false;
    button.textContent = button.dataset.accountAction === "approve" ? "승인" : "거절";
    showResult({ error: error.message });
  });
});

if (hasAdminSession()) {
  showResult({
    message: "운영자 로그인 세션을 감지했습니다. 관리자 기능을 사용할 수 있습니다.",
    username: authUser().username,
  });
} else {
  loadButton.disabled = true;
  accountForm?.querySelectorAll("button, input, select").forEach((element) => {
    element.disabled = true;
  });
  showResult({
    error: "운영자 계정으로 로그인해야 사용할 수 있습니다.",
    action: "login.html에서 운영자 계정으로 로그인해 주세요.",
  });
}
