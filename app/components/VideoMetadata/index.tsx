import styles from "./index.module.css";

import type { VideoMetadataProps } from "~/types";

const VideoMetadata = ({
  lastModified,
  name,
  size,
  type,
}: VideoMetadataProps) => {
  const getFormattedSize = (size: number) => {
    const labels = ["Bytes", "KB", "MB", "GB"];
    let idx = 0;
    while (size >= 1024) {
      size /= 1024;
      idx++;
    }
    size = Math.round((size + Number.EPSILON) * 100) / 100;

    return `${size}${labels[idx]}`;
  };

  const getFormattedDate = (value: number) => new Date(value).toDateString();

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th className={styles.propertyItem}>Property</th>
            <th className={styles.propertyValue}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.propertyItem}>Name</td>
            <td className={styles.propertyValue}>{name}</td>
          </tr>
          <tr>
            <td className={styles.propertyItem}>Last Modified</td>
            <td className={styles.propertyValue}>
              {getFormattedDate(lastModified)}
            </td>
          </tr>
          <tr>
            <td className={styles.propertyItem}>Size</td>
            <td className={styles.propertyValue}>{getFormattedSize(size)}</td>
          </tr>
          <tr>
            <td className={styles.propertyItem}>Type</td>
            <td className={styles.propertyValue}>{type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VideoMetadata;
