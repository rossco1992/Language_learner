export const CATEGORIES = [
  {
    id: 'animals',
    label: 'Animals',
    labelEs: 'Animales',
    emoji: '🐾',
    gradient: ['#FF6B6B', '#FF8E53'],
    words: [
      { id: 'perro',    es: 'Perro',    en: 'Dog',      emoji: '🐶', bg: '#FFE0E0' },
      { id: 'gato',     es: 'Gato',     en: 'Cat',      emoji: '🐱', bg: '#FFE8D6' },
      { id: 'pajaro',   es: 'Pájaro',   en: 'Bird',     emoji: '🐦', bg: '#D6EAFF' },
      { id: 'pez',      es: 'Pez',      en: 'Fish',     emoji: '🐟', bg: '#D6F5FF' },
      { id: 'elefante', es: 'Elefante', en: 'Elephant', emoji: '🐘', bg: '#E8E0FF' },
      { id: 'oso',      es: 'Oso',      en: 'Bear',     emoji: '🐻', bg: '#FFE8C8' },
      { id: 'conejo',   es: 'Conejo',   en: 'Rabbit',   emoji: '🐰', bg: '#FFE0F0' },
      { id: 'rana',     es: 'Rana',     en: 'Frog',     emoji: '🐸', bg: '#D6FFE0' },
      { id: 'vaca',     es: 'Vaca',     en: 'Cow',      emoji: '🐮', bg: '#FFF8D6' },
      { id: 'leon',     es: 'León',     en: 'Lion',     emoji: '🦁', bg: '#FFF0D6' },
    ],
  },
  {
    id: 'colors',
    label: 'Colors & Numbers',
    labelEs: 'Colores y Números',
    emoji: '🌈',
    gradient: ['#A18CD1', '#FBC2EB'],
    words: [
      { id: 'rojo',      es: 'Rojo',   en: 'Red',    emoji: '🔴', bg: '#FFD6D6' },
      { id: 'azul',      es: 'Azul',   en: 'Blue',   emoji: '🔵', bg: '#D6E8FF' },
      { id: 'verde',     es: 'Verde',  en: 'Green',  emoji: '🟢', bg: '#D6FFE0' },
      { id: 'amarillo',  es: 'Amarillo', en: 'Yellow', emoji: '🟡', bg: '#FFFBD6' },
      { id: 'morado',    es: 'Morado', en: 'Purple', emoji: '🟣', bg: '#EDD6FF' },
      { id: 'uno',       es: 'Uno',    en: 'One',    emoji: '1️⃣', bg: '#D6F5FF' },
      { id: 'dos',       es: 'Dos',    en: 'Two',    emoji: '2️⃣', bg: '#D6FFE8' },
      { id: 'tres',      es: 'Tres',   en: 'Three',  emoji: '3️⃣', bg: '#FFEFD6' },
      { id: 'cuatro',    es: 'Cuatro', en: 'Four',   emoji: '4️⃣', bg: '#FFD6F0' },
      { id: 'cinco',     es: 'Cinco',  en: 'Five',   emoji: '5️⃣', bg: '#D6D6FF' },
    ],
  },
  {
    id: 'food',
    label: 'Food & Drinks',
    labelEs: 'Comida y Bebidas',
    emoji: '🍎',
    gradient: ['#F093FB', '#F5576C'],
    words: [
      { id: 'manzana',   es: 'Manzana',  en: 'Apple',   emoji: '🍎', bg: '#FFD6D6' },
      { id: 'leche',     es: 'Leche',    en: 'Milk',    emoji: '🥛', bg: '#F0F0FF' },
      { id: 'pan',       es: 'Pan',      en: 'Bread',   emoji: '🍞', bg: '#FFF0D6' },
      { id: 'agua',      es: 'Agua',     en: 'Water',   emoji: '💧', bg: '#D6F0FF' },
      { id: 'platano',   es: 'Plátano',  en: 'Banana',  emoji: '🍌', bg: '#FFFBD6' },
      { id: 'zanahoria', es: 'Zanahoria', en: 'Carrot', emoji: '🥕', bg: '#FFE8D6' },
      { id: 'huevo',     es: 'Huevo',    en: 'Egg',     emoji: '🥚', bg: '#FFFFF0' },
      { id: 'queso',     es: 'Queso',    en: 'Cheese',  emoji: '🧀', bg: '#FFF8D6' },
      { id: 'uva',       es: 'Uva',      en: 'Grape',   emoji: '🍇', bg: '#EDD6FF' },
      { id: 'fresa',     es: 'Fresa',    en: 'Strawberry', emoji: '🍓', bg: '#FFD6E8' },
    ],
  },
  {
    id: 'family',
    label: 'Family & Body',
    labelEs: 'Familia y Cuerpo',
    emoji: '👨‍👩‍👦',
    gradient: ['#43E97B', '#38F9D7'],
    words: [
      { id: 'mama',    es: 'Mamá',    en: 'Mom',     emoji: '👩', bg: '#FFD6F0' },
      { id: 'papa',    es: 'Papá',    en: 'Dad',     emoji: '👨', bg: '#D6E8FF' },
      { id: 'abuelo',  es: 'Abuelo',  en: 'Grandpa', emoji: '👴', bg: '#FFE8D6' },
      { id: 'abuela',  es: 'Abuela',  en: 'Grandma', emoji: '👵', bg: '#FFD6D6' },
      { id: 'bebe',    es: 'Bebé',    en: 'Baby',    emoji: '👶', bg: '#D6FFE8' },
      { id: 'nariz',   es: 'Nariz',   en: 'Nose',    emoji: '👃', bg: '#FFF0E8' },
      { id: 'ojos',    es: 'Ojos',    en: 'Eyes',    emoji: '👀', bg: '#E8F0FF' },
      { id: 'manos',   es: 'Manos',   en: 'Hands',   emoji: '🙌', bg: '#FFF8E8' },
      { id: 'boca',    es: 'Boca',    en: 'Mouth',   emoji: '👄', bg: '#FFD6D6' },
      { id: 'corazon', es: 'Corazón', en: 'Heart',   emoji: '❤️', bg: '#FFD6D6' },
    ],
  },
];

export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id);

export const getRandomWords = (categoryId, count = 3) => {
  const cat = getCategoryById(categoryId);
  if (!cat) return [];
  const shuffled = [...cat.words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getAllWords = () => CATEGORIES.flatMap((c) => c.words);
