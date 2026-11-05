import { createSynthwavePlayer, MELODY, noteToFrequency, SONG } from "../synthwave";

function param() {
  return {
    value: 0,
    setValueAtTime: jest.fn(),
    linearRampToValueAtTime: jest.fn(),
    exponentialRampToValueAtTime: jest.fn(),
  };
}

function fakeContext() {
  const oscillators: { type: string; detune: { value: number }; start: jest.Mock }[] = [];
  const noiseSources: { start: jest.Mock }[] = [];
  const ctx = {
    currentTime: 0,
    sampleRate: 8000,
    destination: {},
    close: jest.fn(),
    createGain: () => ({ gain: param(), connect: jest.fn() }),
    createBiquadFilter: () => ({ type: "", frequency: param(), Q: param(), connect: jest.fn() }),
    createConvolver: () => ({ buffer: null, connect: jest.fn() }),
    createDelay: () => ({ delayTime: param(), connect: jest.fn() }),
    createPeriodicWave: jest.fn(() => ({})),
    createBuffer: (_channels: number, length: number) => {
      const data = new Float32Array(length);
      return { getChannelData: () => data };
    },
    createBufferSource: () => {
      const source = { buffer: null, connect: jest.fn(), start: jest.fn(), stop: jest.fn() };
      noiseSources.push(source);
      return source;
    },
    createOscillator: () => {
      const osc = {
        type: "",
        frequency: param(),
        detune: param(),
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
        setPeriodicWave: jest.fn(),
      };
      oscillators.push(osc);
      return osc;
    },
  };
  return { ctx, oscillators, noiseSources };
}

describe("noteToFrequency", () => {
  it("tunes A4 to 440Hz", () => {
    expect(noteToFrequency("A4")).toBeCloseTo(440);
  });

  it("handles naturals, sharps, and flats", () => {
    expect(noteToFrequency("C4")).toBeCloseTo(261.63, 1);
    expect(noteToFrequency("A#4")).toBeCloseTo(noteToFrequency("Bb4"));
    expect(noteToFrequency("A1")).toBeCloseTo(55);
  });

  it("rejects malformed notes", () => {
    expect(() => noteToFrequency("H2")).toThrow("Invalid note: H2");
  });
});

describe("SONG", () => {
  it("only uses valid notes", () => {
    for (const section of SONG) {
      for (const chord of section.chords) {
        expect(() => noteToFrequency(chord.bass)).not.toThrow();
        chord.voicing.forEach((pitch) => expect(() => noteToFrequency(pitch)).not.toThrow());
      }
    }
  });

  it("runs 72 bars", () => {
    expect(SONG.reduce((sum, section) => sum + section.bars, 0)).toBe(72);
  });
});

describe("MELODY", () => {
  it("only uses valid notes and stays inside each bar", () => {
    for (const bar of MELODY) {
      for (const [step, pitch, length] of bar) {
        expect(() => noteToFrequency(pitch)).not.toThrow();
        expect(step + length).toBeLessThanOrEqual(16);
      }
    }
  });
});

describe("createSynthwavePlayer", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("schedules the first notes as soon as it starts", () => {
    const { ctx, oscillators } = fakeContext();
    createSynthwavePlayer(() => ctx as unknown as AudioContext).start();

    const scheduled = oscillators.filter((osc) => osc.start.mock.calls.length > 0);
    expect(scheduled.length).toBeGreaterThan(0);
  });

  it("keeps scheduling ahead as time passes and loops the song", () => {
    const { ctx, oscillators, noiseSources } = fakeContext();
    createSynthwavePlayer(() => ctx as unknown as AudioContext).start();

    const loopSeconds = (72 * 16 * 60) / 96 / 4;
    for (let t = 0; t < loopSeconds + 5; t += 0.025) {
      ctx.currentTime = t;
      jest.advanceTimersByTime(25);
    }

    const startTimes = oscillators.flatMap((osc) => osc.start.mock.calls.map(([time]) => time as number));
    expect(startTimes.some((time) => time > loopSeconds)).toBe(true);
    expect(noiseSources.length).toBeGreaterThan(0);
  });

  it("holds the lead back until the first chorus", () => {
    const { ctx, oscillators } = fakeContext();
    createSynthwavePlayer(() => ctx as unknown as AudioContext).start();

    const chorusSeconds = (24 * 16 * 60) / 96 / 4;
    for (let t = 0; t < chorusSeconds + 3; t += 0.025) {
      ctx.currentTime = t;
      jest.advanceTimersByTime(25);
    }

    const leadStarts = oscillators
      .filter((osc) => osc.detune.value === 22)
      .map((osc) => osc.start.mock.calls[0][0] as number);
    expect(leadStarts.length).toBeGreaterThan(0);
    expect(Math.min(...leadStarts)).toBeGreaterThanOrEqual(chorusSeconds);
  });

  it("ignores a second start while playing", () => {
    const factory = jest.fn(() => fakeContext().ctx as unknown as AudioContext);
    const player = createSynthwavePlayer(factory);
    player.start();
    player.start();
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("closes the context and stops scheduling on stop", () => {
    const { ctx, oscillators } = fakeContext();
    const player = createSynthwavePlayer(() => ctx as unknown as AudioContext);
    player.start();
    player.stop();
    const countAfterStop = oscillators.length;

    ctx.currentTime = 5;
    jest.advanceTimersByTime(1000);

    expect(ctx.close).toHaveBeenCalledTimes(1);
    expect(oscillators.length).toBe(countAfterStop);
  });

  it("does nothing when stopped before starting, and can restart after stopping", () => {
    const factory = jest.fn(() => fakeContext().ctx as unknown as AudioContext);
    const player = createSynthwavePlayer(factory);
    player.stop();
    player.start();
    player.stop();
    player.start();
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it("creates a real AudioContext by default", () => {
    const { ctx } = fakeContext();
    const original = (globalThis as { AudioContext?: unknown }).AudioContext;
    (globalThis as { AudioContext?: unknown }).AudioContext = jest.fn(() => ctx);
    try {
      createSynthwavePlayer().start();
      expect((globalThis as unknown as { AudioContext: jest.Mock }).AudioContext).toHaveBeenCalledTimes(1);
    } finally {
      (globalThis as { AudioContext?: unknown }).AudioContext = original;
    }
  });
});
