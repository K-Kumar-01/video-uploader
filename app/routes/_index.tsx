import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

import DragDropFile from "../components/DragDrop";
import VideoPlayer from "../components/VideoPlayer";
import VideoMetadata from "~/components/VideoMetadata";
import Waveform from "~/components/Waveform";

import type { VideoMetadataProps } from "~/types";

import styles from "../styles/index.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [videoFile, setVideoFile] = useState<any>(null);
  const [fileURL, setFileURL] = useState("");
  const [metadata, setMetadata] = useState<VideoMetadataProps>({
    name: "",
    size: 0,
    type: "",
    lastModified: 0,
  });
  const [display, setDisplay] = useState(false);
  // 1 denotes checking
  // 2 denotes audio present
  // -1 denotes audio not present
  const [checking, setChecking] = useState(1);

  const uploadVideo = (file: any) => {
    setDisplay(false);
    setChecking(1);
    setVideoFile(file);
    setFileURL(URL.createObjectURL(file));
    const { name, lastModified, size, type } = file;
    setMetadata({
      name,
      lastModified,
      size,
      type,
    });
  };

  return (
    <div className={styles.container}>
      <DragDropFile setFile={uploadVideo} />
      {videoFile && (
        <div className={styles.videoContainer}>
          <VideoPlayer
            fileURL={fileURL}
            checking={checking}
            setChecking={setChecking}
            setFile={setVideoFile}
            setDisplay={setDisplay}
          />
          {display && <VideoMetadata {...metadata} />}
        </div>
      )}
      {videoFile && display && <Waveform />}
    </div>
  );
}
