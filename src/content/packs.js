// Content packs — MVP: 4 packs, ~10 words each
// Schema matches the plan's content model.
// activityTypes: which activities this word supports
// difficulty: 1 = easiest (used for ordering within pack)
//
// Audio: place recorded mp3s at assets/audio/<wordId>.mp3
// The audioManager will use them automatically.

export const PACKS = [
  // ─────────────────────────────────────────────
  // PACK 1: ANIMALS (free starter)
  // ─────────────────────────────────────────────
  {
    id: 'animals',
    title: 'Animals',
    titleEs: 'Animales',
    emoji: '🐾',
    gradient: ['#FF6B6B', '#FF8E53'],
    free: true,
    words: [
      { id: 'perro',    es: 'Perro',    en: 'Dog',      emoji: '🐶', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'gato',     es: 'Gato',     en: 'Cat',      emoji: '🐱', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'pajaro',   es: 'Pájaro',   en: 'Bird',     emoji: '🐦', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'pez',      es: 'Pez',      en: 'Fish',     emoji: '🐟', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'vaca',     es: 'Vaca',     en: 'Cow',      emoji: '🐮', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'caballo',  es: 'Caballo',  en: 'Horse',    emoji: '🐴', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'elefante', es: 'Elefante', en: 'Elephant', emoji: '🐘', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'leon',     es: 'León',     en: 'Lion',     emoji: '🦁', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'mono',     es: 'Mono',     en: 'Monkey',   emoji: '🐒', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'pato',     es: 'Pato',     en: 'Duck',     emoji: '🦆', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'conejo',   es: 'Conejo',   en: 'Rabbit',   emoji: '🐰', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'oso',      es: 'Oso',      en: 'Bear',     emoji: '🐻', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
    ],
  },

  // ─────────────────────────────────────────────
  // PACK 2: FOOD
  // ─────────────────────────────────────────────
  {
    id: 'food',
    title: 'Food',
    titleEs: 'Comida',
    emoji: '🍎',
    gradient: ['#F7971E', '#FFD200'],
    free: false,
    words: [
      { id: 'manzana',  es: 'Manzana',  en: 'Apple',     emoji: '🍎', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'platano',  es: 'Plátano',  en: 'Banana',    emoji: '🍌', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'leche',    es: 'Leche',    en: 'Milk',      emoji: '🥛', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'agua',     es: 'Agua',     en: 'Water',     emoji: '💧', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'pan',      es: 'Pan',      en: 'Bread',     emoji: '🍞', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'huevo',    es: 'Huevo',    en: 'Egg',       emoji: '🥚', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'queso',    es: 'Queso',    en: 'Cheese',    emoji: '🧀', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'zanahoria',es: 'Zanahoria',en: 'Carrot',    emoji: '🥕', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'naranja',  es: 'Naranja',  en: 'Orange',    emoji: '🍊', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'pizza',    es: 'Pizza',    en: 'Pizza',     emoji: '🍕', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'helado',   es: 'Helado',   en: 'Ice Cream', emoji: '🍦', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'fresa',    es: 'Fresa',    en: 'Strawberry',emoji: '🍓', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
    ],
  },

  // ─────────────────────────────────────────────
  // PACK 3: FAMILY
  // ─────────────────────────────────────────────
  {
    id: 'family',
    title: 'Family',
    titleEs: 'Familia',
    emoji: '👨‍👩‍👧',
    gradient: ['#11998E', '#38EF7D'],
    free: false,
    words: [
      { id: 'mama',    es: 'Mamá',    en: 'Mom',      emoji: '👩', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'papa',    es: 'Papá',    en: 'Dad',      emoji: '👨', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'bebe',    es: 'Bebé',    en: 'Baby',     emoji: '👶', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'abuela',  es: 'Abuela',  en: 'Grandma',  emoji: '👵', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'abuelo',  es: 'Abuelo',  en: 'Grandpa',  emoji: '👴', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'hermano', es: 'Hermano', en: 'Brother',  emoji: '👦', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'hermana', es: 'Hermana', en: 'Sister',   emoji: '👧', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'tio',     es: 'Tío',     en: 'Uncle',    emoji: '🧔', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'tia',     es: 'Tía',     en: 'Aunt',     emoji: '👩‍🦱', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'amigo',   es: 'Amigo',   en: 'Friend',   emoji: '🤝', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
    ],
  },

  // ─────────────────────────────────────────────
  // PACK 4: BODY PARTS
  // ─────────────────────────────────────────────
  {
    id: 'body',
    title: 'My Body',
    titleEs: 'Mi Cuerpo',
    emoji: '👶',
    gradient: ['#8B5CF6', '#EC4899'],
    free: false,
    words: [
      { id: 'cabeza',  es: 'Cabeza',  en: 'Head',    emoji: '🧠', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'ojos',    es: 'Ojos',    en: 'Eyes',    emoji: '👀', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'nariz',   es: 'Nariz',   en: 'Nose',    emoji: '👃', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'boca',    es: 'Boca',    en: 'Mouth',   emoji: '👄', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'orejas',  es: 'Orejas',  en: 'Ears',    emoji: '👂', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'manos',   es: 'Manos',   en: 'Hands',   emoji: '🙌', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'pies',    es: 'Pies',    en: 'Feet',    emoji: '🦶', difficulty: 1, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'barriga', es: 'Barriga', en: 'Belly',   emoji: '🫃', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'dedo',    es: 'Dedo',    en: 'Finger',  emoji: '☝️', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
      { id: 'rodilla', es: 'Rodilla', en: 'Knee',    emoji: '🦵', difficulty: 2, activityTypes: ['tap_say', 'peekaboo'] },
    ],
  },
];

export const getPackById = (id) => PACKS.find((p) => p.id === id) ?? null;
export const getFreePacks = () => PACKS.filter((p) => p.free);
export const getWordById = (packId, wordId) => {
  const pack = getPackById(packId);
  return pack?.words.find((w) => w.id === wordId) ?? null;
};
