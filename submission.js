const chipsCategoryGroups = [
  {
    key: "gender",
    label: "성별",
    hint: "Gender",
    options: ["남자", "여자"],
  },
  {
    key: "ageRange",
    label: "나이대",
    hint: "Age Range",
    options: ["나이 불명", "10대 미만", "10대", "20대", "30대", "40대", "50대", "노년"],
  },
  {
    key: "tone",
    label: "톤",
    hint: "Tone / Voice Color",
    options: [
      "밝은",
      "차분한",
      "따뜻한",
      "부드러운",
      "시크한",
      "진지한",
      "무게감 있는",
      "고급스러운",
      "신뢰감 있는",
      "친근한",
      "활기찬",
      "하이텐션",
      "로우텐션",
      "청량한",
      "귀여운",
      "장난스러운",
      "차가운",
      "강한",
      "카리스마",
      "섹시한",
      "몽환적인",
      "맑은",
      "거친",
      "빠른",
      "느린",
      "담백한",
      "감성적인",
      "아나운서",
      "상담원",
      "강사",
      "MC",
      "DJ",
      "방송 진행",
    ],
  },
  {
    key: "texture",
    label: "음색 특성",
    hint: "Voice Texture",
    options: ["저음", "중저음", "중음", "고음", "초고음"],
  },
  {
    key: "emotion",
    label: "감정",
    hint: "Emotion",
    options: [
      "무감정",
      "행복",
      "기쁨",
      "설렘",
      "기대",
      "자신감",
      "감동",
      "따뜻함",
      "위로",
      "사랑스러운",
      "친절한",
      "공손한",
      "진지한",
      "긴장",
      "불안",
      "공포",
      "당황",
      "놀람",
      "분노",
      "짜증",
      "경멸",
      "냉소",
      "우울",
      "슬픔",
      "울음",
      "체념",
      "절망",
      "후회",
      "지침",
      "고통",
      "비명",
      "광기",
      "의심",
      "조급함",
      "무서운",
      "위협",
      "명령",
      "간절한",
      "부탁",
      "수줍음",
    ],
  },
  {
    key: "language",
    label: "언어",
    hint: "Language",
    options: ["한국어", "영어", "일본어", "중국어"],
  },
  {
    key: "accent",
    label: "억양/사투리",
    hint: "Accent",
    options: ["표준어", "서울말", "부산/경상도", "대구 억양", "전라도", "충청도", "강원도", "제주도", "외국인 억양"],
  },
  {
    key: "characterType",
    label: "캐릭터 타입",
    hint: "Character Type",
    options: [
      "히어로",
      "빌런",
      "천재 캐릭터",
      "바보/허당 캐릭터",
      "츤데레",
      "차가운 미인",
      "다정한 캐릭터",
      "엄격한 상사",
      "선생님/교관",
      "의사/간호사",
      "공주",
      "경찰",
      "군인",
      "기사/전사",
      "마법사",
      "왕/여왕",
      "귀족",
      "아이돌",
      "학생",
      "엄마",
      "아빠",
      "할아버지",
      "할머니",
      "아기 캐릭터",
      "로봇",
      "AI 비서",
      "나레이터형 캐릭터",
      "마스코트 캐릭터",
      "동물 캐릭터",
      "괴물/크리처",
      "외계인",
      "유령",
      "좀비",
      "신/악마",
    ],
  },
];

const mimeExtensions = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/mp4": "m4a",
  "audio/aac": "aac",
  "audio/ogg": "ogg",
  "audio/flac": "flac",
};

const categorySelectionLimits = {
  gender: 1,
  ageRange: 2,
  tone: 3,
  texture: 1,
  emotion: 3,
  language: 1,
  accent: 1,
  characterType: 2,
};

