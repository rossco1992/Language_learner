// Full Spanish learning curriculum
// level: 1 = Toddler (1-3), 2 = Preschool (3-5), 3 = Early Learner (5-8)
// Each unit has lessons, each lesson has ~7-8 words

export const CURRICULUM = [
  // ─────────────────────────────────────────
  // UNIT 1: ANIMALS
  // ─────────────────────────────────────────
  {
    id: 'animals',
    label: 'Animals',
    labelEs: 'Animales',
    emoji: '🐾',
    gradient: ['#FF6B6B', '#FF8E53'],
    minLevel: 1,
    lessons: [
      {
        id: 'farm-animals',
        label: 'Farm Animals',
        labelEs: 'La Granja',
        emoji: '🐄',
        minLevel: 1,
        words: [
          { id: 'vaca',    es: 'Vaca',    en: 'Cow',     emoji: '🐮', bg: '#FFF8D6' },
          { id: 'cerdo',   es: 'Cerdo',   en: 'Pig',     emoji: '🐷', bg: '#FFE8F0' },
          { id: 'gallina', es: 'Gallina', en: 'Chicken', emoji: '🐔', bg: '#FFF0D6' },
          { id: 'caballo', es: 'Caballo', en: 'Horse',   emoji: '🐴', bg: '#F0E8D6' },
          { id: 'oveja',   es: 'Oveja',   en: 'Sheep',   emoji: '🐑', bg: '#F8F8F8' },
          { id: 'pato',    es: 'Pato',    en: 'Duck',    emoji: '🦆', bg: '#D6F5FF' },
          { id: 'conejo',  es: 'Conejo',  en: 'Rabbit',  emoji: '🐰', bg: '#FFE0F0' },
          { id: 'perro',   es: 'Perro',   en: 'Dog',     emoji: '🐶', bg: '#FFE0E0' },
        ],
      },
      {
        id: 'wild-animals',
        label: 'Wild Animals',
        labelEs: 'Animales Salvajes',
        emoji: '🦁',
        minLevel: 1,
        words: [
          { id: 'leon',     es: 'León',     en: 'Lion',     emoji: '🦁', bg: '#FFF0D6' },
          { id: 'tigre',    es: 'Tigre',    en: 'Tiger',    emoji: '🐯', bg: '#FFE8D6' },
          { id: 'elefante', es: 'Elefante', en: 'Elephant', emoji: '🐘', bg: '#E8E0FF' },
          { id: 'jirafa',   es: 'Jirafa',   en: 'Giraffe',  emoji: '🦒', bg: '#FFF8D6' },
          { id: 'mono',     es: 'Mono',     en: 'Monkey',   emoji: '🐒', bg: '#FFE8C8' },
          { id: 'oso',      es: 'Oso',      en: 'Bear',     emoji: '🐻', bg: '#F0E8D6' },
          { id: 'cebra',    es: 'Cebra',    en: 'Zebra',    emoji: '🦓', bg: '#F8F8F8' },
          { id: 'gorila',   es: 'Gorila',   en: 'Gorilla',  emoji: '🦍', bg: '#E8F0E8' },
        ],
      },
      {
        id: 'sea-animals',
        label: 'Sea Animals',
        labelEs: 'Animales del Mar',
        emoji: '🐬',
        minLevel: 2,
        words: [
          { id: 'pez',       es: 'Pez',      en: 'Fish',     emoji: '🐟', bg: '#D6F5FF' },
          { id: 'tiburon',   es: 'Tiburón',  en: 'Shark',    emoji: '🦈', bg: '#D6EAFF' },
          { id: 'delfin',    es: 'Delfín',   en: 'Dolphin',  emoji: '🐬', bg: '#D6F0FF' },
          { id: 'pulpo',     es: 'Pulpo',    en: 'Octopus',  emoji: '🐙', bg: '#EDD6FF' },
          { id: 'cangrejo',  es: 'Cangrejo', en: 'Crab',     emoji: '🦀', bg: '#FFD6D6' },
          { id: 'ballena',   es: 'Ballena',  en: 'Whale',    emoji: '🐳', bg: '#D6F5FF' },
          { id: 'tortuga',   es: 'Tortuga',  en: 'Turtle',   emoji: '🐢', bg: '#D6FFE8' },
          { id: 'estrella-mar', es: 'Estrella de Mar', en: 'Starfish', emoji: '⭐', bg: '#FFF0D6' },
        ],
      },
      {
        id: 'small-animals',
        label: 'Small Animals',
        labelEs: 'Animales Pequeños',
        emoji: '🦋',
        minLevel: 2,
        words: [
          { id: 'mariposa', es: 'Mariposa', en: 'Butterfly', emoji: '🦋', bg: '#FFD6F0' },
          { id: 'abeja',    es: 'Abeja',    en: 'Bee',       emoji: '🐝', bg: '#FFF8D6' },
          { id: 'rana',     es: 'Rana',     en: 'Frog',      emoji: '🐸', bg: '#D6FFE0' },
          { id: 'raton',    es: 'Ratón',    en: 'Mouse',     emoji: '🐭', bg: '#F8F8F8' },
          { id: 'pajaro',   es: 'Pájaro',   en: 'Bird',      emoji: '🐦', bg: '#D6EAFF' },
          { id: 'buho',     es: 'Búho',     en: 'Owl',       emoji: '🦉', bg: '#E8E0FF' },
          { id: 'caracol',  es: 'Caracol',  en: 'Snail',     emoji: '🐌', bg: '#D6FFE8' },
          { id: 'gusano',   es: 'Gusano',   en: 'Worm',      emoji: '🐛', bg: '#D6FFD6' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 2: COLORS & NUMBERS
  // ─────────────────────────────────────────
  {
    id: 'colors-numbers',
    label: 'Colors & Numbers',
    labelEs: 'Colores y Números',
    emoji: '🌈',
    gradient: ['#A18CD1', '#FBC2EB'],
    minLevel: 1,
    lessons: [
      {
        id: 'colors',
        label: 'Colors',
        labelEs: 'Los Colores',
        emoji: '🎨',
        minLevel: 1,
        words: [
          { id: 'rojo',     es: 'Rojo',     en: 'Red',    emoji: '🔴', bg: '#FFD6D6' },
          { id: 'azul',     es: 'Azul',     en: 'Blue',   emoji: '🔵', bg: '#D6E8FF' },
          { id: 'verde',    es: 'Verde',    en: 'Green',  emoji: '🟢', bg: '#D6FFE0' },
          { id: 'amarillo', es: 'Amarillo', en: 'Yellow', emoji: '🟡', bg: '#FFFBD6' },
          { id: 'morado',   es: 'Morado',   en: 'Purple', emoji: '🟣', bg: '#EDD6FF' },
          { id: 'naranja',  es: 'Naranja',  en: 'Orange', emoji: '🟠', bg: '#FFE8D6' },
          { id: 'rosa',     es: 'Rosa',     en: 'Pink',   emoji: '🩷', bg: '#FFD6F0' },
          { id: 'cafe',     es: 'Café',     en: 'Brown',  emoji: '🟤', bg: '#F0E8D6' },
        ],
      },
      {
        id: 'numbers-1-5',
        label: 'Numbers 1–5',
        labelEs: 'Números 1–5',
        emoji: '🔢',
        minLevel: 1,
        words: [
          { id: 'uno',    es: 'Uno',    en: 'One',   emoji: '1️⃣', bg: '#D6F5FF' },
          { id: 'dos',    es: 'Dos',    en: 'Two',   emoji: '2️⃣', bg: '#D6FFE8' },
          { id: 'tres',   es: 'Tres',   en: 'Three', emoji: '3️⃣', bg: '#FFEFD6' },
          { id: 'cuatro', es: 'Cuatro', en: 'Four',  emoji: '4️⃣', bg: '#FFD6F0' },
          { id: 'cinco',  es: 'Cinco',  en: 'Five',  emoji: '5️⃣', bg: '#D6D6FF' },
        ],
      },
      {
        id: 'numbers-6-10',
        label: 'Numbers 6–10',
        labelEs: 'Números 6–10',
        emoji: '🔟',
        minLevel: 2,
        words: [
          { id: 'seis',  es: 'Seis',  en: 'Six',   emoji: '6️⃣', bg: '#FFD6D6' },
          { id: 'siete', es: 'Siete', en: 'Seven', emoji: '7️⃣', bg: '#D6FFE0' },
          { id: 'ocho',  es: 'Ocho',  en: 'Eight', emoji: '8️⃣', bg: '#D6F5FF' },
          { id: 'nueve', es: 'Nueve', en: 'Nine',  emoji: '9️⃣', bg: '#FFFBD6' },
          { id: 'diez',  es: 'Diez',  en: 'Ten',   emoji: '🔟', bg: '#FFD6F0' },
        ],
      },
      {
        id: 'shapes',
        label: 'Shapes',
        labelEs: 'Las Formas',
        emoji: '🔷',
        minLevel: 2,
        words: [
          { id: 'circulo',    es: 'Círculo',    en: 'Circle',    emoji: '⭕', bg: '#FFD6D6' },
          { id: 'cuadrado',   es: 'Cuadrado',   en: 'Square',    emoji: '🟥', bg: '#D6E8FF' },
          { id: 'triangulo',  es: 'Triángulo',  en: 'Triangle',  emoji: '🔺', bg: '#D6FFE0' },
          { id: 'estrella-f', es: 'Estrella',   en: 'Star',      emoji: '⭐', bg: '#FFFBD6' },
          { id: 'corazon-f',  es: 'Corazón',    en: 'Heart',     emoji: '❤️', bg: '#FFD6D6' },
          { id: 'rectangulo', es: 'Rectángulo', en: 'Rectangle', emoji: '🟦', bg: '#EDD6FF' },
          { id: 'ovalo',      es: 'Óvalo',      en: 'Oval',      emoji: '🥚', bg: '#FFF0D6' },
          { id: 'diamante',   es: 'Diamante',   en: 'Diamond',   emoji: '💎', bg: '#D6F5FF' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 3: FOOD & DRINKS
  // ─────────────────────────────────────────
  {
    id: 'food',
    label: 'Food & Drinks',
    labelEs: 'Comida y Bebidas',
    emoji: '🍎',
    gradient: ['#F093FB', '#F5576C'],
    minLevel: 1,
    lessons: [
      {
        id: 'fruits',
        label: 'Fruits',
        labelEs: 'Las Frutas',
        emoji: '🍓',
        minLevel: 1,
        words: [
          { id: 'manzana',   es: 'Manzana',  en: 'Apple',      emoji: '🍎', bg: '#FFD6D6' },
          { id: 'platano',   es: 'Plátano',  en: 'Banana',     emoji: '🍌', bg: '#FFFBD6' },
          { id: 'uva',       es: 'Uva',      en: 'Grape',      emoji: '🍇', bg: '#EDD6FF' },
          { id: 'fresa',     es: 'Fresa',    en: 'Strawberry', emoji: '🍓', bg: '#FFD6E8' },
          { id: 'naranja-f', es: 'Naranja',  en: 'Orange',     emoji: '🍊', bg: '#FFE8D6' },
          { id: 'pera',      es: 'Pera',     en: 'Pear',       emoji: '🍐', bg: '#D6FFD6' },
          { id: 'sandia',    es: 'Sandía',   en: 'Watermelon', emoji: '🍉', bg: '#D6FFE0' },
          { id: 'mango',     es: 'Mango',    en: 'Mango',      emoji: '🥭', bg: '#FFF0D6' },
        ],
      },
      {
        id: 'vegetables',
        label: 'Vegetables',
        labelEs: 'Las Verduras',
        emoji: '🥕',
        minLevel: 2,
        words: [
          { id: 'zanahoria', es: 'Zanahoria', en: 'Carrot',   emoji: '🥕', bg: '#FFE8D6' },
          { id: 'tomate',    es: 'Tomate',    en: 'Tomato',   emoji: '🍅', bg: '#FFD6D6' },
          { id: 'maiz',      es: 'Maíz',      en: 'Corn',     emoji: '🌽', bg: '#FFFBD6' },
          { id: 'brocoli',   es: 'Brócoli',   en: 'Broccoli', emoji: '🥦', bg: '#D6FFD6' },
          { id: 'patata',    es: 'Patata',    en: 'Potato',   emoji: '🥔', bg: '#F0E8D6' },
          { id: 'pepino',    es: 'Pepino',    en: 'Cucumber', emoji: '🥒', bg: '#D6FFE8' },
          { id: 'cebolla',   es: 'Cebolla',   en: 'Onion',    emoji: '🧅', bg: '#FFF8D6' },
          { id: 'aguacate',  es: 'Aguacate',  en: 'Avocado',  emoji: '🥑', bg: '#D6FFD6' },
        ],
      },
      {
        id: 'meals-snacks',
        label: 'Meals & Snacks',
        labelEs: 'Comidas',
        emoji: '🍞',
        minLevel: 1,
        words: [
          { id: 'pan',     es: 'Pan',     en: 'Bread',  emoji: '🍞', bg: '#FFF0D6' },
          { id: 'queso',   es: 'Queso',   en: 'Cheese', emoji: '🧀', bg: '#FFF8D6' },
          { id: 'huevo',   es: 'Huevo',   en: 'Egg',    emoji: '🥚', bg: '#FFFFF0' },
          { id: 'arroz',   es: 'Arroz',   en: 'Rice',   emoji: '🍚', bg: '#F8F8F8' },
          { id: 'sopa',    es: 'Sopa',    en: 'Soup',   emoji: '🍲', bg: '#FFE8D6' },
          { id: 'pizza',   es: 'Pizza',   en: 'Pizza',  emoji: '🍕', bg: '#FFD6D6' },
          { id: 'galleta', es: 'Galleta', en: 'Cookie', emoji: '🍪', bg: '#FFF0D6' },
          { id: 'pastel',  es: 'Pastel',  en: 'Cake',   emoji: '🎂', bg: '#FFD6F0' },
        ],
      },
      {
        id: 'drinks',
        label: 'Drinks',
        labelEs: 'Las Bebidas',
        emoji: '🥛',
        minLevel: 1,
        words: [
          { id: 'agua',        es: 'Agua',      en: 'Water',     emoji: '💧', bg: '#D6F0FF' },
          { id: 'leche',       es: 'Leche',     en: 'Milk',      emoji: '🥛', bg: '#F0F0FF' },
          { id: 'jugo',        es: 'Jugo',      en: 'Juice',     emoji: '🧃', bg: '#FFE8D6' },
          { id: 'te',          es: 'Té',        en: 'Tea',       emoji: '🍵', bg: '#D6FFE8' },
          { id: 'chocolate-d', es: 'Chocolate', en: 'Hot Choc.', emoji: '☕', bg: '#F0E8D6' },
          { id: 'limonada',    es: 'Limonada',  en: 'Lemonade',  emoji: '🍋', bg: '#FFFBD6' },
          { id: 'batido',      es: 'Batido',    en: 'Smoothie',  emoji: '🥤', bg: '#FFD6F0' },
          { id: 'helado',      es: 'Helado',    en: 'Ice Cream', emoji: '🍦', bg: '#D6F5FF' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 4: FAMILY & BODY
  // ─────────────────────────────────────────
  {
    id: 'family-body',
    label: 'Family & Body',
    labelEs: 'Familia y Cuerpo',
    emoji: '👨‍👩‍👦',
    gradient: ['#43E97B', '#38F9D7'],
    minLevel: 1,
    lessons: [
      {
        id: 'family',
        label: 'Family',
        labelEs: 'La Familia',
        emoji: '👪',
        minLevel: 1,
        words: [
          { id: 'mama',    es: 'Mamá',    en: 'Mom',     emoji: '👩', bg: '#FFD6F0' },
          { id: 'papa',    es: 'Papá',    en: 'Dad',     emoji: '👨', bg: '#D6E8FF' },
          { id: 'abuelo',  es: 'Abuelo',  en: 'Grandpa', emoji: '👴', bg: '#FFE8D6' },
          { id: 'abuela',  es: 'Abuela',  en: 'Grandma', emoji: '👵', bg: '#FFD6D6' },
          { id: 'hermano', es: 'Hermano', en: 'Brother', emoji: '👦', bg: '#D6E8FF' },
          { id: 'hermana', es: 'Hermana', en: 'Sister',  emoji: '👧', bg: '#FFD6F0' },
          { id: 'bebe',    es: 'Bebé',    en: 'Baby',    emoji: '👶', bg: '#D6FFE8' },
          { id: 'tio',     es: 'Tío',     en: 'Uncle',   emoji: '🧔', bg: '#E8D6FF' },
        ],
      },
      {
        id: 'face',
        label: 'Face',
        labelEs: 'La Cara',
        emoji: '😊',
        minLevel: 1,
        words: [
          { id: 'ojos',    es: 'Ojos',    en: 'Eyes',     emoji: '👀', bg: '#E8F0FF' },
          { id: 'nariz',   es: 'Nariz',   en: 'Nose',     emoji: '👃', bg: '#FFF0E8' },
          { id: 'boca',    es: 'Boca',    en: 'Mouth',    emoji: '👄', bg: '#FFD6D6' },
          { id: 'orejas',  es: 'Orejas',  en: 'Ears',     emoji: '👂', bg: '#FFE8D6' },
          { id: 'pelo',    es: 'Pelo',    en: 'Hair',     emoji: '💇', bg: '#F0E8D6' },
          { id: 'dientes', es: 'Dientes', en: 'Teeth',    emoji: '🦷', bg: '#F8F8F8' },
          { id: 'mejilla', es: 'Mejilla', en: 'Cheek',    emoji: '😊', bg: '#FFD6E8' },
          { id: 'frente',  es: 'Frente',  en: 'Forehead', emoji: '🤔', bg: '#FFF0D6' },
        ],
      },
      {
        id: 'body',
        label: 'Body',
        labelEs: 'El Cuerpo',
        emoji: '🙌',
        minLevel: 2,
        words: [
          { id: 'manos',   es: 'Manos',   en: 'Hands', emoji: '🙌', bg: '#FFF8E8' },
          { id: 'pies',    es: 'Pies',    en: 'Feet',  emoji: '🦶', bg: '#FFE8D6' },
          { id: 'cabeza',  es: 'Cabeza',  en: 'Head',  emoji: '🗣️', bg: '#F0E8FF' },
          { id: 'brazos',  es: 'Brazos',  en: 'Arms',  emoji: '💪', bg: '#FFD6D6' },
          { id: 'piernas', es: 'Piernas', en: 'Legs',  emoji: '🦵', bg: '#D6E8FF' },
          { id: 'espalda', es: 'Espalda', en: 'Back',  emoji: '🔙', bg: '#D6FFE8' },
          { id: 'barriga', es: 'Barriga', en: 'Tummy', emoji: '🫃', bg: '#FFF0D6' },
          { id: 'rodilla', es: 'Rodilla', en: 'Knee',  emoji: '🦿', bg: '#F0F0FF' },
        ],
      },
      {
        id: 'feelings',
        label: 'Feelings',
        labelEs: 'Los Sentimientos',
        emoji: '😄',
        minLevel: 2,
        words: [
          { id: 'feliz',       es: 'Feliz',       en: 'Happy',     emoji: '😄', bg: '#FFFBD6' },
          { id: 'triste',      es: 'Triste',      en: 'Sad',       emoji: '😢', bg: '#D6E8FF' },
          { id: 'enojado',     es: 'Enojado',     en: 'Angry',     emoji: '😠', bg: '#FFD6D6' },
          { id: 'asustado',    es: 'Asustado',    en: 'Scared',    emoji: '😱', bg: '#E8D6FF' },
          { id: 'sorprendido', es: 'Sorprendido', en: 'Surprised', emoji: '😲', bg: '#D6F5FF' },
          { id: 'cansado',     es: 'Cansado',     en: 'Tired',     emoji: '😴', bg: '#EDD6FF' },
          { id: 'emocionado',  es: 'Emocionado',  en: 'Excited',   emoji: '🤩', bg: '#FFF0D6' },
          { id: 'enfermo',     es: 'Enfermo',     en: 'Sick',      emoji: '🤒', bg: '#D6FFE8' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 5: HOME
  // ─────────────────────────────────────────
  {
    id: 'home',
    label: 'Home',
    labelEs: 'El Hogar',
    emoji: '🏠',
    gradient: ['#F7971E', '#FFD200'],
    minLevel: 2,
    lessons: [
      {
        id: 'rooms',
        label: 'Rooms',
        labelEs: 'Los Cuartos',
        emoji: '🚪',
        minLevel: 2,
        words: [
          { id: 'cocina',     es: 'Cocina',     en: 'Kitchen',     emoji: '🍳', bg: '#FFE8D6' },
          { id: 'bano',       es: 'Baño',       en: 'Bathroom',    emoji: '🚿', bg: '#D6F5FF' },
          { id: 'dormitorio', es: 'Dormitorio', en: 'Bedroom',     emoji: '🛏️', bg: '#EDD6FF' },
          { id: 'sala',       es: 'Sala',       en: 'Living Room', emoji: '🛋️', bg: '#D6FFE8' },
          { id: 'jardin',     es: 'Jardín',     en: 'Garden',      emoji: '🌻', bg: '#D6FFD6' },
          { id: 'comedor',    es: 'Comedor',    en: 'Dining Room', emoji: '🍽️', bg: '#FFF8D6' },
          { id: 'garaje',     es: 'Garaje',     en: 'Garage',      emoji: '🚗', bg: '#F0F0F0' },
          { id: 'pasillo',    es: 'Pasillo',    en: 'Hallway',     emoji: '🚶', bg: '#F8F0E8' },
        ],
      },
      {
        id: 'furniture',
        label: 'Furniture',
        labelEs: 'Los Muebles',
        emoji: '🛋️',
        minLevel: 2,
        words: [
          { id: 'cama',    es: 'Cama',    en: 'Bed',     emoji: '🛏️', bg: '#EDD6FF' },
          { id: 'silla',   es: 'Silla',   en: 'Chair',   emoji: '🪑', bg: '#FFE8D6' },
          { id: 'mesa',    es: 'Mesa',    en: 'Table',   emoji: '🪵', bg: '#F0E8D6' },
          { id: 'sofa',    es: 'Sofá',    en: 'Sofa',    emoji: '🛋️', bg: '#D6E8FF' },
          { id: 'puerta',  es: 'Puerta',  en: 'Door',    emoji: '🚪', bg: '#F8F0E8' },
          { id: 'ventana', es: 'Ventana', en: 'Window',  emoji: '🪟', bg: '#D6F5FF' },
          { id: 'armario', es: 'Armario', en: 'Wardrobe',emoji: '🚪', bg: '#F0F0F0' },
          { id: 'lampara', es: 'Lámpara', en: 'Lamp',    emoji: '💡', bg: '#FFFBD6' },
        ],
      },
      {
        id: 'kitchen-items',
        label: 'Kitchen Items',
        labelEs: 'La Cocina',
        emoji: '🍳',
        minLevel: 2,
        words: [
          { id: 'plato',    es: 'Plato',    en: 'Plate',  emoji: '🍽️', bg: '#F8F8F8' },
          { id: 'vaso',     es: 'Vaso',     en: 'Glass',  emoji: '🥛', bg: '#D6F5FF' },
          { id: 'tenedor',  es: 'Tenedor',  en: 'Fork',   emoji: '🍴', bg: '#F0F0F0' },
          { id: 'cuchara',  es: 'Cuchara',  en: 'Spoon',  emoji: '🥄', bg: '#F8F8F8' },
          { id: 'cuchillo', es: 'Cuchillo', en: 'Knife',  emoji: '🔪', bg: '#FFE8D6' },
          { id: 'olla',     es: 'Olla',     en: 'Pot',    emoji: '🫕', bg: '#F0E8D6' },
          { id: 'nevera',   es: 'Nevera',   en: 'Fridge', emoji: '🧊', bg: '#D6F5FF' },
          { id: 'estufa',   es: 'Estufa',   en: 'Stove',  emoji: '🔥', bg: '#FFD6D6' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 6: CLOTHES
  // ─────────────────────────────────────────
  {
    id: 'clothes',
    label: 'Clothes',
    labelEs: 'La Ropa',
    emoji: '👕',
    gradient: ['#667EEA', '#764BA2'],
    minLevel: 2,
    lessons: [
      {
        id: 'everyday-clothes',
        label: 'Everyday Clothes',
        labelEs: 'Ropa del Día',
        emoji: '👕',
        minLevel: 2,
        words: [
          { id: 'camisa',    es: 'Camisa',    en: 'Shirt',       emoji: '👕', bg: '#D6E8FF' },
          { id: 'pantalon',  es: 'Pantalón',  en: 'Trousers',    emoji: '👖', bg: '#D6D6FF' },
          { id: 'vestido',   es: 'Vestido',   en: 'Dress',       emoji: '👗', bg: '#FFD6F0' },
          { id: 'zapatos',   es: 'Zapatos',   en: 'Shoes',       emoji: '👟', bg: '#F0E8D6' },
          { id: 'calcetines',es: 'Calcetines',en: 'Socks',       emoji: '🧦', bg: '#FFE8D6' },
          { id: 'pijama',    es: 'Pijama',    en: 'Pyjamas',     emoji: '🩲', bg: '#EDD6FF' },
          { id: 'falda',     es: 'Falda',     en: 'Skirt',       emoji: '👘', bg: '#FFD6E8' },
          { id: 'gorra',     es: 'Gorra',     en: 'Cap',         emoji: '🧢', bg: '#D6F0FF' },
        ],
      },
      {
        id: 'seasonal-clothes',
        label: 'Seasonal Clothes',
        labelEs: 'Ropa de Temporada',
        emoji: '🧥',
        minLevel: 2,
        words: [
          { id: 'abrigo',   es: 'Abrigo',   en: 'Coat',     emoji: '🧥', bg: '#D6E8FF' },
          { id: 'bufanda',  es: 'Bufanda',  en: 'Scarf',    emoji: '🧣', bg: '#FFE8D6' },
          { id: 'guantes',  es: 'Guantes',  en: 'Gloves',   emoji: '🧤', bg: '#D6FFE8' },
          { id: 'sombrero', es: 'Sombrero', en: 'Hat',      emoji: '🎩', bg: '#F0E8D6' },
          { id: 'botas',    es: 'Botas',    en: 'Boots',    emoji: '🥾', bg: '#F0E8D6' },
          { id: 'mochila',  es: 'Mochila',  en: 'Backpack', emoji: '🎒', bg: '#D6F0FF' },
          { id: 'cinturon', es: 'Cinturón', en: 'Belt',     emoji: '🩲', bg: '#FFF0D6' },
          { id: 'lentes',   es: 'Lentes',   en: 'Glasses',  emoji: '👓', bg: '#E8F0FF' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 7: NATURE & WEATHER
  // ─────────────────────────────────────────
  {
    id: 'nature-weather',
    label: 'Nature & Weather',
    labelEs: 'Naturaleza y Clima',
    emoji: '🌈',
    gradient: ['#56CCF2', '#2F80ED'],
    minLevel: 1,
    lessons: [
      {
        id: 'weather',
        label: 'Weather',
        labelEs: 'El Clima',
        emoji: '☀️',
        minLevel: 1,
        words: [
          { id: 'sol',       es: 'Sol',       en: 'Sun',      emoji: '☀️', bg: '#FFFBD6' },
          { id: 'lluvia',    es: 'Lluvia',    en: 'Rain',     emoji: '🌧️', bg: '#D6E8FF' },
          { id: 'nieve',     es: 'Nieve',     en: 'Snow',     emoji: '❄️', bg: '#E8F5FF' },
          { id: 'nube',      es: 'Nube',      en: 'Cloud',    emoji: '☁️', bg: '#F0F0F0' },
          { id: 'viento',    es: 'Viento',    en: 'Wind',     emoji: '💨', bg: '#D6F5FF' },
          { id: 'tormenta',  es: 'Tormenta',  en: 'Storm',    emoji: '⛈️', bg: '#D6D6FF' },
          { id: 'arcoiris',  es: 'Arcoíris',  en: 'Rainbow',  emoji: '🌈', bg: '#FFE8F0' },
          { id: 'calor',     es: 'Calor',     en: 'Hot',      emoji: '🥵', bg: '#FFD6D6' },
        ],
      },
      {
        id: 'nature',
        label: 'Nature',
        labelEs: 'La Naturaleza',
        emoji: '🌳',
        minLevel: 1,
        words: [
          { id: 'arbol',     es: 'Árbol',     en: 'Tree',     emoji: '🌳', bg: '#D6FFD6' },
          { id: 'flor',      es: 'Flor',      en: 'Flower',   emoji: '🌸', bg: '#FFD6F0' },
          { id: 'montana',   es: 'Montaña',   en: 'Mountain', emoji: '⛰️', bg: '#D6E8D6' },
          { id: 'rio',       es: 'Río',       en: 'River',    emoji: '🏞️', bg: '#D6F0FF' },
          { id: 'mar',       es: 'Mar',       en: 'Sea',      emoji: '🌊', bg: '#D6F5FF' },
          { id: 'bosque',    es: 'Bosque',    en: 'Forest',   emoji: '🌲', bg: '#D6FFD6' },
          { id: 'luna',      es: 'Luna',      en: 'Moon',     emoji: '🌙', bg: '#EDD6FF' },
          { id: 'estrella-n',es: 'Estrella',  en: 'Star',     emoji: '⭐', bg: '#FFFBD6' },
        ],
      },
      {
        id: 'seasons',
        label: 'Seasons & Time',
        labelEs: 'Las Estaciones',
        emoji: '🍂',
        minLevel: 2,
        words: [
          { id: 'primavera', es: 'Primavera', en: 'Spring', emoji: '🌸', bg: '#FFD6F0' },
          { id: 'verano',    es: 'Verano',    en: 'Summer', emoji: '☀️', bg: '#FFFBD6' },
          { id: 'otono',     es: 'Otoño',     en: 'Autumn', emoji: '🍂', bg: '#FFE8D6' },
          { id: 'invierno',  es: 'Invierno',  en: 'Winter', emoji: '❄️', bg: '#D6F0FF' },
          { id: 'dia',       es: 'Día',       en: 'Day',    emoji: '🌅', bg: '#FFFBD6' },
          { id: 'noche',     es: 'Noche',     en: 'Night',  emoji: '🌃', bg: '#D6D6FF' },
          { id: 'manana',    es: 'Mañana',    en: 'Morning',emoji: '🌄', bg: '#FFE8D6' },
          { id: 'tarde',     es: 'Tarde',     en: 'Evening',emoji: '🌆', bg: '#FFD6D6' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 8: TRANSPORT & PLACES
  // ─────────────────────────────────────────
  {
    id: 'transport-places',
    label: 'Transport & Places',
    labelEs: 'Transporte y Lugares',
    emoji: '🚗',
    gradient: ['#11998E', '#38EF7D'],
    minLevel: 2,
    lessons: [
      {
        id: 'vehicles',
        label: 'Vehicles',
        labelEs: 'Los Vehículos',
        emoji: '🚗',
        minLevel: 2,
        words: [
          { id: 'carro',      es: 'Carro',      en: 'Car',        emoji: '🚗', bg: '#D6E8FF' },
          { id: 'autobus',    es: 'Autobús',    en: 'Bus',        emoji: '🚌', bg: '#FFF0D6' },
          { id: 'tren',       es: 'Tren',       en: 'Train',      emoji: '🚂', bg: '#FFD6D6' },
          { id: 'avion',      es: 'Avión',      en: 'Aeroplane',  emoji: '✈️', bg: '#D6F5FF' },
          { id: 'barco',      es: 'Barco',      en: 'Boat',       emoji: '🚢', bg: '#D6E8FF' },
          { id: 'bicicleta',  es: 'Bicicleta',  en: 'Bicycle',    emoji: '🚲', bg: '#D6FFE8' },
          { id: 'moto',       es: 'Moto',       en: 'Motorbike',  emoji: '🏍️', bg: '#FFD6F0' },
          { id: 'camion',     es: 'Camión',     en: 'Truck',      emoji: '🚚', bg: '#FFE8D6' },
        ],
      },
      {
        id: 'places',
        label: 'Places',
        labelEs: 'Los Lugares',
        emoji: '🏫',
        minLevel: 2,
        words: [
          { id: 'escuela',    es: 'Escuela',    en: 'School',     emoji: '🏫', bg: '#D6E8FF' },
          { id: 'hospital',   es: 'Hospital',   en: 'Hospital',   emoji: '🏥', bg: '#D6FFD6' },
          { id: 'parque',     es: 'Parque',     en: 'Park',       emoji: '🌳', bg: '#D6FFE8' },
          { id: 'tienda',     es: 'Tienda',     en: 'Shop',       emoji: '🏪', bg: '#FFE8D6' },
          { id: 'restaurante',es: 'Restaurante',en: 'Restaurant', emoji: '🍽️', bg: '#FFF0D6' },
          { id: 'playa',      es: 'Playa',      en: 'Beach',      emoji: '🏖️', bg: '#FFFBD6' },
          { id: 'ciudad',     es: 'Ciudad',     en: 'City',       emoji: '🏙️', bg: '#D6D6FF' },
          { id: 'biblioteca', es: 'Biblioteca', en: 'Library',    emoji: '📚', bg: '#EDD6FF' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 9: SCHOOL & LEARNING
  // ─────────────────────────────────────────
  {
    id: 'school',
    label: 'School',
    labelEs: 'La Escuela',
    emoji: '📚',
    gradient: ['#FC5C7D', '#6A3093'],
    minLevel: 2,
    lessons: [
      {
        id: 'classroom',
        label: 'Classroom',
        labelEs: 'El Salón',
        emoji: '✏️',
        minLevel: 2,
        words: [
          { id: 'lapiz',      es: 'Lápiz',      en: 'Pencil',    emoji: '✏️', bg: '#FFFBD6' },
          { id: 'papel',      es: 'Papel',       en: 'Paper',     emoji: '📄', bg: '#F8F8F8' },
          { id: 'libro',      es: 'Libro',       en: 'Book',      emoji: '📚', bg: '#D6E8FF' },
          { id: 'mochila-c',  es: 'Mochila',     en: 'Backpack',  emoji: '🎒', bg: '#FFE8D6' },
          { id: 'pizarron',   es: 'Pizarrón',    en: 'Blackboard',emoji: '🖊️', bg: '#D6FFD6' },
          { id: 'borrador',   es: 'Borrador',    en: 'Eraser',    emoji: '🧹', bg: '#F0F0F0' },
          { id: 'regla',      es: 'Regla',       en: 'Ruler',     emoji: '📏', bg: '#D6F0FF' },
          { id: 'tijeras',    es: 'Tijeras',     en: 'Scissors',  emoji: '✂️', bg: '#FFD6D6' },
        ],
      },
      {
        id: 'actions',
        label: 'Actions',
        labelEs: 'Las Acciones',
        emoji: '🏃',
        minLevel: 2,
        words: [
          { id: 'leer',     es: 'Leer',     en: 'Read',    emoji: '📖', bg: '#D6E8FF' },
          { id: 'escribir', es: 'Escribir', en: 'Write',   emoji: '✍️', bg: '#FFFBD6' },
          { id: 'dibujar',  es: 'Dibujar',  en: 'Draw',    emoji: '🎨', bg: '#FFD6F0' },
          { id: 'contar',   es: 'Contar',   en: 'Count',   emoji: '🔢', bg: '#D6F5FF' },
          { id: 'cantar',   es: 'Cantar',   en: 'Sing',    emoji: '🎵', bg: '#EDD6FF' },
          { id: 'bailar',   es: 'Bailar',   en: 'Dance',   emoji: '💃', bg: '#FFD6E8' },
          { id: 'correr',   es: 'Correr',   en: 'Run',     emoji: '🏃', bg: '#D6FFD6' },
          { id: 'saltar',   es: 'Saltar',   en: 'Jump',    emoji: '🦘', bg: '#FFF0D6' },
        ],
      },
      {
        id: 'days-months',
        label: 'Days & Months',
        labelEs: 'Días y Meses',
        emoji: '📅',
        minLevel: 3,
        words: [
          { id: 'lunes',     es: 'Lunes',      en: 'Monday',    emoji: '📅', bg: '#D6E8FF' },
          { id: 'martes',    es: 'Martes',     en: 'Tuesday',   emoji: '📅', bg: '#FFE8D6' },
          { id: 'miercoles', es: 'Miércoles',  en: 'Wednesday', emoji: '📅', bg: '#D6FFE8' },
          { id: 'jueves',    es: 'Jueves',     en: 'Thursday',  emoji: '📅', bg: '#FFFBD6' },
          { id: 'viernes',   es: 'Viernes',    en: 'Friday',    emoji: '📅', bg: '#EDD6FF' },
          { id: 'enero',     es: 'Enero',      en: 'January',   emoji: '❄️', bg: '#D6F0FF' },
          { id: 'julio',     es: 'Julio',      en: 'July',      emoji: '☀️', bg: '#FFFBD6' },
          { id: 'diciembre', es: 'Diciembre',  en: 'December',  emoji: '🎄', bg: '#D6FFD6' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // UNIT 10: ACTIONS & PHRASES
  // ─────────────────────────────────────────
  {
    id: 'actions-phrases',
    label: 'Actions & Phrases',
    labelEs: 'Acciones y Frases',
    emoji: '💬',
    gradient: ['#4776E6', '#8E54E9'],
    minLevel: 2,
    lessons: [
      {
        id: 'common-actions',
        label: 'Common Actions',
        labelEs: 'Acciones Comunes',
        emoji: '🍽️',
        minLevel: 2,
        words: [
          { id: 'comer',     es: 'Comer',     en: 'Eat',     emoji: '🍽️', bg: '#FFF0D6' },
          { id: 'beber',     es: 'Beber',     en: 'Drink',   emoji: '🥤', bg: '#D6F0FF' },
          { id: 'dormir',    es: 'Dormir',    en: 'Sleep',   emoji: '😴', bg: '#EDD6FF' },
          { id: 'jugar',     es: 'Jugar',     en: 'Play',    emoji: '🎮', bg: '#D6FFE8' },
          { id: 'caminar',   es: 'Caminar',   en: 'Walk',    emoji: '🚶', bg: '#D6E8FF' },
          { id: 'hablar',    es: 'Hablar',    en: 'Speak',   emoji: '🗣️', bg: '#FFE8D6' },
          { id: 'escuchar',  es: 'Escuchar',  en: 'Listen',  emoji: '👂', bg: '#FFD6F0' },
          { id: 'ver',       es: 'Ver',       en: 'Watch',   emoji: '👀', bg: '#D6F5FF' },
        ],
      },
      {
        id: 'greetings',
        label: 'Greetings',
        labelEs: 'Saludos',
        emoji: '👋',
        minLevel: 2,
        words: [
          { id: 'hola',          es: 'Hola',          en: 'Hello',       emoji: '👋', bg: '#FFF8D6' },
          { id: 'adios',         es: 'Adiós',         en: 'Goodbye',     emoji: '🙋', bg: '#FFE8D6' },
          { id: 'gracias',       es: 'Gracias',       en: 'Thank you',   emoji: '🙏', bg: '#D6FFE8' },
          { id: 'por-favor',     es: 'Por favor',     en: 'Please',      emoji: '😊', bg: '#D6E8FF' },
          { id: 'buenos-dias',   es: 'Buenos días',   en: 'Good morning',emoji: '☀️', bg: '#FFFBD6' },
          { id: 'buenas-noches', es: 'Buenas noches', en: 'Good night',  emoji: '🌙', bg: '#E8D6FF' },
          { id: 'si',            es: 'Sí',            en: 'Yes',         emoji: '✅', bg: '#D6FFD6' },
          { id: 'no',            es: 'No',            en: 'No',          emoji: '❌', bg: '#FFD6D6' },
        ],
      },
      {
        id: 'useful-phrases',
        label: 'Useful Phrases',
        labelEs: 'Frases Útiles',
        emoji: '💬',
        minLevel: 3,
        words: [
          { id: 'me-llamo',      es: 'Me llamo...',         en: 'My name is...',      emoji: '🏷️', bg: '#E8D6FF' },
          { id: 'me-gusta',      es: 'Me gusta...',         en: 'I like...',          emoji: '❤️', bg: '#FFD6D6' },
          { id: 'tengo-hambre',  es: 'Tengo hambre',        en: "I'm hungry",         emoji: '🍽️', bg: '#FFF0D6' },
          { id: 'tengo-sed',     es: 'Tengo sed',           en: "I'm thirsty",        emoji: '💧', bg: '#D6F0FF' },
          { id: 'quiero-jugar',  es: '¡Quiero jugar!',      en: 'I want to play!',    emoji: '🎮', bg: '#D6FFE8' },
          { id: 'donde-esta',    es: '¿Dónde está...?',     en: 'Where is...?',       emoji: '🔍', bg: '#EDD6FF' },
          { id: 'no-entiendo',   es: 'No entiendo',         en: "I don't understand", emoji: '🤔', bg: '#D6E8FF' },
          { id: 'puedes-repetir',es: '¿Puedes repetir?',    en: 'Can you repeat?',    emoji: '🔁', bg: '#D6FFD6' },
        ],
      },
      {
        id: 'dialogues',
        label: 'Conversations',
        labelEs: 'Conversaciones',
        emoji: '🗨️',
        minLevel: 3,
        type: 'dialogue',
        dialogues: [
          {
            id: 'intro',
            title: 'Nice to meet you!',
            titleEs: '¡Mucho gusto!',
            emoji: '🤝',
            lines: [
              { speaker: 'A', es: '¡Hola! ¿Cómo te llamas?',   en: 'Hello! What is your name?' },
              { speaker: 'B', es: 'Me llamo Sofía. ¿Y tú?',    en: "My name is Sofia. And you?" },
              { speaker: 'A', es: 'Me llamo Carlos. ¡Mucho gusto!', en: 'My name is Carlos. Nice to meet you!' },
              { speaker: 'B', es: '¡Igualmente!',               en: 'Likewise!' },
            ],
          },
          {
            id: 'age',
            title: 'How old are you?',
            titleEs: '¿Cuántos años tienes?',
            emoji: '🎂',
            lines: [
              { speaker: 'A', es: '¿Cuántos años tienes?',      en: 'How old are you?' },
              { speaker: 'B', es: 'Tengo seis años. ¿Y tú?',    en: "I am six years old. And you?" },
              { speaker: 'A', es: 'Yo tengo siete años.',        en: 'I am seven years old.' },
              { speaker: 'B', es: '¡Qué bueno!',                en: 'How nice!' },
            ],
          },
          {
            id: 'food-pref',
            title: 'What do you like to eat?',
            titleEs: '¿Qué te gusta comer?',
            emoji: '🍎',
            lines: [
              { speaker: 'A', es: '¿Qué te gusta comer?',       en: 'What do you like to eat?' },
              { speaker: 'B', es: 'Me gusta la pizza y la fruta.',en: 'I like pizza and fruit.' },
              { speaker: 'A', es: '¿Te gusta el helado?',        en: 'Do you like ice cream?' },
              { speaker: 'B', es: '¡Sí, me encanta el helado!',  en: 'Yes, I love ice cream!' },
            ],
          },
          {
            id: 'animals-pref',
            title: 'What is your favourite animal?',
            titleEs: '¿Cuál es tu animal favorito?',
            emoji: '🐶',
            lines: [
              { speaker: 'A', es: '¿Cuál es tu animal favorito?',en: 'What is your favourite animal?' },
              { speaker: 'B', es: 'Mi animal favorito es el perro.', en: 'My favourite animal is the dog.' },
              { speaker: 'A', es: '¿Por qué?',                   en: 'Why?' },
              { speaker: 'B', es: 'Porque es muy simpático.',     en: 'Because it is very friendly.' },
            ],
          },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────

/** All units — always show the full curriculum in Explore.
 *  Lessons inside are filtered by level, but units themselves are always visible. */
export const getUnitsForLevel = (_level) => CURRICULUM;

/** Count words available inside a unit for a given level */
export const getWordCountForUnit = (unit, level) => {
  let count = 0;
  for (const lesson of unit.lessons ?? []) {
    if ((lesson.minLevel ?? 1) > level) continue;
    if (lesson.type === 'dialogue') continue;
    count += lesson.words?.length ?? 0;
  }
  return count;
};

/** Lessons within a unit that are available for a given level */
export const getLessonsForUnit = (unitId, level) => {
  const unit = CURRICULUM.find((u) => u.id === unitId);
  if (!unit) return [];
  return unit.lessons.filter((l) => (l.minLevel ?? 1) <= level);
};

/** All words in a specific lesson (by unitId + lessonId) */
export const getWordsInLesson = (unitId, lessonId) => {
  const unit = CURRICULUM.find((u) => u.id === unitId);
  if (!unit) return [];
  const lesson = unit.lessons.find((l) => l.id === lessonId);
  if (!lesson || lesson.type === 'dialogue') return [];
  return lesson.words ?? [];
};

/** Flat list of all words across every unit/lesson available for a level */
export const getAllWordsFromCurriculum = (level) => {
  const words = [];
  for (const unit of CURRICULUM) {
    if (unit.minLevel > level) continue;
    for (const lesson of unit.lessons) {
      if ((lesson.minLevel ?? 1) > level) continue;
      if (lesson.type === 'dialogue') continue;
      for (const word of lesson.words ?? []) {
        words.push({ ...word, unitId: unit.id, lessonId: lesson.id });
      }
    }
  }
  return words;
};

/** All dialogues available for level 3 (Early Learner) */
export const getDialogues = () => {
  const dialogues = [];
  for (const unit of CURRICULUM) {
    for (const lesson of unit.lessons) {
      if (lesson.type === 'dialogue') {
        dialogues.push(...(lesson.dialogues ?? []));
      }
    }
  }
  return dialogues;
};

/** Find a unit by id */
export const getUnit = (unitId) => CURRICULUM.find((u) => u.id === unitId);

/** Find a lesson by unitId + lessonId */
export const getLesson = (unitId, lessonId) => {
  const unit = getUnit(unitId);
  return unit?.lessons.find((l) => l.id === lessonId) ?? null;
};
