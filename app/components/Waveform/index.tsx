import { useCallback, useEffect, useState, useRef } from "react";

import useWavesurfer from "~/hooks/useWaveSurfer";

import styles from "./index.module.css";

const Waveform = (props: any) => {
  const containerRef = useRef<any>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);

  const onPlayClick = useCallback(() => {
    if (wavesurfer)
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime: any) =>
        setCurrentTime(currentTime)
      ),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <div className={styles.container}>
      <h3>Audio Waveform for the video</h3>
      <div ref={containerRef} className={styles.audioWaveform} />
      <button onClick={onPlayClick} className={styles.btn}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <p>Seconds played: {currentTime}</p>
    </div>
  );
};

export default Waveform;
