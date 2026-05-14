const tokenInput = document.getElementById("admin-token");
const loadButton = document.getElementById("load-submissions");
const profileList = document.getElementById("profile-submissions");
const audioList = document.getElementById("audio-submissions");
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

async function loadSubmissions() {
  localStorage.setItem("chipsAdminToken", token());
  profileList.innerHTML = "불러오는 중";
  audioList.innerHTML = "불러오는 중";

  const response = await fetch("/api/admin/submissions", {
    headers: { Authorization: `Bearer ${token()}` },
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Load failed");

  profileList.innerHTML = payload.profiles.length
    ? payload.profiles.map((item) => submissionCard(item, "profile")).join("")
    : "<p class=\"empty-note\">대기 중인 프로필 제출이 없습니다.</p>";
  audioList.innerHTML = payload.audio.length
    ? payload.audio.map((item) => submissionCard(item, "audio")).join("")
    : "<p class=\"empty-note\">대기 중인 오디오 제출이 없습니다.</p>";
  showResult({ message: "제출물을 불러왔습니다.", counts: { profiles: payload.profiles.length, audio: payload.audio.length } });
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
