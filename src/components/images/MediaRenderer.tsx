import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

type PropsType = {
  className?: string;
  src: string;
};

const MediaRenderer: React.FC<PropsType> = ({ className, src }) => {
  const Item = useMemo(() => {
    const extension = src.split(".")?.pop()?.toLowerCase();

    switch (true) {
      case extension === "pdf":
        return (
          <iframe src={src} className={twMerge("w-full h-full", className)} />
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
          <img src={src} className={twMerge("w-full h-full", className)} />
        );
      default:
        return (
          <div className="w-full h-[200px] flex justify-center items-center rounded-md">
            <p className="text-sm">Unsupported File Type</p>
          </div>
        );
    }
  }, [src]);

  return <>{Item}</>;
};

export default MediaRenderer;