function slugify(value, fallback = "item") {
  const slug = `${value || ""}`
    .trim()
    .toLowerCase()
    .replace(/[\\/]+/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function escapeHtml(value = "") {
  return `${value}`.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function renderCategoryGrid(targetId, prefix) {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = chipsCategoryGroups
    .map(
      (group) => `
        <section class="category-group">
          <header>
            <strong>${group.label}</strong>
            <small>${group.hint} · 최대 ${categorySelectionLimits[group.key] || group.options.length}개</small>
          </header>
          <div class="option-list">
            ${group.options
              .map((option) => {
                const id = `${prefix}-${group.key}-${slugify(option)}`;
                return `
                  <label class="option-pill" for="${id}">
                    <input id="${id}" type="checkbox" name="${group.key}" value="${option}" />
                    <span>${option}</span>
                  </label>
                `;
              })
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function enforceCategorySelectionLimit(input) {
  if (!input?.checked) return true;
  const limit = categorySelectionLimits[input.name];
  if (!limit) return true;
  const form = input.closest("form") || document;
  const checked = [...form.querySelectorAll(`input[name="${input.name}"]:checked`)];
  if (checked.length <= limit) return true;
  input.checked = false;
  return false;
}

function collectCategoryValues(form) {
  return chipsCategoryGroups.reduce((values, group) => {
    values[group.key] = [...form.querySelectorAll(`input[name="${group.key}"]:checked`)].map((input) => input.value);
    return values;
  }, {});
}

function showInlineResult(target, message) {
  if (!target) return;
  target.hidden = false;
  target.textContent = message;
}

function showResult(target, value) {
  target.hidden = false;
  target.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function fitTextToParent(element, { max = 58, min = 20 } = {}) {
  if (!element || !element.parentElement) return;
  element.style.fontSize = "";
  const baseSize = Math.min(max, parseFloat(window.getComputedStyle(element).fontSize) || max);
  element.style.fontSize = `${baseSize}px`;
  window.requestAnimationFrame(() => {
    const parentWidth = element.parentElement.clientWidth;
    if (!parentWidth || element.scrollWidth <= parentWidth) return;
    const nextSize = Math.max(min, Math.floor(baseSize * ((parentWidth - 2) / element.scrollWidth)));
    element.style.fontSize = `${nextSize}px`;
  });
}

function authToken() {
  return localStorage.getItem("chipsAuthToken") || "";
}

function cachedAuthUser() {
  try {
    return JSON.parse(localStorage.getItem("chipsAuthUser") || "null");
  } catch {
    return null;
  }
}

function authHeaders() {
  const token = authToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function currentUser() {
  const cached = cachedAuthUser();
  const token = authToken();
  if (!token) return null;
  if (cached) {
    fetch("/api/auth/me", { headers: authHeaders(), cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (payload?.user) localStorage.setItem("chipsAuthUser", JSON.stringify(payload.user));
      })
      .catch(() => {});
    return cached;
  }

  try {
    const response = await fetch("/api/auth/me", { headers: authHeaders(), cache: "no-store" });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Auth check failed");
    localStorage.setItem("chipsAuthUser", JSON.stringify(payload.user));
    return payload.user;
  } catch {
    return cached;
  }
}

function renderAuthStatus(user) {
  const shell = document.querySelector(".submission-hero");
  if (!shell) return;

  document.querySelectorAll("[data-auth-nav]").forEach((nav) => { nav.hidden = !user; });
  document.querySelectorAll("[data-admin-link]").forEach((link) => { link.hidden = user?.role !== "admin"; });
  document.querySelectorAll("[data-auth-greeting]").forEach((greeting) => {
    greeting.hidden = !user;
    if (user) greeting.innerHTML = "<strong>" + (user.name || user.username) + "</strong>\ub2d8 \ubc18\uac11\uc2b5\ub2c8\ub2e4.";
  });

  if (document.body.dataset.requiresAuth === "true" && !user) {
    document.querySelectorAll(".submission-hero, .submission-form").forEach((element) => { element.hidden = true; });
    const gate = document.createElement("section");
    gate.className = "login-gate form-section";
    gate.innerHTML = "<p class=\"submission-kicker\">LOGIN REQUIRED</p><h1>\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud569\ub2c8\ub2e4</h1><p>\ud504\ub85c\ud544\uacfc \uc624\ub514\uc624 \uad00\ub9ac\ub294 \uc2b9\uc778\ub41c \uacc4\uc815\uc73c\ub85c \ub85c\uadf8\uc778\ud55c \ub4a4 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.</p><div class=\"form-actions compact-actions\"><a class=\"primary-button button-link\" href=\"login.html\">\ub85c\uadf8\uc778</a><a class=\"secondary-button button-link\" href=\"signup-request.html\">\ud68c\uc6d0\uac00\uc785 \uc694\uccad</a></div>";
    shell.insertAdjacentElement("afterend", gate);
    return;
  }

  const status = document.createElement("div");
  status.className = "auth-status";
  status.innerHTML = user
    ? `<span><strong>${user.name || user.username}</strong>\ub2d8 \ubc18\uac11\uc2b5\ub2c8\ub2e4.${user.role === "actor" ? " \ubcf8\uc778 \ud504\ub85c\ud544\uacfc \uc624\ub514\uc624\ub97c \uad00\ub9ac\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4." : " \uad00\ub9ac\uc790 \uad8c\ud55c\uc785\ub2c8\ub2e4."}</span><button type="button" data-auth-logout>\ub85c\uadf8\uc544\uc6c3</button>`
    : `<span><strong>\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud569\ub2c8\ub2e4.</strong> \uacc4\uc815 \uc2b9\uc778 \ud6c4 \ud504\ub85c\ud544\uacfc \uc624\ub514\uc624\ub97c \uad00\ub9ac\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.</span><a class="secondary-button button-link" href="login.html">\ub85c\uadf8\uc778</a>`;
  shell.insertAdjacentElement("afterend", status);

  status.querySelector("[data-auth-logout]")?.addEventListener("click", async () => {
    await fetch("/api/auth/logout", { method: "POST", headers: authHeaders() }).catch(() => {});
    localStorage.removeItem("chipsAuthToken");
    localStorage.removeItem("chipsAuthUser");
    window.location.href = "login.html";
  });
}

const authReady = currentUser().then((user) => {
  renderAuthStatus(user);
  return user;
});

async function loadActors() {
  const remoteCmsUrl = "https://pub-5389c605b3bf46fea66c1657cc99e91d.r2.dev/cms/cms-data.json";
  let response = await fetch(remoteCmsUrl, { cache: "no-store" });
  if (!response.ok) {
    response = await fetch("data/cms-data.json", { cache: "no-store" });
  }
  if (!response.ok) throw new Error("성우 목록을 불러오지 못했습니다.");
  const data = await response.json();
  return [...(data.actors || [])]
    .filter((actor) => actor.id && actor.name)
    .sort((a, b) => `${a.name}`.localeCompare(`${b.name}`, "ko"));
}

function profileImageFromActor(actor = {}) {
  return actor.profileImage || actor.profileImageUrl || actor.image || "";
}

function actorForUser(actors = [], user = {}) {
  if (!user) return null;
  if (user.role === "actor") return actors.find((actor) => actor.id === user.actorId) || null;
  return null;
}

function getCareerItems(actor = {}) {
  const career = actor.career || actor.careers || actor.credits || actor.profileCareer || actor.workHistory;
  if (Array.isArray(career)) return career.filter(Boolean);
  if (typeof career === "string" && career.trim()) return career.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
  return [];
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

async function compressProfileImage(file) {
  if (!file || !file.type?.startsWith("image/")) return file;

  const imageUrl = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = "async";

  try {
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = imageUrl;
    });

    const maxSize = 900;
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return file;
    context.fillStyle = "#fffaf0";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const blob = await canvasToBlob(canvas, "image/webp", 0.82);
    if (!blob || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "profile";
    return new File([blob], `${baseName}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

async function setCompressedProfileImage(formData, input) {
  const file = input?.files?.[0];
  if (!file) return null;
  const compressed = await compressProfileImage(file);
  formData.set("profile_image", compressed);
  return compressed;
}

function careerValuesFrom(container) {
  if (!container) return [];
  return [...container.querySelectorAll('input[name="career"]')]
    .map((input) => input.value.trim())
    .filter(Boolean);
}

function formatCapabilitiesPreview(value = "") {
  const items = `${value || ""}`
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items.join(" · ") : "작업 가능 조건을 입력하면 여기에 표시됩니다.";
}

function renderCareerPreview(list, values) {
  if (!list) return;
  const items = values.length ? values : ["경력 사항은 준비 중입니다."];
  list.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function createCareerRow(value = "") {
  const row = document.createElement("div");
  row.className = "career-input-row";
  row.innerHTML = `
    <input name="career" type="text" placeholder="예: 애니메이션 주연 캐릭터 보이스 참여" />
    <button class="small-remove-button" type="button" data-career-remove aria-label="경력 삭제">×</button>
  `;
  row.querySelector("input").value = value;
  return row;
}

function bindCareerInputs({ form, list, previewList, initialValues = [] }) {
  if (!form || !list) return;

  const sync = () => renderCareerPreview(previewList, careerValuesFrom(list));
  const setValues = (values = []) => {
    const nextValues = values.length ? values : [""];
    list.innerHTML = "";
    nextValues.forEach((value) => list.append(createCareerRow(value)));
    sync();
  };

  form.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-career-add]");
    if (addButton && addButton.dataset.careerAdd === `#${list.id}`) {
      list.append(createCareerRow());
      list.querySelector(".career-input-row:last-child input")?.focus();
      sync();
      return;
    }

    const removeButton = event.target.closest("[data-career-remove]");
    if (removeButton && list.contains(removeButton)) {
      removeButton.closest(".career-input-row")?.remove();
      if (!list.children.length) list.append(createCareerRow());
      sync();
    }
  });

  list.addEventListener("input", sync);
  setValues(initialValues);

  return { sync, setValues, values: () => careerValuesFrom(list) };
}

function actorOptionLabel(actor = {}) {
  return `${actor.name || actor.id}${actor.nameEn ? ` / ${actor.nameEn}` : ""}`;
}

async function populateActorSelect() {
  const select = document.getElementById("actor-select");
  const actorName = document.getElementById("actor-name");
  if (!select || !actorName) return;

  try {
    const actors = await loadActors();
    const user = await authReady;
    const visibleActors = !user ? [] : user.role === "actor" ? actors.filter((actor) => actor.id === user.actorId) : actors;
    select.innerHTML = `<option value="">Select actor</option>${visibleActors
      .map((actor) => `<option value="${actor.id}" data-name="${actor.name}">${actorOptionLabel(actor)}</option>`)
      .join("")}`;
    if (!user) select.disabled = true;
    if (user?.role === "actor" && visibleActors[0]) {
      select.value = visibleActors[0].id;
      select.disabled = true;
      actorName.value = visibleActors[0].name || user.name || "";
    }
  } catch (error) {
    select.innerHTML = `<option value="">Failed to load actors</option>`;
    select.disabled = true;
  }

  select.addEventListener("change", () => {
    actorName.value = select.selectedOptions[0]?.dataset.name || "";
  });
}

function bindAudioForm() {
  const form = document.getElementById("audio-form");
  if (!form) return;

  const actorSelect = document.getElementById("actor-select");
  const actorName = document.getElementById("actor-name");
  const audioKindOptions = form.querySelectorAll('input[name="audio_kind"]');
  const sampleTitleInput = document.getElementById("sample-title");
  const categorySection = document.getElementById("audio-category-section");
  const representativeTagsField = document.getElementById("representative-tags-field");
  const fileInput = document.getElementById("audio-file");
  const fileName = document.getElementById("file-name");
  const result = document.getElementById("audio-result");
  const button = form.querySelector(".primary-button");
  const limitMessages = {
    gender: "성별은 1개만 선택할 수 있습니다.",
    ageRange: "나이대는 최대 2개까지 선택할 수 있습니다.",
    tone: "톤은 최대 3개까지 선택할 수 있습니다.",
    texture: "음색은 1개만 선택할 수 있습니다.",
    emotion: "감정은 최대 3개까지 선택할 수 있습니다.",
    language: "언어는 1개만 선택할 수 있습니다.",
    accent: "억양/사투리는 1개만 선택할 수 있습니다.",
    characterType: "캐릭터 타입은 최대 2개까지 선택할 수 있습니다.",
  };

  const syncAudioKind = () => {
    const selectedAudioKind = form.querySelector('input[name="audio_kind"]:checked')?.value || "sample";
    const isIntro = selectedAudioKind === "intro";
    if (sampleTitleInput) {
      sampleTitleInput.readOnly = isIntro;
      if (isIntro) sampleTitleInput.value = "\uc790\uae30\uc18c\uac1c";
      else if (sampleTitleInput.value === "\uc790\uae30\uc18c\uac1c") sampleTitleInput.value = "";
    }
    if (categorySection) categorySection.hidden = isIntro;
    categorySection?.querySelectorAll("input").forEach((input) => {
      input.disabled = isIntro;
      if (isIntro) input.checked = false;
    });
    if (representativeTagsField) representativeTagsField.hidden = isIntro;
    representativeTagsField?.querySelectorAll("input").forEach((input) => {
      input.disabled = isIntro;
      if (isIntro) input.value = "";
    });
  };

  audioKindOptions.forEach((input) => {
    input.addEventListener("change", syncAudioKind);
  });
  syncAudioKind();

  form.addEventListener("change", (event) => {
    const input = event.target;
    if (!input.matches('#audio-category-grid input[type="checkbox"]')) return;
    if (!enforceCategorySelectionLimit(input)) {
      showInlineResult(result, limitMessages[input.name] || "선택 가능한 개수를 초과했습니다.");
    }
  });

  fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0]?.name || "파일 선택";
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      fileName.textContent = "파일 선택";
      result.hidden = true;
      actorName.value = "";
      syncAudioKind();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = fileInput.files[0];
    if (!file || !actorSelect.value) return;

    const selectedActorName = actorSelect.selectedOptions[0]?.dataset.name || "";
    actorName.value = selectedActorName;
    button.disabled = true;
    button.textContent = "업로드 중";

    const data = new FormData(form);
    const actorId = data.get("actor_id");
    const isIntro = data.get("audio_kind") === "intro";
    const sampleTitle = isIntro ? "\uc790\uae30\uc18c\uac1c" : data.get("sample_title");
    const sampleId = `${slugify(actorId, "actor")}-${slugify(sampleTitle, "sample")}`;
    const ext = mimeExtensions[file.type] || file.name.split(".").pop() || "mp3";
    const r2Key = `audio/${slugify(actorId, "actor")}/${sampleId}.${ext}`;
    const representativeTags = [...form.querySelectorAll('input[name="representative_tag"]')]
      .map((input) => input.value.trim().replace(/^#+/, ""))
      .filter(Boolean)
      .slice(0, 4);

    data.set("actor_name", selectedActorName);
    data.set("sample_title", sampleTitle);
    data.set("sample_id", sampleId);
    data.set("r2_key", r2Key);
    data.set("categories_json", JSON.stringify(isIntro ? {} : collectCategoryValues(form)));
    data.set("representative_tags_json", JSON.stringify(isIntro ? [] : representativeTags));

    try {
      const response = await fetch("/api/upload-audio", { method: "POST", headers: authHeaders(), body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Upload failed");
      showResult(result, {
        message: "업로드 완료",
        actor: selectedActorName,
        sampleTitle,
        r2Url: payload.r2Url,
        r2Key: payload.r2Key,
        metadataKey: payload.metadataKey,
      });
    } catch (error) {
      showResult(result, { error: error.message });
    } finally {
      button.disabled = false;
      button.textContent = "\uc624\ub514\uc624 \uc0d8\ud50c \uc5c5\ub85c\ub4dc";
    }
  });
}

function bindProfileForm() {
  const form = document.getElementById("profile-form");
  if (!form) return;

  const result = document.getElementById("profile-result");
  const button = form.querySelector(".primary-button");
  const previewPanel = document.getElementById("profile-preview-panel");
  const previewPhoto = document.getElementById("profile-preview-photo");
  const previewName = document.getElementById("profile-preview-name");
  const previewNameEn = document.getElementById("profile-preview-name-en");
  const previewBio = document.getElementById("profile-preview-bio");
  const previewCapabilities = document.getElementById("profile-preview-capabilities");
  const previewCareerList = document.getElementById("profile-preview-career-list");
  const imageInput = document.getElementById("profile-image");
  const careerList = document.getElementById("profile-career-list");
  const careerController = bindCareerInputs({ form, list: careerList, previewList: previewCareerList });
  let previewImageUrl = "";

  const renderPreview = () => {
    const data = new FormData(form);
    previewName.textContent = data.get("name") || "감자";
    previewNameEn.textContent = data.get("name_en") || "GAMZA";
    previewBio.textContent = data.get("bio") || "소개글을 입력하면 여기에 표시됩니다.";
    previewCapabilities.textContent = formatCapabilitiesPreview(data.get("capabilities"));
    careerController?.sync();
    fitTextToParent(previewName, { max: 58, min: 22 });
    fitTextToParent(previewNameEn, { max: 25, min: 12 });
  };

  imageInput?.addEventListener("change", () => {
    const file = imageInput.files?.[0];
    if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    previewImageUrl = file ? URL.createObjectURL(file) : "";
    previewPhoto.innerHTML = previewImageUrl ? `<img src="${previewImageUrl}" alt="" />` : "PROFILE IMAGE";
    renderPreview();
  });

  form.addEventListener("input", renderPreview);
  renderPreview();

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
      previewImageUrl = "";
      previewPhoto.textContent = "PROFILE IMAGE";
      result.hidden = true;
      careerController?.setValues([]);
      renderPreview();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "제출 중";

    const data = new FormData(form);
    data.set("actor_id", slugify(data.get("name"), "actor"));
    data.set("career_json", JSON.stringify(careerController?.values() || []));

    try {
      await setCompressedProfileImage(data, imageInput);
      const response = await fetch("/api/submit-profile", { method: "POST", headers: authHeaders(), body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Submit failed");
      showResult(result, {
        message: "프로필 추가 완료",
        profileId: payload.profileId,
        metadataKey: payload.metadataKey,
        profileImageUrl: payload.profileImageUrl,
      });
    } catch (error) {
      showResult(result, { error: error.message });
    } finally {
      button.disabled = false;
      button.textContent = "프로필 제출";
    }
  });
}

function bindUnifiedProfileForm() {
  const form = document.getElementById("profile-form");
  if (!form) return;

  const result = document.getElementById("profile-result");
  const button = form.querySelector(".primary-button");
  const previewPhoto = document.getElementById("profile-preview-photo");
  const previewName = document.getElementById("profile-preview-name");
  const previewNameEn = document.getElementById("profile-preview-name-en");
  const previewBio = document.getElementById("profile-preview-bio");
  const previewCapabilities = document.getElementById("profile-preview-capabilities");
  const previewCareerList = document.getElementById("profile-preview-career-list");
  const imageInput = document.getElementById("profile-image");
  const careerList = document.getElementById("profile-career-list");
  const careerController = bindCareerInputs({ form, list: careerList, previewList: previewCareerList });
  const fields = {
    name: document.getElementById("profile-name"),
    nameEn: document.getElementById("profile-name-en"),
    bio: document.getElementById("profile-bio"),
    capabilities: document.getElementById("profile-capabilities"),
  };
  const state = { user: null, currentActor: null, mode: "create", previewImageUrl: "" };

  const setPreviewImage = (url = "") => {
    previewPhoto.innerHTML = url ? `<img src="${url}" alt="" />` : "PROFILE IMAGE";
  };

  const setMode = (actor = null) => {
    state.currentActor = actor;
    state.mode = actor?.id ? "update" : "create";
    button.textContent = state.mode === "update" ? "수정하기" : "프로필 생성하기";
  };

  const renderPreview = () => {
    const data = new FormData(form);
    previewName.textContent = data.get("name") || "감자";
    previewNameEn.textContent = data.get("name_en") || "GAMZA";
    previewBio.textContent = data.get("bio") || "소개글을 입력하면 여기에 표시됩니다.";
    previewCapabilities.textContent = formatCapabilitiesPreview(data.get("capabilities"));
    careerController?.sync();
    fitTextToParent(previewName, { max: 58, min: 22 });
    fitTextToParent(previewNameEn, { max: 25, min: 12 });
  };

  const fillForm = (actor = null) => {
    if (state.previewImageUrl) URL.revokeObjectURL(state.previewImageUrl);
    state.previewImageUrl = "";
    imageInput.value = "";
    fields.name.value = actor?.name || "";
    fields.nameEn.value = actor?.nameEn || "";
    fields.bio.value = actor?.bio || "";
    fields.capabilities.value = actor?.capabilities || "";
    careerController?.setValues(getCareerItems(actor));
    setPreviewImage(profileImageFromActor(actor));
    result.hidden = true;
    setMode(actor);
    renderPreview();
  };

  imageInput?.addEventListener("change", () => {
    const file = imageInput.files?.[0];
    if (state.previewImageUrl) URL.revokeObjectURL(state.previewImageUrl);
    state.previewImageUrl = file ? URL.createObjectURL(file) : "";
    setPreviewImage(state.previewImageUrl || profileImageFromActor(state.currentActor));
    renderPreview();
  });

  form.addEventListener("input", renderPreview);
  form.addEventListener("reset", () => {
    window.setTimeout(() => fillForm(state.currentActor));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = state.mode === "update" ? "수정 요청 중..." : "생성 중...";

    const data = new FormData(form);
    const actorId = state.currentActor?.id || (state.user?.role === "actor" ? state.user.actorId : slugify(data.get("name"), "actor"));
    data.set("actor_id", actorId);
    data.set("career_json", JSON.stringify(careerController?.values() || []));
    if (state.currentActor) data.set("existing_profile_image", profileImageFromActor(state.currentActor));

    try {
      await setCompressedProfileImage(data, imageInput);
      const endpoint = state.mode === "update" ? "/api/update-profile" : "/api/submit-profile";
      const response = await fetch(endpoint, { method: "POST", headers: authHeaders(), body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Submit failed");
      showResult(
        result,
        state.mode === "update"
          ? {
              message: "프로필 수정 승인 요청 완료",
              actorId: payload.requestedActor?.id || actorId,
              metadataKey: payload.metadataKey,
              approvalRequired: true,
            }
          : {
              message: "프로필 생성 완료",
              profileId: payload.profileId,
              metadataKey: payload.metadataKey,
              profileImageUrl: payload.profileImageUrl,
            },
      );
    } catch (error) {
      showResult(result, { error: error.message });
    } finally {
      button.disabled = false;
      button.textContent = state.mode === "update" ? "수정하기" : "프로필 생성하기";
    }
  });

  Promise.all([authReady, loadActors()])
    .then(([user, actors]) => {
      state.user = user;
      fillForm(actorForUser(actors, user));
    })
    .catch(() => {
      setMode(null);
      renderPreview();
    });
}

async function populateProfileEditSelect(state) {
  const select = document.getElementById("edit-actor-select");
  if (!select) return;

  try {
    state.actors = await loadActors();
    const user = await authReady;
    const visibleActors = !user ? [] : user.role === "actor" ? state.actors.filter((actor) => actor.id === user.actorId) : state.actors;
    select.innerHTML = `<option value="">수정할 성우를 선택하세요</option>${visibleActors
      .map((actor) => `<option value="${actor.id}">${actorOptionLabel(actor)}</option>`)
      .join("")}`;
    if (!user) select.disabled = true;
    if (user?.role === "actor" && visibleActors[0]) {
      select.value = visibleActors[0].id;
      select.disabled = true;
    }
  } catch (error) {
    select.innerHTML = `<option value="">성우 목록 로드 실패</option>`;
    select.disabled = true;
  }
}

function bindProfileEditForm() {
  const form = document.getElementById("profile-edit-form");
  if (!form) return;

  const state = { actors: [], currentActor: null, previewImageUrl: "" };
  const select = document.getElementById("edit-actor-select");
  const result = document.getElementById("profile-edit-result");
  const button = form.querySelector(".primary-button");
  const imageInput = document.getElementById("edit-profile-image");
  const fields = {
    name: document.getElementById("edit-profile-name"),
    nameEn: document.getElementById("edit-profile-name-en"),
    bio: document.getElementById("edit-profile-bio"),
    capabilities: document.getElementById("edit-profile-capabilities"),
  };
  const preview = {
    photo: document.getElementById("profile-edit-preview-photo"),
    name: document.getElementById("profile-edit-preview-name"),
    nameEn: document.getElementById("profile-edit-preview-name-en"),
    bio: document.getElementById("profile-edit-preview-bio"),
    capabilities: document.getElementById("profile-edit-preview-capabilities"),
    careerList: document.getElementById("profile-edit-preview-career-list"),
  };
  const careerList = document.getElementById("edit-profile-career-list");
  const careerController = bindCareerInputs({ form, list: careerList, previewList: preview.careerList });

  const setPreviewImage = (url = "") => {
    preview.photo.innerHTML = url ? `<img src="${url}" alt="" />` : "PROFILE IMAGE";
  };

  const renderPreview = () => {
    preview.name.textContent = fields.name.value || "감자";
    preview.nameEn.textContent = fields.nameEn.value || "GAMZA";
    preview.bio.textContent = fields.bio.value || "소개글을 입력하면 여기에 표시됩니다.";
    preview.capabilities.textContent = formatCapabilitiesPreview(fields.capabilities.value);
    careerController?.sync();
    fitTextToParent(preview.name, { max: 58, min: 22 });
    fitTextToParent(preview.nameEn, { max: 25, min: 12 });
  };

  const fillForm = (actor) => {
    state.currentActor = actor || null;
    if (state.previewImageUrl) URL.revokeObjectURL(state.previewImageUrl);
    state.previewImageUrl = "";
    imageInput.value = "";
    fields.name.value = actor?.name || "";
    fields.nameEn.value = actor?.nameEn || "";
    fields.bio.value = actor?.bio || "";
    fields.capabilities.value = actor?.capabilities || "";
    careerController?.setValues(getCareerItems(actor));
    setPreviewImage(profileImageFromActor(actor));
    result.hidden = true;
    renderPreview();
  };

  select.addEventListener("change", () => {
    fillForm(state.actors.find((actor) => actor.id === select.value));
  });

  imageInput.addEventListener("change", () => {
    const file = imageInput.files?.[0];
    if (state.previewImageUrl) URL.revokeObjectURL(state.previewImageUrl);
    state.previewImageUrl = file ? URL.createObjectURL(file) : "";
    setPreviewImage(state.previewImageUrl || profileImageFromActor(state.currentActor));
    renderPreview();
  });

  form.addEventListener("input", renderPreview);
  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      if (state.currentActor) select.value = state.currentActor.id;
      fillForm(state.currentActor);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!select.value) return;

    button.disabled = true;
    button.textContent = "저장 중";

    const data = new FormData(form);
    data.set("actor_id", select.value);
    data.set("existing_profile_image", profileImageFromActor(state.currentActor));
    data.set("career_json", JSON.stringify(careerController?.values() || []));

    try {
      await setCompressedProfileImage(data, imageInput);
      const response = await fetch("/api/update-profile", { method: "POST", headers: authHeaders(), body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Update failed");
      const requestedActor = payload.requestedActor || payload.actor;
      showResult(result, {
        message: "프로필 수정 승인 요청 완료",
        actorId: requestedActor.id,
        metadataKey: payload.metadataKey,
        approvalRequired: true,
        profileImage: requestedActor.profileImage,
      });
    } catch (error) {
      showResult(result, {
        error: error.message,
        note: "로컬 서버에서는 Cloudflare Pages Function이 없어서 저장이 실패할 수 있습니다. 배포 환경에서는 R2 CMS에 저장됩니다.",
      });
    } finally {
      button.disabled = false;
      button.textContent = "프로필 수정 저장";
    }
  });

  populateProfileEditSelect(state).then(() => {
    const user = cachedAuthUser();
    const actor = user?.role === "actor" ? state.actors.find((item) => item.id === user.actorId) : null;
    if (actor) {
      select.value = actor.id;
      fillForm(actor);
    } else {
      select.value = "";
      fillForm(null);
    }
  });
}

function bindPreviewJumpButtons() {
  document.querySelectorAll("[data-preview-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.previewJump);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

renderCategoryGrid("audio-category-grid", "audio");
populateActorSelect();
bindPreviewJumpButtons();
bindAudioForm();
bindUnifiedProfileForm();
bindProfileEditForm();
