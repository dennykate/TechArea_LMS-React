import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
// import PdfPreviewer from "../common/PdfPreviewer";

type PropsType = {
  className?: string;
  src: string;
};

const MediaRenderer: React.FC<PropsType> = ({ className, src }) => {
  const [isError, setIsError] = useState<boolean>(false);

  const extension = useMemo(() => src.split(".")?.pop()?.toLowerCase(), [src]);

  if (isError) {
    return (
      <div
        className={twMerge(
          "flex justify-center items-center bg-gray-200 rounded-md",
          className
        )}
      >
        <p>Fail to load file</p>
      </div>
    );
  }

  switch (true) {
    case extension === "pdf":
      return (
        <div
          className={twMerge(
            "w-full h-full overflow-hidden scrollbar-hide border ", // Ensure scrollbar-hide class is used
            className
          )}
        >
          <iframe
            src={src}
            className="w-[calc(100%+15px)] scale-105 h-full !border-none !outline"
            style={{
              pointerEvents: "none", // Disable interactions (optional)
              scrollBehavior: "auto",
            }}
          />
        </div>
        // <PdfPreviewer pdfUrl={src}/>
      );
    case extension === "mp4" || extension === "webm" || extension === "ogg":
      return (
        <video
          src={src}
          controls
          className={twMerge("w-full h-full", className)}
        />
      );
    case extension === "jpg" ||
      extension === "jpeg" ||
      extension === "png" ||
      extension === "svg" ||
      extension === "webp":
      return (
        <img
          src={src}
          className={twMerge("w-full h-full", className)}
          onError={() => setIsError(true)}
        />
      );
    default:
      return (
        <div className="w-full h-[200px] flex justify-center items-center rounded-md bg-gray-200">
          <p className="text-sm">Unsupported File Type</p>
        </div>
      );
  }
};

export default MediaRenderer;
