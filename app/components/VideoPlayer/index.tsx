import { useEffect, useState } from "react";
import styles from "./index.module.css";

type VideoPlayerProps = {
  fileURL: string;
  setFile: (value: any) => void;
  setDisplay: (value: boolean) => void;
};

const VideoPlayer = ({ fileURL, setFile, setDisplay }: VideoPlayerProps) => {
  // 1 denotes checking
  // 2 denotes audio present
  // -1 denotes audio not present
  const [checking, setChecking] = useState(1);

  const hasAudio = (video: any) =>
    video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length);

  useEffect(() => {
    const videoElement = document.getElementById("video") as HTMLVideoElement;

    if (videoElement) {
      const getData = async (event: any) => {
        console.log(videoElement, hasAudio(videoElement));
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
      //   videoElement.addEventListener("loadeddata", getData);
      videoElement.addEventListener("loadeddata", getData);
      return () => videoElement.removeEventListener("loadeddata", getData);
    }
  }, []);

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