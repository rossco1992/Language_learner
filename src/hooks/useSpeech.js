import * as Speech from 'expo-speech';

export function useSpeech() {
  const speak = (text) => {
    Speech.stop();
    Speech.speak(text, {
      language: 'es-ES',
      pitch: 1.1,
      rate: 0.85,
    });
  };

  const speakPhrase = (text) => {
    Speech.stop();
    Speech.speak(text, {
      language: 'es-ES',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  const stop = () => Speech.stop();

  return { speak, speakPhrase, stop };
}
