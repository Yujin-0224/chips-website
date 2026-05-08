let actors = [
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
    audioSources: [{ src: "assets/gamza_sample.mp3", type: "audio/mpeg" }],
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

let sampleAudioSources = [
  { src: "assets/sample_audio.mp3", type: "audio/mpeg" },
];

const filterGroups = [
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

const filterLocales = {
  ko: {
    ui: { optionSuffix: "개 옵션", selectAll: "모두 선택", clear: "모두 해제" },
    groups: {
      gender: { label: "성별", hint: "Gender", options: ["남자", "여자"] },
      ageRange: {
        label: "나이대",
        hint: "Age Range",
        options: ["나이 불명 (괴물이나 크리쳐의 경우)", "10대 미만", "10대", "20대", "30대", "40대", "50대", "노년(60대 이상)"],
      },
      tone: {
        label: "톤",
        hint: "Tone / Voice Color",
        options: [
          "밝은", "차분한", "따뜻한", "부드러운", "시크한", "도도한", "진지한", "무게감 있는", "고급스러운", "신뢰감 있는",
          "친근한", "활기찬", "하이텐션", "로우텐션", "청량한", "귀여운", "장난스러운", "냉정한", "강한", "카리스마",
          "위엄 있는", "섹시한", "몽환적인", "맑은", "또렷한", "거친", "빠른", "느린", "담백한", "담담한",
          "감성적인", "아나운서", "상담원", "교관/강사", "MC", "DJ", "방송 진행",
        ],
      },
      texture: { label: "음색 특성", hint: "Voice Texture", options: ["중저음", "저음", "고음"] },
      emotion: {
        label: "감정",
        hint: "Emotion",
        options: [
          "무감정/중립", "행복", "기쁨", "설렘", "기대", "자신감", "뿌듯함", "감동", "따뜻함", "위로",
          "사랑스러움", "친절함", "공손함", "진지함", "긴장", "불안", "공포", "당황", "놀람", "분노",
          "짜증", "경멸", "냉소", "우울", "슬픔", "눈물/오열", "체념", "절망", "후회", "지침/피곤",
          "아픔/고통", "비명", "흥분", "광기", "의심", "조급함", "무서운", "음흉함", "협박", "명령",
          "간절함", "간청", "애원", "비꼼", "장난", "쑥스러움",
        ],
      },
      language: { label: "언어", hint: "Language", options: ["한국어", "영어", "일본어", "중국어"] },
      accent: {
        label: "억양/사투리",
        hint: "Accent",
        options: ["표준어", "서울말", "부산/경상도", "대구 억양", "전라도", "충청도", "강원도", "제주도", "외국인 억양(한국어)"],
      },
      characterType: {
        label: "캐릭터 타입",
        hint: "Character Type",
        options: [
          "히어로", "악당", "천재 캐릭터", "바보/허당 캐릭터", "츤데레", "냉미남/냉미녀", "다정한 캐릭터", "엄격한 상사", "선생님/교관", "의사/간호사",
          "공주", "경찰", "군인", "기사/전사", "마법사", "왕/여왕", "귀족", "아이돌", "학생", "엄마",
          "아빠", "할아버지", "할머니", "아기 캐릭터", "로봇", "AI 비서", "내레이터형 캐릭터", "마스코트 캐릭터", "동물 캐릭터", "괴물/크리처",
          "외계인", "유령", "좀비", "신/악마",
        ],
      },
    },
  },
  en: {
    ui: { optionSuffix: " options", selectAll: "Select all", clear: "Clear all" },
    groups: {
      gender: { label: "Gender", hint: "Gender", options: ["Male", "Female"] },
      ageRange: { label: "Age Range", hint: "Age Range", options: ["Unknown age (monster or creature)", "Under 10", "Teens", "20s", "30s", "40s", "50s", "Senior (60+)"] },
      tone: {
        label: "Tone",
        hint: "Tone / Voice Color",
        options: [
          "Bright", "Calm", "Warm", "Soft", "Chic", "Aloof", "Serious", "Weighty", "Luxurious", "Trustworthy",
          "Friendly", "Energetic", "High tension", "Low tension", "Fresh", "Cute", "Playful", "Cold", "Strong", "Charismatic",
          "Dignified", "Sexy", "Dreamy", "Clear", "Crisp", "Rough", "Fast", "Slow", "Plain", "Composed",
          "Emotional", "Announcer", "Counselor", "Instructor", "MC", "DJ", "Broadcast host",
        ],
      },
      texture: { label: "Voice Texture", hint: "Voice Texture", options: ["Mid-low", "Low", "High"] },
      emotion: {
        label: "Emotion",
        hint: "Emotion",
        options: [
          "Neutral", "Happiness", "Joy", "Excitement", "Expectation", "Confidence", "Pride", "Moved", "Warmth", "Comfort",
          "Lovely", "Kindness", "Polite", "Serious", "Tension", "Anxiety", "Fear", "Flustered", "Surprise", "Anger",
          "Irritation", "Contempt", "Cynicism", "Depressed", "Sadness", "Crying", "Resignation", "Despair", "Regret", "Tired",
          "Pain", "Scream", "Excited", "Madness", "Suspicion", "Impatience", "Scary", "Sinister", "Threat", "Command",
          "Desperate", "Pleading", "Begging", "Sarcasm", "Mischief", "Shyness",
        ],
      },
      language: { label: "Language", hint: "Language", options: ["Korean", "English", "Japanese", "Chinese"] },
      accent: { label: "Accent", hint: "Accent", options: ["Standard Korean", "Seoul dialect", "Busan/Gyeongsang", "Daegu accent", "Jeolla dialect", "Chungcheong dialect", "Gangwon dialect", "Jeju dialect", "Foreign accent in Korean"] },
      characterType: {
        label: "Character Type",
        hint: "Character Type",
        options: [
          "Hero", "Villain", "Genius character", "Foolish character", "Tsundere", "Cold beauty", "Kind character", "Strict boss", "Teacher/Instructor", "Doctor/Nurse",
          "Princess", "Police officer", "Soldier", "Knight/Warrior", "Wizard", "King/Queen", "Noble", "Idol", "Student", "Mother",
          "Father", "Grandfather", "Grandmother", "Baby character", "Robot", "AI assistant", "Narrator type", "Mascot character", "Animal character", "Monster/Creature",
          "Alien", "Ghost", "Zombie", "God/Demon",
        ],
      },
    },
  },
  ja: {
    ui: { optionSuffix: "件", selectAll: "すべて選択", clear: "すべて解除" },
    groups: {
      gender: { label: "性別", hint: "Gender", options: ["男性", "女性"] },
      ageRange: { label: "年齢層", hint: "Age Range", options: ["年齢不明（怪物・クリーチャー）", "10歳未満", "10代", "20代", "30代", "40代", "50代", "シニア（60代以上）"] },
      tone: {
        label: "トーン",
        hint: "Tone / Voice Color",
        options: [
          "明るい", "落ち着いた", "温かい", "柔らかい", "シック", "気高い", "真面目", "重厚感のある", "上品", "信頼感のある",
          "親しみやすい", "活発", "ハイテンション", "ローテンション", "爽やか", "かわいい", "いたずらっぽい", "冷静", "強い", "カリスマ性",
          "威厳のある", "セクシー", "幻想的", "澄んだ", "はっきりした", "荒い", "速い", "遅い", "淡泊", "淡々とした",
          "感性的", "アナウンサー", "相談員", "教官/講師", "MC", "DJ", "番組進行",
        ],
      },
      texture: { label: "声質", hint: "Voice Texture", options: ["中低音", "低音", "高音"] },
      emotion: {
        label: "感情",
        hint: "Emotion",
        options: [
          "無感情/ニュートラル", "幸せ", "喜び", "ときめき", "期待", "自信", "誇らしさ", "感動", "温かさ", "慰め",
          "愛らしさ", "親切", "丁寧", "真剣", "緊張", "不安", "恐怖", "戸惑い", "驚き", "怒り",
          "苛立ち", "軽蔑", "皮肉", "憂鬱", "悲しみ", "涙/号泣", "諦め", "絶望", "後悔", "疲れ",
          "痛み/苦痛", "悲鳴", "興奮", "狂気", "疑い", "焦り", "怖い", "陰険", "脅迫", "命令",
          "切実さ", "懇願", "哀願", "皮肉っぽい", "遊び心", "照れ",
        ],
      },
      language: { label: "言語", hint: "Language", options: ["韓国語", "英語", "日本語", "中国語"] },
      accent: { label: "アクセント/方言", hint: "Accent", options: ["標準語", "ソウル方言", "釜山/慶尚道", "大邱アクセント", "全羅道", "忠清道", "江原道", "済州道", "外国人アクセント（韓国語）"] },
      characterType: {
        label: "キャラクタータイプ",
        hint: "Character Type",
        options: [
          "ヒーロー", "悪役", "天才キャラクター", "おバカ/抜けたキャラクター", "ツンデレ", "クール美男/美女", "優しいキャラクター", "厳格な上司", "先生/教官", "医師/看護師",
          "姫", "警察", "軍人", "騎士/戦士", "魔法使い", "王/女王", "貴族", "アイドル", "学生", "母",
          "父", "祖父", "祖母", "赤ちゃんキャラクター", "ロボット", "AI秘書", "ナレーター型", "マスコット", "動物キャラクター", "怪物/クリーチャー",
          "宇宙人", "幽霊", "ゾンビ", "神/悪魔",
        ],
      },
    },
  },
  zh: {
    ui: { optionSuffix: "个选项", selectAll: "全选", clear: "清除全部" },
    groups: {
      gender: { label: "性别", hint: "Gender", options: ["男性", "女性"] },
      ageRange: { label: "年龄段", hint: "Age Range", options: ["年龄不明（怪物或生物）", "10岁以下", "10多岁", "20多岁", "30多岁", "40多岁", "50多岁", "老年（60岁以上）"] },
      tone: {
        label: "音色/语气",
        hint: "Tone / Voice Color",
        options: [
          "明亮", "沉稳", "温暖", "柔和", "时髦", "高冷", "认真", "厚重", "高级", "可信赖",
          "亲切", "有活力", "高能量", "低能量", "清爽", "可爱", "调皮", "冷静", "强势", "有气场",
          "有威严", "性感", "梦幻", "清澈", "清晰", "粗犷", "快速", "缓慢", "朴素", "淡然",
          "感性", "播音员", "客服/咨询员", "教官/讲师", "主持人", "DJ", "节目主持",
        ],
      },
      texture: { label: "声音质感", hint: "Voice Texture", options: ["中低音", "低音", "高音"] },
      emotion: {
        label: "情绪",
        hint: "Emotion",
        options: [
          "无感情/中性", "幸福", "喜悦", "心动", "期待", "自信", "自豪", "感动", "温暖", "安慰",
          "可爱", "亲切", "礼貌", "严肃", "紧张", "不安", "恐惧", "慌张", "惊讶", "愤怒",
          "烦躁", "轻蔑", "冷嘲", "忧郁", "悲伤", "哭泣/痛哭", "认命", "绝望", "后悔", "疲惫",
          "疼痛/痛苦", "尖叫", "兴奋", "疯狂", "怀疑", "急躁", "可怕", "阴险", "威胁", "命令",
          "迫切", "恳求", "哀求", "讽刺", "玩笑", "害羞",
        ],
      },
      language: { label: "语言", hint: "Language", options: ["韩语", "英语", "日语", "中文"] },
      accent: { label: "口音/方言", hint: "Accent", options: ["标准语", "首尔话", "釜山/庆尚道", "大邱口音", "全罗道", "忠清道", "江原道", "济州岛", "外国人口音（韩语）"] },
      characterType: {
        label: "角色类型",
        hint: "Character Type",
        options: [
          "英雄", "反派", "天才角色", "笨蛋/冒失角色", "傲娇", "冷酷帅哥/美女", "温柔角色", "严格上司", "老师/教官", "医生/护士",
          "公主", "警察", "军人", "骑士/战士", "魔法师", "国王/女王", "贵族", "偶像", "学生", "妈妈",
          "爸爸", "爷爷", "奶奶", "婴儿角色", "机器人", "AI助手", "旁白型角色", "吉祥物角色", "动物角色", "怪物/生物",
          "外星人", "幽灵", "僵尸", "神/恶魔",
        ],
      },
    },
  },
};

let activeFilterLocale = "ko";

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

let newsArticles = [
  {
    id: "site-beta",
    title: "CHIPS Voice Portfolio 베타 페이지를 공개했습니다",
    date: "2026.05.06",
    datetime: "2026-05-06",
    categories: ["Notice", "Website"],
    image: "assets/chips-hero-optimized.webp",
    lead: "성우 샘플 검색, 프로필 보기, 문의 접수 기능을 한곳에서 확인할 수 있는 CHIPS의 첫 번째 웹사이트 버전을 공개했습니다.",
    body: [
      "CHIPS Voice Portfolio는 성우 샘플을 더 빠르게 탐색하고, 프로젝트 성격에 맞는 보이스를 직관적으로 비교할 수 있도록 준비한 베타 페이지입니다. 기존에는 성우별 샘플을 개별적으로 확인해야 했다면, 이번 페이지에서는 나이대, 톤, 감정, 언어, 억양, 캐릭터 타입 등 여러 조건으로 샘플을 좁혀볼 수 있습니다.",
      "이번 베타 버전에서는 실제 운영 전에 필요한 기본 흐름을 먼저 점검하는 데 초점을 맞췄습니다. CONTACT 폼은 Basin과 연결해 문의가 바로 접수되도록 구성했고, 성우 카드에서는 음성 미리듣기와 프로필 이동을 분리해 탐색 중 실수로 페이지가 바뀌지 않도록 다듬었습니다.",
      "앞으로는 성우별 프로필 이미지, 데모릴, 장르별 샘플, 캐스팅 상담 안내를 순차적으로 보강할 예정입니다. 특히 게임, 애니메이션, 광고, 내레이션 프로젝트에서 필요한 조건을 빠르게 찾을 수 있도록 검색 카테고리와 샘플 태그를 계속 정리해나가겠습니다.",
    ],
  },
  {
    id: "sample-library",
    title: "캐릭터 보이스 샘플 7종을 테스트 라이브러리에 추가",
    date: "2026.05.04",
    datetime: "2026-05-04",
    categories: ["Sample", "Voice"],
    image: "assets/sample_profile-optimized.webp",
    lead: "밝은 톤, 중저음 내레이션, 감성 광고 등 검색 카테고리별로 확인 가능한 샘플 데이터를 준비했습니다.",
    body: [
      "VOICE SAMPLE 영역에 테스트용 성우 샘플 7종을 추가했습니다. 이번 샘플은 실제 성우 데이터가 준비되기 전 화면 구성과 검색 경험을 확인하기 위한 임시 데이터이며, 각 샘플은 나이대, 톤, 감정, 음색 특성, 캐릭터 타입 등 새 검색 카테고리에 맞춰 태그가 연결되어 있습니다.",
      "테스트 라이브러리는 단순히 목록을 채우기 위한 목적이 아니라, 의뢰자가 원하는 보이스를 어떤 기준으로 찾게 될지 확인하기 위한 기준점입니다. 예를 들어 밝고 청량한 20대 캐릭터, 신뢰감 있는 중저음 내레이션, 따뜻한 상담원 톤처럼 실제 의뢰에서 자주 사용되는 조건을 중심으로 구성했습니다.",
      "이후 실제 성우 샘플이 추가되면 테스트 데이터는 순차적으로 교체될 예정입니다. 파일명, 태그, 프로필 소개, 데모 제목까지 함께 정리해두면 사이트 내 검색 결과와 프로필 상세 화면에 자동으로 반영될 수 있도록 구조를 개선해갈 계획입니다.",
    ],
  },
  {
    id: "game-casting",
    title: "게임 캐릭터 캐스팅 상담 접수 안내",
    date: "2026.04.28",
    datetime: "2026-04-28",
    categories: ["Casting"],
    image: "assets/chips-chip.png",
    lead: "히어로, 악당, 마스코트, AI 비서 등 캐릭터 타입에 맞춰 성우 후보를 제안하는 상담을 시작합니다.",
    body: [
      "CHIPS에서는 게임 프로젝트를 위한 캐릭터 보이스 캐스팅 상담을 준비하고 있습니다. 장르, 캐릭터 설정, 세계관, 대사 분량, 녹음 일정에 따라 필요한 보이스 방향이 달라지기 때문에, 단순히 성별이나 나이대만으로 후보를 고르기보다는 캐릭터의 역할과 감정선을 함께 살펴보는 것을 권장합니다.",
      "상담 시에는 캐릭터 시트, 대사 샘플, 레퍼런스 영상 또는 기존 음성 방향이 있으면 더 정확한 제안이 가능합니다. 히어로, 악당, 엄격한 상사, AI 비서, 마스코트 캐릭터처럼 명확한 타입이 있다면 검색 카테고리를 기준으로 후보군을 빠르게 좁힐 수 있습니다.",
      "아직 구체적인 성우가 정해지지 않은 초기 단계의 프로젝트도 상담이 가능합니다. 프로젝트의 분위기와 캐릭터 수, 예상 녹음량을 알려주시면 캐스팅 방향, 샘플 요청 방식, 녹음 진행 순서를 함께 정리해드립니다.",
    ],
  },
  {
    id: "remote-guide",
    title: "원격 녹음 의뢰 시 필요한 자료 정리",
    date: "2026.04.18",
    datetime: "2026-04-18",
    categories: ["Studio", "Guide"],
    image: "assets/chips-hero-optimized.webp",
    lead: "대본, 레퍼런스, 분량, 납기, 사용 범위를 미리 정리하면 캐스팅과 견적 안내가 더 빠르게 진행됩니다.",
    body: [
      "원격 녹음은 빠르게 진행할 수 있다는 장점이 있지만, 사전에 자료가 충분히 정리되어 있어야 수정 횟수를 줄이고 원하는 톤에 더 가까운 결과물을 얻을 수 있습니다. 가장 먼저 필요한 자료는 최종에 가까운 대본과 캐릭터 또는 브랜드의 방향성입니다.",
      "대본에는 읽는 속도, 강조할 단어, 고유명사 발음, 감정 지시가 포함되어 있으면 좋습니다. 광고나 내레이션의 경우 최종 영상 길이와 맞춰야 하는 초 단위 정보가 중요하고, 게임이나 애니메이션의 경우 캐릭터 관계와 상황 설명이 보이스 방향을 잡는 데 큰 도움이 됩니다.",
      "또한 녹음 파일의 사용 범위도 함께 정리하는 것이 좋습니다. 유튜브, SNS 광고, 게임 내 음성, 행사 영상, 내부 교육 자료처럼 사용처에 따라 견적과 계약 조건이 달라질 수 있기 때문입니다.",
    ],
  },
  {
    id: "actor-update",
    title: "신규 성우 프로필 업데이트 예정",
    date: "2026.04.02",
    datetime: "2026-04-02",
    categories: ["Crew"],
    image: "assets/sample_profile-optimized.webp",
    lead: "애니메이션, 광고, 게임 분야별 샘플을 가진 성우 프로필이 순차적으로 추가될 예정입니다.",
    body: [
      "CHIPS Voice Portfolio에는 앞으로 신규 성우 프로필이 순차적으로 추가될 예정입니다. 각 프로필에는 간단한 소개, 영문 표기, 대표 톤, 추천 캐릭터 타입, 데모 샘플이 함께 정리됩니다.",
      "성우 프로필은 단순한 이력 소개보다 실제 캐스팅 판단에 도움이 되는 정보를 중심으로 구성할 계획입니다. 의뢰자가 빠르게 비교할 수 있도록 대표 샘플, 톤 키워드, 감정 표현 범위, 언어와 억양 가능 여부를 함께 표시하는 방향을 검토하고 있습니다.",
      "업데이트가 완료되면 STUDIO 페이지를 통해 추가 소식을 안내드리겠습니다. 새롭게 공개되는 프로필은 VOICE SAMPLE 검색 결과와도 연결되어, 조건 검색을 통해 바로 확인할 수 있도록 준비하겠습니다.",
    ],
  },
];

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
const filterLocaleButtons = [...document.querySelectorAll("[data-filter-locale]")];
const contactLocaleButtons = [...document.querySelectorAll("[data-contact-locale]")];
const sampleEmpty = document.querySelector("#sample-empty");
const statusEl = document.querySelector("#form-status");
const contactToast = document.querySelector("#contact-toast");
const fileInput = document.querySelector(".file-input");
const fileUploadName = document.querySelector("#file-upload-name");
const fileUploadActions = document.querySelector("#file-upload-actions");
const fileChangeButton = document.querySelector("#file-change-button");
const fileRemoveButton = document.querySelector("#file-remove-button");
const maxAttachmentSize = 5 * 1024 * 1024;
const privacyDetails = document.querySelector(".privacy-details");
const privacyInput = document.querySelector(".privacy-native-input");
const privacyCheckControl = document.querySelector(".privacy-check-control");
const navLinks = [...document.querySelectorAll(".nav-link")];
const newsCards = [...document.querySelectorAll(".news-feature, .news-item")];
const newsFilterLinks = [...document.querySelectorAll(".news-filter-link")];

const contactLocales = {
  ko: {
    text: {
      pageTitle: "문의하기",
      pageLead: "성우 섭외, 더빙 제작, 견적 요청, 협업 관련 문의를 아래 양식으로 접수해 주세요.",
      guideKicker: "문의 안내",
      guideTitle: "문의 안내",
      guideBody:
        "문의 내용 확인 후 <strong>1~2일 이내</strong>에 이메일로 답변드리겠습니다. 급한 일정이 있으신 경우 희망 납기일을 함께 작성해 주세요.",
      requiredLegend: "필수 입력",
      optionalChip: "선택",
      optionalLegend: "선택 입력",
      nameLabel: "성명",
      requesterLabel: "문의자 구분",
      companyOption: "회사",
      individualOption: "개인",
      companyLabel: "회사명 또는 개인명",
      inquiryTypeLabel: "문의 유형",
      phoneLabel: "연락처",
      emailLabel: "이메일",
      budgetLabel: "예산 범위",
      deadlineLabel: "희망 마감일",
      projectTypeLabel: "프로젝트 종류",
      voiceLabel: "언어 / 목소리 조건",
      messageLabel: "신청 내용",
      referenceLabel: "파일 또는 참고 링크",
      attachmentLabel: "파일 첨부",
      attachmentHelp: "첨부파일은 1개만 가능하며, 5MB 이하 파일만 첨부할 수 있습니다. 큰 파일은 위 링크란에 공유 링크를 남겨주세요.",
      fileChoose: "파일 선택",
      fileChange: "변경",
      fileRemove: "삭제",
      fileNone: "선택된 파일 없음",
      fileTooLarge: "첨부파일은 5MB 이하만 가능합니다. 큰 파일은 공유 링크로 남겨주세요.",
      privacyLabel: "개인정보 수집 및 이용에 동의합니다.",
      privacyDetailsToggle: "자세히 보기",
      privacyDetailsBody:
        "<dl><div><dt>수집 항목</dt><dd>성명, 이메일, 연락처, 회사명 또는 개인명, 문의 유형, 문의 내용, 첨부파일</dd></div><div><dt>수집 목적</dt><dd>문의 접수, 본인 확인, 답변 및 상담 진행</dd></div><div><dt>보유 기간</dt><dd>문의 처리 완료 후 1년간 보관 후 파기</dd></div><div><dt>동의 거부권</dt><dd>동의하지 않을 경우 문의 접수가 제한될 수 있습니다.</dd></div><div><dt>처리 위탁</dt><dd>문의 접수, 첨부파일 수신, 이메일 전달을 위해 Basin 서비스를 이용합니다.</dd></div></dl>",
      submitLabel: "문의 접수하기",
      toastTitle: "문의가 정상적으로 접수되었습니다.",
      toastBody: "확인 후 1~2일 이내에 이메일로 답변드리겠습니다.",
    },
    placeholders: {
      name: "홍길동",
      company: "CHIPS Studio",
      phone: "010-0000-0000",
      email: "hello@example.com",
      budget: "예: 100만원 내외",
      project_type: "광고, 유튜브, 애니, 게임, 교육 등",
      voice_direction: "한국어 / 밝은 톤, 20대 여성 등",
      message: "문의 내용, 분량, 일정, 원하는 목소리 조건 등을 자유롭게 작성해 주세요.",
      reference_link: "Google Drive, Dropbox, YouTube, 참고 사이트 링크",
    },
    options: {
      placeholder: "선택해 주세요",
      casting: "성우 캐스팅 문의",
      dubbing: "더빙 제작 문의",
      estimate: "견적 요청",
      revision: "수정/추가 작업",
      partnership: "제휴/협업",
      other: "기타",
    },
    values: {
      requester: ["회사", "개인"],
      inquiry: {
        casting: "성우 캐스팅 문의",
        dubbing: "더빙 제작 문의",
        estimate: "견적 요청",
        revision: "수정/추가 작업",
        partnership: "제휴/협업",
        other: "기타",
      },
    },
    status: {
      sending: "문의 내용을 전송하고 있습니다.",
      success: "문의가 정상적으로 접수되었습니다.",
      error: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    },
  },
  en: {
    text: {
      pageTitle: "Contact Us",
      pageLead: "Please use the form below for voice actor casting, dubbing production, estimate requests, and partnership inquiries.",
      guideKicker: "INQUIRY GUIDE",
      guideTitle: "Inquiry Guide",
      guideBody:
        "After reviewing your inquiry, we will reply by email within <strong>1-2 business days</strong>. If your schedule is urgent, please include your preferred deadline.",
      requiredLegend: "Required fields",
      optionalChip: "Optional",
      optionalLegend: "Optional fields",
      nameLabel: "Full name",
      requesterLabel: "Requester type",
      companyOption: "Company",
      individualOption: "Individual",
      companyLabel: "Company name or individual name",
      inquiryTypeLabel: "Type of inquiry",
      phoneLabel: "Phone number",
      emailLabel: "Email address",
      budgetLabel: "Budget range",
      deadlineLabel: "Preferred deadline",
      projectTypeLabel: "Project type",
      voiceLabel: "Language and voice requirements",
      messageLabel: "Inquiry details",
      referenceLabel: "File or reference link",
      attachmentLabel: "File attachment",
      attachmentHelp: "Attach one file only, up to 5MB. For large files, paste a shared link in the field above.",
      fileChoose: "Choose file",
      fileChange: "Change",
      fileRemove: "Remove",
      fileNone: "No file selected",
      fileTooLarge: "Attachments must be 5MB or smaller. Please use a shared link for larger files.",
      privacyLabel: "I agree to the collection and use of personal information.",
      privacyDetailsToggle: "View details",
      privacyDetailsBody:
        "<dl><div><dt>Items collected</dt><dd>Full name, email address, phone number, company or individual name, inquiry type, inquiry details, and attachments</dd></div><div><dt>Purpose of collection</dt><dd>Receiving inquiries, confirming the requester, and responding or consulting about the request</dd></div><div><dt>Retention period</dt><dd>Retained for 1 year after the inquiry is resolved, then deleted</dd></div><div><dt>Right to refuse consent</dt><dd>You may refuse consent, but inquiry submission may be limited.</dd></div><div><dt>Processing service</dt><dd>Basin is used to receive inquiries, accept attachments, and forward submissions by email.</dd></div></dl>",
      submitLabel: "Submit inquiry",
      toastTitle: "Your inquiry has been submitted.",
      toastBody: "We will review it and reply by email within 1-2 business days.",
    },
    placeholders: {
      name: "Alex Kim",
      company: "CHIPS Studio",
      phone: "+82 10 0000 0000",
      email: "hello@example.com",
      budget: "Example: Around USD 1,000",
      project_type: "Commercial, YouTube, animation, game, education, etc.",
      voice_direction: "English / bright tone, female voice in her 20s, etc.",
      message: "Tell us about the request, volume, schedule, and voice direction you have in mind.",
      reference_link: "Google Drive, Dropbox, YouTube, or reference website link",
    },
    options: {
      placeholder: "Please select",
      casting: "Voice actor casting inquiry",
      dubbing: "Dubbing production inquiry",
      estimate: "Estimate request",
      revision: "Revision or additional work",
      partnership: "Partnership or collaboration",
      other: "Other inquiry",
    },
    values: {
      requester: ["Company", "Individual"],
      inquiry: {
        casting: "Voice actor casting inquiry",
        dubbing: "Dubbing production inquiry",
        estimate: "Estimate request",
        revision: "Revision or additional work",
        partnership: "Partnership or collaboration",
        other: "Other inquiry",
      },
    },
    status: {
      sending: "Sending your inquiry.",
      success: "Your inquiry has been submitted.",
      error: "Failed to send your inquiry. Please try again later.",
    },
  },
};

const initialContactLocale = new URLSearchParams(window.location.search).get("contactLocale");
let activeContactLocale = contactLocales[initialContactLocale] ? initialContactLocale : "ko";
const newsArticleSection = document.querySelector("#news-article");
const newsArticleContent = document.querySelector("#news-article-content");
const topNewsRail = document.querySelector("#top-news-rail");

document
  .querySelectorAll(
    ".section-title-row, .page-heading, .sample-filter, .sample-empty, .info-content, .actor-card, .sample-card, .demo-card, .contact-aside, .contact-form",
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
        <article class="sample-card" data-actor="${actor.id}" tabindex="0" role="button" aria-label="${actor.name} 프로필 보기">
          <div>
            <img class="avatar" src="${actor.profileImage || "assets/sample_profile-optimized.webp"}" alt="${actor.name} 프로필 사진" />
            <p class="sample-card-meta">
              <strong>${actor.name}</strong>
              <span>${actor.nameEn}</span>
            </p>
            ${audioMarkup(`${actor.name} 샘플`, actor.audioSources)}
            <p class="profile-card-hint">Profile <span>→</span></p>
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
            <img src="${actor.profileImage || "assets/sample_profile-optimized.webp"}" alt="${actor.name} 프로필 사진" />
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
  detailAvatar.innerHTML = `<img src="${actor.profileImage || "assets/sample_profile-optimized.webp"}" alt="${actor.name} 프로필 사진" />`;
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
  const genderValues = actor.gender === "male" ? ["남자"] : ["여자"];
  if (actorFilterProfiles[actor.id]) {
    return {
      gender: genderValues,
      ...actorFilterProfiles[actor.id],
    };
  }

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
    gender: genderValues,
    ageRange: ageMap[actor.style] || [],
    tone: [...(toneMap[actor.tone] || []), ...(toneMap[actor.mood] || [])],
    texture: actor.gender === "male" ? ["중저음", "저음"] : ["고음"],
    emotion: toneMap[actor.mood] || [],
    language: ["한국어"],
    accent: ["표준어", "서울말"],
    characterType: categoryMap[actor.category] || [],
  };
}

function applyContactLocale(locale) {
  const config = contactLocales[locale] || contactLocales.ko;
  activeContactLocale = locale;

  document.querySelectorAll("[data-contact-text]").forEach((element) => {
    const key = element.dataset.contactText;
    if (config.text[key]) element.textContent = config.text[key];
  });

  document.querySelectorAll("[data-contact-html]").forEach((element) => {
    const key = element.dataset.contactHtml;
    if (config.text[key]) element.innerHTML = config.text[key];
  });

  Object.entries(config.placeholders).forEach(([name, placeholder]) => {
    const field = document.querySelector(`[name="${name}"]`);
    if (field) field.placeholder = placeholder;
  });

  document.querySelectorAll("[data-contact-option]").forEach((option) => {
    const key = option.dataset.contactOption;
    if (config.options[key]) option.textContent = config.options[key];
    if (key !== "placeholder" && config.values.inquiry[key]) {
      option.value = config.values.inquiry[key];
    }
  });

  document.querySelectorAll('[name="requester_type"]').forEach((input, index) => {
    if (config.values.requester[index]) input.value = config.values.requester[index];
  });

  contactLocaleButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.contactLocale === locale);
  });

  if (fileUploadName && fileInput && !fileInput.files.length) syncFileUploadUi();
}

