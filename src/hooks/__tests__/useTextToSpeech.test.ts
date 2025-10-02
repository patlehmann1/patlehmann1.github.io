import { renderHook, act } from '@testing-library/react';
import { useTextToSpeech } from '../useTextToSpeech';

describe('useTextToSpeech', () => {
  let mockSpeechSynthesis: {
    speak: jest.Mock;
    cancel: jest.Mock;
    pause: jest.Mock;
    resume: jest.Mock;
    getVoices: jest.Mock;
    onvoiceschanged: (() => void) | null;
  };

  const mockVoices = [
    { voiceURI: 'voice1', name: 'Voice 1', lang: 'en-US', default: true, localService: true },
    { voiceURI: 'voice2', name: 'Voice 2', lang: 'en-GB', default: false, localService: true },
  ] as SpeechSynthesisVoice[];

  beforeEach(() => {
    localStorage.clear();

    mockSpeechSynthesis = {
      speak: jest.fn(),
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      getVoices: jest.fn(() => mockVoices),
      onvoiceschanged: null,
    };

    Object.defineProperty(window, 'speechSynthesis', {
      writable: true,
      configurable: true,
      value: mockSpeechSynthesis,
    });

    global.SpeechSynthesisUtterance = jest.fn().mockImplementation(() => ({
      rate: 1,
      pitch: 1,
      volume: 1,
      voice: null,
      onstart: null,
      onend: null,
      onerror: null,
    })) as unknown as typeof SpeechSynthesisUtterance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useTextToSpeech());

    expect(result.current.isSupported).toBe(true);
    expect(result.current.isSpeaking).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.speed).toBe(1);
    expect(result.current.pitch).toBe(1);
    expect(result.current.voices).toEqual(mockVoices);
  });

  it('should detect when speech synthesis is not supported', () => {
    Object.defineProperty(window, 'speechSynthesis', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useTextToSpeech());

    expect(result.current.isSupported).toBe(false);
  });

  it('should call speak with correct text', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Hello, world!');
    });

    expect(mockSpeechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('Hello, world!');
  });

  it('should update isSpeaking state when speaking starts', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Test text');
    });

    const utterance = (SpeechSynthesisUtterance as jest.Mock).mock.results[0].value;

    act(() => {
      utterance.onstart();
    });

    expect(result.current.isSpeaking).toBe(true);
    expect(result.current.isPaused).toBe(false);
  });

  it('should update state when speaking ends', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Test text');
    });

    const utterance = (SpeechSynthesisUtterance as jest.Mock).mock.results[0].value;

    act(() => {
      utterance.onstart();
    });

    act(() => {
      utterance.onend();
    });

    expect(result.current.isSpeaking).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });

  it('should pause speech when pause is called', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Test text');
    });

    const utterance = (SpeechSynthesisUtterance as jest.Mock).mock.results[0].value;
    act(() => {
      utterance.onstart();
    });

    act(() => {
      result.current.pause();
    });

    expect(mockSpeechSynthesis.pause).toHaveBeenCalledTimes(1);
    expect(result.current.isPaused).toBe(true);
  });

  it('should resume speech when resume is called', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Test text');
    });

    const utterance = (SpeechSynthesisUtterance as jest.Mock).mock.results[0].value;
    act(() => {
      utterance.onstart();
    });

    act(() => {
      result.current.pause();
    });

    act(() => {
      result.current.resume();
    });

    expect(mockSpeechSynthesis.resume).toHaveBeenCalledTimes(1);
    expect(result.current.isPaused).toBe(false);
  });

  it('should stop speech when stop is called', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Test text');
    });

    const utterance = (SpeechSynthesisUtterance as jest.Mock).mock.results[0].value;
    act(() => {
      utterance.onstart();
    });

    act(() => {
      result.current.stop();
    });

    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    expect(result.current.isSpeaking).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });

  it('should update speed correctly', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.setSpeed(1.5);
    });

    expect(result.current.speed).toBe(1.5);
  });

  it('should update pitch correctly and save to localStorage', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.setPitch(1.5);
    });

    expect(result.current.pitch).toBe(1.5);
    expect(localStorage.getItem('tts-pitch-preference')).toBe('1.5');
  });

  it('should update pitch on active utterance', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Test text');
    });

    const utterance = (SpeechSynthesisUtterance as jest.Mock).mock.results[0].value;

    act(() => {
      result.current.setPitch(1.8);
    });

    expect(utterance.pitch).toBe(1.8);
  });

  it('should set voice and save to localStorage', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.setVoice(mockVoices[0]);
    });

    expect(result.current.selectedVoice).toEqual(mockVoices[0]);
    expect(localStorage.getItem('tts-voice-preference')).toBe('voice1');
  });

  it('should clear voice preference when setting null', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.setVoice(mockVoices[0]);
    });

    expect(localStorage.getItem('tts-voice-preference')).toBe('voice1');

    act(() => {
      result.current.setVoice(null);
    });

    expect(result.current.selectedVoice).toBeNull();
    expect(localStorage.getItem('tts-voice-preference')).toBeNull();
  });

  it('should restore voice preference from localStorage', () => {
    localStorage.setItem('tts-voice-preference', 'voice2');

    const { result } = renderHook(() => useTextToSpeech());

    expect(result.current.selectedVoice?.voiceURI).toBe('voice2');
  });

  it('should restore pitch preference from localStorage', () => {
    localStorage.setItem('tts-pitch-preference', '1.8');

    const { result } = renderHook(() => useTextToSpeech());

    expect(result.current.pitch).toBe(1.8);
  });

  it('should apply selected voice when speaking', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.setVoice(mockVoices[1]);
    });

    act(() => {
      result.current.speak('Test text');
    });

    const utterance = (SpeechSynthesisUtterance as jest.Mock).mock.results[0].value;
    expect(utterance.voice).toEqual(mockVoices[1]);
  });

  it('should cancel speech on unmount', () => {
    const { unmount } = renderHook(() => useTextToSpeech());

    unmount();

    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });

  it('should handle errors gracefully', () => {
    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Test text');
    });

    const utterance = (SpeechSynthesisUtterance as jest.Mock).mock.results[0].value;

    act(() => {
      utterance.onstart();
    });

    act(() => {
      utterance.onerror();
    });

    expect(result.current.isSpeaking).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });

  it('should not call API methods when not supported', () => {
    Object.defineProperty(window, 'speechSynthesis', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useTextToSpeech());

    act(() => {
      result.current.speak('Test');
      result.current.pause();
      result.current.resume();
      result.current.stop();
    });

    expect(result.current.isSpeaking).toBe(false);
  });
});