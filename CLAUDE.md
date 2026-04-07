# ¡Oye! — Behavioral Science Foundation

## Instructions for Claude
When writing code for this app:
- Read the principles below before suggesting any new feature or UI change
- If a proposed change violates an anti-pattern, call it out explicitly before implementing
- Prioritize audio-first, text-light interfaces in all components
- Never add score displays, failure states, or progress percentages — use stars, streaks, and celebrations instead
- Sessions must be designed around 3–5 minute windows with no more than 4–6 words introduced
- Every interactive screen must require the child to do something — no passive consumption
- When in doubt, ask: "Does this help the parent and child learn together?" If not, reconsider
- The primary learning loop is always: IMAGE → SPANISH WORD → SOUND. Do not invert this

---

## Purpose
This document is the scientific backbone of the ¡Oye! app. Every feature, interaction, and design decision must be grounded in these principles. When evaluating a new feature or resolving a design tradeoff, return to this file.

---

## Target Learner Profile

- **Age range:** 1–5 years old
- **Developmental stages spanned:** Late sensorimotor (Piaget), preoperational, early concrete operational
- **Key constraint:** Pre-literate or early-literate. Cannot read instructions, menus, or word labels independently. The app must be usable without reading ability.

---

## Core Developmental Principles

### 1. Learning Is Sensory and Embodied, Not Abstract
Children under 5 learn by doing — touching, hearing, seeing, repeating. They do not learn through explanation. Every interaction in the app must be a concrete, sensory experience: a sound to hear, an image to see, a thing to tap. Never present an abstract rule, grammar table, or written instruction.

**Design implication:** No text-heavy screens. No grammar explanations. No menus that require reading. The app should be navigable by a child who cannot read a single word.

### 2. Imitation Is the Primary Social Learning Mechanism
Bandura's social learning theory and mirror neuron research confirm that young children learn by observing and copying. Language acquisition specifically depends on imitating mouth shapes, intonation, and rhythm.

**Design implication:** The app should model pronunciation clearly and encourage the child to repeat aloud. Audio must be recorded by a native speaker (not TTS), with natural prosody. Where possible, prompt the parent to model alongside the app — the app is a tool for parent-child interaction, not a replacement for it.

### 3. Attachment and Safety Enable Exploration
Bowlby's attachment theory shows that children explore and learn best from a secure base. Stress, frustration, and fear of failure shut down learning. Cortisol impairs memory consolidation.

**Design implication:** The app must never punish wrong answers. No red X screens, no failure states, no lost points. Wrong answers should be met with gentle correction and encouragement. The emotional tone must always be warm, safe, and celebratory. A child should never feel bad while using this app.

### 4. Repetition Builds Neural Pathways — But It Must Feel Fresh
Synaptic strengthening requires repeated activation. Children naturally seek repetition (watching the same show, reading the same book). But the app must provide repetition through varied contexts, not identical drills.

**Design implication:** The same vocabulary should appear across multiple game modes (flashcards, matching, listening, etc.). Spaced repetition scheduling should resurface words at increasing intervals (1 day, 3 days, 7 days, 14 days). The child should encounter "perro" in a flashcard, then in a matching game, then in a listening exercise — same word, different cognitive task each time.

### 5. Play Is the Work of Childhood
Play is not a reward for learning — play IS learning. Piaget, Vygotsky, and modern developmental science all confirm that children construct knowledge through playful exploration. Structured play (games with light rules) and free play (open exploration) both matter.

**Design implication:** Every screen must feel like a game, not a lesson. No "study" framing. Progress should be communicated through stars, streaks, and celebrations — not grades or percentages. The child should want to open the app because it's fun, not because they're told to.

---

## Language Acquisition Principles

### 6. Association Over Translation
Children learn their first language by mapping words directly to objects, actions, and experiences — not by translating from another language. The app should replicate this: Spanish words should be paired with images, sounds, and context, not with English equivalents as the primary pathway.

**Design implication:** The primary learning loop is IMAGE → SPANISH WORD → SOUND. English can exist as a secondary support layer (for the parent, or as a reveal), but it should never be the first thing shown. The child should think "🐕 = perro," not "dog = perro."

### 7. The Phonemic Window Is Open — Protect It
Patricia Kuhl's research shows that infants can distinguish phonemes from any language, but this ability narrows by 12 months to the sounds of their native language(s). Exposure to native-speaker Spanish between ages 1–5 keeps Spanish phonemic categories active in the brain.

**Design implication:** Audio quality is not a nice-to-have — it is the most critical feature of the app. Every word must be recorded by a native Spanish speaker with clear, natural pronunciation. Phonemes that don't exist in English (the rolled R, the soft D, the Spanish vowel system) must be modeled accurately. Poor audio is worse than no audio, because it trains the wrong phonemic categories.

### 8. Social Gating: Live Interaction Beats Screens
Kuhl's studies demonstrated that babies learned Mandarin phonemes from a live speaker but learned nothing from the same content delivered via video. The brain gates language input through social interaction — it prioritizes sounds that come from a real person in a real relationship.

**Design implication:** The app must be designed for co-use with a parent, not solo screen time. Prompts like "Can you say it together?" or "Ask mamá/papá to say it!" should be woven in. The ideal session is a parent and child using the app together for 5 minutes, not a child alone with a screen for 20 minutes. The app's role is to structure and support the parent-child language interaction, not replace it.

