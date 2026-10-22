const BPM = 78;
const STEPS_PER_BAR = 16;
const SWING = 0.28;
const LOOKAHEAD_SECONDS = 0.12;
const SCHEDULER_INTERVAL_MS = 25;
const MASTER_VOLUME = 0.18;

type Note = [step: number, pitch: string, lengthInSteps: number];

interface Bar {
  bass: string;
  chord: string[];
  lead: Note[];
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

const DM9 = { bass: "D2", chord: ["F3", "A3", "C4", "E4"] };
const G13 = { bass: "G2", chord: ["F3", "A3", "B3", "E4"] };
const CMAJ9 = { bass: "C2", chord: ["E3", "G3", "B3", "D4"] };
const AM9 = { bass: "A1", chord: ["G3", "B3", "C4", "E4"] };

export const SONG: Bar[] = [
  { ...DM9, lead: [[2, "A4", 2], [4, "C5", 4], [10, "E5", 3], [14, "D5", 2]] },
  { ...G13, lead: [[0, "B4", 6], [8, "A4", 2], [10, "G4", 2], [12, "E4", 4]] },
  { ...CMAJ9, lead: [[2, "G4", 2], [4, "B4", 2], [6, "D5", 6], [14, "C5", 2]] },
  { ...AM9, lead: [[0, "B4", 4], [6, "A4", 2], [8, "G4", 8]] },
  { ...DM9, lead: [[2, "F5", 2], [4, "E5", 4], [10, "C5", 2], [12, "D5", 4]] },
  { ...G13, lead: [[0, "B4", 4], [6, "D5", 2], [8, "F5", 4], [12, "E5", 4]] },
  { ...CMAJ9, lead: [[0, "E5", 6], [8, "D5", 2], [10, "B4", 2], [12, "G4", 4]] },
  { ...AM9, lead: [[0, "A4", 10]] },
];

const CHORD_HITS: [step: number, lengthInSteps: number][] = [[0, 6], [10, 5]];
const KICK_STEPS = [0, 7, 10];
const SNARE_STEPS = [4, 12];

/**
 * Builds an NES-style pulse wave from its Fourier series. Narrow duty cycles
 * (0.125, 0.25) give the thin, reedy tone of the 2A03's pulse channels.
 */
function pulseWave(ctx: AudioContext, duty: number): PeriodicWave {
  const harmonics = 32;
  const real = new Float32Array(harmonics);
  const imag = new Float32Array(harmonics);
  for (let n = 1; n < harmonics; n++) {
    real[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * duty);
  }
  return ctx.createPeriodicWave(real, imag);
}

function triangleWave(ctx: AudioContext): PeriodicWave {
  const harmonics = 32;
  const real = new Float32Array(harmonics);
  const imag = new Float32Array(harmonics);
  for (let n = 1; n < harmonics; n += 2) {
    imag[n] = (8 / (Math.PI * Math.PI * n * n)) * (((n - 1) / 2) % 2 === 0 ? 1 : -1);
  }
  return ctx.createPeriodicWave(real, imag);
}

function noiseBuffer(ctx: AudioContext): AudioBuffer {
  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export interface LofiPlayer {
  start(): void;
  stop(): void;
}

/**
 * Original lo-fi chiptune loop synthesized live with the Web Audio API: pulse-wave
 * chords and lead, triangle bass, noise drums, tape wobble, and vinyl crackle.
 * Notes are scheduled slightly ahead of time so timing stays tight even when the
 * main thread is busy.
 */
export function createLofiPlayer(createContext: () => AudioContext = () => new AudioContext()): LofiPlayer {
  let ctx: AudioContext | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;

  function start() {
    if (ctx) return;
    const audio = createContext();
    ctx = audio;

    const stepSeconds = 60 / BPM / 4;
    const master = audio.createGain();
    master.gain.value = MASTER_VOLUME;
    const warmth = audio.createBiquadFilter();
    warmth.type = "lowpass";
    warmth.frequency.value = 3200;
    master.connect(warmth);
    warmth.connect(audio.destination);

    const chordFilter = audio.createBiquadFilter();
    chordFilter.type = "lowpass";
    chordFilter.frequency.value = 1600;
    chordFilter.connect(master);

    const wobble = audio.createOscillator();
    wobble.frequency.value = 0.35;
    const wobbleDepth = audio.createGain();
    wobbleDepth.gain.value = 7;
    wobble.connect(wobbleDepth);
    wobble.start();

    const leadWave = pulseWave(audio, 0.25);
    const chordWave = pulseWave(audio, 0.125);
    const bassWave = triangleWave(audio);
    const noise = noiseBuffer(audio);

    function envelope(time: number, duration: number, volume: number, attack: number, release: number) {
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(volume, time + attack);
      gain.gain.setValueAtTime(volume, time + Math.max(attack, duration - release));
      gain.gain.linearRampToValueAtTime(0, time + duration);
      return gain;
    }

    function tone(frequency: number, time: number, duration: number, volume: number, wave: PeriodicWave, output: AudioNode, wobbles: boolean) {
      const osc = audio.createOscillator();
      osc.setPeriodicWave(wave);
      osc.frequency.value = frequency;
      if (wobbles) wobbleDepth.connect(osc.detune);
      const gain = envelope(time, duration, volume, 0.015, Math.min(0.2, duration / 2));
      osc.connect(gain);
      gain.connect(output);
      osc.start(time);
      osc.stop(time + duration + 0.02);
    }

    function noiseHit(time: number, duration: number, volume: number, filterType: BiquadFilterType, frequency: number) {
      const source = audio.createBufferSource();
      source.buffer = noise;
      const filter = audio.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = frequency;
      const gain = audio.createGain();
      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      source.start(time, Math.random() * 0.5);
      source.stop(time + duration);
    }

    function kick(time: number) {
      const osc = audio.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0.55, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
      osc.connect(gain);
      gain.connect(master);
      osc.start(time);
      osc.stop(time + 0.2);
    }

    function scheduleStep(step: number, time: number) {
      const bar = SONG[Math.floor(step / STEPS_PER_BAR) % SONG.length];
      const beat = step % STEPS_PER_BAR;
      const swung = beat % 2 === 1 ? time + stepSeconds * SWING : time;

      for (const [hit, length] of CHORD_HITS) {
        if (beat !== hit) continue;
        for (const pitch of bar.chord) {
          tone(noteToFrequency(pitch), swung, length * stepSeconds, 0.05, chordWave, chordFilter, false);
        }
      }

      if (beat === 0) tone(noteToFrequency(bar.bass), swung, 4 * stepSeconds, 0.3, bassWave, master, false);
      if (beat === 7) tone(noteToFrequency(bar.bass) * 1.5, swung, 2 * stepSeconds, 0.24, bassWave, master, false);
      if (beat === 10) tone(noteToFrequency(bar.bass), swung, 3 * stepSeconds, 0.27, bassWave, master, false);

      for (const [leadStep, pitch, length] of bar.lead) {
        if (beat === leadStep) tone(noteToFrequency(pitch), swung, length * stepSeconds, 0.09, leadWave, master, true);
      }

      if (KICK_STEPS.includes(beat)) kick(swung);
      if (SNARE_STEPS.includes(beat)) noiseHit(swung, 0.16, 0.16, "bandpass", 1800);
      if (beat % 2 === 0) noiseHit(swung, 0.04, beat % 4 === 2 ? 0.05 : 0.03, "highpass", 7000);
      if (Math.random() < 0.15) noiseHit(time + Math.random() * stepSeconds, 0.003, 0.04, "highpass", 2500);
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
