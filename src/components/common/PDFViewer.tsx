import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface PropsType {
  fileUrl: string;
}

const PdfViewer: React.FC<PropsType> = ({ fileUrl }) => {
  return (
    <div style={{ height: "750px" }}>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={fileUrl} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
