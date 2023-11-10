import { useRef, useState } from "react";
import styles from "./index.module.css";

type DragDropFileProps = {
  setFile: any;
};

const DragDropFile = ({ setFile }: DragDropFileProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<any>(null);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer) {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        if (e.dataTransfer!.files[0].type === "video/mp4") {
          setFile(e.dataTransfer.files[0]);
        } else {
          alert("Only mp4 video formats are supported");
        }
      }
    }
  };

  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <form
      id={styles["form-file-upload"]}
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id={styles["input-file-upload"]}
        multiple={true}
        onChange={handleChange}
        accept="video/mp4"
      />
      <label
        id={styles["label-file-upload"]}
        htmlFor={styles["input-file-upload"]}
        className={dragActive ? styles["drag-active"] : ""}
      >
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>
            Upload a file
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id={styles["drag-file-element"]}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

export default DragDropFile;