function syncFileUploadUi() {
  if (!fileInput || !fileUploadName) return;
  const selectedFile = fileInput.files[0];
  if (selectedFile && selectedFile.size > maxAttachmentSize) {
    fileInput.value = "";
    fileUploadName.textContent = contactLocales[activeContactLocale].text.fileNone;
    if (fileUploadActions) fileUploadActions.hidden = true;
    if (statusEl) statusEl.textContent = contactLocales[activeContactLocale].text.fileTooLarge;
    return;
  }
  fileUploadName.textContent = selectedFile?.name || contactLocales[activeContactLocale].text.fileNone;
  if (fileUploadActions) fileUploadActions.hidden = !selectedFile;
  if (selectedFile && statusEl?.textContent === contactLocales[activeContactLocale].text.fileTooLarge) {
    statusEl.textContent = "";
  }
}

function getLocalizedFilterGroup(group) {
  const localeGroup = filterLocales[activeFilterLocale]?.groups[group.key] || {};
  const optionLabels = localeGroup.options || [];
  return {
    ...group,
    label: localeGroup.label || group.label,
    hint: localeGroup.hint || group.hint,
    options: group.options.map((option, index) => ({
      value: option,
      label: optionLabels[index] || option,
    })),
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

function restoreFilterSelections(selections = {}) {
  Object.entries(selections).forEach(([groupKey, values]) => {
    values.forEach((value) => {
      const input = filterControls.querySelector(`input[name="${groupKey}"][value="${CSS.escape(value)}"]`);
      if (input) input.checked = true;
    });
    updateFilterSummary(groupKey);
  });
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

function syncFilterPanelSpace() {
  const openPanel = filterControls.querySelector(".filter-dropdown.is-open .filter-panel");
  const footer = document.querySelector("#info");
  let panelSpace = 0;

  if (openPanel && footer) {
    const panelRect = openPanel.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const overlap = panelRect.bottom - footerRect.top + 18;
    panelSpace = Math.max(0, Math.min(overlap, panelRect.height + 18));
  }

  filterForm.style.setProperty("--filter-panel-space", `${panelSpace}px`);
}

function closeFilterPanels(exceptDropdown = null) {
  filterControls.querySelectorAll(".filter-dropdown").forEach((dropdown) => {
    if (dropdown === exceptDropdown) return;
    dropdown.classList.remove("is-open");
    dropdown.querySelector(".filter-toggle").setAttribute("aria-expanded", "false");
  });
  syncFilterPanelSpace();
}

function renderFilterControls(selections = {}) {
  const ui = filterLocales[activeFilterLocale]?.ui || filterLocales.ko.ui;
  filterControls.innerHTML = filterGroups
    .map((group) => {
      const localizedGroup = getLocalizedFilterGroup(group);
      return `
        <div class="filter-dropdown" data-filter="${group.key}">
          <button class="filter-toggle" type="button" aria-expanded="false">
            <span class="filter-toggle-label">
              <strong>${localizedGroup.label}</strong>
              <small>${localizedGroup.hint}</small>
            </span>
            <span class="filter-toggle-meta">
              <em class="filter-count" hidden></em>
              <i class="filter-chevron" aria-hidden="true"></i>
            </span>
          </button>
          <div class="filter-panel">
            <div class="filter-panel-head">
              <div>
                <strong>${localizedGroup.label}</strong>
                <small>${localizedGroup.options.length}${ui.optionSuffix}</small>
              </div>
              <div class="filter-actions">
                <button type="button" data-action="select-all">${ui.selectAll}</button>
                <button type="button" data-action="clear">${ui.clear}</button>
              </div>
            </div>
            <div class="filter-option-grid">
              ${localizedGroup.options
                .map(
                  (option) => `
                    <label class="filter-check">
                      <input type="checkbox" name="${group.key}" value="${option.value}" />
                      <span>${option.label}</span>
                    </label>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
      `;
    })
    .join("");
  restoreFilterSelections(selections);
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

function filterNews(type = "all", value = "") {
  let visibleCount = 0;
  const newsMain = document.querySelector(".news-main");
  let emptyState = document.querySelector(".news-empty");
  const isAll = type === "all";

  document.querySelector(".news-feature")?.classList.toggle("is-compact", !isAll);

  newsCards.forEach((card) => {
    const matches =
      type === "all" ||
      (type === "category" && card.dataset.newsCategory?.split(" ").includes(value)) ||
      (type === "archive" && card.dataset.newsArchive === value);

    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  newsFilterLinks.forEach((link) => {
    const isActive =
      (type === "all" && link.dataset.newsFilter === "all") ||
      (link.dataset.newsFilter === type && link.dataset.filterValue === value);
    link.classList.toggle("is-active", isActive);
  });

  if (!emptyState) {
    emptyState = document.createElement("p");
    emptyState.className = "news-empty";
    newsMain.append(emptyState);
  }

  emptyState.hidden = visibleCount > 0;
  emptyState.textContent =
    type === "archive"
      ? `${value}에 등록된 뉴스가 아직 없습니다.`
      : "선택한 카테고리에 등록된 뉴스가 아직 없습니다.";
}

function articleHash(articleId) {
  return `#news-article-${articleId}`;
}

function openNewsArticle(articleId) {
  const article = newsArticles.find((item) => item.id === articleId) || newsArticles[0];
  const index = newsArticles.findIndex((item) => item.id === article.id);
  const prevArticle = newsArticles[index - 1];
  const nextArticle = newsArticles[index + 1];

  newsArticleContent.innerHTML = `
    <header class="news-article-head">
      <p class="news-tags">${article.categories.map((category) => `<span>${category}</span>`).join("")}</p>
      <time datetime="${article.datetime}">${article.date}</time>
      <h2>${article.title}</h2>
      <p>${article.lead}</p>
    </header>
    <img class="news-article-image" src="${article.image}" alt="${article.title}" />
    <div class="news-article-body">
      ${article.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </div>
    <nav class="news-article-nav" aria-label="News article navigation">
      ${
        prevArticle
          ? `<a href="${articleHash(prevArticle.id)}">← 이전 글</a>`
          : `<span class="is-disabled">← 이전 글</span>`
      }
      <a href="#news">목록으로</a>
      ${
        nextArticle
          ? `<a href="${articleHash(nextArticle.id)}">다음 글 →</a>`
          : `<span class="is-disabled">다음 글 →</span>`
      }
    </nav>
  `;
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
  const contactLocaleButton = event.target.closest("[data-contact-locale]");
  if (contactLocaleButton) {
    const nextLocale = contactLocaleButton.dataset.contactLocale;
    if (!contactLocales[nextLocale] || nextLocale === activeContactLocale) return;
    applyContactLocale(nextLocale);
    return;
  }

  const localeButton = event.target.closest(".filter-locale-button");
  if (localeButton) {
    const nextLocale = localeButton.dataset.filterLocale;
    if (!filterLocales[nextLocale] || nextLocale === activeFilterLocale) return;

    const selections = selectedFilterValues();
    activeFilterLocale = nextLocale;
    filterLocaleButtons.forEach((button) => {
      button.classList.toggle("is-active", button === localeButton);
    });
    closeFilterPanels();
    renderFilterControls(selections);
    syncFilterPanelSpace();
    return;
  }

  const filterToggle = event.target.closest(".filter-toggle");
  if (filterToggle) {
    const dropdown = filterToggle.closest(".filter-dropdown");
    const willOpen = !dropdown.classList.contains("is-open");
    closeFilterPanels(dropdown);
    dropdown.classList.toggle("is-open", willOpen);
    filterToggle.setAttribute("aria-expanded", `${willOpen}`);
    syncFilterPanelSpace();
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

  const newsFilter = event.target.closest(".news-filter-link");
  if (newsFilter) {
    filterNews(newsFilter.dataset.newsFilter, newsFilter.dataset.filterValue || "");
    return;
  }

  const topNewsArrow = event.target.closest("[data-news-slide]");
  if (topNewsArrow && topNewsRail) {
    const direction = topNewsArrow.dataset.newsSlide === "next" ? 1 : -1;
    topNewsRail.scrollBy({ left: direction * topNewsRail.clientWidth, behavior: "smooth" });
    return;
  }

  const newsCard = event.target.closest("[data-news-id]");
  if (newsCard) {
    navigateTo(articleHash(newsCard.dataset.newsId));
    return;
  }

  const playButton = event.target.closest(".play-button");
  if (playButton) {
    event.stopPropagation();
    togglePlayer(playButton.closest(".sample-player"));
    return;
  }

  const actorButton = event.target.closest("[data-actor]");
  if (actorButton && !event.target.closest(".sample-player")) openActor(actorButton.dataset.actor);
});

document.addEventListener("keydown", (event) => {
  const newsCard = event.target.closest("[data-news-id]");
  if (newsCard && ["Enter", " "].includes(event.key)) {
    event.preventDefault();
    navigateTo(articleHash(newsCard.dataset.newsId));
    return;
  }

  const sampleCard = event.target.closest(".sample-card[data-actor]");
  if (!sampleCard || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  openActor(sampleCard.dataset.actor);
});

filterControls.addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  updateFilterSummary(event.target.name);
  syncFilterPanelSpace();
});

window.addEventListener("resize", syncFilterPanelSpace);

document.querySelector("#sample-search").addEventListener("click", filterSamples);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    event.preventDefault();
    navigateTo(hash);
  });
});

