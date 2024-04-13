/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Text, useMantineTheme } from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconTrashFilled,
} from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import React, { useState } from "react";

interface PropsType extends Partial<DropzoneProps> {
  type?: "video" | "image" | "all";
  setSingleFile?: (x: File | undefined) => void;
  setMultileFile?: (x: File[] | undefined) => void;
  defaultImage?: string;
}

const FileUpload: React.FC<PropsType> = ({
  type = "image",
  setSingleFile,
  setMultileFile,
  defaultImage = "",
  ...props
}) => {
  const theme = useMantineTheme();
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage);

  const handleDrop = (files: File[]) => {
    if (files.length === 1) {
      setFile(files[0]);
      setSingleFile && setSingleFile(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFiles(files);
      setMultileFile && setMultileFile(files as File[]);
    }
  };

  return (
    <>
      {!previewUrl && (files?.length == 0 || !files) && (
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
              <Text size="xl" inline>
                Drag here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}

      {previewUrl && (
        <div
          className="h-auto rounded-md border border-dashed border-gray-400 w-full flex 
   justify-center items-center p-[2px] relative mt-6"
        >
          <button
            onClick={() => setPreviewUrl(null)}
            className="absolute bottom-2 right-2 bg-red-500 p-2 rounded-md hover:bg-red-700"
          >
            <IconTrashFilled color="white" size={18} />

            <p className="sr-only">Delete Button</p>
          </button>

          {file?.type == "application/pdf" ? (
            <div
              className=" w-full h-[44px] flex items-center px-2 overflow-hidden
         "
            >
              <p className="text-xs font-[400] text-start">{previewUrl}</p>
            </div>
          ) : file?.type === "video/mp4" ? (
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
      )}

      {(files as any)?.length > 0 && (
        <div
          className="h-auto rounded-md border border-dashed border-gray-400 w-full flex 
 justify-center items-center p-2 relative mt-6  flex-col gap-1"
        >
          {files?.map((dt: File) => (
            <div className="w-full flex gap-1 justify-between">
              <p className="text-sm font-[400] ">{dt?.name}</p>

              <button
                onClick={() =>
                  setFiles((prev: any) =>
                    prev.filter((file: any) => file?.name != dt?.name)
                  )
                }
                className=" bg-red-500 p-2 rounded-md hover:bg-red-700"
              >
                <IconTrashFilled color="white" size={12} />

                <p className="sr-only">Delete Button</p>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FileUpload;
