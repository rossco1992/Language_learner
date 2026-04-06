// Audio Manager
// Currently uses expo-speech (TTS) as the voice engine.
// When you have recorded native-speaker MP3s, add them to assets/audio/
// and register them in AUDIO_FILES below — they will be used automatically.
//
// To record or commission audio:
//   - One file per word, named <wordId>.mp3  (e.g. perro.mp3)
//   - Warm, expressive, native-speaker voice
//   - ~0.8x normal speaking speed for toddlers
//   - Place at: assets/audio/<wordId>.mp3

import * as Speech from 'expo-speech';

// ─── Register local audio files here when you have them ───────────────
// Example:
// import perroAudio from '../../assets/audio/perro.mp3';
// const AUDIO_FILES = { perro: perroAudio };
const AUDIO_FILES = {};
// ──────────────────────────────────────────────────────────────────────

const TTS_OPTIONS = {
  language: 'es-ES',
  pitch: 1.05,
  rate: 0.80,  // slightly slower for toddlers
};

const PHRASE_OPTIONS = {
  language: 'es-ES',
  pitch: 1.0,
  rate: 0.75,
};

export async function playWord(wordId, spanishText) {
  Speech.stop();
  if (AUDIO_FILES[wordId]) {
    // TODO: swap in expo-av playback when audio files are available
    // const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[wordId]);
    // await sound.playAsync();
    // return;
  }
  Speech.speak(spanishText, TTS_OPTIONS);
}

export async function playPhrase(phraseId, spanishText) {
  Speech.stop();
  if (AUDIO_FILES[phraseId]) {
    // swap in expo-av here
  }
  Speech.speak(spanishText, PHRASE_OPTIONS);
}

// Play a celebration phrase ("¡Muy bien!", "¡Perfecto!", etc.)
const CELEBRATIONS = ['¡Muy bien!', '¡Perfecto!', '¡Bravo!', '¡Excelente!', '¡Genial!'];
export function playCelebration() {
  const phrase = CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)];
  Speech.stop();
  Speech.speak(phrase, { ...TTS_OPTIONS, pitch: 1.2, rate: 0.9 });
}

export function stopAudio() {
  Speech.stop();
}