const heroSection = document.querySelector("#top");
const voiceSampleSection = document.querySelector("#voice-sample");
let heroWheelScrollLocked = false;
let voiceSampleWheelScrollLocked = false;

if (heroSection) {
  heroSection.addEventListener(
    "wheel",
    (event) => {
      if (event.deltaY <= 0 || homePage.hidden) return;

      const heroRect = heroSection.getBoundingClientRect();
      const isHeroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 1;
      if (!isHeroVisible) return;

      event.preventDefault();
      if (heroWheelScrollLocked) return;

      heroWheelScrollLocked = true;
      window.scrollTo({
        top: window.scrollY + heroRect.bottom,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        heroWheelScrollLocked = false;
      }, 900);
    },
    { passive: false },
  );
}

if (heroSection && voiceSampleSection) {
  voiceSampleSection.addEventListener(
    "wheel",
    (event) => {
      if (event.deltaY >= 0 || homePage.hidden) return;

      const voiceSampleTop = voiceSampleSection.offsetTop;
      const isNearVoiceSampleStart = window.scrollY <= voiceSampleTop + 120;
      if (!isNearVoiceSampleStart) return;

      event.preventDefault();
      if (voiceSampleWheelScrollLocked) return;

      voiceSampleWheelScrollLocked = true;
      window.scrollTo({
        top: heroSection.offsetTop,
        behavior: "smooth",
      });

      if (window.location.hash === "#voice-sample") {
        window.history.replaceState(null, "", "#top");
        setActiveNav("#top");
      }

      window.setTimeout(() => {
        voiceSampleWheelScrollLocked = false;
      }, 900);
    },
    { passive: false },
  );
}

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

