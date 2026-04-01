// Curated Spanish learning videos for toddlers
// thumbnailId is the YouTube video ID used for both thumbnail and playback
// To add more: find a YouTube video, copy the ID from the URL (youtube.com/watch?v=XXXX)

export const VIDEO_CATEGORIES = [
  {
    id: 'songs',
    label: 'Songs',
    labelEs: 'Canciones',
    emoji: '🎵',
  },
  {
    id: 'shows',
    label: 'Shows',
    labelEs: 'Programas',
    emoji: '📺',
  },
  {
    id: 'learn',
    label: 'Learn',
    labelEs: 'Aprender',
    emoji: '📚',
  },
];

export const VIDEOS = [
  // Songs
  {
    id: 'baby-shark-es',
    title: 'Baby Shark',
    titleEs: 'Tiburón Bebé',
    channel: 'Pinkfong',
    categoryId: 'songs',
    youtubeId: 'XqZsoesa55w',
    emoji: '🦈',
    bgColor: '#D6F0FF',
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
  },
  // Shows
  {
    id: 'peppa-es',
    title: 'Peppa Pig',
    titleEs: 'Peppa Pig en Español',
    channel: 'Peppa Pig en Español',
    categoryId: 'shows',
    youtubeId: 'kFpSEGPbkMc',
    emoji: '🐷',
    bgColor: '#FFD6E8',
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
  },
  // Learn
  {
    id: 'numbers-es',
    title: 'Count to 10',
    titleEs: 'Contar hasta 10',
    channel: 'Pinkfong',
    categoryId: 'learn',
    youtubeId: 'DR-cfDsHCGA',
    emoji: '🔢',
    bgColor: '#D6FFD6',
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
  },
];

export const getVideosByCategory = (categoryId) =>
  VIDEOS.filter((v) => v.categoryId === categoryId);

export const getThumbnailUrl = (youtubeId) =>
  `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

export const getEmbedUrl = (youtubeId) =>
  `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
