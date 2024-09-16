import React from "react";
import VideoPlayer from "./VideoPlayer";
import PDFViewer from "./PDFViewer";
// import PdfPreviewer from "./PdfPreviewer";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropsType {
  attachments: any;
}

const MediaViewer: React.FC<PropsType> = ({ attachments }) => {
  const renderMedia = (attachment: any) => {
    const fileType = attachment.url.split(".").pop().toLowerCase();

    if (attachment?.type == "youtube")
      return <VideoPlayer url={attachment.url} />;

    switch (fileType) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <img src={attachment.url} alt={`File ID: ${attachment.id}`} />;
      case "pdf":
        return <PDFViewer url={attachment.url} name={attachment.id} />;
      case "mp4":
        return <video controls src={attachment.url} />;
      default:
        return <p>Unsupported file type: {fileType}</p>;
    }
  };

  return (
    <div className="w-full grid grid-cols-4 gap-4">
      {attachments.map((attachment: any) => (
        <div key={attachment.id} className="media-container">
          {renderMedia(attachment)}
        </div>
      ))}
    </div>
  );
};

export default MediaViewer;
