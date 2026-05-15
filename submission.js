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
    options: ["중저음", "저음", "고음"],
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

function slugify(value, fallback = "item") {
  const slug = `${value || ""}`
    .trim()
    .toLowerCase()
    .replace(/[\\/]+/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
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
            <small>${group.hint}</small>
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

function collectCategoryValues(form) {
  return chipsCategoryGroups.reduce((values, group) => {
    values[group.key] = [...form.querySelectorAll(`input[name="${group.key}"]:checked`)].map((input) => input.value);
    return values;
  }, {});
}

function showResult(target, value) {
  target.hidden = false;
  target.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
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
  if (!authToken()) return cached;

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

  const status = document.createElement("div");
  status.className = "auth-status";
  status.innerHTML = user
    ? `<span><strong>${user.name || user.username}</strong> 계정으로 로그인 중입니다.${user.role === "actor" ? " 본인 프로필만 수정할 수 있습니다." : " 운영자 권한입니다."}</span><button type="button" data-auth-logout>로그아웃</button>`
    : `<span><strong>로그인이 필요합니다.</strong> 계정 승인 후 프로필 수정과 오디오 업로드를 사용할 수 있습니다.</span><a class="secondary-button button-link" href="login.html">로그인</a>`;
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
  const fileInput = document.getElementById("audio-file");
  const fileName = document.getElementById("file-name");
  const result = document.getElementById("audio-result");
  const button = form.querySelector(".primary-button");

  fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0]?.name || "파일 선택";
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      fileName.textContent = "파일 선택";
      result.hidden = true;
      actorName.value = "";
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
    const sampleTitle = data.get("sample_title");
    const sampleId = `${slugify(actorId, "actor")}-${slugify(sampleTitle, "sample")}`;
    const ext = mimeExtensions[file.type] || file.name.split(".").pop() || "mp3";
    const r2Key = `audio/${slugify(actorId, "actor")}/${sampleId}.${ext}`;

    data.set("actor_name", selectedActorName);
    data.set("sample_id", sampleId);
    data.set("r2_key", r2Key);
    data.set("categories_json", JSON.stringify(collectCategoryValues(form)));

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
      button.textContent = "R2에 업로드";
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
  const imageInput = document.getElementById("profile-image");
  let previewImageUrl = "";

  const renderPreview = () => {
    const data = new FormData(form);
    previewName.textContent = data.get("name") || "감자";
    previewNameEn.textContent = data.get("name_en") || "GAMZA";
    previewBio.textContent = data.get("bio") || "소개글을 입력하면 여기에 표시됩니다.";
    previewCapabilities.textContent = data.get("capabilities") || "작업 가능 조건을 입력하면 여기에 표시됩니다.";
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
      renderPreview();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "제출 중";

    const data = new FormData(form);
    data.set("actor_id", slugify(data.get("name"), "actor"));

    try {
      const response = await fetch("/api/submit-profile", { method: "POST", headers: authHeaders(), body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Submit failed");
      showResult(result, {
        message: "프로필 제출 완료",
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
  };

  const setPreviewImage = (url = "") => {
    preview.photo.innerHTML = url ? `<img src="${url}" alt="" />` : "PROFILE IMAGE";
  };

  const renderPreview = () => {
    preview.name.textContent = fields.name.value || "감자";
    preview.nameEn.textContent = fields.nameEn.value || "GAMZA";
    preview.bio.textContent = fields.bio.value || "소개글을 입력하면 여기에 표시됩니다.";
    preview.capabilities.textContent = fields.capabilities.value || "작업 가능 조건을 입력하면 여기에 표시됩니다.";
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

    try {
      const response = await fetch("/api/update-profile", { method: "POST", headers: authHeaders(), body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Update failed");
      const updatedActor = payload.actor;
      const index = state.actors.findIndex((actor) => actor.id === updatedActor.id);
      if (index >= 0) state.actors[index] = updatedActor;
      fillForm(updatedActor);
      showResult(result, {
        message: "프로필 수정 완료",
        actorId: updatedActor.id,
        cmsKey: payload.cmsKey,
        profileImage: updatedActor.profileImage,
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

renderCategoryGrid("audio-category-grid", "audio");
populateActorSelect();
bindAudioForm();
bindProfileForm();
bindProfileEditForm();
