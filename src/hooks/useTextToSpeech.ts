import { useState, useEffect, useRef, useCallback } from 'react';

const VOICE_STORAGE_KEY = 'tts-voice-preference';
const PITCH_STORAGE_KEY = 'tts-pitch-preference';

interface UseTextToSpeechReturn {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  speed: number;
  pitch: number;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setSpeed: (speed: number) => void;
  setPitch: (pitch: number) => void;
  setVoice: (voice: SpeechSynthesisVoice | null) => void;
}

export function useTextToSpeech(): UseTextToSpeechReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeedState] = useState(1);
  const [pitch, setPitchState] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window && !!window.speechSynthesis);
  }, []);

  useEffect(() => {
    if (!isSupported || !window.speechSynthesis) return;

    const loadVoices = () => {
      if (!window.speechSynthesis) return;

      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const savedVoiceURI = localStorage.getItem(VOICE_STORAGE_KEY);
      const savedPitch = localStorage.getItem(PITCH_STORAGE_KEY);

      if (savedPitch) {
        setPitchState(parseFloat(savedPitch));
      }

      if (savedVoiceURI && availableVoices.length > 0) {
        const voice = availableVoices.find(v => v.voiceURI === savedVoiceURI);
        if (voice) {
          setSelectedVoice(voice);
        }
      }
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isSupported]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;
    utterance.pitch = pitch;
    utterance.volume = 1;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, speed, pitch, selectedVoice]);

  const pause = useCallback(() => {
    if (!isSupported || !isSpeaking) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (!isSupported || !isPaused) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, [isSupported, isPaused]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [isSupported]);

  const setSpeed = useCallback((newSpeed: number) => {
    setSpeedState(newSpeed);
    if (utteranceRef.current) {
      utteranceRef.current.rate = newSpeed;
    }
  }, []);

  const setPitch = useCallback((newPitch: number) => {
    setPitchState(newPitch);
    localStorage.setItem(PITCH_STORAGE_KEY, newPitch.toString());
    if (utteranceRef.current) {
      utteranceRef.current.pitch = newPitch;
    }
  }, []);

  const setVoice = useCallback((voice: SpeechSynthesisVoice | null) => {
    setSelectedVoice(voice);
    if (voice) {
      localStorage.setItem(VOICE_STORAGE_KEY, voice.voiceURI);
    } else {
      localStorage.removeItem(VOICE_STORAGE_KEY);
    }
  }, []);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    speed,
    pitch,
    voices,
    selectedVoice,
    speak,
    pause,
    resume,
    stop,
    setSpeed,
    setPitch,
    setVoice,
  };
}