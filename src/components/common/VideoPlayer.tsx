import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface PropsType {
  type?: "video" | "youtube";
  url: string;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<PropsType> = ({
  type = "youtube",
  url,
  autoPlay,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => setIsError(false), [url]);

  if (url === "") return <></>;

  if (isError)
    return (
      <div
        className="w-full h-[300px] flex justify-center items-center bg-[#f5f5f5] border border-black
       border-opacity-10 rounded"
      >
        <img
          src="https://i.postimg.cc/50C9pjD2/Oops-404-Error-with-a-broken-robot-pana.png"
          alt="video-error"
          className="h-[200px] object-cover"
        />
      </div>
    );

  return (
    <div
      className="w-full flex justify-center items-center border border-black
    border-opacity-10 rounded"
    >
      <ReactPlayer
        url={url}
        controls
        width="100%"
        playing={autoPlay}
        onError={() => setIsError(true)}
        height={url === "" ? "100%" : type === "youtube" ? "300px" : "100%"}
      />

      {/* <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" controls /> */}
    </div>
  );
};

export default VideoPlayer;
