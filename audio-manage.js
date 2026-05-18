const actorSelect = document.getElementById("manage-actor-select");
const introPanel = document.getElementById("intro-audio-panel");
const sampleList = document.getElementById("sample-audio-list");
const reloadButton = document.getElementById("reload-audio-manage");
const saveButton = document.getElementById("save-audio-manage");
const resultBox = document.getElementById("audio-manage-result");
const remoteCmsUrl = "https://pub-5389c605b3bf46fea66c1657cc99e91d.r2.dev/cms/cms-data.json";

let currentUser = null;
let currentActor = null;
let fallbackActors = [];
let usingFallbackCms = false;
let sortable = null;

function escapeHtml(value = "") {
  return `${value}`.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function authToken() {
  return localStorage.getItem("chipsAuthToken") || "";
}

function authHeaders(extra = {}) {
  const token = authToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

function cachedAuthUser() {
  try {
    return normalizeUser(JSON.parse(localStorage.getItem("chipsAuthUser") || "null"));
  } catch {
    return null;
  }
}

function normalizeRole(role = "") {
  const value = `${role || ""}`.trim().toLowerCase();
  if (["admin", "administrator", "owner", "manager", "관리자", "운영자"].includes(value)) return "admin";
  if (["member", "actor", "voice_actor", "voice-actor", "성우", "멤버"].includes(value)) return "actor";
  return value || "actor";
}

function normalizeUser(user) {
  return user ? { ...user, role: normalizeRole(user.role) } : null;
}

function showResult(value) {
  resultBox.hidden = false;
  resultBox.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function renderAuthStatus(user) {
  document.querySelectorAll("[data-auth-nav]").forEach((nav) => {
    nav.hidden = !user;
  });
  document.querySelectorAll("[data-admin-link]").forEach((link) => {
    link.hidden = user?.role !== "admin";
  });
  document.querySelectorAll("[data-auth-greeting]").forEach((greeting) => {
    greeting.hidden = !user;
    if (user) greeting.innerHTML = `<strong>${escapeHtml(user.name || user.username)}</strong>님 반갑습니다.`;
  });
}

async function requireUser() {
  const cached = cachedAuthUser();
  if (!authToken()) {
    window.location.href = "login.html";
    return null;
  }
  try {
    const response = await fetch("/api/auth/me", { headers: authHeaders(), cache: "no-store" });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.user) throw new Error(payload.error || "Auth check failed");
    const user = normalizeUser(payload.user || cached);
    localStorage.setItem("chipsAuthUser", JSON.stringify(user));
    renderAuthStatus(user);
    return user;
  } catch (error) {
    if (cached) {
      renderAuthStatus(cached);
      return cached;
    }
    localStorage.removeItem("chipsAuthToken");
    localStorage.removeItem("chipsAuthUser");
    window.location.href = "login.html";
    return null;
  }
}

function actorOption(actor = {}) {
  const label = `${actor.id} - ${actor.name || actor.nameEn || "이름 없음"}`;
  return `<option value="${escapeHtml(actor.id)}">${escapeHtml(label)}</option>`;
}

async function loadFallbackActors() {
  const response = await fetch(remoteCmsUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("Public CMS data load failed");
  const data = await response.json();
  fallbackActors = Array.isArray(data.actors) ? data.actors.filter((actor) => actor.id) : [];
  usingFallbackCms = true;
  return fallbackActors;
}

async function loadActors() {
  const query = currentUser?.role === "admin" ? "?all=1" : "";
  let payload = null;
  try {
    const response = await fetch(`/api/manage-audio${query}`, { headers: authHeaders(), cache: "no-store" });
    payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Audio data load failed");
    usingFallbackCms = false;
  } catch (error) {
    const actors = await loadFallbackActors();
    const visibleActors = currentUser?.role === "admin" ? actors : actors.filter((actor) => actor.id === currentUser?.actorId);
    payload = {
      actors: visibleActors.map(publicActorFromCms),
      actor: visibleActors[0] || null,
    };
    showResult({
      notice: "로컬 미리보기에서는 공개 CMS 데이터로 목록을 표시합니다. 저장은 Cloudflare 배포 주소에서 로그인 후 사용해 주세요.",
    });
  }

  if (currentUser?.role === "admin" && (!Array.isArray(payload.actors) || !payload.actors.length)) {
    const actorsFromCms = await loadFallbackActors();
    payload = {
      actors: actorsFromCms.map(publicActorFromCms),
      actor: actorsFromCms[0] || null,
    };
  }

  const actors = Array.isArray(payload.actors) ? payload.actors : [];
  actorSelect.innerHTML = actors.length ? actors.map(actorOption).join("") : '<option value="">프로필이 없습니다</option>';
  actorSelect.disabled = currentUser?.role !== "admin" || !actors.length;

  const initialActorId = payload.actor?.id || actors[0]?.id || "";
  if (initialActorId) {
    actorSelect.value = initialActorId;
    await loadActorAudio(actorSelect.value);
  } else {
    introPanel.innerHTML = '<p class="empty-note">관리할 프로필이 없습니다.</p>';
    sampleList.innerHTML = '<p class="empty-note">관리할 오디오가 없습니다.</p>';
  }
}

function publicActorFromCms(actor = {}) {
  return {
    id: actor.id || "",
    name: actor.name || "",
    nameEn: actor.nameEn || "",
    sortOrder: actor.sortOrder || 9999,
  };
}

function audioCard(source = {}, { intro = false } = {}) {
  const categories = source.categories && typeof source.categories === "object" ? source.categories : {};
  return `
    <article class="audio-manage-card" data-audio-id="${escapeHtml(source.id || "")}" data-r2-key="${escapeHtml(source.r2Key || "")}" data-intro="${intro ? "true" : "false"}">
      <div class="drag-handle" aria-hidden="true">${intro ? "PIN" : "DRAG"}</div>
      <div class="audio-manage-main">
        <label>
          <span>제목</span>
          <input class="audio-title-input" value="${escapeHtml(source.title || (intro ? "자기소개" : ""))}" ${intro ? "readonly" : ""} />
        </label>
        <details class="audio-category-editor" ${intro ? "" : "open"}>
          <summary>${intro ? "자기소개는 카테고리를 사용하지 않습니다" : "카테고리 수정"}</summary>
          <div class="category-grid audio-edit-category-grid">
            ${chipsCategoryGroups
              .map((group) => {
                const selected = Array.isArray(categories[group.key]) ? categories[group.key] : [];
                return `
                  <section class="category-group">
                    <header>
                      <strong>${group.label}</strong>
                      <small>${group.hint}</small>
                    </header>
                    <div class="option-list">
                      ${group.options
                        .map((option) => {
                          const checked = selected.includes(option) ? "checked" : "";
                          return `
                            <label class="option-pill">
                              <input type="checkbox" name="${group.key}" value="${escapeHtml(option)}" ${checked} ${intro ? "disabled" : ""} />
                              <span>${escapeHtml(option)}</span>
                            </label>
                          `;
                        })
                        .join("")}
                    </div>
                  </section>
                `;
              })
              .join("")}
          </div>
        </details>
        ${source.src ? `<audio controls preload="none" src="${escapeHtml(source.src)}"></audio>` : ""}
      </div>
      <button class="danger-button audio-delete-button" type="button" ${intro ? "disabled" : ""}>삭제</button>
    </article>
  `;
}

function renderActorAudio(actor) {
  currentActor = actor;
  const intro = Array.isArray(actor.introAudio) ? actor.introAudio[0] : null;
  introPanel.innerHTML = intro
    ? audioCard(intro, { intro: true })
    : '<p class="empty-note">등록된 자기소개 오디오가 없습니다. 오디오 추가 페이지에서 자기소개를 업로드해 주세요.</p>';
  sampleList.innerHTML = Array.isArray(actor.audioSources) && actor.audioSources.length
    ? actor.audioSources.map((source) => audioCard(source)).join("")
    : '<p class="empty-note">등록된 샘플 오디오가 없습니다.</p>';

  if (sortable) sortable.destroy();
  sortable = window.Sortable && sampleList.querySelector(".audio-manage-card")
    ? Sortable.create(sampleList, {
        animation: 160,
        handle: ".drag-handle",
        ghostClass: "audio-sort-ghost",
        chosenClass: "audio-sort-chosen",
      })
    : null;
}

async function loadActorAudio(actorId) {
  if (!actorId) return;
  introPanel.innerHTML = "Loading...";
  sampleList.innerHTML = "Loading...";
  if (usingFallbackCms) {
    const actor = fallbackActors.find((item) => item.id === actorId);
    if (!actor) throw new Error("Actor audio load failed");
    renderActorAudio(actor);
    return;
  }
  const response = await fetch(`/api/manage-audio?actorId=${encodeURIComponent(actorId)}`, { headers: authHeaders(), cache: "no-store" });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Actor audio load failed");
  renderActorAudio(payload.actor);
}

function collectCategories(card) {
  return chipsCategoryGroups.reduce((categories, group) => {
    categories[group.key] = [...card.querySelectorAll(`input[name="${group.key}"]:checked`)].map((input) => input.value);
    return categories;
  }, {});
}

function collectAudioSources() {
  return [...sampleList.querySelectorAll(".audio-manage-card")].map((card, index) => ({
    id: card.dataset.audioId,
    r2Key: card.dataset.r2Key,
    title: card.querySelector(".audio-title-input")?.value.trim() || `샘플 ${index + 1}`,
    categories: collectCategories(card),
  }));
}

async function saveAudio() {
  if (!currentActor?.id) return;
  const response = await fetch("/api/manage-audio", {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      actorId: currentActor.id,
      action: "save",
      audioSources: collectAudioSources(),
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Audio save failed");
  showResult(payload);
  await loadActorAudio(currentActor.id);
}

document.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".audio-delete-button");
  if (!deleteButton || deleteButton.disabled) return;
  const card = deleteButton.closest(".audio-manage-card");
  const title = card.querySelector(".audio-title-input")?.value || card.dataset.audioId;
  if (!window.confirm(`${title} 오디오를 삭제할까요? 저장 버튼을 눌러야 최종 반영됩니다.`)) return;
  card.remove();
});

actorSelect?.addEventListener("change", () => {
  loadActorAudio(actorSelect.value).catch((error) => showResult({ error: error.message }));
});

reloadButton?.addEventListener("click", () => {
  loadActorAudio(actorSelect.value).catch((error) => showResult({ error: error.message }));
});

saveButton?.addEventListener("click", () => {
  saveButton.disabled = true;
  saveButton.textContent = "저장 중...";
  saveAudio()
    .catch((error) => showResult({ error: error.message }))
    .finally(() => {
      saveButton.disabled = false;
      saveButton.textContent = "변경사항 저장";
    });
});

requireUser()
  .then((user) => {
    currentUser = user;
    if (!user) return;
    return loadActors();
  })
  .catch((error) => showResult({ error: error.message }));
