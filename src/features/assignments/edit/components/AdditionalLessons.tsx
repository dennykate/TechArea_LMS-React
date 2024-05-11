/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import FileUpload from "@/components/inputs/FileUpload";
import SelectComponent from "@/components/inputs/SelectComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseCircle } from "react-icons/io5";

interface PropsType {
  additonalFiles: any;
  setAdditionalFiles: any;
  addedCount?: number;
  label?: string;
}

const AdditionalLessons: React.FC<PropsType> = ({
  additonalFiles,
  setAdditionalFiles,
  addedCount = 0,
  label = "Additional Lessons ( Optional )",
}) => {
  const [type, setType] = useState<string | undefined>("youtube");

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
    setType("youtube");
  };

  return (
    <div className="w-full space-y-4">
      <label htmlFor="text-editor" className="font-medium mb-2">
        {label}
      </label>

      <div className="border-t border-black/10 flex flex-col gap-4 pt-4">
        {additonalFiles?.map((additonalFile: any) => {
          if (additonalFile.type === "file")
            return (
              <div className="w-full relative">
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

                <button
                  onClick={() =>
                    setAdditionalFiles((prev: any[]) => {
                      return prev?.filter(
                        (item: any) => item?.id !== additonalFile?.id
                      );
                    })
                  }
                  className="absolute top-2 right-2"
                >
                  <IoCloseCircle color="red" size={24} />
                </button>
              </div>
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
                rightSection={
                  <button
                    onClick={() =>
                      setAdditionalFiles((prev: any[]) => {
                        return prev?.filter(
                          (item: any) => item?.id !== additonalFile?.id
                        );
                      })
                    }
                  >
                    <IoCloseCircle color="red" size={24} />
                  </button>
                }
              />
            );
        })}
      </div>

      <div className="w-full flex sm:justify-start items-center">
        <div className="sm:w-[300px] w-[95%]">
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
            w={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalLessons;
