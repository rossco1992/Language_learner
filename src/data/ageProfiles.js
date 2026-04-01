export const AGE_PROFILES = {
  toddler: {
    id: 'toddler',
    label: 'Little Explorer',
    ageRange: '1–3 years',
    emoji: '🐣',
    gradient: ['#FF6B6B', '#FF8E53'],
    showInterval: 5000,   // 5 seconds per card
    gameChoices: 2,       // 2 answer choices
    vocabLevel: 1,        // basic words only
    showPhrases: false,
    description: 'Simple words, big pictures, slow & fun!',
    descriptionEs: '¡Palabras simples y diversión!',
    color: '#FF6B6B',
  },
  preschool: {
    id: 'preschool',
    label: 'Growing Learner',
    ageRange: '3–5 years',
    emoji: '🌱',
    gradient: ['#43E97B', '#38F9D7'],
    showInterval: 3500,
    gameChoices: 3,
    vocabLevel: 2,
    showPhrases: false,
    description: 'More words, greetings, growing fast!',
    descriptionEs: '¡Más palabras y saludos!',
    color: '#43E97B',
  },
  learner: {
    id: 'learner',
    label: 'Super Learner',
    ageRange: '5–8 years',
    emoji: '⭐',
    gradient: ['#A18CD1', '#FBC2EB'],
    showInterval: 2500,
    gameChoices: 4,
    vocabLevel: 3,
    showPhrases: true,
    description: 'Phrases, sentences & real conversations!',
    descriptionEs: '¡Frases y conversaciones reales!',
    color: '#A18CD1',
  },
};

export const AGE_PROFILE_LIST = Object.values(AGE_PROFILES);
