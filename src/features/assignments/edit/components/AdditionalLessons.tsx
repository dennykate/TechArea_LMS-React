/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import FileUpload from "@/components/inputs/FileUpload";
import SelectComponent from "@/components/inputs/SelectComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface PropsType {
  additonalFiles: any;
  setAdditionalFiles: any;
  addedCount?: number;
}

const AdditionalLessons: React.FC<PropsType> = ({
  additonalFiles,
  setAdditionalFiles,
  addedCount = 0,
}) => {
  const [type, setType] = useState<string | undefined>("");

  const onClickHandler = () => {
    if (additonalFiles.length + addedCount >= 6)
      return toast.error("Maximum limit is 6");

    setAdditionalFiles((prev: any) => [
      ...prev,
      {
        id: prev.length + 1,
        type,
        file: "",
      },
    ]);
    setType("");
  };

  return (
    <div className="w-full space-y-4">
      <label htmlFor="text-editor" className="font-medium mb-2">
        Additional Lessons ( Optional )
      </label>

      <div className="border-t border-black/10 flex flex-col gap-4">
        {additonalFiles?.map((additonalFile: any) => {
          if (additonalFile.type === "file")
            return (
              <FileUpload
                type="all"
                setSingleFile={(val) => {
                  setAdditionalFiles((prev: any) =>
                    prev?.map((item: any) => {
                      if (item.id == additonalFile.id) {
                        item["file"] = val;
                      }
                      return item;
                    })
                  );
                }}
              />
            );
          else
            return (
              <TextInputComponent
                placeholder="Youtube URL"
                value={additonalFile.file}
                onChange={(e) =>
                  setAdditionalFiles((prev: any) =>
                    prev?.map((item: any) => {
                      if (item.id == additonalFile.id) {
                        item["file"] = e.target.value;
                      }
                      return item;
                    })
                  )
                }
              />
            );
        })}
      </div>

      <div className="w-full flex justify-start items-center">
        <SelectComponent
          label="Select Type"
          placeholder="Select File or Youtube"
          data={[
            { value: "file", label: "File" },
            { value: "youtube", label: "Youtube" },
          ]}
          value={type}
          onChange={(val: string) => setType(val as string)}
          rightSection={<MyButton onClick={onClickHandler}>Add</MyButton>}
        />
      </div>
    </div>
  );
};

export default AdditionalLessons;
