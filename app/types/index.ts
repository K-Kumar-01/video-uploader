export type VideoMetadataProps = {
  lastModified: number;
  name: string;
  type: string;
  size: number;
};

export type VideoPlayerProps = {
  fileURL: string;
  checking: number;
  setChecking: (value: number) => void;
  setFile: (value: any) => void;
  setDisplay: (value: boolean) => void;
};
