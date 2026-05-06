const actors = [
  {
    id: "haru",
    name: "유레이",
    nameEn: "KIM HARU",
    gender: "female",
    tone: "clear",
    style: "twenties",
    category: "animation",
    mood: "bright",
    colors: ["#ffc857", "#3bb7a3"],
    audioSources: [{ src: "assets/gamza_sample.wav", type: "audio/wav" }],
    bio: "맑고 선명한 발성에 밝은 에너지가 강점입니다. 애니메이션, 게임 캐릭터, 브랜드 캠페인 샘플에 잘 어울립니다.",
    tags: ["밝음", "청량", "애니메이션", "20대"],
    demos: ["캐릭터 - 활발", "광고 - 산뜻", "게임 - 주인공"],
  },
  {
    id: "min",
    name: "이도윤",
    nameEn: "LEE DOYUN",
    gender: "male",
    tone: "deep",
    style: "thirties",
    category: "narration",
    mood: "serious",
    colors: ["#5b6c7d", "#b7c9d6"],
    bio: "차분하고 깊은 톤으로 정보 전달력이 좋습니다. 다큐멘터리, 기업 영상, 시네마틱 내레이션에 적합합니다.",
    tags: ["저음", "신뢰감", "내레이션", "30대"],
    demos: ["내레이션 - 다큐", "광고 - 프리미엄", "게임 - 지휘관"],
  },
  {
    id: "yuna",
    name: "박유나",
    nameEn: "PARK YUNA",
    gender: "female",
    tone: "warm",
    style: "thirties",
    category: "commercial",
    mood: "calm",
    colors: ["#ef6f61", "#f7c59f"],
    bio: "따뜻하고 자연스러운 말맛을 살립니다. 라이프스타일 광고, 오디오북, 안내 음성에 잘 맞습니다.",
    tags: ["따뜻함", "친근", "광고", "30대"],
    demos: ["광고 - 라이프", "안내 - 친절", "오디오북 - 감성"],
  },
  {
    id: "jin",
    name: "최서진",
    nameEn: "CHOI SEOJIN",
    gender: "male",
    tone: "bright",
    style: "teen",
    category: "game",
    mood: "energetic",
    colors: ["#36a7ff", "#ffd26a"],
    bio: "반응이 빠르고 캐릭터 변주 폭이 넓습니다. 게임, 숏폼 콘텐츠, 하이텐션 광고에 어울립니다.",
    tags: ["활기", "소년", "게임", "10대"],
    demos: ["게임 - 소년", "광고 - 텐션", "애니 - 코미디"],
  },
  {
    id: "sua",
    name: "정수아",
    nameEn: "JUNG SUA",
    gender: "female",
    tone: "clear",
    style: "forties",
    category: "narration",
    mood: "serious",
    colors: ["#8e7cc3", "#bfd7ea"],
    bio: "정돈된 딕션과 안정적인 호흡으로 긴 문장도 편안하게 이끕니다. 교육, 기관, 브랜드 필름에 적합합니다.",
    tags: ["정확", "우아", "교육", "40대+"],
    demos: ["교육 - 설명", "기관 - 안내", "브랜드 - 담백"],
  },
  {
    id: "rion",
    name: "한리온",
    nameEn: "HAN RION",
    gender: "male",
    tone: "warm",
    style: "twenties",
    category: "animation",
    mood: "cute",
    colors: ["#1d8f75", "#f6d365"],
    bio: "부드러운 미성과 귀여운 캐릭터 톤이 장점입니다. 애니메이션, 게임 NPC, 캐주얼 광고에 잘 어울립니다.",
    tags: ["미성", "귀여움", "캐릭터", "20대"],
    demos: ["애니 - 소년", "게임 - NPC", "광고 - 캐주얼"],
  },
  {
    id: "yujin",
    name: "정유진",
    nameEn: "PARK YUNA",
    gender: "female",
    tone: "warm",
    style: "thirties",
    category: "commercial",
    mood: "calm",
    colors: ["#ef6f61", "#f7c59f"],
    bio: "따뜻하고 자연스러운 말맛을 살립니다. 라이프스타일 광고, 오디오북, 안내 음성에 잘 맞습니다.",
    tags: ["따뜻함", "친근", "광고", "30대"],
    demos: ["광고 - 라이프", "안내 - 친절", "오디오북 - 감성"],
  },
];

