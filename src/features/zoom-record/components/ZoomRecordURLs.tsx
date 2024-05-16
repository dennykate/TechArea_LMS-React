/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import { IconTrashFilled } from "@tabler/icons-react";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface PropsType {
  urls: any;
  setUrls: any;
}

const ZoomRecordURLs: React.FC<PropsType> = ({ urls, setUrls }) => {
  const [value, setValue] = useState<string | undefined>("");

  const createNewUrl = useCallback(() => {
    if (!value || value == "") return toast.error("Url is required");

    setUrls((prev: any) => [
      ...prev,
      { id: Math.floor(Math.random() * 10000), url: value },
    ]);
    setValue("");
  }, [value, setUrls]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-col gap-2">
        {urls?.map((item: any) => (
          <div
            key={item?.id}
            className="flex items-center justify-between gap-2 w-full"
          >
            <Link
              to={item?.url}
              target="_blank"
              className="text-sm truncate underline"
            >
              {item?.url}
            </Link>
            <button
              onClick={() => {
                setUrls((prev: any) => {
                  return prev?.filter((pvItem: any) => pvItem.id != item.id);
                });
              }}
              type="button"
              className=" bg-red-500 min-w-[32px] h-[32px] flex justify-center items-center relative rounded-md hover:bg-red-700"
            >
              <IconTrashFilled color="white" size={16} />

              <p className="sr-only">Delete Button</p>
            </button>
          </div>
        ))}
      </div>

      <div className="sm:w-2/3 w-[95%] flex flex-col gap-2">
        <TextInputComponent
          placeholder="Your URL"
          value={value}
          onChange={(e) => {
            setValue(e.target.value as string);
          }}
          rightSection={
            <MyButton
              type="button"
              onClick={createNewUrl}
              className="!rounded-none !rounded-r-md"
            >
              Add
            </MyButton>
          }
        />
      </div>
    </div>
  );
};

export default ZoomRecordURLs;
