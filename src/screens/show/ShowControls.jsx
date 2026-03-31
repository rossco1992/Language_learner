import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

export default function ShowControls({ isPlaying, onToggle, onPrev, onNext, index, total }) {
  return (
    <View style={styles.container}>
      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Control buttons */}
      <View style={styles.controls}>
        <ControlButton icon="⏮" onPress={onPrev} disabled={index === 0} />
        <ControlButton
          icon={isPlaying ? '⏸' : '▶️'}
          onPress={onToggle}
          large
          primary
        />
        <ControlButton icon="⏭" onPress={onNext} disabled={index === total - 1} />
      </View>
    </View>
  );
}

function ControlButton({ icon, onPress, disabled, large, primary }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        large && styles.btnLarge,
        primary && styles.btnPrimary,
        disabled && styles.btnDisabled,
      ]}
      activeOpacity={0.75}
    >
      <Text style={[styles.btnIcon, large && styles.btnIconLarge]}>
        {icon}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    gap: SPACING.md,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 260,
  },
  dot: {
    height: 10,
    borderRadius: RADIUS.full,
  },
  dotActive: {
    width: 28,
    backgroundColor: COLORS.primary,
  },
  dotInactive: {
    width: 10,
    backgroundColor: 'rgba(108,99,255,0.25)',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  btn: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.card,
  },
  btnLarge: {
    width: 88,
    height: 88,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
  },
  btnDisabled: {
    opacity: 0.3,
  },
  btnIcon: {
    fontSize: 28,
  },
  btnIconLarge: {
    fontSize: 36,
  },
});