document.querySelector("#back-to-news").addEventListener("click", () => {
  navigateTo("#news");
});

document.querySelector("#scroll-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector(".submit-button");
  if (fileInput?.files[0] && fileInput.files[0].size > maxAttachmentSize) {
    fileInput.value = "";
    syncFileUploadUi();
    statusEl.textContent = contactLocales[activeContactLocale].text.fileTooLarge;
    return;
  }
  const data = new FormData(form);

  data.set("subject", `[CHIPS 문의] ${data.get("name")}님 문의`);

  submitButton.disabled = true;
  contactToast.hidden = true;
  statusEl.textContent = contactLocales[activeContactLocale].status.sending;

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
    });

    if (!response.ok) throw new Error("Basin request failed");

    form.reset();
    statusEl.textContent = contactLocales[activeContactLocale].status.success;
    contactToast.hidden = false;
    window.setTimeout(() => {
      contactToast.hidden = true;
    }, 5200);
  } catch (error) {
    statusEl.textContent = contactLocales[activeContactLocale].status.error;
  } finally {
    submitButton.disabled = false;
  }
});

if (fileInput && fileUploadName) {
  fileInput.addEventListener("change", syncFileUploadUi);
  fileChangeButton?.addEventListener("click", () => fileInput.click());
  fileRemoveButton?.addEventListener("click", () => {
    fileInput.value = "";
    syncFileUploadUi();
  });
}

