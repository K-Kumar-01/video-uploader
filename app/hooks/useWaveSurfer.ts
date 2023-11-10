import { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

import type { WaveSurferOptions } from "wavesurfer.js";

const useWavesurfer = (containerRef: any, options: WaveSurferOptions) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      media: document.getElementById("video") as HTMLMediaElement,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

export default useWavesurfer;
