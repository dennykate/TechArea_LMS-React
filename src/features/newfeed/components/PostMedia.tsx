import React, { useEffect, useState } from "react";
import { MediaType } from "./Post";
import { twMerge } from "tailwind-merge";
import MediaRenderer from "@/components/images/MediaRenderer";
import { useViewportSize } from "@mantine/hooks";

type PropsType = {
  data: MediaType[];
  parent: string;
};

const PostMedia: React.FC<PropsType> = ({ data, parent }) => {
  const { width } = useViewportSize();
  const [shouldSlice, setShouldSlice] = useState<boolean>(false);

  useEffect(() => {
    if (data?.length > (width < 500 ? 1 : 2)) setShouldSlice(true);
    else setShouldSlice(false);
  }, [data, width]);

  return (
    <>
      {data && data?.length > 0 && (
        <div
          className={twMerge(
            "w-full grid gap-2",
            parent === "newfeed" ? "w-[700px]" : "sm:w-[500px]",
            data?.length > 1 ? "sm:grid-cols-2 grid-cols-1" : "grid-cols-1"
          )}
        >
          {data
            ?.slice(0, shouldSlice ? (width < 500 ? 1 : 2) : data?.length)
            .map((media) => (
              <MediaRenderer
                key={media?.id}
                src={media?.url}
                // alt={media?.id}
                className={` object-cover h-[250px] sm:h-[300px]`}
              />
            ))}
        </div>
      )}

      {data?.length > (width < 500 ? 1 : 2) && (
        <div className="w-full mt-2 flex justify-end">
          <p
            onClick={() => setShouldSlice((prev) => !prev)}
            className="text-sm cursor-pointer hover:underline"
          >
            Show {shouldSlice ? "All" : "Less"}
          </p>
        </div>
      )}
    </>
  );
};

export default PostMedia;
