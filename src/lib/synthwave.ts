const BPM = 96;
const STEPS_PER_BAR = 16;
const LOOKAHEAD_SECONDS = 0.12;
const SCHEDULER_INTERVAL_MS = 25;
const MASTER_VOLUME = 0.45;
const DELAY_SECONDS = 0.375;

type Note = [step: number, pitch: string, lengthInSteps: number];

interface Chord {
  bass: string;
  voicing: string[];
}

interface Section {
  bars: number;
  chords: Chord[];
  padCutoff: number;
  arpLevel: number;
  groove?: "verse" | "chorus";
  leadCutoff?: number;
}

const SEMITONES: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export function noteToFrequency(note: string): number {
  const match = /^([A-G])(#|b)?(-?\d)$/.exec(note);
  if (!match) throw new Error(`Invalid note: ${note}`);
  const [, letter, accidental, octave] = match;
  const offset = accidental === "#" ? 1 : accidental === "b" ? -1 : 0;
  const midi = (Number(octave) + 1) * 12 + SEMITONES[letter] + offset;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

const F_SHARP_MINOR = { bass: "F#1", voicing: ["F#3", "A3", "C#4", "F#4"] };
const D_MAJOR = { bass: "D1", voicing: ["F#3", "A3", "D4", "F#4"] };
const A_MAJOR = { bass: "A1", voicing: ["E3", "A3", "C#4", "E4"] };
const E_MAJOR = { bass: "E1", voicing: ["E3", "G#3", "B3", "E4"] };
const C_SHARP_MINOR = { bass: "C#1", voicing: ["E3", "G#3", "C#4", "E4"] };

const VERSE = [F_SHARP_MINOR, D_MAJOR, A_MAJOR, E_MAJOR];
const CHORUS = [D_MAJOR, E_MAJOR, C_SHARP_MINOR, F_SHARP_MINOR];

export const MELODY: Note[][] = [
  [[2, "A4", 2], [4, "B4", 2], [6, "C#5", 2], [10, "D5", 4], [14, "C#5", 2]],
  [[0, "B4", 6], [8, "G#4", 2], [10, "B4", 2], [12, "E5", 4]],
  [[0, "E5", 2], [2, "C#5", 2], [6, "G#4", 2], [10, "E5", 2], [12, "D5", 2], [14, "C#5", 2]],
  [[0, "C#5", 12]],
  [[2, "A4", 2], [4, "B4", 2], [6, "C#5", 2], [10, "D5", 4], [14, "E5", 2]],
  [[0, "F#5", 4], [4, "E5", 2], [8, "B4", 2], [12, "E5", 2], [14, "G#5", 2]],
  [[0, "G#5", 6], [8, "F#5", 2], [10, "E5", 2], [12, "C#5", 2]],
  [[0, "F#5", 12]],
];

export const SONG: Section[] = [
  { bars: 8, chords: VERSE, padCutoff: 700, arpLevel: 0.6 },
  { bars: 16, chords: VERSE, padCutoff: 1800, arpLevel: 1, groove: "verse" },
  { bars: 16, chords: CHORUS, padCutoff: 1800, arpLevel: 1, groove: "chorus", leadCutoff: 2800 },
  { bars: 8, chords: CHORUS, padCutoff: 900, arpLevel: 1, leadCutoff: 1500 },
  { bars: 16, chords: CHORUS, padCutoff: 1800, arpLevel: 1, groove: "chorus", leadCutoff: 2800 },
  { bars: 8, chords: VERSE, padCutoff: 600, arpLevel: 0.5 },
];

const BARS = SONG.flatMap((section) => Array.from({ length: section.bars }, (_, bar) => ({ section, bar })));

const ARP_ORDER = [0, 1, 2, 3, 2, 1, 2, 3];
const HAT_LEVELS = [0.11, 0.045, 0.08, 0.045];
const PAD_DETUNE = [-12, 0, 12];
const LEAD_DETUNE = [-22, -11, 0, 11, 22];

function noiseBuffer(ctx: AudioContext): AudioBuffer {
  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function reverbImpulse(ctx: AudioContext, seconds: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
  }
  return buffer;
}

export interface MusicPlayer {
  start(): void;
  stop(): void;
}

/**
 * Original synthwave track synthesized live with the Web Audio API: detuned saw pads
 * and lead, a square-wave arpeggio, octave saw bass, and synthesized drums, arranged
 * as intro, verse, chorus, breakdown, chorus, and outro. Notes are scheduled slightly
 * ahead of time so timing stays tight even when the main thread is busy.
 */
export function createSynthwavePlayer(createContext: () => AudioContext = () => new AudioContext()): MusicPlayer {
  let ctx: AudioContext | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;

  function start() {
    if (ctx) return;
    const audio = createContext();
    ctx = audio;

    const stepSeconds = 60 / BPM / 4;
    const master = audio.createGain();
    master.gain.value = MASTER_VOLUME;
    master.connect(audio.destination);

    const reverb = audio.createConvolver();
    reverb.buffer = reverbImpulse(audio, 2.5);
    reverb.connect(master);

    const delay = audio.createDelay(1);
    delay.delayTime.value = DELAY_SECONDS;
    const feedback = audio.createGain();
    feedback.gain.value = 0.38;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(master);

    function bus(reverbSend: number, delaySend: number) {
      const input = audio.createGain();
      input.connect(master);
      for (const [amount, target] of [[reverbSend, reverb], [delaySend, delay]] as const) {
        if (amount === 0) continue;
        const send = audio.createGain();
        send.gain.value = amount;
        input.connect(send);
        send.connect(target);
      }
      return input;
    }

    const padBus = bus(0.5, 0);
    const arpBus = bus(0.2, 0.4);
    const leadBus = bus(0.4, 0.35);
    const snareBus = bus(0.8, 0);

    const vibrato = audio.createOscillator();
    vibrato.frequency.value = 5.5;
    const vibratoDepth = audio.createGain();
    vibratoDepth.gain.value = 10;
    vibrato.connect(vibratoDepth);
    vibrato.start();

    const noise = noiseBuffer(audio);

    function envelope(time: number, duration: number, volume: number, attack: number, release: number) {
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(volume, time + attack);
      gain.gain.setValueAtTime(volume, time + Math.max(attack, duration - release));
      gain.gain.linearRampToValueAtTime(0, time + duration);
      return gain;
    }

    function pluck(time: number, duration: number, volume: number) {
      const gain = audio.createGain();
      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      return gain;
    }

    function lowpass(cutoff: number, resonance: number, output: AudioNode) {
      const filter = audio.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = cutoff;
      filter.Q.value = resonance;
      filter.connect(output);
      return filter;
    }

    function voices(type: OscillatorType, frequency: number, detunes: number[], time: number, duration: number, output: AudioNode, vibrates = false) {
      for (const cents of detunes) {
        const osc = audio.createOscillator();
        osc.type = type;
        osc.frequency.value = frequency;
        osc.detune.value = cents;
        if (vibrates) vibratoDepth.connect(osc.detune);
        osc.connect(output);
        osc.start(time);
        osc.stop(time + duration + 0.02);
      }
    }

    function pad(chord: Chord, time: number, cutoff: number) {
      const filter = lowpass(cutoff, 0.7, padBus);
      const duration = 4 * stepSeconds + 0.3;
      for (const pitch of chord.voicing) {
        const gain = envelope(time, duration, 0.035, 0.12, 0.3);
        gain.connect(filter);
        voices("sawtooth", noteToFrequency(pitch), PAD_DETUNE, time, duration, gain);
      }
    }

    function arp(chord: Chord, beat: number, time: number, level: number) {
      const gain = pluck(time, 0.15, 0.09 * level);
      gain.connect(lowpass(2600, 0.7, arpBus));
      voices("square", noteToFrequency(chord.voicing[ARP_ORDER[beat % ARP_ORDER.length]]), [0], time, 0.15, gain);
    }

    function bass(chord: Chord, beat: number, time: number, cutoff: number) {
      const octave = beat % 4 === 2 ? 2 : 1;
      const gain = pluck(time, 0.25, 0.35);
      gain.connect(lowpass(cutoff, 5, master));
      voices("sawtooth", noteToFrequency(chord.bass) * octave, [0], time, 0.25, gain);
    }

    function lead(pitch: string, lengthInSteps: number, time: number, cutoff: number) {
      const duration = lengthInSteps * stepSeconds * 1.05 + 0.35;
      const filter = lowpass(cutoff, 3, leadBus);
      filter.frequency.setValueAtTime(cutoff * 4, time);
      filter.frequency.exponentialRampToValueAtTime(cutoff, time + 0.3);
      const gain = envelope(time, duration, 0.05, 0.02, 0.35);
      gain.connect(filter);
      voices("sawtooth", noteToFrequency(pitch), LEAD_DETUNE, time, duration, gain, true);
    }

    function noiseHit(time: number, duration: number, volume: number, filterType: BiquadFilterType, frequency: number, output: AudioNode) {
      const source = audio.createBufferSource();
      source.buffer = noise;
      const filter = audio.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = frequency;
      const gain = pluck(time, duration, volume);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(output);
      source.start(time, Math.random() * 0.5);
      source.stop(time + duration);
    }

    function kick(time: number) {
      const osc = audio.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(48, time + 0.1);
      const gain = pluck(time, 0.35, 0.9);
      osc.connect(gain);
      gain.connect(master);
      osc.start(time);
      osc.stop(time + 0.37);
    }

    function snare(time: number) {
      noiseHit(time, 0.2, 0.35, "bandpass", 1800, snareBus);
      const body = pluck(time, 0.12, 0.25);
      body.connect(snareBus);
      voices("triangle", 190, [0], time, 0.12, body);
    }

    function scheduleStep(step: number, time: number) {
      const { section, bar } = BARS[Math.floor(step / STEPS_PER_BAR) % BARS.length];
      const chord = section.chords[bar % section.chords.length];
      const beat = step % STEPS_PER_BAR;

      if (beat % 4 === 0) pad(chord, time, section.padCutoff);
      arp(chord, beat, time, section.arpLevel);

      if (section.groove) {
        const sweep = 950 + 450 * Math.sin((2 * Math.PI * (bar + beat / STEPS_PER_BAR)) / 16);
        if (beat % 2 === 0) bass(chord, beat, time, section.groove === "verse" ? sweep : 1400);
        if (beat % 4 === 0) kick(time);
        if (beat === 4 || beat === 12) snare(time);
        noiseHit(time, 0.03, HAT_LEVELS[beat % 4], "highpass", 8000, master);
        if (section.groove === "chorus" && beat % 4 === 2) noiseHit(time, 0.18, 0.05, "highpass", 7000, master);
      }

      if (section.leadCutoff) {
        for (const [leadStep, pitch, length] of MELODY[bar % MELODY.length]) {
          if (beat === leadStep) lead(pitch, length, time, section.leadCutoff);
        }
      }
    }

    let step = 0;
    let nextStepTime = audio.currentTime + 0.05;
    function schedule() {
      while (nextStepTime < audio.currentTime + LOOKAHEAD_SECONDS) {
        scheduleStep(step, nextStepTime);
        step += 1;
        nextStepTime += stepSeconds;
      }
    }
    schedule();
    timer = setInterval(schedule, SCHEDULER_INTERVAL_MS);
  }

  function stop() {
    if (!ctx) return;
    if (timer) clearInterval(timer);
    timer = null;
    const closing = ctx;
    ctx = null;
    closing.close();
  }

  return { start, stop };
}
