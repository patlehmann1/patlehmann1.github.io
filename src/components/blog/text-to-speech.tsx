"use client";

import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Volume2, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/types";
import { prepareTTSContent } from "@/lib/tts-utils";

interface TextToSpeechProps {
  post: BlogPost;
  className?: string;
}

export function TextToSpeech({ post, className = "" }: TextToSpeechProps) {
  const {
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
    setVoice
  } = useTextToSpeech();
  const [ttsText, setTtsText] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setTtsText(prepareTTSContent(post.content, post.ttsContent));
  }, [post.content, post.ttsContent]);

  if (!isSupported) {
    return (
      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
        <Volume2 className="h-4 w-4" />
        <span>Text-to-speech not supported in this browser</span>
      </div>
    );
  }

  const handlePlayPause = () => {
    if (isSpeaking && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak(ttsText);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setSpeed(nextSpeed);
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPitch(parseFloat(e.target.value));
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voice = voices.find(v => v.voiceURI === e.target.value);
    setVoice(voice || null);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            className="flex items-center gap-2"
            aria-label={isSpeaking && !isPaused ? "Pause" : "Play"}
          >
            {isSpeaking && !isPaused ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {isSpeaking && !isPaused ? "Pause" : isPaused ? "Resume" : "Listen"}
            </span>
          </Button>

          {isSpeaking && (
            <Button
              variant="outline"
              size="sm"
              onClick={stop}
              aria-label="Stop"
            >
              <Square className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Stop</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSpeedChange}
            className="text-sm"
            aria-label={`Speed: ${speed}x`}
          >
            {speed}x
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Voice settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSettings && (
        <div className="flex flex-col gap-3 p-4 border border-border rounded-lg bg-background">
          <div className="flex flex-col gap-2">
            <label htmlFor="voice-select" className="text-sm font-medium">
              Voice
            </label>
            <select
              id="voice-select"
              value={selectedVoice?.voiceURI || ""}
              onChange={handleVoiceChange}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Default</option>
              {voices.map((voice, index) => (
                <option key={`${voice.voiceURI}-${voice.name}-${voice.lang}-${index}`} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pitch-slider" className="text-sm font-medium">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              id="pitch-slider"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={handlePitchChange}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}