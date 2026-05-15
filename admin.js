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

function updateAdminTopbar() {
  const user = authUser();
  document.querySelectorAll("[data-auth-nav]").forEach((nav) => {
    nav.hidden = !(user?.role === "admin" && authToken());
  });
  document.querySelectorAll("[data-auth-greeting]").forEach((greeting) => {
    greeting.hidden = !user;
    if (user) {
      greeting.innerHTML = `<span><strong>${escapeHtml(user.name || user.username)}</strong>\ub2d8 \ubc18\uac11\uc2b5\ub2c8\ub2e4.</span><button type="button" data-admin-logout>Logout</button>`;
    }
  });
}

function escapeHtml(value = "") {
  return `${value}`
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function shortText(value = "", limit = 72) {
  const normalized = `${value || ""}`.replace(/\s+/g, " ").trim();
  if (!normalized) return "-";
  return normalized.length > limit ? `${normalized.slice(0, limit)}...` : normalized;
}

function roleLabel(role = "") {
  if (role === "admin") return "\uad00\ub9ac\uc790";
  if (role === "actor") return "\uba64\ubc84";
  return role || "-";
}

function formatAccountDate(value = "") {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

function changeSummary(item) {
  const changes = Array.isArray(item.changeSummary) ? item.changeSummary : [];
  if (!changes.length) return '<p class="admin-change-note">No changed fields detected.</p>';
  return `
    <ul class="admin-change-list">
      ${changes
        .map(
          (change) => `
            <li>
              <b>${escapeHtml(change.label || change.field)}</b>
              <span>${escapeHtml(shortText(change.before))}</span>
              <span>${escapeHtml(shortText(change.after))}</span>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;
}

function submissionCard(item, type) {
  const title = type === "profile" ? item.name : item.sampleTitle;
  const subtitle = type === "profile" ? item.nameEn || item.actorId : `${item.actorName || ""} / ${item.actorId || ""}`;
  const requestedAt = item.requestedAt || item.submittedAt || item.uploadedAt || "";
  const requester = item.requestedBy || item.username || item.actorId || "";
  const media =
    type === "profile" && (item.profileImageUrl || item.profileImage)
      ? `<img class="admin-thumb" src="${escapeHtml(item.profileImageUrl || item.profileImage)}" alt="" />`
      : "";
  const audio = type === "audio" && item.r2Url ? `<audio controls preload="none" src="${escapeHtml(item.r2Url)}"></audio>` : "";
  const details =
    type === "profile"
      ? `
        <div class="admin-request-meta">
          <span>Requested by: <b>${escapeHtml(requester || "-")}</b></span>
          <span>Date: <b>${escapeHtml(requestedAt || "-")}</b></span>
          <span>Actor ID: <b>${escapeHtml(item.actorId || "-")}</b></span>
        </div>
        ${changeSummary(item)}
      `
      : "";

  return `
    <article class="submission-card">
      ${media}
      <div class="admin-card-main">
        <strong>${escapeHtml(title || "(Untitled)")}</strong>
        <span>${escapeHtml(subtitle || "")}</span>
        ${details}
      </div>
      ${audio}
      <small>${escapeHtml(requestedAt)}</small>
      <div class="admin-card-actions">
        <button class="primary-button" type="button" data-submission-action="approve" data-type="${type}" data-key="${escapeHtml(item.key)}">Approve</button>
        <button class="secondary-button" type="button" data-submission-action="reject" data-type="${type}" data-key="${escapeHtml(item.key)}">Reject</button>
      </div>
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
      <button class="primary-button" type="button" data-account-action="approve" data-key="${escapeHtml(item.key)}">Approve</button>
      <button class="secondary-button" type="button" data-account-action="reject" data-key="${escapeHtml(item.key)}">Reject</button>
    </article>
  `;
}

function accountCard(item) {
  const isAdmin = item.role === "admin";
  return `
    <article class="account-row">
      <div class="account-row-main">
        <strong>${escapeHtml(item.name || item.username)}</strong>
        <span>${escapeHtml(item.username)} · ${escapeHtml(roleLabel(item.role))}</span>
      </div>
      <small>${escapeHtml(formatAccountDate(item.createdAt))}</small>
      ${
        isAdmin
          ? '<span class="account-lock">삭제 불가</span>'
          : `<button class="danger-button" type="button" data-account-action="delete" data-username="${escapeHtml(item.username)}">삭제</button>`
      }
    </article>
  `;
}

function requireAdminSession() {
  if (hasAdminSession()) return true;
  showResult({
    error: "Admin login is required.",
    action: "Please log in with an admin account on login.html.",
  });
  return false;
}

async function loadSubmissions() {
  if (!requireAdminSession()) return;

  profileList.innerHTML = "Loading...";
  audioList.innerHTML = "Loading...";
  if (signupList) signupList.innerHTML = "Loading...";
  if (accountList) accountList.innerHTML = "Loading...";

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
    : '<p class="empty-note">No pending profile update requests.</p>';
  audioList.innerHTML = payload.audio.length
    ? payload.audio.map((item) => submissionCard(item, "audio")).join("")
    : '<p class="empty-note">No pending audio submissions.</p>';
  if (signupList) {
    signupList.innerHTML = accountsPayload.requests.length
      ? accountsPayload.requests.map(signupCard).join("")
      : '<p class="empty-note">No pending signup requests.</p>';
  }
  if (accountList) {
    accountList.innerHTML = accountsPayload.users.length
      ? accountsPayload.users.map(accountCard).join("")
      : '<p class="empty-note">No active accounts.</p>';
  }
  showResult({
    message: "Admin data loaded.",
    counts: {
      profiles: payload.profiles.length,
      audio: payload.audio.length,
      signupRequests: accountsPayload.requests.length,
      accounts: accountsPayload.users.length,
    },
  });
}

async function submissionAction(action, type, key) {
  if (!requireAdminSession()) return;
  const response = await fetch("/api/admin/approve", {
    method: "POST",
    headers: adminHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ action, type, key }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Submission action failed");
  showResult(payload);
  await loadSubmissions();
}

async function accountAction(action, key, username) {
  if (!requireAdminSession()) return;
  const response = await fetch("/api/admin/accounts", {
    method: "POST",
    headers: adminHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ action, key, username }),
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

async function logout() {
  await fetch("/api/auth/logout", { method: "POST", headers: adminHeaders() }).catch(() => {});
  localStorage.removeItem("chipsAuthToken");
  localStorage.removeItem("chipsAuthUser");
  window.location.href = "login.html";
}

loadButton.addEventListener("click", () => {
  loadSubmissions().catch((error) => showResult({ error: error.message }));
});

document.addEventListener("click", (event) => {
  const logoutButton = event.target.closest("[data-admin-logout]");
  if (logoutButton) {
    logout();
    return;
  }

  const submissionButton = event.target.closest("[data-submission-action]");
  if (submissionButton) {
    submissionButton.disabled = true;
    submissionButton.textContent = submissionButton.dataset.submissionAction === "approve" ? "Approving..." : "Rejecting...";
    submissionAction(submissionButton.dataset.submissionAction, submissionButton.dataset.type, submissionButton.dataset.key).catch((error) => {
      submissionButton.disabled = false;
      submissionButton.textContent = submissionButton.dataset.submissionAction === "approve" ? "Approve" : "Reject";
      showResult({ error: error.message });
    });
    return;
  }

  const accountButton = event.target.closest("[data-account-action]");
  if (!accountButton) return;
  if (accountButton.dataset.accountAction === "delete" && !window.confirm(`${accountButton.dataset.username} 계정을 삭제할까요?`)) return;
  accountButton.disabled = true;
  accountButton.textContent = "Working...";
  accountAction(accountButton.dataset.accountAction, accountButton.dataset.key, accountButton.dataset.username).catch((error) => {
    accountButton.disabled = false;
    accountButton.textContent = accountButton.dataset.accountAction === "approve" ? "Approve" : accountButton.dataset.accountAction === "delete" ? "삭제" : "Reject";
    showResult({ error: error.message });
  });
});

accountForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = accountForm.querySelector(".primary-button");
  button.disabled = true;
  button.textContent = "Creating...";
  createAccount(accountForm)
    .catch((error) => showResult({ error: error.message }))
    .finally(() => {
      button.disabled = false;
      button.textContent = "Create account";
    });
});

updateAdminTopbar();
if (hasAdminSession()) {
  showResult({
    message: "Admin session detected.",
    username: authUser().username,
  });
} else {
  loadButton.disabled = true;
  accountForm?.querySelectorAll("button, input, select").forEach((element) => {
    element.disabled = true;
  });
  showResult({
    error: "Admin login is required.",
    action: "Please log in with an admin account on login.html.",
  });
}
