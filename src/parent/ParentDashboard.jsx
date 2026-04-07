import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PACKS } from '../content/packs';
import { useParent } from '../context/ParentContext';
import { useWordTracker } from '../context/WordTrackerContext';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme';

const SESSION_OPTIONS = [3, 5, 10, 15];

export default function ParentDashboard({ navigation }) {
  const { settings, updateSetting, resetProgress } = useParent();
  const { totalWordsIntroduced, totalWordsMastered, resetTracker } = useWordTracker();

  const totalWords = PACKS.reduce((s, p) => s + p.words.length, 0);

  return (
    <LinearGradient colors={['#1A0B2E', '#3B1F6A']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Done</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Parent Dashboard</Text>
          <View style={styles.backBtn} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Progress summary */}
          <Section title="Learning Journey" emoji="📊">
            <View style={styles.statsRow}>
              <StatCard value={totalWordsIntroduced} label="Words heard" color="#6B3FA0" />
              <StatCard value={totalWordsMastered} label="Mastered" color="#38EF7D" />
              <StatCard value={settings.totalSessions} label="Sessions" color="#FF8E53" />
            </View>
            <View style={styles.progressBarOuter}>
              <View style={[styles.progressBarFill, { width: `${Math.min(100, (totalWordsIntroduced / totalWords) * 100)}%` }]} />
            </View>
            <Text style={styles.progressLabel}>{totalWordsIntroduced} / {totalWords} words explored</Text>
          </Section>

          {/* Learning settings */}
          <Section title="Learning Mode" emoji="🎓">
            <SettingRow
              label="Bilingual Mode"
              desc="Show English alongside Spanish"
              value={settings.bilingualMode}
              onToggle={(v) => updateSetting('bilingualMode', v)}
            />
          </Section>

          {/* Session timer */}
          <Section title="Session Length" emoji="⏱">
            <Text style={styles.sectionDesc}>Suggested play time before a break</Text>
            <View style={styles.optionsRow}>
              {SESSION_OPTIONS.map((mins) => (
                <TouchableOpacity
                  key={mins}
                  onPress={() => updateSetting('sessionMinutes', mins)}
                  style={[styles.optionChip, settings.sessionMinutes === mins && styles.optionChipActive]}
                >
                  <Text style={[styles.optionText, settings.sessionMinutes === mins && styles.optionTextActive]}>
                    {mins}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Section>

          {/* Content packs */}
          <Section title="Content Packs" emoji="📦">
            {PACKS.map((pack) => (
              <View key={pack.id} style={styles.packRow}>
                <Text style={styles.packRowEmoji}>{pack.emoji}</Text>
                <View style={styles.packRowInfo}>
                  <Text style={styles.packRowTitle}>{pack.titleEs}</Text>
                  <Text style={styles.packRowSub}>{pack.words.length} words</Text>
                </View>
                <View style={[styles.unlockedBadge, { backgroundColor: pack.gradient[0] + '33' }]}>
                  <Text style={[styles.unlockedText, { color: pack.gradient[0] }]}>✓ Unlocked</Text>
                </View>
              </View>
            ))}
          </Section>

          {/* Parent tip */}
          <View style={styles.tipCard}>
            <Text style={styles.tipEmoji}>💡</Text>
            <View style={styles.tipBody}>
              <Text style={styles.tipTitle}>Co-viewing tip</Text>
              <Text style={styles.tipText}>Sit with your child and repeat the Spanish words aloud together. Point at real objects when you hear their names — it builds vocabulary 3× faster!</Text>
            </View>
          </View>

          {/* Reset */}
          <TouchableOpacity onPress={() => { resetProgress(); resetTracker(); }} style={styles.resetBtn}>
            <Text style={styles.resetText}>Reset progress</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Section({ title, emoji, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{emoji}  {title}</Text>
      {children}
    </View>
  );
}

function StatCard({ value, label, color }) {
  return (
    <View style={[styles.statCard, { borderColor: color + '44' }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SettingRow({ label, desc, value, onToggle }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingText}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDesc}>{desc}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: 'rgba(255,255,255,0.15)', true: '#6B3FA0' }}
        thumbColor={COLORS.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  backBtn: { width: 70 },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '700' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.white },

  scroll: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl, gap: SPACING.lg },

  section: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: SPACING.md,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: COLORS.white, letterSpacing: -0.2 },
  sectionDesc: { fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: '500' },

  statsRow: { flexDirection: 'row', gap: SPACING.sm },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: { fontSize: 28, fontWeight: '900' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: '600', marginTop: 2, textAlign: 'center' },

  progressBarOuter: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: RADIUS.full, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#6B3FA0', borderRadius: RADIUS.full },
  progressLabel: { fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: '600', textAlign: 'center' },

  settingRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  settingText: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  settingDesc: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 },

  optionsRow: { flexDirection: 'row', gap: SPACING.sm },
  optionChip: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: RADIUS.full, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  optionChipActive: { backgroundColor: '#6B3FA0', borderColor: '#6B3FA0' },
  optionText: { fontSize: 15, fontWeight: '700', color: 'rgba(255,255,255,0.6)' },
  optionTextActive: { color: COLORS.white },

  packRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  packRowEmoji: { fontSize: 28 },
  packRowInfo: { flex: 1 },
  packRowTitle: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  packRowSub: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  unlockedBadge: { borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 4 },
  unlockedText: { fontSize: 12, fontWeight: '700' },

  tipCard: { flexDirection: 'row', gap: SPACING.md, backgroundColor: 'rgba(255,200,50,0.1)', borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: 'rgba(255,200,50,0.2)' },
  tipEmoji: { fontSize: 28 },
  tipBody: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: '800', color: '#FFD93D', marginBottom: 4 },
  tipText: { fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 20 },

  resetBtn: { alignSelf: 'center', paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg },
  resetText: { fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: '600' },
});
