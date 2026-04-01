// level: 1 = toddler (1-3), 2 = preschool (3-5), 3 = early learner (5-8)

export const CATEGORIES = [
  {
    id: 'animals',
    label: 'Animals',
    labelEs: 'Animales',
    emoji: '🐾',
    gradient: ['#FF6B6B', '#FF8E53'],
    minLevel: 1,
    words: [
      { id: 'perro',      es: 'Perro',      en: 'Dog',         emoji: '🐶', bg: '#FFE0E0', level: 1 },
      { id: 'gato',       es: 'Gato',       en: 'Cat',         emoji: '🐱', bg: '#FFE8D6', level: 1 },
      { id: 'pajaro',     es: 'Pájaro',     en: 'Bird',        emoji: '🐦', bg: '#D6EAFF', level: 1 },
      { id: 'pez',        es: 'Pez',        en: 'Fish',        emoji: '🐟', bg: '#D6F5FF', level: 1 },
      { id: 'oso',        es: 'Oso',        en: 'Bear',        emoji: '🐻', bg: '#FFE8C8', level: 1 },
      { id: 'conejo',     es: 'Conejo',     en: 'Rabbit',      emoji: '🐰', bg: '#FFE0F0', level: 1 },
      { id: 'vaca',       es: 'Vaca',       en: 'Cow',         emoji: '🐮', bg: '#FFF8D6', level: 1 },
      { id: 'leon',       es: 'León',       en: 'Lion',        emoji: '🦁', bg: '#FFF0D6', level: 1 },
      { id: 'elefante',   es: 'Elefante',   en: 'Elephant',    emoji: '🐘', bg: '#E8E0FF', level: 2 },
      { id: 'rana',       es: 'Rana',       en: 'Frog',        emoji: '🐸', bg: '#D6FFE0', level: 2 },
      { id: 'mariposa',   es: 'Mariposa',   en: 'Butterfly',   emoji: '🦋', bg: '#FFD6F0', level: 2 },
      { id: 'tortuga',    es: 'Tortuga',    en: 'Turtle',      emoji: '🐢', bg: '#D6FFE8', level: 2 },
      { id: 'delfin',     es: 'Delfín',     en: 'Dolphin',     emoji: '🐬', bg: '#D6F0FF', level: 3 },
      { id: 'jirafa',     es: 'Jirafa',     en: 'Giraffe',     emoji: '🦒', bg: '#FFF0D6', level: 3 },
      { id: 'pingüino',   es: 'Pingüino',   en: 'Penguin',     emoji: '🐧', bg: '#E8F0FF', level: 3 },
    ],
  },
  {
    id: 'colors',
    label: 'Colors & Numbers',
    labelEs: 'Colores y Números',
    emoji: '🌈',
    gradient: ['#A18CD1', '#FBC2EB'],
    minLevel: 1,
    words: [
      { id: 'rojo',      es: 'Rojo',    en: 'Red',    emoji: '🔴', bg: '#FFD6D6', level: 1 },
      { id: 'azul',      es: 'Azul',    en: 'Blue',   emoji: '🔵', bg: '#D6E8FF', level: 1 },
      { id: 'verde',     es: 'Verde',   en: 'Green',  emoji: '🟢', bg: '#D6FFE0', level: 1 },
      { id: 'amarillo',  es: 'Amarillo',en: 'Yellow', emoji: '🟡', bg: '#FFFBD6', level: 1 },
      { id: 'uno',       es: 'Uno',     en: 'One',    emoji: '1️⃣', bg: '#D6F5FF', level: 1 },
      { id: 'dos',       es: 'Dos',     en: 'Two',    emoji: '2️⃣', bg: '#D6FFE8', level: 1 },
      { id: 'tres',      es: 'Tres',    en: 'Three',  emoji: '3️⃣', bg: '#FFEFD6', level: 1 },
      { id: 'cuatro',    es: 'Cuatro',  en: 'Four',   emoji: '4️⃣', bg: '#FFD6F0', level: 2 },
      { id: 'cinco',     es: 'Cinco',   en: 'Five',   emoji: '5️⃣', bg: '#D6D6FF', level: 2 },
      { id: 'morado',    es: 'Morado',  en: 'Purple', emoji: '🟣', bg: '#EDD6FF', level: 2 },
      { id: 'naranja',   es: 'Naranja', en: 'Orange', emoji: '🟠', bg: '#FFE8D6', level: 2 },
      { id: 'seis',      es: 'Seis',    en: 'Six',    emoji: '6️⃣', bg: '#FFD6D6', level: 3 },
      { id: 'siete',     es: 'Siete',   en: 'Seven',  emoji: '7️⃣', bg: '#D6FFE0', level: 3 },
      { id: 'ocho',      es: 'Ocho',    en: 'Eight',  emoji: '8️⃣', bg: '#D6F5FF', level: 3 },
      { id: 'nueve',     es: 'Nueve',   en: 'Nine',   emoji: '9️⃣', bg: '#FFFBD6', level: 3 },
      { id: 'diez',      es: 'Diez',    en: 'Ten',    emoji: '🔟', bg: '#FFD6F0', level: 3 },
    ],
  },
  {
    id: 'food',
    label: 'Food & Drinks',
    labelEs: 'Comida y Bebidas',
    emoji: '🍎',
    gradient: ['#F093FB', '#F5576C'],
    minLevel: 1,
    words: [
      { id: 'manzana',    es: 'Manzana',   en: 'Apple',      emoji: '🍎', bg: '#FFD6D6', level: 1 },
      { id: 'leche',      es: 'Leche',     en: 'Milk',       emoji: '🥛', bg: '#F0F0FF', level: 1 },
      { id: 'pan',        es: 'Pan',       en: 'Bread',      emoji: '🍞', bg: '#FFF0D6', level: 1 },
      { id: 'agua',       es: 'Agua',      en: 'Water',      emoji: '💧', bg: '#D6F0FF', level: 1 },
      { id: 'platano',    es: 'Plátano',   en: 'Banana',     emoji: '🍌', bg: '#FFFBD6', level: 1 },
      { id: 'huevo',      es: 'Huevo',     en: 'Egg',        emoji: '🥚', bg: '#FFFFF0', level: 1 },
      { id: 'queso',      es: 'Queso',     en: 'Cheese',     emoji: '🧀', bg: '#FFF8D6', level: 2 },
      { id: 'zanahoria',  es: 'Zanahoria', en: 'Carrot',     emoji: '🥕', bg: '#FFE8D6', level: 2 },
      { id: 'uva',        es: 'Uva',       en: 'Grape',      emoji: '🍇', bg: '#EDD6FF', level: 2 },
      { id: 'fresa',      es: 'Fresa',     en: 'Strawberry', emoji: '🍓', bg: '#FFD6E8', level: 2 },
      { id: 'sandía',     es: 'Sandía',    en: 'Watermelon', emoji: '🍉', bg: '#D6FFE0', level: 3 },
      { id: 'piña',       es: 'Piña',      en: 'Pineapple',  emoji: '🍍', bg: '#FFFBD6', level: 3 },
      { id: 'aguacate',   es: 'Aguacate',  en: 'Avocado',    emoji: '🥑', bg: '#D6FFD6', level: 3 },
    ],
  },
  {
    id: 'family',
    label: 'Family & Body',
    labelEs: 'Familia y Cuerpo',
    emoji: '👨‍👩‍👦',
    gradient: ['#43E97B', '#38F9D7'],
    minLevel: 1,
    words: [
      { id: 'mama',     es: 'Mamá',    en: 'Mom',      emoji: '👩', bg: '#FFD6F0', level: 1 },
      { id: 'papa',     es: 'Papá',    en: 'Dad',      emoji: '👨', bg: '#D6E8FF', level: 1 },
      { id: 'abuelo',   es: 'Abuelo',  en: 'Grandpa',  emoji: '👴', bg: '#FFE8D6', level: 1 },
      { id: 'abuela',   es: 'Abuela',  en: 'Grandma',  emoji: '👵', bg: '#FFD6D6', level: 1 },
      { id: 'bebe',     es: 'Bebé',    en: 'Baby',     emoji: '👶', bg: '#D6FFE8', level: 1 },
      { id: 'nariz',    es: 'Nariz',   en: 'Nose',     emoji: '👃', bg: '#FFF0E8', level: 1 },
      { id: 'ojos',     es: 'Ojos',    en: 'Eyes',     emoji: '👀', bg: '#E8F0FF', level: 1 },
      { id: 'manos',    es: 'Manos',   en: 'Hands',    emoji: '🙌', bg: '#FFF8E8', level: 1 },
      { id: 'boca',     es: 'Boca',    en: 'Mouth',    emoji: '👄', bg: '#FFD6D6', level: 2 },
      { id: 'corazon',  es: 'Corazón', en: 'Heart',    emoji: '❤️', bg: '#FFD6D6', level: 2 },
      { id: 'hermano',  es: 'Hermano', en: 'Brother',  emoji: '👦', bg: '#D6E8FF', level: 2 },
      { id: 'hermana',  es: 'Hermana', en: 'Sister',   emoji: '👧', bg: '#FFD6F0', level: 2 },
      { id: 'cabeza',   es: 'Cabeza',  en: 'Head',     emoji: '🗣️', bg: '#F0E8FF', level: 3 },
      { id: 'pies',     es: 'Pies',    en: 'Feet',     emoji: '🦶', bg: '#FFE8D6', level: 3 },
    ],
  },
  {
    id: 'greetings',
    label: 'Greetings',
    labelEs: 'Saludos',
    emoji: '👋',
    gradient: ['#F7971E', '#FFD200'],
    minLevel: 2,   // preschool+
    words: [
      { id: 'hola',         es: 'Hola',          en: 'Hello',        emoji: '👋', bg: '#FFF8D6', level: 2 },
      { id: 'adios',        es: 'Adiós',         en: 'Goodbye',      emoji: '🙋', bg: '#FFE8D6', level: 2 },
      { id: 'gracias',      es: 'Gracias',       en: 'Thank you',    emoji: '🙏', bg: '#D6FFE8', level: 2 },
      { id: 'por-favor',    es: 'Por favor',     en: 'Please',       emoji: '😊', bg: '#D6E8FF', level: 2 },
      { id: 'buenos-dias',  es: 'Buenos días',   en: 'Good morning', emoji: '☀️', bg: '#FFFBD6', level: 2 },
      { id: 'buenas-noches',es: 'Buenas noches', en: 'Good night',   emoji: '🌙', bg: '#E8D6FF', level: 2 },
      { id: 'si',           es: 'Sí',            en: 'Yes',          emoji: '✅', bg: '#D6FFD6', level: 2 },
      { id: 'no',           es: 'No',            en: 'No',           emoji: '❌', bg: '#FFD6D6', level: 2 },
      { id: 'como-estas',   es: '¿Cómo estás?',  en: 'How are you?', emoji: '🤔', bg: '#D6F0FF', level: 3 },
      { id: 'bien',         es: 'Estoy bien',    en: "I'm good",     emoji: '😄', bg: '#D6FFE8', level: 3 },
    ],
  },
  {
    id: 'phrases',
    label: 'Phrases',
    labelEs: 'Frases',
    emoji: '💬',
    gradient: ['#667EEA', '#764BA2'],
    minLevel: 3,   // early learner only
    words: [
      { id: 'me-llamo',       es: 'Me llamo...',        en: 'My name is...',      emoji: '🏷️', bg: '#E8D6FF', level: 3 },
      { id: 'cuantos-anos',   es: '¿Cuántos años tienes?', en: 'How old are you?', emoji: '🎂', bg: '#FFD6F0', level: 3 },
      { id: 'tengo-anos',     es: 'Tengo... años',      en: 'I am ... years old', emoji: '🔢', bg: '#D6F5FF', level: 3 },
      { id: 'me-gusta',       es: 'Me gusta...',        en: 'I like...',          emoji: '❤️', bg: '#FFD6D6', level: 3 },
      { id: 'no-me-gusta',    es: 'No me gusta...',     en: "I don't like...",    emoji: '😕', bg: '#FFE8D6', level: 3 },
      { id: 'tengo-hambre',   es: 'Tengo hambre',       en: "I'm hungry",         emoji: '🍽️', bg: '#FFF0D6', level: 3 },
      { id: 'tengo-sed',      es: 'Tengo sed',          en: "I'm thirsty",        emoji: '💧', bg: '#D6F0FF', level: 3 },
      { id: 'quiero-jugar',   es: '¡Quiero jugar!',     en: 'I want to play!',    emoji: '🎮', bg: '#D6FFE8', level: 3 },
      { id: 'donde-esta',     es: '¿Dónde está...?',    en: 'Where is...?',       emoji: '🔍', bg: '#EDD6FF', level: 3 },
      { id: 'que-es-esto',    es: '¿Qué es esto?',      en: 'What is this?',      emoji: '❓', bg: '#D6E8FF', level: 3 },
    ],
  },
];

export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id);

// Filter categories available for a given vocab level
export const getCategoriesForLevel = (level = 1) =>
  CATEGORIES.filter((c) => c.minLevel <= level);

// Filter words within a category for a given vocab level
export const getWordsForLevel = (category, level = 1) =>
  category.words.filter((w) => w.level <= level);

export const getRandomWords = (categoryId, count = 3, level = 1) => {
  const cat = getCategoryById(categoryId);
  if (!cat) return [];
  const words = getWordsForLevel(cat, level);
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getAllWordsForLevel = (level = 1) =>
  CATEGORIES.flatMap((c) => getWordsForLevel(c, level));
