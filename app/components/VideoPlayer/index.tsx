import { useEffect } from "react";

import type { VideoPlayerProps } from "~/types";

import styles from "./index.module.css";

const VideoPlayer = ({
  fileURL,
  checking,
  setChecking,
  setFile,
  setDisplay,
}: VideoPlayerProps) => {
  const hasAudio = (video: any) =>
    video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length);

  useEffect(() => {
    const videoElement = document.getElementById("video") as HTMLVideoElement;
    if (videoElement) {
      const getData = async (event: any) => {
        videoElement.play();
        await new Promise((r) => setTimeout(r, 100));
        videoElement.pause();
        if (hasAudio(videoElement)) {
          videoElement.currentTime = 0;
          setChecking(2);
          setDisplay(true);
        } else {
          setChecking(-1);
          alert("Video has no audio in it");
          setFile(null);
          setDisplay(false);
        }
      };
      videoElement.addEventListener("loadeddata", getData);
      return () => videoElement.removeEventListener("loadeddata", getData);
    }
  }, [setChecking, setDisplay, setFile]);

  return (
    <div className={styles.container}>
      <video
        id="video"
        src={fileURL}
        controls={true}
        crossOrigin="anonymous"
        className={`${styles.player} ${checking === 2 && styles.showPlayer}`}
      />
      {checking === 1 && <p>Please wait while we check for audio</p>}
    </div>
  );
};

export default VideoPlayer;
