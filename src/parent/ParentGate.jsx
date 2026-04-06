// ParentGate — math challenge prevents toddlers from accessing parent settings.
// A random addition problem is shown (e.g. "3 + 4 = ?") with a number pad.
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme';

const { width } = Dimensions.get('window');

function makeChallenge() {
  const a = Math.floor(Math.random() * 6) + 2; // 2–7
  const b = Math.floor(Math.random() * 6) + 2; // 2–7
  return { a, b, answer: a + b };
}

export default function ParentGate({ navigation, onSuccess }) {
  const [challenge, setChallenge] = useState(makeChallenge);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | wrong

  const shakeX = useRef(new Animated.Value(0)).current;

  const handleKey = (key) => {
    if (status === 'wrong') setStatus('idle');
    if (key === '⌫') {
      setInput((v) => v.slice(0, -1));
    } else if (input.length < 2) {
      const next = input + key;
      setInput(next);

      if (parseInt(next, 10) === challenge.answer) {
        setStatus('idle');
        // Navigate or callback
        if (onSuccess) {
          onSuccess();
        } else {
          navigation.navigate('parentdashboard');
        }
      } else if (next.length === 2) {
        // Wrong
        setStatus('wrong');
        setChallenge(makeChallenge());
        Animated.sequence([
          Animated.timing(shakeX, { toValue: -14, duration: 55, useNativeDriver: true }),
          Animated.timing(shakeX, { toValue: 14,  duration: 55, useNativeDriver: true }),
          Animated.timing(shakeX, { toValue: -10, duration: 55, useNativeDriver: true }),
          Animated.timing(shakeX, { toValue: 10,  duration: 55, useNativeDriver: true }),
          Animated.timing(shakeX, { toValue: 0,   duration: 55, useNativeDriver: true }),
        ]).start(() => setInput(''));
      }
    }
  };

  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

  return (
    <LinearGradient colors={['#1A0B2E', '#3B1F6A', '#6B3FA0']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.lockEmoji}>🔒</Text>
          <Text style={styles.title}>Parent Area</Text>
          <Text style={styles.subtitle}>Solve the problem to continue</Text>

          {/* Challenge */}
          <Animated.View style={[styles.challengeBox, { transform: [{ translateX: shakeX }] }]}>
            <Text style={styles.challengeText}>{challenge.a} + {challenge.b} = ?</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{input || ' '}</Text>
            </View>
            {status === 'wrong' && (
              <Text style={styles.wrongText}>Not quite — try again!</Text>
            )}
          </Animated.View>

          {/* Number pad */}
          <View style={styles.pad}>
            {KEYS.map((key, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.padKey, !key && styles.padKeyBlank]}
                onPress={() => key && handleKey(key)}
                activeOpacity={0.7}
                disabled={!key}
              >
                <Text style={styles.padKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const KEY_SIZE = (width - SPACING.lg * 2 - SPACING.md * 2) / 3;

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  closeBtn: {
    alignSelf: 'flex-end',
    margin: SPACING.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  closeText: { color: COLORS.white, fontSize: 18, fontWeight: '700' },

  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.lg, gap: SPACING.lg },
  lockEmoji: { fontSize: 52 },
  title: { fontSize: 30, fontWeight: '900', color: COLORS.white, letterSpacing: -0.3 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.65)', fontWeight: '500', marginTop: -SPACING.sm },

  challengeBox: { alignItems: 'center', gap: SPACING.sm },
  challengeText: { fontSize: 40, fontWeight: '900', color: COLORS.white, letterSpacing: -0.5 },
  inputBox: {
    width: 80,
    height: 64,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  inputText: { fontSize: 36, fontWeight: '900', color: COLORS.white },
  wrongText: { fontSize: 15, color: '#FF8E8E', fontWeight: '700' },

  pad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: KEY_SIZE * 3 + SPACING.md * 2,
    gap: SPACING.md,
    justifyContent: 'center',
  },
  padKey: {
    width: KEY_SIZE,
    height: KEY_SIZE * 0.75,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    ...SHADOW.card,
  },
  padKeyBlank: { backgroundColor: 'transparent', borderColor: 'transparent', elevation: 0, shadowOpacity: 0 },
  padKeyText: { fontSize: 26, fontWeight: '800', color: COLORS.white },
});
