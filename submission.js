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
      "밝은", "차분한", "따뜻한", "부드러운", "시크한", "진지한", "무게감 있는", "고급스러운",
      "신뢰감 있는", "친근한", "활기찬", "하이텐션", "로우텐션", "청량한", "귀여운", "장난스러운",
      "차가운", "강한", "카리스마", "섹시한", "몽환적인", "맑은", "거친", "빠른", "느린",
      "담백한", "감성적인", "아나운서", "상담원", "강사", "MC", "DJ", "방송 진행",
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
      "무감정", "행복", "기쁨", "설렘", "기대", "자신감", "감동", "따뜻함", "위로", "사랑스러운",
      "친절한", "공손한", "진지한", "긴장", "불안", "공포", "당황", "놀람", "분노", "짜증",
      "경멸", "냉소", "우울", "슬픔", "울음", "체념", "절망", "후회", "지침", "고통",
      "비명", "광기", "의심", "조급함", "무서운", "위협", "명령", "간절한", "부탁", "수줍음",
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
      "히어로", "빌런", "천재 캐릭터", "바보/허당 캐릭터", "츤데레", "차가운 미인", "다정한 캐릭터",
      "엄격한 상사", "선생님/교관", "의사/간호사", "공주", "경찰", "군인", "기사/전사", "마법사",
      "왕/여왕", "귀족", "아이돌", "학생", "엄마", "아빠", "할아버지", "할머니", "아기 캐릭터",
      "로봇", "AI 비서", "나레이터형 캐릭터", "마스코트 캐릭터", "동물 캐릭터", "괴물/크리처",
      "외계인", "유령", "좀비", "신/악마",
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

function bindAudioForm() {
  const form = document.getElementById("audio-form");
  if (!form) return;

  const fileInput = document.getElementById("audio-file");
  const fileName = document.getElementById("file-name");
  const result = document.getElementById("audio-result");
  const button = form.querySelector(".primary-button");

  fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0]?.name || "파일 선택";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = fileInput.files[0];
    if (!file) return;

    button.disabled = true;
    button.textContent = "업로드 중";

    const data = new FormData(form);
    const actorName = data.get("actor_name");
    const actorId = data.get("actor_id") || slugify(actorName, "actor");
    const sampleTitle = data.get("sample_title");
    const sampleId = `${slugify(actorId, "actor")}-${slugify(sampleTitle, "sample")}`;
    const ext = mimeExtensions[file.type] || file.name.split(".").pop() || "mp3";
    const r2Key = `audio/${slugify(actorId, "actor")}/${sampleId}.${ext}`;

    data.set("actor_id", actorId);
    data.set("sample_id", sampleId);
    data.set("r2_key", r2Key);
    data.set("categories_json", JSON.stringify(collectCategoryValues(form)));

    try {
      const response = await fetch("/api/upload-audio", { method: "POST", body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Upload failed");
      showResult(result, {
        message: "업로드 완료",
        sheetRow: payload.sheetRow,
        r2Url: payload.r2Url,
        r2Key: payload.r2Key,
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "제출 중";

    const data = new FormData(form);
    data.set("actor_id", slugify(data.get("name"), "actor"));
    data.set("categories_json", JSON.stringify(collectCategoryValues(form)));

    try {
      const response = await fetch("/api/submit-profile", { method: "POST", body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Submit failed");
      showResult(result, {
        message: "프로필 제출 완료",
        profileId: payload.profileId,
        metadataKey: payload.metadataKey,
      });
    } catch (error) {
      showResult(result, { error: error.message });
    } finally {
      button.disabled = false;
      button.textContent = "프로필 제출";
    }
  });
}

renderCategoryGrid("audio-category-grid", "audio");
renderCategoryGrid("profile-category-grid", "profile");
bindAudioForm();
bindProfileForm();
