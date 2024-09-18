/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Text, useMantineTheme } from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconTrashFilled,
} from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import React, { useEffect, useState } from "react";
import { AiFillFileUnknown } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export const imageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
  "image/svg+xml",
];

export const videoTypes = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/avi",
  "video/mov",
  "video/flv",
  "video/mkv",
  "video/wmv",
];

interface PropsType extends Partial<DropzoneProps> {
  type?: "video" | "image" | "all";
  setSingleFile?: (x: File | undefined) => void;
  setMultileFile?: any;
  defaultImage?: string;
  label?: string;
  withAsterisk?: boolean;
  fileContainerClassName?: string;
}

const FileUpload: React.FC<PropsType> = ({
  type = "image",
  setSingleFile,
  setMultileFile,
  defaultImage = "",
  multiple = false,
  label,
  withAsterisk,
  fileContainerClassName,
  ...props
}) => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage);

  useEffect(() => {
    setPreviewUrl(defaultImage);
  }, [defaultImage]);

  const handleDrop = (accaptedFiles: File[]) => {
    if (files?.length > 1 && accaptedFiles?.length > 0) {
      setFiles((prev) => [...(prev as File[]), ...accaptedFiles]);
      setMultileFile &&
        setMultileFile((prev: any) => [
          ...(prev as File[]),
          ...(accaptedFiles as File[]),
        ]);

      return;
    }

    if (files?.length === 0 && accaptedFiles.length === 1) {
      setSingleFile && setSingleFile(accaptedFiles[0]);
      setMultileFile && setMultileFile(accaptedFiles);
      setPreviewUrl(URL.createObjectURL(accaptedFiles[0]));
      setFile(accaptedFiles[0]);
    } else {
      setFiles((prev) => [...(prev as File[]), ...accaptedFiles]);
      setMultileFile &&
        setMultileFile((prev: any) => [
          ...(prev as File[]),
          ...(accaptedFiles as File[]),
        ]);
    }
  };

  console.log("previewUrl => ", previewUrl);
  console.log("files => ", files);

  return (
    <>
      {!previewUrl && (files?.length == 0 || !files) && (
        <div className="space-y-2">
          {label && (
            <label className="sm:text-[16px] text-[14px] font-medium">
              {label} {withAsterisk && <span className="text-red-500">*</span>}
            </label>
          )}
          <Dropzone
            onDrop={handleDrop}
            onReject={(files) => console.log("rejected files", files)}
            // maxSize={3 * 1024 ** 2}
            accept={
              type === "all"
                ? []
                : type === "image"
                ? [...IMAGE_MIME_TYPE, ...PDF_MIME_TYPE]
                : ["video/mp4"]
            }
            multiple={multiple}
            {...props}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 220, pointerEvents: "none" }}
              className=""
            >
              <Dropzone.Accept>
                <IconUpload
                  size="3.2rem"
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size="3.2rem"
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline className="text-center">
                  Drag here or click to select files
                </Text>
                <Text
                  size="sm"
                  color="dimmed"
                  inline
                  mt={7}
                  className="text-center"
                >
                  Attach as many files as you like...
                </Text>
              </div>
            </Group>
          </Dropzone>
        </div>
      )}

      {previewUrl && (
        <div className="space-y-2">
          {label && (
            <label className="sm:text-[16px] text-[14px] font-medium">
              {label} {withAsterisk && <span className="text-red-500">*</span>}
            </label>
          )}
          <div
            className="h-auto rounded-md border border-dashed border-gray-400 w-full flex 
   justify-center items-center p-[2px] relative mt-6"
          >
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null);
              }}
              className="absolute bottom-2 right-2 bg-red-500 p-2 rounded-md hover:bg-red-700"
            >
              <IconTrashFilled color="white" size={18} />

              <p className="sr-only">Delete Button</p>
            </button>

            {file?.type == "application/pdf" || previewUrl?.includes(".pdf") ? (
              <div
                className=" w-full h-[44px] flex items-center px-2 overflow-hidden
         "
              >
                <p className="text-xs font-[400] text-start">{previewUrl}</p>
              </div>
            ) : file?.type == "video/mp4" || previewUrl?.includes(".mp4") ? (
              <video
                src={previewUrl}
                controls
                className="h-[300px] object-cover rounded-md"
              />
            ) : (
              <img
                src={previewUrl}
                alt="thumbnail"
                className="h-[300px] object-contain w-full rounded-md"
              />
            )}
          </div>
        </div>
      )}

      {(files as any)?.length > 0 && (
        <div
          className={twMerge(
            "p-2 relative mt-6 grid md:grid-cols-3 grid-cols-2  gap-1",
            fileContainerClassName
          )}
        >
          {files?.map((dt: File, index: number) => (
            <div
              key={index}
              className="w-full h-[180px] flex gap-1 justify-between items-center mt-2 relative bg-gray-200"
            >
              {imageTypes.includes(dt.type) ? (
                <img
                  src={URL.createObjectURL(dt)}
                  alt="file"
                  className="w-full h-full object-cover"
                />
              ) : videoTypes.includes(dt.type) ? (
                <video
                  src={URL.createObjectURL(dt)}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : dt?.type?.includes("pdf") ? (
                <div
                  className={twMerge(
                    "w-full h-full overflow-hidden scrollbar-hide border "
                  )}
                >
                  <iframe
                    src={URL.createObjectURL(dt)}
                    className="w-[calc(100%+15px)] scale-105 h-full !border-none !outline"
                    style={{
                      pointerEvents: "none", // Disable interactions (optional)
                      scrollBehavior: "auto",
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-200">
                  <AiFillFileUnknown className="text-5xl" />
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  setFiles((prev: any) =>
                    prev.filter((file: any) => file?.name != dt?.name)
                  )
                }
                className=" bg-red-500 tw-z-50 w-[32px] absolute bottom-2 right-2 h-[32px] flex justify-center items-center rounded-md hover:bg-red-700"
              >
                <IconTrashFilled color="white" size={12} />

                <p className="sr-only">Delete Button</p>
              </button>
            </div>
          ))}

          <Dropzone
            onDrop={handleDrop}
            onReject={(files) => console.log("rejected files", files)}
            // maxSize={3 * 1024 ** 2}
            accept={
              type === "all"
                ? []
                : type === "image"
                ? IMAGE_MIME_TYPE
                : ["video/mp4"]
            }
            multiple={multiple}
            {...props}
            classNames={{
              root: "h-[185px] translate-y-[7px] w-full flex justify-center items-center",
            }}
          >
            <div className="flex flex-col items-center gap-2 h-[150px] justify-center ">
              <Dropzone.Accept>
                <IconUpload
                  size="3.2rem"
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size="3.2rem"
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline className="text-center">
                  Drag here or click to select files
                </Text>
                <Text
                  size="sm"
                  color="dimmed"
                  inline
                  mt={7}
                  className="text-center"
                >
                  Attach as many files as you like...
                </Text>
              </div>
            </div>
          </Dropzone>
        </div>
      )}
    </>
  );
};
export default FileUpload;
