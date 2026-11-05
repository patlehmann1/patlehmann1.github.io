"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "@/components/ui/icons/pixel";
import { Button } from "@/components/ui/button";
import { createSynthwavePlayer, MusicPlayer } from "@/lib/synthwave";

export function MusicToggle() {
  const playerRef = useRef<MusicPlayer | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => playerRef.current?.stop(), []);

  function toggle() {
    playerRef.current ??= createSynthwavePlayer();
    if (playing) playerRef.current.stop();
    else playerRef.current.start();
    setPlaying(!playing);
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      className="w-9 h-9 p-0 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
      aria-label={playing ? "Stop synthwave music" : "Play synthwave music"}
      aria-pressed={playing}
      title={playing ? "Stop synthwave music" : "Play synthwave music"}
    >
      {playing ? <VolumeX className="h-4 w-4 text-primary" /> : <Music className="h-4 w-4 text-primary" />}
    </Button>
  );
}
