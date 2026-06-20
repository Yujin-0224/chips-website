let actors = [];

let sampleAudioSources = [];

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
    options: ["저음", "중저음", "중음", "고음", "초고음", "사투리"],
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
    key: "actingType",
    label: "연기타입",
    hint: "Acting Type",
    options: ["연기", "광고", "나레이션", "스팟"],
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
      texture: { label: "음색 특성", hint: "Voice Texture", options: ["저음", "중저음", "중음", "고음", "초고음", "사투리"] },
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
      actingType: { label: "연기타입", hint: "Acting Type", options: ["연기", "광고", "나레이션", "스팟"] },
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
      texture: { label: "Voice Texture", hint: "Voice Texture", options: ["Low", "Mid-low", "Mid", "High", "Ultra-high", "Dialect"] },
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
      actingType: { label: "Acting Type", hint: "Acting Type", options: ["Acting", "Commercial", "Narration", "Spot"] },
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
      texture: { label: "声質", hint: "Voice Texture", options: ["低音", "中低音", "中音", "高音", "超高音"] },
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
      actingType: { label: "演技タイプ", hint: "Acting Type", options: ["演技", "広告", "ナレーション", "スポット"] },
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
      texture: { label: "声音质感", hint: "Voice Texture", options: ["低音", "中低音", "中音", "高音", "超高音"] },
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
      actingType: { label: "表演类型", hint: "Acting Type", options: ["表演", "广告", "旁白", "短版广告"] },
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
    characterType: ["학생", "아이돌", "공주", "마스코트 캐릭터", "다정한 캐릭터"],
  },
  min: {
    ageRange: ["30대", "40대"],
    tone: ["차분한", "진지한", "무게감 있는", "고급스러운", "신뢰감 있는", "담백한", "담담한"],
    texture: ["중저음", "저음"],
    emotion: ["무감정/중립", "진지함", "자신감", "냉정한", "명령"],
    language: ["한국어", "영어"],
    characterType: ["내레이터형 캐릭터", "엄격한 상사", "선생님/교관", "왕/여왕", "귀족"],
  },
  yuna: {
    ageRange: ["30대"],
    tone: ["따뜻한", "부드러운", "친근한", "신뢰감 있는", "감성적인", "상담원"],
    texture: ["중저음"],
    emotion: ["따뜻함", "위로", "친절함", "공손함", "감동", "사랑스러움"],
    language: ["한국어", "영어"],
    characterType: ["엄마", "의사/간호사", "상담원", "다정한 캐릭터", "내레이터형 캐릭터"],
  },
  jin: {
    ageRange: ["10대", "20대"],
    tone: ["밝은", "활기찬", "하이텐션", "장난스러운", "빠른", "강한"],
    texture: ["고음", "중저음"],
    emotion: ["흥분", "자신감", "기쁨", "장난", "놀람", "조급함"],
    language: ["한국어", "일본어"],
    characterType: ["히어로", "학생", "아이돌", "기사/전사", "바보/허당 캐릭터"],
  },
  sua: {
    ageRange: ["40대", "50대"],
    tone: ["또렷한", "진지한", "신뢰감 있는", "고급스러운", "아나운서", "교관/강사"],
    texture: ["중저음"],
    emotion: ["무감정/중립", "진지함", "공손함", "자신감", "명령"],
    language: ["한국어", "영어"],
    characterType: ["선생님/교관", "엄격한 상사", "내레이터형 캐릭터", "왕/여왕", "의사/간호사"],
  },
  rion: {
    ageRange: ["10대", "20대"],
    tone: ["부드러운", "귀여운", "장난스러운", "친근한", "몽환적인", "로우텐션"],
    texture: ["고음", "중저음"],
    emotion: ["사랑스러움", "쑥스러움", "장난", "설렘", "위로"],
    language: ["한국어", "일본어"],
    characterType: ["마스코트 캐릭터", "동물 캐릭터", "학생", "AI 비서", "아기 캐릭터"],
  },
  yujin: {
    ageRange: ["30대"],
    tone: ["따뜻한", "부드러운", "감성적인", "친근한", "상담원", "방송 진행"],
    texture: ["중저음"],
    emotion: ["따뜻함", "위로", "친절함", "공손함", "감동", "슬픔"],
    language: ["한국어", "중국어"],
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
let preferredAudioVolume = 0.85;
const samplePagination = {
  items: [],
  page: 0,
  perPage: 4,
};

const sampleGrid = document.querySelector("#sample-grid");
const sampleResults = document.querySelector("#sample-results");
const samplePageStatus = document.querySelector("#sample-page-status");
const samplePageButtons = [...document.querySelectorAll("[data-sample-page]")];
const actorGrid = document.querySelector("#actor-grid");
const actorDetail = document.querySelector("#actor-detail");
const homePage = document.querySelector("#home");
const appPages = [...document.querySelectorAll(".app-page")];
const detailAvatar = document.querySelector("#detail-avatar");
const detailName = document.querySelector("#detail-name");
const detailNameEn = document.querySelector("#detail-name-en");
const detailBio = document.querySelector("#detail-bio");
const detailHighlights = document.querySelector("#detail-highlights");
const detailCapabilities = document.querySelector("#detail-capabilities");
const audioDemo = document.querySelector("#audio-demo");
const audioDemoPlayer = document.querySelector("#audio-demo-player");
const activeDemoTitle = document.querySelector("#active-demo-title");
const activeDemoMeta = document.querySelector("#active-demo-meta");
const detailCareer = document.querySelector("#detail-career");
const demoGrid = document.querySelector("#demo-grid");
const filterForm = document.querySelector(".sample-filter");
const filterControls = document.querySelector("#filter-controls");
const filterLocaleButtons = [...document.querySelectorAll("[data-filter-locale]")];
const contactLocaleButtons = [...document.querySelectorAll("[data-contact-locale]")];
const sampleEmpty = document.querySelector("#sample-empty");
const statusEl = document.querySelector("#form-status");
const contactToast = document.querySelector("#contact-toast");
const contactToastClose = document.querySelector("#contact-toast-close");
const contactStatusBar = document.querySelector("#contact-status-bar");
const contactForm = document.querySelector("#contact-form");
const contactModeInput = document.querySelector("#contact-mode");
const teamJoinTrigger = document.querySelector("#team-join-trigger");
const teamContactPanel = document.querySelector("#team-contact-panel");
const teamContactBack = document.querySelector("#team-contact-back");
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
let newsCards = [...document.querySelectorAll(".news-feature, .news-item")];
let newsFilterLinks = [...document.querySelectorAll(".news-filter-link")];

const contactLocales = {
  ko: {
    text: {
      pageTitle: "문의하기",
      pageLead: "",
      guideKicker: "",
      guideTitle: "문의 안내",
      guideBody:
        "문의 내용 확인 후 <strong>1~2일 이내</strong>에 이메일로 답변드리겠습니다. 급한 일정이 있으신 경우 희망 납기일을 함께 작성해 주세요.",
      teamJoinGuide: "팀 가입 문의의 경우",
      teamJoinButton: "여기를 클릭해주세요",
      teamFormEyebrow: "TEAM JOIN",
      teamFormTitle: "팀 가입 문의",
      teamFormBack: "일반 문의로 돌아가기",
      teamNameLabel: "활동명 / 이름",
      teamEmailLabel: "이메일",
      teamPhoneLabel: "연락처",
      teamRoleLabel: "지원 분야",
      teamLinksLabel: "포트폴리오 / 샘플 링크",
      teamIntroLabel: "간단한 소개",
      teamExperienceLabel: "주요 경력 / 참고 사항",
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
      name: "",
      company: "",
      phone: "",
      email: "hello@example.com",
      budget: "",
      project_type: "광고, 유튜브, 애니, 게임, 교육 등",
      message: "문의 내용, 분량, 일정, 원하는 목소리 조건 등",
      reference_link: "Google Drive, Dropbox, YouTube",
      team_links: "Google Drive, YouTube, SoundCloud",
      team_intro: "활동 분야, 가능한 작업, 함께하고 싶은 이유를 적어주세요.",
      team_experience: "참여 작품, 작업 경험, 사용 장비 등을 자유롭게 적어주세요.",
    },
    options: {
      placeholder: "선택해 주세요",
      casting: "성우 캐스팅 문의",
      dubbing: "더빙 제작 문의",
      estimate: "견적 요청",
      revision: "수정/추가 작업",
      partnership: "제휴/협업",
      other: "기타",
      teamRolePlaceholder: "선택해 주세요",
      teamRoleVoice: "성우",
      teamRoleIllustration: "일러스트",
      teamRolePlanning: "기획",
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
      pageLead: "",
      guideKicker: "",
      guideTitle: "Inquiry Guide",
      guideBody:
        "After reviewing your inquiry, we will reply by email within <strong>1-2 business days</strong>. If your schedule is urgent, please include your preferred deadline.",
      teamJoinGuide: "For team join inquiries,",
      teamJoinButton: "click here",
      teamFormEyebrow: "TEAM JOIN",
      teamFormTitle: "Team join inquiry",
      teamFormBack: "Back to general inquiry",
      teamNameLabel: "Name / Display name",
      teamEmailLabel: "Email",
      teamPhoneLabel: "Phone",
      teamRoleLabel: "Field",
      teamLinksLabel: "Portfolio / Sample link",
      teamIntroLabel: "Short introduction",
      teamExperienceLabel: "Experience / Notes",
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
      name: "",
      company: "",
      phone: "",
      email: "hello@example.com",
      budget: "",
      project_type: "Commercial, YouTube, animation, game, education, etc.",
      message: "Request details, volume, schedule, and voice direction",
      reference_link: "Google Drive, Dropbox, YouTube",
      team_links: "Google Drive, YouTube, SoundCloud",
      team_intro: "Tell us what you do, what work you can take on, and why you want to join.",
      team_experience: "Share projects, work experience, equipment, or other notes.",
    },
    options: {
      placeholder: "Please select",
      casting: "Voice actor casting inquiry",
      dubbing: "Dubbing production inquiry",
      estimate: "Estimate request",
      revision: "Revision or additional work",
      partnership: "Partnership or collaboration",
      other: "Other inquiry",
      teamRolePlaceholder: "Please select",
      teamRoleVoice: "Voice actor",
      teamRoleIllustration: "Illustration",
      teamRolePlanning: "Planning",
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
let contactStatusTimer = null;
const newsArticleSection = document.querySelector("#news-article");
const newsArticleContent = document.querySelector("#news-article-content");
const topNewsRail = document.querySelector("#top-news-rail");
const revealSelector = [
  ".section-title-row",
  ".page-heading",
  ".sample-filter",
  ".sample-empty",
  ".top-news-card",
  ".news-feature",
  ".news-item",
  ".news-sidebar-card",
  ".info-content",
  ".actor-card",
  ".sample-card",
  ".demo-card",
  ".profile-sidebar",
  ".profile-portrait",
  ".profile-identity-card",
  ".profile-copy",
  ".profile-audio-card",
  ".profile-summary-card",
  ".profile-career",
  ".contact-aside",
  ".contact-form",
  ".services-placeholder > .eyebrow",
  ".services-placeholder > h2",
  ".services-placeholder > p",
].join(", ");

function applyRevealTargets(scope = document) {
  scope.querySelectorAll(revealSelector).forEach((element) => element.classList.add("reveal"));
}

applyRevealTargets();

function showContactStatusBar(message, type = "warning", autoHideDelay = 5200) {
  if (!contactStatusBar) return;
  window.clearTimeout(contactStatusTimer);
  contactStatusBar.textContent = message;
  contactStatusBar.classList.remove("is-info", "is-error", "is-warning");
  contactStatusBar.classList.add(`is-${type}`);
  contactStatusBar.hidden = false;
  if (autoHideDelay) {
    contactStatusTimer = window.setTimeout(() => {
      contactStatusBar.hidden = true;
    }, autoHideDelay);
  }
}

function hideContactStatusBar() {
  if (!contactStatusBar) return;
  window.clearTimeout(contactStatusTimer);
  contactStatusBar.hidden = true;
}

function hideContactSuccessUi() {
  if (contactToast) contactToast.hidden = true;
  if (statusEl) statusEl.textContent = "";
}

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function audioMarkup(label, sourcesList = sampleAudioSources, options = {}) {
  const showVolume = options.showVolume !== false;
  const validSources = sourcesList.filter((source) => source?.src);
  const primarySource = validSources[0];
  const useAudioSrc = validSources.length === 1;
  const sources = useAudioSrc
    ? ""
    : validSources
        .map((source) => `<source src="${escapeHtml(source.src)}" type="${escapeHtml(source.type || "")}" />`)
        .join("");
  const isEmpty = !validSources.length;

  return `
    <div class="sample-player${isEmpty ? " is-empty" : ""}">
      <audio preload="metadata" crossorigin="anonymous"${useAudioSrc ? ` src="${escapeHtml(primarySource.src)}"` : ""}>${sources}</audio>
      <button class="play-button" type="button" aria-label="${escapeHtml(label)} \uc7ac\uc0dd" ${isEmpty ? "disabled" : ""}>\u25b6</button>
      <div class="wave" aria-hidden="true"><span></span></div>
      <small class="time-left" aria-label="${escapeHtml(label)} \uae38\uc774">0:00</small>
      ${
        showVolume
          ? `<label class="volume-control" aria-label="${escapeHtml(label)} \ubcfc\ub968">
              <span>VOL</span>
              <input type="range" min="0" max="1" step="0.01" value="${preferredAudioVolume}" />
            </label>`
          : ""
      }
    </div>
  `;
}
function escapeHtml(value = "") {
  return `${value}`.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function fitTextToParent(element, { max = 43, min = 22 } = {}) {
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

function getActorHighlightLines(actor) {
  const lines = actor.highlights || actor.profileHighlights || actor.brandingLines;
  if (Array.isArray(lines) && lines.length) return lines.filter(Boolean);

  const branding = actor.brandingLine || actor.branding || actor.tagline;
  const fields = actor.workFields || actor.practiceFields || actor.experienceLine;
  return [
    branding || "청량한 소년 청년톤 중심의 캐릭터 보이스.",
    fields || "애니메이션, 게임, 광고 샘플 경험 다수.",
  ].filter(Boolean);
}

function getActorCapabilities(actor) {
  const capabilities = actor.capabilities || actor.profileCapabilities || actor.workOptions;
  if (Array.isArray(capabilities) && capabilities.length) return capabilities.filter(Boolean);
  if (typeof capabilities === "string" && capabilities.trim()) return capabilities.split(",").map((item) => item.trim()).filter(Boolean);
  return ["홈레코딩 가능", "원격 디렉팅 가능", "빠른 납기"];
}

function getActorCareerItems(actor) {
  const career = actor.career || actor.careers || actor.credits || actor.profileCareer || actor.workHistory;
  if (Array.isArray(career) && career.length) return career.filter(Boolean);
  if (typeof career === "string" && career.trim()) return career.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
  return ["경력 사항은 준비 중입니다."];
}

let detailAudioOptions = [];

function formatAudioMeta(source = {}) {
  if (source.category) return `${source.category}`;
  const categories = source.categories && typeof source.categories === "object" ? Object.values(source.categories).flat().filter(Boolean) : [];
  return categories.join(" / ");
}

function getRepresentativeTags(source = {}) {
  const tags = source.representativeTags || source.representative_tags || source.tags;
  const list = Array.isArray(tags) ? tags : `${tags || ""}`.split(",");
  return list.map((tag) => `${tag || ""}`.trim().replace(/^#+/, "")).filter(Boolean).slice(0, 4);
}

function getSearchAudioSources(actor = {}) {
  return (actor.audioSources || []).filter((source) => source.audioKind !== "intro");
}

const filterValueAliases = {
  ageRange: {
    "나이 불명": "나이 불명 (괴물이나 크리쳐의 경우)",
  },
  emotion: {
    무감정: "무감정/중립",
    수줍음: "쑥스러움",
    친절한: "친절함",
    공손한: "공손함",
    진지한: "진지함",
  },
  characterType: {
    빌런: "악당",
  },
};

function normalizeFilterValue(key, value) {
  const trimmed = `${value || ""}`.trim();
  return filterValueAliases[key]?.[trimmed] || trimmed;
}

function mergeCategoryValues(target, source = {}) {
  Object.entries(source).forEach(([key, values]) => {
    if (!Array.isArray(target[key])) return;
    const list = Array.isArray(values) ? values : `${values || ""}`.split(",");
    list.map((value) => normalizeFilterValue(key, value)).filter(Boolean).forEach((value) => {
      if (!target[key].includes(value)) target[key].push(value);
    });
  });
}

function getProfileAudioOptions(actor) {
  const sampleSources = getSearchAudioSources(actor);
  const legacyDemos = Array.isArray(actor.demos) && actor.demos.length === sampleSources.length ? actor.demos : [];
  const sampleLabels = sampleSources.map((source, index) => source.title || source.category || legacyDemos[index] || `\uc0d8\ud50c ${index + 1}`);
  const options = [];

  sampleLabels.forEach((label, index) => {
    const source = sampleSources[index];
    if (source) {
      options.push({
        label,
        sources: [source],
        meta: formatAudioMeta(source),
        tags: getRepresentativeTags(source),
      });
    }
  });

  return options;
}
function renderDetailAudioOption(index = 0, options = {}) {
  const shouldAutoplay = options.autoplay === true;
  const option = detailAudioOptions[index];
  if (!option) {
    audioDemo.hidden = true;
    audioDemoPlayer.innerHTML = "";
    return;
  }

  stopActivePlayer();
  audioDemo.hidden = false;
  activeDemoTitle.textContent = option.label;
  audioDemoPlayer.innerHTML = audioMarkup(option.label, option.sources);
  const activeDemoTags = document.querySelector("#active-demo-tags");
  if (activeDemoTags) {
    activeDemoTags.innerHTML = (option.tags || []).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("");
    activeDemoTags.hidden = !(option.tags || []).length;
  }
  if (activeDemoMeta) {
    activeDemoMeta.textContent = "";
    activeDemoMeta.hidden = true;
  }
  demoGrid.querySelectorAll("[data-audio-option]").forEach((button) => {
    const isActive = Number(button.dataset.audioOption) === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", `${isActive}`);
  });
  setupAudioPlayers(audioDemoPlayer);
  if (shouldAutoplay && option.sources.length) {
    const nextPlayer = audioDemoPlayer.querySelector(".sample-player");
    togglePlayer(nextPlayer);
  }
}

function renderSamples(list = actors) {
  const searchableItems = list.flatMap((actor) =>
    getSearchAudioSources(actor).map((source) => ({
      actor,
      source,
    })),
  );
  samplePagination.items = shuffleItems(searchableItems);
  samplePagination.page = 0;
  renderSamplePage();
}

function shuffleItems(items = []) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

function renderSamplePage() {
  const { items, page, perPage } = samplePagination;
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  if (samplePagination.page >= totalPages) samplePagination.page = totalPages - 1;
  const start = samplePagination.page * perPage;
  const pageItems = items.slice(start, start + perPage);

  sampleEmpty.hidden = true;
  if (sampleResults) sampleResults.hidden = false;
  sampleGrid.innerHTML = pageItems
    .map(({ actor, source }) => {
      const sourceTitle = source.title || source.category || `${actor.name} 샘플`;
      const representativeTags = getRepresentativeTags(source);
      const sampleTitleMarkup = representativeTags.length
        ? representativeTags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")
        : escapeHtml(sourceTitle);
      return `
        <article class="sample-card" data-actor="${actor.id}" tabindex="0" role="button" aria-label="${escapeHtml(actor.name)} ${escapeHtml(sourceTitle)} 프로필 보기">
          <div>
            <img class="avatar" src="${actor.profileImage || "assets/sample_profile-optimized.webp"}" alt="${escapeHtml(actor.name)} 프로필 사진" loading="lazy" decoding="async" />
            <p class="sample-card-meta">
              <strong>${escapeHtml(actor.name)}</strong>
              <span>${escapeHtml(actor.nameEn || "")}</span>
            </p>
            <p class="sample-card-title${representativeTags.length ? " has-tags" : ""}">${sampleTitleMarkup}</p>
            ${audioMarkup(sourceTitle, [source])}
            <p class="profile-card-hint">Profile <span>→</span></p>
          </div>
        </article>
      `;
    })
    .join("");
  samplePageButtons.forEach((button) => {
    const direction = button.dataset.samplePage;
    button.hidden = totalPages <= 1;
    button.disabled = direction === "prev" ? samplePagination.page === 0 : samplePagination.page >= totalPages - 1;
  });
  if (samplePageStatus) {
    samplePageStatus.hidden = totalPages <= 1;
    samplePageStatus.textContent = `${samplePagination.page + 1} / ${totalPages}`;
  }
  document.querySelectorAll(".sample-card").forEach((element) => element.classList.add("reveal"));
  setupAudioPlayers(sampleGrid);
  observeReveals();
}

function moveSamplePage(direction) {
  const totalPages = Math.max(1, Math.ceil(samplePagination.items.length / samplePagination.perPage));
  const nextPage = Math.min(Math.max(samplePagination.page + direction, 0), totalPages - 1);
  if (nextPage === samplePagination.page) return;
  stopActivePlayer();
  samplePagination.page = nextPage;
  renderSamplePage();
}

function clearSampleResults() {
  stopActivePlayer();
  samplePagination.items = [];
  samplePagination.page = 0;
  sampleGrid.innerHTML = "";
  if (sampleResults) sampleResults.hidden = true;
  if (samplePageStatus) {
    samplePageStatus.hidden = true;
    samplePageStatus.textContent = "";
  }
}

function renderActors() {
  actorGrid.innerHTML = actors
    .map(
      (actor) => `
        <button class="actor-card" type="button" data-actor="${actor.id}">
          <span class="actor-photo">
            <img src="${actor.profileImage || "assets/sample_profile-optimized.webp"}" alt="${actor.name} 프로필 사진" loading="lazy" decoding="async" />
          </span>
          <span class="actor-card-info">
            <span class="actor-card-role">Voice Actor</span>
            <strong>${actor.name}</strong>
            <span class="actor-card-en">${actor.nameEn}</span>
            <span class="actor-card-open" aria-hidden="true">View Profile</span>
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
  detailAvatar.innerHTML = `<img src="${actor.profileImage || "assets/sample_profile-optimized.webp"}" alt="${actor.name} 프로필 사진" loading="lazy" decoding="async" />`;
  detailName.textContent = actor.name;
  detailNameEn.textContent = actor.nameEn;
  detailHighlights.innerHTML = "";
  detailBio.textContent = actor.bio;
  detailCapabilities.textContent = getActorCapabilities(actor).join(" · ");

  detailAudioOptions = getProfileAudioOptions(actor);
  detailCareer.innerHTML = `
    <div class="profile-section-head">
      <span>CAREER</span>
      <h3>경력</h3>
    </div>
    <ul>
      ${getActorCareerItems(actor).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
  demoGrid.innerHTML = detailAudioOptions
    .map(
      (option, index) => `
        <button class="sample-choice" type="button" data-audio-option="${index}" aria-pressed="${index === 0 ? "true" : "false"}">
          ${escapeHtml(option.label)}
        </button>
      `,
    )
    .join("");
  renderDetailAudioOption(0);
  document.querySelectorAll(".sample-choice").forEach((element) => element.classList.add("reveal"));
  applyRevealTargets(actorDetail);
  actorDetail.hidden = false;
  fitTextToParent(detailName, { max: 43, min: 20 });
  resetPageReveals(actorDetail);
  document.querySelector("#members").hidden = true;
  setActiveNav("#members");
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

  const values = {
    gender: genderValues,
    ageRange: ageMap[actor.style] || [],
    tone: [...(toneMap[actor.tone] || []), ...(toneMap[actor.mood] || [])],
    texture: actor.gender === "male" ? ["중저음", "저음"] : ["고음"],
    emotion: toneMap[actor.mood] || [],
    language: ["한국어"],
    characterType: categoryMap[actor.category] || [],
  };
  getSearchAudioSources(actor).forEach((source) => mergeCategoryValues(values, source.categories));
  return values;
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

function setContactMode(mode, shouldScroll = false) {
  if (!contactForm || !teamContactPanel) return;
  const isTeamMode = mode === "team";
  const generalFields = [...contactForm.children].filter((element) =>
    element.matches("label, fieldset.contact-choice, .contact-extra-grid")
  );
  const generalInputs = generalFields.flatMap((element) => [
    ...element.querySelectorAll("input, select, textarea"),
  ]);
  const teamInputs = [...teamContactPanel.querySelectorAll("input, select, textarea")];

  contactForm.classList.toggle("is-team-mode", isTeamMode);
  teamContactPanel.hidden = !isTeamMode;
  if (contactModeInput) contactModeInput.value = isTeamMode ? "team" : "general";

  generalFields.forEach((element) => {
    element.hidden = isTeamMode;
  });
  generalInputs.forEach((input) => {
    input.disabled = isTeamMode;
  });
  teamInputs.forEach((input) => {
    input.disabled = !isTeamMode;
  });

  if (shouldScroll) {
    contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function syncFileUploadUi() {
  if (!fileInput || !fileUploadName) return;
  const selectedFile = fileInput.files[0];
  if (selectedFile && selectedFile.size > maxAttachmentSize) {
    fileInput.value = "";
    fileUploadName.textContent = contactLocales[activeContactLocale].text.fileNone;
    if (fileUploadActions) fileUploadActions.hidden = true;
    if (statusEl) statusEl.textContent = contactLocales[activeContactLocale].text.fileTooLarge;
    showContactStatusBar(contactLocales[activeContactLocale].text.fileTooLarge, "warning", 6200);
    return;
  }
  fileUploadName.textContent = selectedFile?.name || contactLocales[activeContactLocale].text.fileNone;
  if (fileUploadActions) fileUploadActions.hidden = !selectedFile;
  if (selectedFile && statusEl?.textContent === contactLocales[activeContactLocale].text.fileTooLarge) {
    statusEl.textContent = "";
    hideContactStatusBar();
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

function getEmptyFilterValues() {
  return filterGroups.reduce((values, group) => {
    values[group.key] = [];
    return values;
  }, {});
}

function getAudioSourceFilterValues(actor, source = {}) {
  const sourceCategories = source.categories && typeof source.categories === "object" ? source.categories : null;
  const hasSourceCategories = sourceCategories && Object.values(sourceCategories).some((values) => Array.isArray(values) ? values.length : `${values || ""}`.trim());
  if (!hasSourceCategories) return getActorFilterValues(actor);

  const values = getEmptyFilterValues();
  mergeCategoryValues(values, sourceCategories);
  if (!values.gender.length) values.gender = actor.gender === "male" ? ["남자"] : actor.gender === "female" ? ["여자"] : [];
  return values;
}

function audioSourceMatchesFilters(actor, source, filters) {
  const sourceValues = getAudioSourceFilterValues(actor, source);
  const selectedEntries = Object.entries(filters).filter(([, values]) => values.length);
  return selectedEntries.every(([key, values]) => values.every((value) => sourceValues[key]?.includes(value)));
}

function countAudioSourcesForFilters(filters) {
  return actors.reduce((count, actor) => {
    const sources = getSearchAudioSources(actor);
    return count + sources.filter((source) => audioSourceMatchesFilters(actor, source, filters)).length;
  }, 0);
}

function filtersWithOption(baseFilters, groupKey, optionValue) {
  const nextFilters = filterGroups.reduce((filters, group) => {
    filters[group.key] = [...(baseFilters[group.key] || [])];
    return filters;
  }, {});
  if (!nextFilters[groupKey].includes(optionValue)) nextFilters[groupKey].push(optionValue);
  return nextFilters;
}

function updateFilterOptionCounts() {
  if (!filterControls) return;
  const currentFilters = selectedFilterValues();
  filterControls.querySelectorAll("[data-filter-option]").forEach((optionEl) => {
    const groupKey = optionEl.dataset.group;
    const optionValue = optionEl.dataset.value;
    const filters = filtersWithOption(currentFilters, groupKey, optionValue);
    const count = countAudioSourcesForFilters(filters);
    const countEl = optionEl.querySelector(".filter-option-count");
    if (countEl) countEl.textContent = `${count}`;
  });
}

function restoreFilterSelections(selections = {}) {
  Object.entries(selections).forEach(([groupKey, values]) => {
    values.forEach((value) => {
      const input = filterControls.querySelector(`input[name="${groupKey}"][value="${CSS.escape(value)}"]`);
      if (input) input.checked = true;
    });
    updateFilterSummary(groupKey);
  });
  updateFilterOptionCounts();
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
  filterForm.style.removeProperty("--filter-panel-space");
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
                      <span class="filter-option-label" data-filter-option data-group="${group.key}" data-value="${option.value}">
                        <span>${option.label}</span>
                        <em class="filter-option-count">0</em>
                      </span>
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
  updateFilterOptionCounts();
}

function filterSamples() {
  const filters = selectedFilterValues();
  const hasFilter = Object.values(filters).some((values) => values.length);
  if (!hasFilter) {
    clearSampleResults();
    sampleEmpty.hidden = false;
    sampleEmpty.textContent = "카테고리를 하나 이상 선택하고 검색해 주세요.";
    return;
  }

  const filtered = actors
    .map((actor) => ({
      ...actor,
      audioSources: getSearchAudioSources(actor).filter((source) => audioSourceMatchesFilters(actor, source, filters)),
    }))
    .filter((actor) => actor.audioSources.length);
  if (!filtered.length) {
    clearSampleResults();
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

function newsArchive(article) {
  return `${article.datetime || article.date || ""}`.slice(0, 7).replace("-", ".");
}

function newsCategoryString(article) {
  return (article.categories || []).join(" ");
}

function renderNewsCard(article, featured = false) {
  const tags = (article.categories || []).map((category) => `<span>${escapeHtml(category)}</span>`).join("");
  const image = escapeHtml(article.image || "assets/chips-hero-optimized.webp");
  const title = escapeHtml(article.title || "");
  const lead = escapeHtml(article.lead || "");
  const date = escapeHtml(article.date || article.datetime || "");
  const id = escapeHtml(article.id || "");
  const category = escapeHtml(newsCategoryString(article));
  const archive = escapeHtml(newsArchive(article));

  if (featured) {
    return `
      <article class="news-feature" data-news-id="${id}" data-news-category="${category}" data-news-archive="${archive}" tabindex="0" role="button">
        <div class="news-feature-visual">
          <img src="${image}" alt="${title}" />
        </div>
        <div class="news-feature-copy">
          <time datetime="${escapeHtml(article.datetime || "")}">${date}</time>
          <p class="news-tags">${tags}</p>
          <h3>${title}</h3>
          <p>${lead}</p>
          <p class="news-more">Read more <span>→</span></p>
        </div>
      </article>
    `;
  }

  return `
    <article class="news-item" data-news-id="${id}" data-news-category="${category}" data-news-archive="${archive}" tabindex="0" role="button">
      <img class="news-thumb" src="${image}" alt="${title}" />
      <div class="news-item-copy">
        <time datetime="${escapeHtml(article.datetime || "")}">${date}</time>
        <p class="news-tags">${tags}</p>
        <h3>${title}</h3>
        <p>${lead}</p>
        <p class="news-more">Read more <span>→</span></p>
      </div>
    </article>
  `;
}

function renderTopNewsCard(article) {
  const image = escapeHtml(article.image || "assets/chips-hero-optimized.webp");
  const title = escapeHtml(article.title || "");
  return `
    <article class="top-news-card" data-news-id="${escapeHtml(article.id || "")}" tabindex="0" role="button">
      <img src="${image}" alt="${title}" />
      <div>
        <time datetime="${escapeHtml(article.datetime || "")}">${escapeHtml(article.date || article.datetime || "")}</time>
        <h3>${title}</h3>
        <p>View detail <span>→</span></p>
      </div>
    </article>
  `;
}

function renderNewsSidebar() {
  const sidebar = document.querySelector(".news-sidebar");
  if (!sidebar) return;
  const categories = [...new Set(newsArticles.flatMap((article) => article.categories || []))].filter(Boolean);
  const archives = [...new Set(newsArticles.map(newsArchive).filter(Boolean))];
  sidebar.innerHTML = `
    <div class="news-sidebar-card">
      <h3>Category</h3>
      <button class="news-filter-link is-active" type="button" data-news-filter="all">All</button>
      ${categories
        .map((category) => `<button class="news-filter-link" type="button" data-news-filter="category" data-filter-value="${escapeHtml(category)}">${escapeHtml(category)}</button>`)
        .join("")}
    </div>
    <div class="news-sidebar-card">
      <h3>Archive</h3>
      ${archives
        .map((archive) => `<button class="news-filter-link" type="button" data-news-filter="archive" data-filter-value="${escapeHtml(archive)}">${escapeHtml(archive)}</button>`)
        .join("")}
    </div>
  `;
  newsFilterLinks = [...document.querySelectorAll(".news-filter-link")];
}

function renderNewsArticles() {
  const newsMain = document.querySelector(".news-main");
  if (!newsMain || !newsArticles.length) return;
  const [feature, ...rest] = newsArticles;
  newsMain.innerHTML = `
    ${renderNewsCard(feature, true)}
    <div class="news-list">${rest.map((article) => renderNewsCard(article)).join("")}</div>
  `;
  if (topNewsRail) {
    topNewsRail.innerHTML = newsArticles.slice(0, 6).map(renderTopNewsCard).join("");
  }
  renderNewsSidebar();
  newsCards = [...document.querySelectorAll(".news-feature, .news-item")];
  fitNewsPreviewTitles();
}

function fitNewsPreviewTitles() {
  const titles = document.querySelectorAll(".top-news-card h3, .news-feature h3, .news-item h3");
  titles.forEach((title) => {
    const max = title.closest(".news-feature") ? 30 : title.closest(".top-news-card") ? 19 : 18;
    fitTextToParent(title, { max, min: 12 });
  });
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
      <p class="news-tags">${article.categories.map((category) => `<span>${escapeHtml(category)}</span>`).join("")}</p>
      <time datetime="${escapeHtml(article.datetime)}">${escapeHtml(article.date)}</time>
      <h2>${escapeHtml(article.title)}</h2>
      <p>${escapeHtml(article.lead)}</p>
    </header>
    <img class="news-article-image" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" />
    <div class="news-article-body">
      ${article.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
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
  const navItems = newsArticleContent.querySelectorAll(".news-article-nav a, .news-article-nav span");
  const navLabels = ["← 이전 글", "목록으로", "다음 글 →"];
  navItems.forEach((item, itemIndex) => {
    item.textContent = navLabels[itemIndex] || item.textContent;
  });
}

function setPlayerLoading(player, isLoading) {
  if (!player) return;
  player.classList.toggle("is-loading", isLoading);
  player.setAttribute("aria-busy", isLoading ? "true" : "false");
}

function setPlayerError(player, hasError) {
  if (!player) return;
  player.classList.toggle("is-error", hasError);
}

function resetPlayer(player, resetTime = false) {
  const audio = player.querySelector("audio");
  const button = player.querySelector(".play-button");
  const progress = player.querySelector(".wave span");
  const time = player.querySelector(".time-left");

  audio.pause();
  setPlayerLoading(player, false);
  setPlayerError(player, false);
  if (resetTime) audio.currentTime = 0;
  button.textContent = "▶";
  if (progress && resetTime) progress.style.width = "0%";
  if (time && audio.duration) time.textContent = formatTime(resetTime ? audio.duration : audio.duration - audio.currentTime);
}

function togglePlayer(player) {
  if (!player) return;
  const audio = player.querySelector("audio");
  const button = player.querySelector(".play-button");

  if (activePlayer && activePlayer !== player) resetPlayer(activePlayer);

  if (audio.paused) {
    activePlayer = player;
    setPlayerError(player, false);
    setPlayerLoading(player, true);
    player.dataset.playRetry = "";
    audio
      .play()
      .then(() => {
        if (activePlayer !== player || audio.paused) return;
        setPlayerLoading(player, false);
        button.textContent = "Ⅱ";
      })
      .catch(() => {
        if (activePlayer !== player) return;
        if (!audio.error && player.dataset.playRetry !== "true") {
          player.dataset.playRetry = "true";
          audio.load();
          audio.addEventListener(
            "canplay",
            () => {
              if (activePlayer !== player || !audio.paused) return;
              audio
                .play()
                .then(() => {
                  if (activePlayer !== player || audio.paused) return;
                  setPlayerLoading(player, false);
                  setPlayerError(player, false);
                  button.textContent = "Ⅱ";
                })
                .catch(() => {
                  if (activePlayer !== player) return;
                  setPlayerLoading(player, false);
                  setPlayerError(player, true);
                  activePlayer = null;
                  button.textContent = "▶";
                });
            },
            { once: true },
          );
          return;
        }
        setPlayerLoading(player, false);
        setPlayerError(player, true);
        if (activePlayer === player) activePlayer = null;
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
    if (volume) volume.value = `${preferredAudioVolume}`;
    audio.volume = volume ? Number(volume.value) : preferredAudioVolume;
    const syncDuration = () => {
      if (time && audio.duration) time.textContent = formatTime(audio.duration);
    };
    const syncRemaining = () => {
      if (time && audio.duration) time.textContent = formatTime(audio.duration - audio.currentTime);
    };

    audio.addEventListener("loadstart", () => {
      if (activePlayer === player) setPlayerLoading(player, true);
    });

    audio.addEventListener("loadedmetadata", () => {
      setPlayerLoading(player, false);
      syncDuration();
    });

    audio.addEventListener("durationchange", syncDuration);

    audio.addEventListener("waiting", () => {
      if (activePlayer === player) setPlayerLoading(player, true);
    });

    audio.addEventListener("stalled", () => {
      if (activePlayer === player) setPlayerLoading(player, true);
    });

    audio.addEventListener("canplay", () => {
      setPlayerLoading(player, false);
    });

    audio.addEventListener("playing", () => {
      setPlayerLoading(player, false);
      setPlayerError(player, false);
      syncRemaining();
    });

    audio.addEventListener("timeupdate", () => {
      const ratio = audio.duration ? audio.currentTime / audio.duration : 0;
      progress.style.width = `${Math.min(ratio * 100, 100)}%`;
      syncRemaining();
    });

    audio.addEventListener("error", () => {
      setPlayerLoading(player, false);
      setPlayerError(player, true);
      time.textContent = "ERR";
      if (activePlayer === player) activePlayer = null;
    });

    audio.addEventListener("ended", () => {
      if (activePlayer === player) activePlayer = null;
      resetPlayer(player, true);
    });

    if (volume) {
      volume.addEventListener("input", () => {
        preferredAudioVolume = Number(volume.value);
        audio.volume = preferredAudioVolume;
      });
    }

    if (audio.preload === "metadata") audio.load();
    syncDuration();
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
    updateFilterOptionCounts();
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

  const samplePageButton = event.target.closest("[data-sample-page]");
  if (samplePageButton) {
    event.stopPropagation();
    moveSamplePage(samplePageButton.dataset.samplePage === "next" ? 1 : -1);
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

  const audioOptionButton = event.target.closest("[data-audio-option]");
  if (audioOptionButton) {
    event.stopPropagation();
    renderDetailAudioOption(Number(audioOptionButton.dataset.audioOption), { autoplay: true });
    return;
  }

  const actorButton = event.target.closest("[data-actor]");
  if (actorButton && !event.target.closest(".sample-player") && !event.target.closest("[data-audio-option]")) openActor(actorButton.dataset.actor);
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
  updateFilterOptionCounts();
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
const heroVideo = document.querySelector(".hero-video");
const heroPosterPan = document.querySelector(".hero-poster-pan");
const voiceSampleSection = document.querySelector("#voice-sample");
let heroWheelScrollLocked = false;
let voiceSampleWheelScrollLocked = false;
let heroVideoLoopCount = 0;
let heroVideoLastTime = 0;
let heroPosterActive = false;

function resetHeroVideoLoopCounter() {
  heroVideoLoopCount = 0;
  heroVideoLastTime = heroVideo?.currentTime || 0;
}

function showHeroPosterPan() {
  return;
}

function hideHeroPosterPan() {
  if (!heroSection || !heroVideo) return;
  heroSection.classList.remove("is-poster-active");
  heroPosterActive = false;
  heroVideo.currentTime = 0;
  resetHeroVideoLoopCounter();
  heroVideo.play?.().catch(() => {});
}

function countHeroVideoLoop() {
  return;
}

heroVideo?.addEventListener("loadedmetadata", resetHeroVideoLoopCounter);
heroVideo?.addEventListener("timeupdate", countHeroVideoLoop);
heroVideo?.addEventListener("ended", () => {
  if (heroPosterActive) return;
  heroVideoLoopCount += 1;
  if (heroVideoLoopCount >= 1) showHeroPosterPan();
});
heroPosterPan?.addEventListener("animationend", (event) => {
  if (event.animationName === "heroPosterCrossfade") hideHeroPosterPan();
});

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
  document.addEventListener(
    "wheel",
    (event) => {
      const openFilterPanel = filterControls.querySelector(".filter-dropdown.is-open .filter-panel");
      if (!openFilterPanel) return;

      const panelRect = openFilterPanel.getBoundingClientRect();
      const isInsideOpenPanel =
        event.clientX >= panelRect.left &&
        event.clientX <= panelRect.right &&
        event.clientY >= panelRect.top &&
        event.clientY <= panelRect.bottom;

      if (!isInsideOpenPanel) return;

      event.preventDefault();
      event.stopPropagation();
      openFilterPanel.scrollTop += event.deltaY;
    },
    { capture: true, passive: false },
  );

  filterControls.addEventListener("wheel", (event) => {
    if (event.target.closest(".filter-panel")) {
      event.stopPropagation();
    }
  });

  voiceSampleSection.addEventListener(
    "wheel",
    (event) => {
      if (filterControls.querySelector(".filter-dropdown.is-open")) return;

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
  stopActivePlayer();
  homePage.hidden = true;
  appPages.forEach((page) => {
    page.hidden = true;
  });
  actorDetail.hidden = true;
  document.querySelector("#members").hidden = false;
  setActiveNav("#members");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#back-to-news").addEventListener("click", () => {
  navigateTo("#news");
});

document.querySelector("#scroll-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

teamJoinTrigger?.addEventListener("click", () => setContactMode("team", true));
teamContactBack?.addEventListener("click", () => setContactMode("general", true));
setContactMode("general");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector(".submit-button");
  if (fileInput?.files[0] && fileInput.files[0].size > maxAttachmentSize) {
    fileInput.value = "";
    syncFileUploadUi();
    statusEl.textContent = contactLocales[activeContactLocale].text.fileTooLarge;
    showContactStatusBar(contactLocales[activeContactLocale].text.fileTooLarge, "warning", 6200);
    return;
  }
  const data = new FormData(form);
  const isTeamInquiry = data.get("contact_mode") === "team";

  data.set(
    "subject",
    isTeamInquiry
      ? `[CHIPS 팀 가입 문의] ${data.get("team_name")}님 문의`
      : `[CHIPS 문의] ${data.get("name")}님 문의`
  );

  submitButton.disabled = true;
  contactToast.hidden = true;
  statusEl.textContent = contactLocales[activeContactLocale].status.sending;
  showContactStatusBar(contactLocales[activeContactLocale].status.sending, "info", 0);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
    });

    if (!response.ok) throw new Error("Basin request failed");

    form.reset();
    setContactMode(isTeamInquiry ? "team" : "general");
    statusEl.textContent = "";
    hideContactStatusBar();
    contactToast.hidden = false;
    contactToastClose?.focus();
  } catch (error) {
    statusEl.textContent = contactLocales[activeContactLocale].status.error;
    showContactStatusBar(contactLocales[activeContactLocale].status.error, "error", 7000);
  } finally {
    submitButton.disabled = false;
  }
});

contactToastClose?.addEventListener("click", hideContactSuccessUi);

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
  const currentHash = window.location.hash || "#top";
  if (currentHash === hash) {
    const appHashes = ["#news", "#members", "#services", "#contact"];
    const targetPage = document.querySelector(hash);
    if (hash === "#members" && !actorDetail.hidden) {
      showRoute();
      return;
    }
    if (appHashes.includes(hash) && targetPage && !targetPage.hidden) {
      setActiveNav(hash);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (hash === "#voice-sample") {
      document.querySelector("#voice-sample").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (hash === "#info") {
      document.querySelector("#info").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (hash === "#top") {
      setActiveNav("#top");
      document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
      return;
    }
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

function observeReveals(scope = document) {
  scope.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

function resetPageReveals(page) {
  page.querySelectorAll(".reveal").forEach((element) => {
    element.classList.remove("is-visible");
    revealObserver.observe(element);
  });
}

function showRoute() {
  stopActivePlayer();
  const hash = window.location.hash || "#top";
  if (hash !== "#contact") hideContactSuccessUi();
  if (hash === "#actors") {
    window.history.replaceState(null, "", "#members");
    showRoute();
    return;
  }
  const articleMatch = hash.match(/^#news-article-(.+)$/);
  const isAppPage = ["#news", "#members", "#services", "#contact"].includes(hash) || Boolean(articleMatch);
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
      applyRevealTargets(page);
      resetPageReveals(page);
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

function getDriveFileId(url = "") {
  const value = `${url}`.trim();
  if (!value.includes("drive.google.com") && !value.includes("drive.usercontent.google.com")) return "";
  const fileId = value.match(/\/d\/([^/]+)/)?.[1] || value.match(/[?&]id=([^&]+)/)?.[1];
  return fileId || "";
}

function normalizeDriveLink(url = "") {
  const value = `${url}`.trim();
  if (!value.includes("drive.google.com") && !value.includes("drive.usercontent.google.com")) return value;
  const fileId = getDriveFileId(value);
  return fileId ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download` : value;
}

function normalizeDriveAudioLink(url = "") {
  const value = `${url}`.trim();
  const fileId = getDriveFileId(value);
  const canUseLocalProxy = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  if (fileId && canUseLocalProxy) return `/api/drive-audio/${fileId}`;
  return normalizeDriveLink(value);
}

function normalizeAudioSources(sources = []) {
  return sources
    .filter(Boolean)
    .map((source) => ({
      ...source,
      src: normalizeDriveAudioLink(source.src || source.audio_src || ""),
      type: source.type || source.audio_type || "audio/mpeg",
      representativeTags: Array.isArray(source.representativeTags)
        ? source.representativeTags
        : `${source.representativeTags || source.representative_tags || ""}`.split(",").map((value) => value.trim()).filter(Boolean),
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
    highlights: Array.isArray(actor.highlights) ? actor.highlights : `${actor.highlights || ""}`.split(/\n|,/).map((value) => value.trim()).filter(Boolean),
    capabilities: Array.isArray(actor.capabilities) ? actor.capabilities : `${actor.capabilities || ""}`.split(",").map((value) => value.trim()).filter(Boolean),
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
    const remoteCmsUrl = "https://pub-5389c605b3bf46fea66c1657cc99e91d.r2.dev/cms/cms-data.json";
    const isLocalPreview = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
    const cmsUrls = isLocalPreview ? ["data/cms-data.json", remoteCmsUrl] : [remoteCmsUrl, "data/cms-data.json"];
    let response = null;
    for (const cmsUrl of cmsUrls) {
      response = await fetch(cmsUrl, { cache: "no-store" });
      if (response.ok) break;
    }
    if (!response.ok) return;

    const cmsData = await response.json();
    if (cmsData.enabled === false) return;

    if (Array.isArray(cmsData.sampleAudioSources)) {
      sampleAudioSources = normalizeAudioSources(cmsData.sampleAudioSources);
    }

    if (Array.isArray(cmsData.actors)) {
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
  renderNewsArticles();
  renderActors();
  clearSampleResults();
  sampleEmpty.hidden = false;
  applyContactLocale(activeContactLocale);
  observeReveals();
  setupAudioPlayers();
  showRoute();
}

initializeSite();
window.addEventListener("hashchange", showRoute);
window.addEventListener("resize", () => {
  if (!actorDetail.hidden) fitTextToParent(detailName, { max: 43, min: 20 });
  fitNewsPreviewTitles();
});
window.addEventListener("pagehide", stopActivePlayer);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopActivePlayer();
});
