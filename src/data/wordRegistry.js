// Unified word registry — single source of truth for all word data.
// Merges words from packs.js, curriculum.js, and vocabulary.js into one
// lookup table keyed by word ID. When the same ID exists in multiple sources,
// the first definition wins (packs > curriculum > vocabulary).

import { PACKS } from '../content/packs';
import { CURRICULUM } from './curriculum';
import { CATEGORIES } from './vocabulary';

const registry = {};

// Helper to normalize a word entry to the shared schema
function register(word) {
  if (registry[word.id]) return; // first definition wins
  registry[word.id] = {
    id: word.id,
    es: word.es,
    en: word.en,
    emoji: word.emoji,
    // Track which sources/contexts this word appears in
    sources: [],
  };
}

// 1. Packs (highest priority — these are the curated toddler words)
for (const pack of PACKS) {
  for (const word of pack.words) {
    register(word);
    registry[word.id].sources.push(`pack:${pack.id}`);
  }
}

// 2. Curriculum
for (const unit of CURRICULUM) {
  for (const lesson of unit.lessons ?? []) {
    if (lesson.type === 'dialogue') continue;
    for (const word of lesson.words ?? []) {
      register(word);
      registry[word.id].sources.push(`curriculum:${unit.id}/${lesson.id}`);
    }
  }
}

// 3. Vocabulary categories
for (const cat of CATEGORIES) {
  for (const word of cat.words) {
    register(word);
    registry[word.id].sources.push(`vocab:${cat.id}`);
  }
}

// Exports
export const WORD_REGISTRY = registry;

export const getWord = (wordId) => registry[wordId] ?? null;

export const getAllWordIds = () => Object.keys(registry);

export const getTotalWordCount = () => Object.keys(registry).length;

// Get all unique activity contexts a word appears in (how many different
// places the child can encounter it — important for the 4+ activity rule)
export const getWordContextCount = (wordId) =>
  registry[wordId]?.sources?.length ?? 0;

// Search words by partial Spanish/English match
export const searchWords = (query) => {
  const q = query.toLowerCase();
  return Object.values(registry).filter(
    (w) => w.es.toLowerCase().includes(q) || w.en.toLowerCase().includes(q)
  );
};