### 9. Parentese Is a Feature, Not Baby Talk
The exaggerated, melodic speech adults naturally use with young children (parentese) is linguistically functional: it stretches vowel sounds, slows tempo, and highlights word boundaries, all of which help the infant brain segment the speech stream.

**Design implication:** App audio should be recorded in a warm, slightly exaggerated style — not flat adult speech, and not cartoonish baby talk. Pronunciation guides shown to parents should encourage them to speak slowly, melodically, and with emphasis on vowel sounds.

### 10. Fast Mapping Needs Repetition to Stick
Children ages 3–5 can infer a word's meaning from a single contextual exposure (fast mapping), but this creates only a fragile memory trace. Deep word knowledge — precise meaning, correct usage, long-term retention — requires 10–15 encounters across varied contexts.

**Design implication:** Introducing a word is not the same as learning a word. The app should track per-word exposure count and ensure each word appears in at least 4 different activity types before it is considered "learned." A word heard once in a flashcard and never seen again is a wasted interaction.

### 11. Concrete Nouns First, Then Actions, Then Descriptions
Children's first words in any language follow a predictable order: objects they can see and touch (nouns), then actions (verbs), then properties (adjectives), then abstract/function words. This reflects cognitive development, not arbitrary convention.

**Design implication:** Vocabulary curriculum should follow this sequence strictly:
- **Phase 1:** Concrete nouns (animals, food, body parts, family members, household objects)
- **Phase 2:** High-frequency action verbs (eat, drink, run, sleep, play, want)
- **Phase 3:** Common adjectives (big, small, hot, cold, happy, sad)
- **Phase 4:** Simple phrases and social words (hello, goodbye, please, thank you, I want)

Do not introduce grammar, conjugation, or sentence structure explicitly. Let it emerge naturally through phrase exposure.

---

## Session Design Principles

### 12. Short, Frequent Sessions Beat Long, Rare Ones
Working memory capacity in children ages 2–5 is approximately 2–3 items. Sustained attention spans range from 4–8 minutes. Forcing longer sessions produces fatigue, not learning.

**Design implication:** A single session should be 3–5 minutes and introduce or reinforce no more than 4–6 words. The app should encourage multiple short sessions per day (morning, after nap, before bed) rather than one long session. Session-end celebrations should feel complete, not abrupt — the child should feel they finished something, not that they were cut off.

### 13. Sleep Consolidates Memory
Memory consolidation happens during sleep, particularly during naps for young children. Material encountered shortly before sleep has a retention advantage.

**Design implication:** If the app tracks time of day, an ideal prompt is a brief review session before naptime or bedtime. Even a 2-minute "let's remember today's words" session before sleep is disproportionately effective. This is a feature opportunity, not just a scheduling note.

### 14. Serve and Return: The Interaction Pattern That Matters Most
Harvard Center on the Developing Child identifies "serve and return" — the back-and-forth volley between child and caregiver — as the single strongest predictor of language development. It outperforms household income, parental education, and total word exposure.

**Design implication:** The app should create serve-and-return moments: it presents a word (serve), the child responds by tapping or speaking (return), the app acknowledges and extends (serve again). Wherever possible, the parent should be part of this loop. The app should never be a passive consumption experience — every screen should require the child to do something.

---

## Bilingual Development Principles

### 15. Code-Switching Is Competence, Not Confusion
When bilingual children mix languages in a single sentence, they are demonstrating metalinguistic awareness and executive function — not confusion. This should be normalized, not corrected.

**Design implication:** If the app ever incorporates phrase-level content, mixing English and Spanish in a sentence is acceptable and even encouraged (e.g., "Can you find the perro?"). This mirrors how bilingual families actually talk and reinforces that both languages belong in the child's world.

### 16. BICS vs. CALP: Set Expectations Correctly
Cummins' framework distinguishes Basic Interpersonal Communication Skills (playground fluency, 1–2 years to develop) from Cognitive Academic Language Proficiency (academic fluency, 5–7 years). An app for ages 1–5 is building BICS — vocabulary, pronunciation, basic comprehension — not academic Spanish.

**Design implication:** Success metrics should be word recognition, pronunciation quality, and engagement/retention — not grammar accuracy, reading level, or sentence construction. The app should never test skills that are developmentally inappropriate for the age range. A 3-year-old who can identify 50 Spanish nouns by ear and say them clearly is a massive success.

---

## Anti-Patterns: What the App Must Never Do

1. **Never rely on text as the primary interface.** The learner may not be able to read.
2. **Never use translation as the primary learning method.** Association beats translation.
3. **Never punish wrong answers.** No failure states, no negative sounds, no lost progress.
4. **Never design for solo extended screen time.** The app is a parent-child tool.
5. **Never use text-to-speech.** Only native-speaker recorded audio.
6. **Never introduce grammar explicitly.** Let structure emerge from exposure.
7. **Never measure progress by test scores.** Measure by engagement, exposure count, and return visits.
8. **Never present more than 6 new words in a single session.** Working memory cannot handle it.
9. **Never skip audio.** If a word doesn't have native-speaker audio, it doesn't ship.
10. **Never assume the child is using the app alone.** Design every screen as if a parent is watching and participating.

---

## Summary: The Three Truths This App Is Built On

1. **Young children learn language through sensory association, not instruction.** Show it, say it, play with it. Never explain it.
2. **The parent is the most powerful language-learning tool in existence.** The app's job is to make the parent more effective, not to replace them.
3. **Repetition across varied contexts, in short frequent bursts, is how memory forms.** The app is a spaced repetition engine disguised as a game.