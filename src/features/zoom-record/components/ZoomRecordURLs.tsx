import MyButton from "@/components/buttons/MyButton";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import { IconTrashFilled } from "@tabler/icons-react";
import React from "react";

const ZoomRecordURLs = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-2/3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm truncate">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            ratione delectus error omnis dolorem architecto cum, cumque
            reprehenderit nulla dicta odio, nostrum rem aspernatur laboriosam
            consectetur eveniet voluptates debitis aliquid.
          </p>

          <button className=" bg-red-500 w-[32px] h-[32px] flex justify-center items-center rounded-md hover:bg-red-700">
            <IconTrashFilled color="white" size={12} />

            <p className="sr-only">Delete Button</p>
          </button>
        </div>

        <TextInputComponent
          placeholder="Your URL"
          rightSection={<MyButton>Add</MyButton>}
        />
      </div>
    </div>
  );
};

export default ZoomRecordURLs;
