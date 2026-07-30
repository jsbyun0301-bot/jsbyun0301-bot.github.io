import { useDesktopPreferencesStore } from '@/stores';

type SoundKind = 'click' | 'open' | 'startup';

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (audioContext) return audioContext;

  const AudioContextCtor =
    window.AudioContext ||
    // @ts-expect-error legacy Safari support
    window.webkitAudioContext;

  if (!AudioContextCtor) return null;
  audioContext = new AudioContextCtor();
  return audioContext;
}

const SOUND_PRESETS: Record<
  SoundKind,
  { frequency: number; duration: number; gain: number }
> = {
  click: { frequency: 620, duration: 0.05, gain: 0.018 },
  open: { frequency: 540, duration: 0.08, gain: 0.028 },
  startup: { frequency: 460, duration: 0.16, gain: 0.03 },
};

export function playSystemSound(kind: SoundKind) {
  if (!useDesktopPreferencesStore.getState().soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const preset = SOUND_PRESETS[kind];
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.type = kind === 'startup' ? 'triangle' : 'sine';
  oscillator.frequency.value = preset.frequency;
  gainNode.gain.value = preset.gain;
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  const now = ctx.currentTime;
  gainNode.gain.setValueAtTime(preset.gain, now);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + preset.duration);
  oscillator.start(now);
  oscillator.stop(now + preset.duration);
}