if (privacyDetails && privacyInput && privacyCheckControl) {
  privacyCheckControl.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    privacyInput.checked = !privacyInput.checked;
    privacyInput.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

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
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 },
);

function observeReveals() {
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

function showPageReveals(page) {
  page.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

function showRoute() {
  stopActivePlayer();
  const hash = window.location.hash || "#top";
  const articleMatch = hash.match(/^#news-article-(.+)$/);
  const isAppPage = ["#news", "#actors", "#services", "#contact"].includes(hash) || Boolean(articleMatch);
  let activePage = null;

  homePage.hidden = isAppPage;
  appPages.forEach((page) => {
    page.hidden = true;
  });

  if (articleMatch) {
    openNewsArticle(articleMatch[1]);
    newsArticleSection.hidden = false;
    activePage = newsArticleSection;
    actorDetail.hidden = true;
    setActiveNav("#news");
    window.scrollTo({ top: 0, behavior: "auto" });
    playRouteEnter(activePage);
    return;
  }

  if (isAppPage) {
    const page = document.querySelector(hash);
    if (page) {
      page.hidden = false;
      activePage = page;
      showPageReveals(page);
    }
    actorDetail.hidden = true;
    setActiveNav(hash);
    window.scrollTo({ top: 0, behavior: "auto" });
    playRouteEnter(activePage);
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

function playRouteEnter(page) {
  if (!page) return;
  page.classList.remove("route-enter");
  void page.offsetWidth;
  page.classList.add("route-enter");
}

function normalizeDriveLink(url = "") {
  const value = `${url}`.trim();
  if (!value.includes("drive.google.com")) return value;
  const fileId = value.match(/\/d\/([^/]+)/)?.[1] || value.match(/[?&]id=([^&]+)/)?.[1];
  return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : value;
}

function normalizeAudioSources(sources = []) {
  return sources
    .map((source) => ({
      src: normalizeDriveLink(source.src || source.audio_src || ""),
      type: source.type || source.audio_type || "audio/mpeg",
    }))
    .filter((source) => source.src);
}

function normalizeCmsOption(value, map) {
  const text = `${value || ""}`.trim();
  return map[text] || text;
}

function normalizeCmsActor(actor) {
  const genderMap = { 여성: "female", 여자: "female", 남성: "male", 남자: "male" };
  const ageMap = { "10대": "teen", "20대": "twenties", "30대": "thirties", "40대": "forties" };
  const toneMap = { 맑음: "clear", 밝음: "bright", 따뜻함: "warm", 차분함: "calm", 중저음: "deep" };
  const categoryMap = { 애니메이션: "animation", 게임: "game", 광고: "commercial", 내레이션: "narration" };
  const moodMap = { 밝음: "bright", 진지함: "serious", 귀여움: "cute", 차분함: "calm", 에너지: "energetic" };

  return {
    ...actor,
    name: actor.name || actor.display_name || actor["성우 이름"],
    nameEn: actor.nameEn || actor.name_en || actor["영문 이름"],
    gender: normalizeCmsOption(actor.gender, genderMap),
    style: normalizeCmsOption(actor.style || actor.ageRange, ageMap),
    tone: normalizeCmsOption(actor.tone, toneMap),
    category: normalizeCmsOption(actor.category, categoryMap),
    mood: normalizeCmsOption(actor.mood, moodMap),
    colors: Array.isArray(actor.colors) ? actor.colors : `${actor.colors || ""}`.split(",").map((value) => value.trim()).filter(Boolean),
    tags: Array.isArray(actor.tags) ? actor.tags : `${actor.tags || ""}`.split(",").map((value) => value.trim()).filter(Boolean),
    demos: Array.isArray(actor.demos) ? actor.demos : `${actor.demos || ""}`.split(",").map((value) => value.trim()).filter(Boolean),
    audioSources: normalizeAudioSources(actor.audioSources || actor.audio_sources || []),
    profileImage: normalizeDriveLink(actor.profileImage || actor.profile_image || ""),
  };
}

function normalizeCmsArticle(article) {
  return {
    ...article,
    datetime: article.datetime || article.date,
    date: article.displayDate || article.date?.replaceAll("-", ".") || article.date,
    categories: Array.isArray(article.categories)
      ? article.categories
      : `${article.categories || article.category || ""}`.split(/[,\s/]+/).map((value) => value.trim()).filter(Boolean),
    image: normalizeDriveLink(article.image || article.thumbnail || article.hero_image || ""),
    body: Array.isArray(article.body) ? article.body : `${article.body || ""}`.split(/\n+/).filter(Boolean),
  };
}

async function loadCmsData() {
  try {
    const response = await fetch("data/cms-data.json", { cache: "no-store" });
    if (!response.ok) return;

    const cmsData = await response.json();
    if (cmsData.enabled === false) return;

    if (Array.isArray(cmsData.sampleAudioSources) && cmsData.sampleAudioSources.length) {
      sampleAudioSources = normalizeAudioSources(cmsData.sampleAudioSources);
    }

    if (Array.isArray(cmsData.actors) && cmsData.actors.length) {
      actors = cmsData.actors.map(normalizeCmsActor);
    }

    if (Array.isArray(cmsData.newsArticles) && cmsData.newsArticles.length) {
      newsArticles = cmsData.newsArticles.map(normalizeCmsArticle);
    }
  } catch (error) {
    console.info("Using built-in CHIPS sample data.");
  }
}

async function initializeSite() {
  await loadCmsData();
  renderFilterControls();
  renderActors();
  sampleGrid.innerHTML = "";
  sampleEmpty.hidden = false;
  applyContactLocale(activeContactLocale);
  observeReveals();
  setupAudioPlayers();
  showRoute();
}

initializeSite();
window.addEventListener("hashchange", showRoute);
