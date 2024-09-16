import React, { useEffect, useState } from "react";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist/legacy/build/pdf"; // Correct imports
import "pdfjs-dist/legacy/build/pdf.worker.entry"; // Import the worker

// Set the worker source
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

interface PdfPreviewerProps {
  url: string;
  name: string;
}

const PdfPreviewer: React.FC<PdfPreviewerProps> = ({ url, name }) => {
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log(url);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch PDF. Status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const typedArray = new Uint8Array(arrayBuffer);

        // Load the PDF document
        const pdfDocument = await getDocument(typedArray).promise;
        const page = await pdfDocument.getPage(1);

        // Render the first page as an image on a canvas
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL();
        setPdfSrc(dataUrl);
      } catch (error) {
        console.error("Error loading PDF: ", error);
        setError(error.message);
      }
    };

    if (url) {
      loadPdf();
    }
  }, [url]);

  return (
    <div>
      <h2>{name}</h2>
      {error ? (
        <p>Error loading PDF: {error}</p>
      ) : pdfSrc ? (
        <img src={pdfSrc} alt={`${name} preview`} />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PdfPreviewer;
