// Curated Spanish learning videos for toddlers
// thumbnailId is the YouTube video ID used for both thumbnail and playback
// To add more: find a YouTube video, copy the ID from the URL (youtube.com/watch?v=XXXX)
// tags: curriculum unit IDs whose vocabulary relates to this video

export const VIDEO_CATEGORIES = [
  { id: 'songs',  label: 'Songs',  labelEs: 'Canciones', emoji: '🎵' },
  { id: 'shows',  label: 'Shows',  labelEs: 'Programas', emoji: '📺' },
  { id: 'learn',  label: 'Learn',  labelEs: 'Aprender',  emoji: '📚' },
];

export const VIDEOS = [
  // ── Songs ──────────────────────────────────────────────
  {
    id: 'baby-shark-es',
    title: 'Baby Shark',
    titleEs: 'Tiburón Bebé',
    channel: 'Pinkfong',
    categoryId: 'songs',
    youtubeId: 'XqZsoesa55w',
    emoji: '🦈',
    bgColor: '#D6F0FF',
    tags: ['animals'],
  },
  {
    id: 'wheels-bus-es',
    title: 'Wheels on the Bus',
    titleEs: 'Las Ruedas del Autobús',
    channel: 'Cocomelon en Español',
    categoryId: 'songs',
    youtubeId: 'e_04ZrNroTo',
    emoji: '🚌',
    bgColor: '#FFF0D6',
    tags: ['transport'],
  },
  {
    id: 'pollitos',
    title: 'Los Pollitos',
    titleEs: 'Los Pollitos Dicen',
    channel: 'Canciones Infantiles',
    categoryId: 'songs',
    youtubeId: 'OaJGcmBSW30',
    emoji: '🐥',
    bgColor: '#FFFBD6',
    tags: ['animals', 'food'],
  },
  {
    id: 'abc-espanol',
    title: 'ABC Song in Spanish',
    titleEs: 'El Abecedario',
    channel: 'Basho & Friends',
    categoryId: 'songs',
    youtubeId: 'TFGMu_ENJDQ',
    emoji: '🔤',
    bgColor: '#EDD6FF',
    tags: ['school'],
  },
  {
    id: 'colors-song',
    title: 'Colors Song',
    titleEs: 'Canción de Colores',
    channel: 'Pinkfong',
    categoryId: 'songs',
    youtubeId: 'zjE96fZFTFk',
    emoji: '🎨',
    bgColor: '#FFD6F0',
    tags: ['colors-numbers'],
  },
  // ── Shows ───────────────────────────────────────────────
  {
    id: 'peppa-es',
    title: 'Peppa Pig',
    titleEs: 'Peppa Pig en Español',
    channel: 'Peppa Pig en Español',
    categoryId: 'shows',
    youtubeId: 'kFpSEGPbkMc',
    emoji: '🐷',
    bgColor: '#FFD6E8',
    tags: ['animals', 'family'],
  },
  {
    id: 'pocoyo-es',
    title: 'Pocoyo',
    titleEs: 'Pocoyó en Español',
    channel: 'Pocoyó',
    categoryId: 'shows',
    youtubeId: 'GlWGpEPFpGU',
    emoji: '👦',
    bgColor: '#D6E8FF',
    tags: ['actions', 'colors-numbers'],
  },
  {
    id: 'blippi-es',
    title: 'Blippi',
    titleEs: 'Blippi en Español',
    channel: 'Blippi Español',
    categoryId: 'shows',
    youtubeId: 'PNdnhj6oM6k',
    emoji: '🎪',
    bgColor: '#D6FFEE',
    tags: ['transport', 'school'],
  },
  // ── Learn ───────────────────────────────────────────────
  {
    id: 'numbers-es',
    title: 'Count to 10',
    titleEs: 'Contar hasta 10',
    channel: 'Pinkfong',
    categoryId: 'learn',
    youtubeId: 'DR-cfDsHCGA',
    emoji: '🔢',
    bgColor: '#D6FFD6',
    tags: ['colors-numbers'],
  },
  {
    id: 'animals-es',
    title: 'Animal Sounds',
    titleEs: 'Sonidos de Animales',
    channel: 'Pinkfong',
    categoryId: 'learn',
    youtubeId: 'vZBuMoqFdrc',
    emoji: '🐾',
    bgColor: '#FFE8D6',
    tags: ['animals'],
  },
  {
    id: 'greetings-es',
    title: 'Greetings in Spanish',
    titleEs: 'Saludos en Español',
    channel: 'Spanish for Kids',
    categoryId: 'learn',
    youtubeId: 'kGGuEMQbFQk',
    emoji: '👋',
    bgColor: '#D6F8FF',
    tags: ['actions'],
  },
];

export const getVideosByCategory = (categoryId) =>
  VIDEOS.filter((v) => v.categoryId === categoryId);

export const getVideoById = (id) => VIDEOS.find((v) => v.id === id) ?? null;

export const getThumbnailUrl = (youtubeId) =>
  `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

// hl=es  → Spanish YouTube UI
// cc_load_policy=1 + cc_lang_pref=es → prefer Spanish captions
// rel=0  → no related videos at end
// iv_load_policy=3 → hide annotations
// modestbranding=1 → minimal YouTube branding
// playsinline=1 → play inside the WebView (iOS)
export const getEmbedUrl = (youtubeId) =>
  `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&hl=es&cc_lang_pref=es&cc_load_policy=1&playsinline=1`;
