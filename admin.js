const tokenInput = document.getElementById("admin-token");
const loadButton = document.getElementById("load-submissions");
const profileList = document.getElementById("profile-submissions");
const audioList = document.getElementById("audio-submissions");
const signupList = document.getElementById("signup-requests");
const accountList = document.getElementById("account-list");
const accountForm = document.getElementById("admin-account-form");
const resultBox = document.getElementById("admin-result");

tokenInput.value = localStorage.getItem("chipsAdminToken") || "";

function showResult(value) {
  resultBox.hidden = false;
  resultBox.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function token() {
  return tokenInput.value.trim();
}

function submissionCard(item, type) {
  const title = type === "profile" ? item.name : item.sampleTitle;
  const subtitle = type === "profile" ? item.nameEn || item.actorId : `${item.actorName} / ${item.actorId}`;
  const media = type === "profile" && item.profileImageUrl ? `<img class="admin-thumb" src="${item.profileImageUrl}" alt="" />` : "";
  const audio = type === "audio" && item.r2Url ? `<audio controls preload="none" src="${item.r2Url}"></audio>` : "";

  return `
    <article class="submission-card">
      ${media}
      <div>
        <strong>${title || "(제목 없음)"}</strong>
        <span>${subtitle || ""}</span>
      </div>
      ${audio}
      <small>${item.submittedAt || item.uploadedAt || ""}</small>
      <button class="primary-button" type="button" data-approve="${type}" data-key="${item.key}">승인</button>
    </article>
  `;
}

function signupCard(item) {
  return `
    <article class="submission-card">
      <div>
        <strong>${item.requestedName || item.username}</strong>
        <span>${item.username} / actorId: ${item.actorId || ""}</span>
        <span>${item.contact || ""}</span>
      </div>
      <small>${item.requestedAt || ""}</small>
      <button class="primary-button" type="button" data-account-action="approve" data-key="${item.key}">승인</button>
      <button class="secondary-button" type="button" data-account-action="reject" data-key="${item.key}">거절</button>
    </article>
  `;
}

function accountCard(item) {
  return `
    <article class="submission-card">
      <div>
        <strong>${item.name || item.username}</strong>
        <span>${item.username} / ${item.role} / ${item.actorId || "-"}</span>
      </div>
      <small>${item.createdAt || ""}</small>
    </article>
  `;
}

async function loadSubmissions() {
  localStorage.setItem("chipsAdminToken", token());
  profileList.innerHTML = "불러오는 중";
  audioList.innerHTML = "불러오는 중";
  if (signupList) signupList.innerHTML = "불러오는 중";
  if (accountList) accountList.innerHTML = "불러오는 중";

  const [submissionsResponse, accountsResponse] = await Promise.all([
    fetch("/api/admin/submissions", { headers: { Authorization: `Bearer ${token()}` } }),
    fetch("/api/admin/accounts", { headers: { Authorization: `Bearer ${token()}` } }),
  ]);
  const payload = await submissionsResponse.json();
  const accountsPayload = await accountsResponse.json();
  if (!submissionsResponse.ok) throw new Error(payload.error || "Load failed");
  if (!accountsResponse.ok) throw new Error(accountsPayload.error || "Accounts load failed");

  profileList.innerHTML = payload.profiles.length
    ? payload.profiles.map((item) => submissionCard(item, "profile")).join("")
    : "<p class=\"empty-note\">대기 중인 프로필 제출이 없습니다.</p>";
  audioList.innerHTML = payload.audio.length
    ? payload.audio.map((item) => submissionCard(item, "audio")).join("")
    : "<p class=\"empty-note\">대기 중인 오디오 제출이 없습니다.</p>";
  if (signupList) {
    signupList.innerHTML = accountsPayload.requests.length
      ? accountsPayload.requests.map(signupCard).join("")
      : "<p class=\"empty-note\">대기 중인 가입 요청이 없습니다.</p>";
  }
  if (accountList) {
    accountList.innerHTML = accountsPayload.users.length
      ? accountsPayload.users.map(accountCard).join("")
      : "<p class=\"empty-note\">활성 계정이 없습니다.</p>";
  }
  showResult({
    message: "운영 데이터를 불러왔습니다.",
    counts: {
      profiles: payload.profiles.length,
      audio: payload.audio.length,
      signupRequests: accountsPayload.requests.length,
      accounts: accountsPayload.users.length,
    },
  });
}

async function approve(type, key) {
  const response = await fetch("/api/admin/approve", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, key }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Approve failed");
  showResult(payload);
  await loadSubmissions();
}

async function accountAction(action, key) {
  const response = await fetch("/api/admin/accounts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, key }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Account action failed");
  showResult(payload);
  await loadSubmissions();
}

async function createAccount(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const response = await fetch("/api/admin/accounts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
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
  button.textContent = "승인 중";
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
  button.textContent = "생성 중";
  createAccount(accountForm).catch((error) => showResult({ error: error.message })).finally(() => {
    button.disabled = false;
    button.textContent = "계정 생성";
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-account-action]");
  if (!button) return;
  button.disabled = true;
  button.textContent = "처리 중";
  accountAction(button.dataset.accountAction, button.dataset.key).catch((error) => {
    button.disabled = false;
    button.textContent = button.dataset.accountAction === "approve" ? "승인" : "거절";
    showResult({ error: error.message });
  });
});