const sampleAudioSources = [
  { src: "assets/sample_audio.mp3", type: "audio/mpeg" },
  { src: "assets/sample_audio_light.wav", type: "audio/wav" },
  { src: "assets/sample_audio.m4a", type: "audio/mp4" },
];

const filterGroups = [
  {
    key: "ageRange",
    label: "나이대",
    hint: "Age Range",
    options: ["나이 불명 (괴물이나 크리쳐의 경우)", "10대 미만", "10대", "20대", "30대", "40대", "50대", "노년(60대 이상)"],
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
      "도도한",
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
      "냉정한",
      "강한",
      "카리스마",
      "위엄 있는",
      "섹시한",
      "몽환적인",
      "맑은",
      "또렷한",
      "거친",
      "빠른",
      "느린",
      "담백한",
      "담담한",
      "감성적인",
      "아나운서",
      "상담원",
      "교관/강사",
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
      "무감정/중립",
      "행복",
      "기쁨",
      "설렘",
      "기대",
      "자신감",
      "뿌듯함",
      "감동",
      "따뜻함",
      "위로",
      "사랑스러움",
      "친절함",
      "공손함",
      "진지함",
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
      "눈물/오열",
      "체념",
      "절망",
      "후회",
      "지침/피곤",
      "아픔/고통",
      "비명",
      "흥분",
      "광기",
      "의심",
      "조급함",
      "무서운",
      "음흉함",
      "협박",
      "명령",
      "간절함",
      "간청",
      "애원",
      "비꼼",
      "장난",
      "쑥스러움",
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
    options: [
      "표준어",
      "서울말",
      "부산/경상도",
      "대구 억양",
      "전라도",
      "충청도",
      "강원도",
      "제주도",
      "북한 억양(평양톤)",
      "외국인 억양(한국어)",
    ],
  },
  {
    key: "characterType",
    label: "캐릭터 타입",
    hint: "Character Type",
    options: [
      "히어로",
      "악당",
      "천재 캐릭터",
      "바보/허당 캐릭터",
      "츤데레",
      "냉미남/냉미녀",
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
      "내레이터형 캐릭터",
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

const actorFilterProfiles = {
  haru: {
    ageRange: ["20대"],
    tone: ["밝은", "청량한", "귀여운", "활기찬", "하이텐션", "맑은", "또렷한"],
    texture: ["고음"],
    emotion: ["행복", "기쁨", "설렘", "기대", "사랑스러움", "장난", "쑥스러움"],
    language: ["한국어", "일본어"],
    accent: ["표준어", "서울말"],
    characterType: ["학생", "아이돌", "공주", "마스코트 캐릭터", "다정한 캐릭터"],
  },
  min: {
    ageRange: ["30대", "40대"],
    tone: ["차분한", "진지한", "무게감 있는", "고급스러운", "신뢰감 있는", "담백한", "담담한"],
    texture: ["중저음", "저음"],
    emotion: ["무감정/중립", "진지함", "자신감", "냉정한", "명령"],
    language: ["한국어", "영어"],
    accent: ["표준어", "서울말"],
    characterType: ["내레이터형 캐릭터", "엄격한 상사", "선생님/교관", "왕/여왕", "귀족"],
  },
  yuna: {
    ageRange: ["30대"],
    tone: ["따뜻한", "부드러운", "친근한", "신뢰감 있는", "감성적인", "상담원"],
    texture: ["중저음"],
    emotion: ["따뜻함", "위로", "친절함", "공손함", "감동", "사랑스러움"],
    language: ["한국어", "영어"],
    accent: ["표준어", "서울말"],
    characterType: ["엄마", "의사/간호사", "상담원", "다정한 캐릭터", "내레이터형 캐릭터"],
  },
  jin: {
    ageRange: ["10대", "20대"],
    tone: ["밝은", "활기찬", "하이텐션", "장난스러운", "빠른", "강한"],
    texture: ["고음", "중저음"],
    emotion: ["흥분", "자신감", "기쁨", "장난", "놀람", "조급함"],
    language: ["한국어", "일본어"],
    accent: ["표준어", "서울말", "부산/경상도"],
    characterType: ["히어로", "학생", "아이돌", "기사/전사", "바보/허당 캐릭터"],
  },
  sua: {
    ageRange: ["40대", "50대"],
    tone: ["또렷한", "진지한", "신뢰감 있는", "고급스러운", "아나운서", "교관/강사"],
    texture: ["중저음"],
    emotion: ["무감정/중립", "진지함", "공손함", "자신감", "명령"],
    language: ["한국어", "영어"],
    accent: ["표준어", "서울말"],
    characterType: ["선생님/교관", "엄격한 상사", "내레이터형 캐릭터", "왕/여왕", "의사/간호사"],
  },
  rion: {
    ageRange: ["10대", "20대"],
    tone: ["부드러운", "귀여운", "장난스러운", "친근한", "몽환적인", "로우텐션"],
    texture: ["고음", "중저음"],
    emotion: ["사랑스러움", "쑥스러움", "장난", "설렘", "위로"],
    language: ["한국어", "일본어"],
    accent: ["표준어", "서울말"],
    characterType: ["마스코트 캐릭터", "동물 캐릭터", "학생", "AI 비서", "아기 캐릭터"],
  },
  yujin: {
    ageRange: ["30대"],
    tone: ["따뜻한", "부드러운", "감성적인", "친근한", "상담원", "방송 진행"],
    texture: ["중저음"],
    emotion: ["따뜻함", "위로", "친절함", "공손함", "감동", "슬픔"],
    language: ["한국어", "중국어"],
    accent: ["표준어", "서울말", "충청도"],
    characterType: ["엄마", "다정한 캐릭터", "내레이터형 캐릭터", "의사/간호사", "MC"],
  },
};

let activePlayer = null;

const sampleGrid = document.querySelector("#sample-grid");
const actorGrid = document.querySelector("#actor-grid");
const actorDetail = document.querySelector("#actor-detail");
const homePage = document.querySelector("#home");
const appPages = [...document.querySelectorAll(".app-page")];
const detailAvatar = document.querySelector("#detail-avatar");
const detailName = document.querySelector("#detail-name");
const detailNameEn = document.querySelector("#detail-name-en");
const detailBio = document.querySelector("#detail-bio");
const detailTags = document.querySelector("#detail-tags");
const demoGrid = document.querySelector("#demo-grid");
const filterForm = document.querySelector(".sample-filter");
const filterControls = document.querySelector("#filter-controls");
const sampleEmpty = document.querySelector("#sample-empty");
const statusEl = document.querySelector("#form-status");
const navLinks = [...document.querySelectorAll(".nav-link")];

document
  .querySelectorAll(
    ".section-title-row, .page-heading, .sample-filter, .sample-empty, .info-content, .actor-card, .sample-card, .demo-card, .contact-form",
  )
  .forEach((element) => element.classList.add("reveal"));

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function audioMarkup(label, sourcesList = sampleAudioSources) {
  const sources = sourcesList
    .map((source) => `<source src="${source.src}" type="${source.type}" />`)
    .join("");

  return `
    <div class="sample-player">
      <audio preload="metadata">${sources}</audio>
      <button class="play-button" type="button" aria-label="${label} 재생">▶</button>
      <div class="wave" aria-hidden="true"><span></span></div>
      <small class="time-left">0:00</small>
      <label class="volume-control" aria-label="${label} 볼륨">
        <span>VOL</span>
        <input type="range" min="0" max="1" step="0.01" value="0.85" />
      </label>
    </div>
  `;
}

function renderSamples(list = actors) {
  sampleEmpty.hidden = true;
  sampleGrid.innerHTML = list
    .map(
      (actor) => `
        <article class="sample-card">
          <div>
            <img class="avatar" src="assets/sample_profile-optimized.webp" alt="${actor.name} 프로필 사진" />
            <p class="sample-card-meta">
              <strong>${actor.name}</strong>
              <span>${actor.nameEn}</span>
            </p>
            ${audioMarkup(`${actor.name} 샘플`, actor.audioSources)}
            <button class="profile-link-button" type="button" data-actor="${actor.id}">프로필 보기</button>
          </div>
        </article>
      `,
    )
    .join("");
  document.querySelectorAll(".sample-card").forEach((element) => element.classList.add("reveal"));
  setupAudioPlayers(sampleGrid);
  observeReveals();
}

function renderActors() {
  actorGrid.innerHTML = actors
    .map(
      (actor) => `
        <button class="actor-card" type="button" data-actor="${actor.id}">
          <span class="actor-photo">
            <img src="assets/sample_profile-optimized.webp" alt="${actor.name} 프로필 사진" />
          </span>
          <span class="actor-card-info">
            <strong>${actor.name}</strong>
            <span>${actor.nameEn}</span>
          </span>
        </button>
      `,
    )
    .join("");
  document.querySelectorAll(".actor-card").forEach((element) => element.classList.add("reveal"));
  observeReveals();
}

function openActor(actorId) {
  stopActivePlayer();
  const actor = actors.find((item) => item.id === actorId) || actors[0];
  homePage.hidden = true;
  appPages.forEach((page) => {
    page.hidden = true;
  });
  detailAvatar.innerHTML = `<img src="assets/sample_profile-optimized.webp" alt="${actor.name} 프로필 사진" />`;
  detailName.textContent = actor.name;
  detailNameEn.textContent = actor.nameEn;
  detailBio.textContent = actor.bio;
  detailTags.textContent = `추천 감정 · ${actor.tags.join(" · ")}`;
  demoGrid.innerHTML = actor.demos
    .map(
      (demo) => `
        <div class="demo-card">
          <strong>${demo}</strong>
          ${audioMarkup(demo, actor.audioSources)}
        </div>
      `,
    )
    .join("");
  document.querySelectorAll(".demo-card").forEach((element) => element.classList.add("reveal"));
  setupAudioPlayers(demoGrid);
  observeReveals();
  actorDetail.hidden = false;
  document.querySelector("#actors").hidden = true;
  setActiveNav("#actors");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getActorFilterValues(actor) {
  if (actorFilterProfiles[actor.id]) return actorFilterProfiles[actor.id];

  const toneMap = {
    bright: ["밝은", "활기찬", "청량한"],
    calm: ["차분한", "담담한"],
    clear: ["맑은", "또렷한", "청량한"],
    cute: ["귀여운", "장난스러운"],
    deep: ["무게감 있는", "진지한", "신뢰감 있는"],
    energetic: ["활기찬", "하이텐션"],
    serious: ["진지한", "담백한"],
    warm: ["따뜻한", "부드러운", "친근한"],
  };
  const ageMap = {
    teen: ["10대"],
    twenties: ["20대"],
    thirties: ["30대"],
    forties: ["40대"],
  };
  const categoryMap = {
    animation: ["학생", "마스코트 캐릭터", "다정한 캐릭터"],
    commercial: ["아나운서", "상담원", "방송 진행"],
    game: ["히어로", "학생", "기사/전사"],
    narration: ["내레이터형 캐릭터", "아나운서", "교관/강사"],
  };

  return {
    ageRange: ageMap[actor.style] || [],
    tone: [...(toneMap[actor.tone] || []), ...(toneMap[actor.mood] || [])],
    texture: actor.gender === "male" ? ["중저음", "저음"] : ["고음"],
    emotion: toneMap[actor.mood] || [],
    language: ["한국어"],
    accent: ["표준어", "서울말"],
    characterType: categoryMap[actor.category] || [],
  };
}

function selectedFilterValues() {
  return filterGroups.reduce((selected, group) => {
    selected[group.key] = [
      ...filterControls.querySelectorAll(`input[name="${group.key}"]:checked`),
    ].map((input) => input.value);
    return selected;
  }, {});
}

function updateFilterSummary(groupKey) {
  const dropdown = filterControls.querySelector(`[data-filter="${groupKey}"]`);
  if (!dropdown) return;
  const count = dropdown.querySelectorAll(`input[name="${groupKey}"]:checked`).length;
  const countEl = dropdown.querySelector(".filter-count");
  const toggle = dropdown.querySelector(".filter-toggle");

  countEl.textContent = count ? `${count}` : "";
  countEl.hidden = count === 0;
  toggle.classList.toggle("has-selection", count > 0);
}

function closeFilterPanels(exceptDropdown = null) {
  filterControls.querySelectorAll(".filter-dropdown").forEach((dropdown) => {
    if (dropdown === exceptDropdown) return;
    dropdown.classList.remove("is-open");
    dropdown.querySelector(".filter-toggle").setAttribute("aria-expanded", "false");
  });
}

function renderFilterControls() {
  filterControls.innerHTML = filterGroups
    .map(
      (group) => `
        <div class="filter-dropdown" data-filter="${group.key}">
          <button class="filter-toggle" type="button" aria-expanded="false">
            <span>
              <strong>${group.label}</strong>
              <small>${group.hint}</small>
            </span>
            <em class="filter-count" hidden></em>
          </button>
          <div class="filter-panel">
            <div class="filter-panel-head">
              <div>
                <strong>${group.label}</strong>
                <small>${group.options.length}개 옵션</small>
              </div>
              <div class="filter-actions">
                <button type="button" data-action="select-all">모두 선택</button>
                <button type="button" data-action="clear">모두 해제</button>
              </div>
            </div>
            <div class="filter-option-grid">
              ${group.options
                .map(
                  (option) => `
                    <label class="filter-check">
                      <input type="checkbox" name="${group.key}" value="${option}" />
                      <span>${option}</span>
                    </label>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
      `,
    )
    .join("");
}

function filterSamples() {
  const filters = selectedFilterValues();
  const hasFilter = Object.values(filters).some((values) => values.length);
  if (!hasFilter) {
    sampleGrid.innerHTML = "";
    sampleEmpty.hidden = false;
    sampleEmpty.textContent = "카테고리를 하나 이상 선택하고 검색해 주세요.";
    return;
  }

  const filtered = actors.filter((actor) => {
    const actorFilters = getActorFilterValues(actor);
    return Object.entries(filters).every(([key, values]) => {
      if (!values.length) return true;
      return values.some((value) => actorFilters[key]?.includes(value));
    });
  });
  if (!filtered.length) {
    sampleGrid.innerHTML = "";
    sampleEmpty.hidden = false;
    sampleEmpty.textContent = "조건에 맞는 성우 샘플이 아직 없습니다.";
    return;
  }
  renderSamples(filtered);
}

function resetPlayer(player, resetTime = false) {
  const audio = player.querySelector("audio");
  const button = player.querySelector(".play-button");
  const progress = player.querySelector(".wave span");
  const time = player.querySelector(".time-left");

  audio.pause();
  if (resetTime) audio.currentTime = 0;
  button.textContent = "▶";
  if (progress && resetTime) progress.style.width = "0%";
  if (time && audio.duration) time.textContent = formatTime(audio.duration - audio.currentTime);
}

function togglePlayer(player) {
  if (!player) return;
  const audio = player.querySelector("audio");
  const button = player.querySelector(".play-button");

  if (activePlayer && activePlayer !== player) resetPlayer(activePlayer);

  if (audio.paused) {
    activePlayer = player;
    audio
      .play()
      .then(() => {
        button.textContent = "Ⅱ";
      })
      .catch(() => {
        button.textContent = "▶";
      });
  } else {
    resetPlayer(player);
  }
}

function setupAudioPlayers(scope = document) {
  scope.querySelectorAll(".sample-player").forEach((player) => {
    if (player.dataset.audioReady) return;

    const audio = player.querySelector("audio");
    const progress = player.querySelector(".wave span");
    const time = player.querySelector(".time-left");
    const volume = player.querySelector(".volume-control input");

    player.dataset.audioReady = "true";
    audio.volume = Number(volume.value);

    audio.addEventListener("loadedmetadata", () => {
      time.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      const ratio = audio.duration ? audio.currentTime / audio.duration : 0;
      progress.style.width = `${Math.min(ratio * 100, 100)}%`;
      time.textContent = formatTime(audio.duration - audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      if (activePlayer === player) activePlayer = null;
      resetPlayer(player, true);
    });

    volume.addEventListener("input", () => {
      audio.volume = Number(volume.value);
    });
  });
}

document.addEventListener("click", (event) => {
  const filterToggle = event.target.closest(".filter-toggle");
  if (filterToggle) {
    const dropdown = filterToggle.closest(".filter-dropdown");
    const willOpen = !dropdown.classList.contains("is-open");
    closeFilterPanels(dropdown);
    dropdown.classList.toggle("is-open", willOpen);
    filterToggle.setAttribute("aria-expanded", `${willOpen}`);
    return;
  }

  const filterAction = event.target.closest("[data-action]");
  if (filterAction) {
    const dropdown = filterAction.closest(".filter-dropdown");
    const groupKey = dropdown.dataset.filter;
    const checked = filterAction.dataset.action === "select-all";
    dropdown.querySelectorAll(`input[name="${groupKey}"]`).forEach((input) => {
      input.checked = checked;
    });
    updateFilterSummary(groupKey);
    return;
  }

  if (!event.target.closest(".filter-dropdown")) closeFilterPanels();

  const playButton = event.target.closest(".play-button");
  if (playButton) togglePlayer(playButton.closest(".sample-player"));

  const actorButton = event.target.closest("[data-actor]");
  if (actorButton) openActor(actorButton.dataset.actor);
});

filterControls.addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  updateFilterSummary(event.target.name);
});

document.querySelector("#sample-search").addEventListener("click", filterSamples);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    event.preventDefault();
    navigateTo(hash);
  });
});

document.querySelector("#back-to-actors").addEventListener("click", () => {
  homePage.hidden = true;
  appPages.forEach((page) => {
    page.hidden = true;
  });
  actorDetail.hidden = true;
  document.querySelector("#actors").hidden = false;
  setActiveNav("#actors");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector(".submit-button");
  const data = new FormData(form);

  data.append("_subject", `[CHIPS 문의] ${data.get("name")}님 문의`);

  submitButton.disabled = true;
  statusEl.textContent = "문의 내용을 전송하고 있습니다.";

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Formspree request failed");

    form.reset();
    statusEl.textContent = "문의가 접수되었습니다. 확인 후 연락드리겠습니다.";
  } catch (error) {
    statusEl.textContent = "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
  } finally {
    submitButton.disabled = false;
  }
});

function setActiveNav(targetHash) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === targetHash);
  });
}

function navigateTo(hash) {
  stopActivePlayer();
  if (window.location.hash === hash) {
    showRoute();
    return;
  }
  window.location.hash = hash;
}

function stopActivePlayer() {
  if (!activePlayer) return;
  resetPlayer(activePlayer);
  activePlayer = null;
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  { threshold: 0.12 },
);

function observeReveals() {
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

function showRoute() {
  stopActivePlayer();
  const hash = window.location.hash || "#top";
  const isAppPage = ["#news", "#actors", "#services", "#contact"].includes(hash);

  homePage.hidden = isAppPage;
  appPages.forEach((page) => {
    page.hidden = true;
  });

  if (isAppPage) {
    const page = document.querySelector(hash);
    if (page) page.hidden = false;
    actorDetail.hidden = true;
    setActiveNav(hash);
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  setActiveNav("#top");
  if (hash === "#voice-sample") {
    document.querySelector("#voice-sample").scrollIntoView({ behavior: "smooth" });
  } else if (hash === "#info") {
    document.querySelector("#info").scrollIntoView({ behavior: "smooth" });
  } else {
    document.querySelector("#top").scrollIntoView({ behavior: "auto" });
  }
}

renderFilterControls();
renderActors();
sampleGrid.innerHTML = "";
sampleEmpty.hidden = false;
observeReveals();
setupAudioPlayers();
showRoute();
window.addEventListener("hashchange", showRoute);
