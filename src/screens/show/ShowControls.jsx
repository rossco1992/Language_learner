import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOW, glassDark } from '../../theme';

export default function ShowControls({ isPlaying, onToggle, onPrev, onNext, index, total }) {
  return (
    <View style={styles.container}>
      {/* Progress track */}
      <View style={styles.trackRow}>
        <View style={styles.track}>
          <View
            style={[
              styles.trackFill,
              { width: total > 1 ? `${((index) / (total - 1)) * 100}%` : '100%' },
            ]}
          />
        </View>
        <Text style={styles.counter}>{index + 1} / {total}</Text>
      </View>

      {/* Control buttons — glass pill */}
      <View style={styles.pillContainer}>
        <View style={styles.pill}>
          <NavBtn icon="⏮" onPress={onPrev} disabled={index === 0} />

          {/* Big play/pause */}
          <TouchableOpacity
            onPress={onToggle}
            style={styles.playBtn}
            activeOpacity={0.8}
          >
            {/* Glow ring */}
            <View style={styles.playGlow} />
            <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>

          <NavBtn icon="⏭" onPress={onNext} disabled={index === total - 1} />
        </View>
      </View>
    </View>
  );
}

function NavBtn({ icon, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.navBtn, disabled && styles.navBtnDisabled]}
      activeOpacity={0.7}
    >
      <Text style={styles.navIcon}>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },

  // Progress track
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  track: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: RADIUS.full,
  },
  counter: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    minWidth: 40,
    textAlign: 'right',
  },

  // Glass pill
  pillContainer: { alignItems: 'center' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    ...glassDark,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },

  navBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  navBtnDisabled: { opacity: 0.25 },
  navIcon: { fontSize: 22, color: COLORS.white },

  // Play button
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.float,
  },
  playGlow: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  playIcon: { fontSize: 32, color: COLORS.dark },
});
