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
  type?: "video" | "image";
}

const FileUpload: React.FC<PropsType> = ({ type = "image", ...props }) => {
  const theme = useMantineTheme();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    setFile(files[0]);
    console.log(files);
    setPreviewUrl(URL.createObjectURL(files[0]));
  };

  return (
    <>
      {!previewUrl ? (
        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => console.log("rejected files", files)}
          // maxSize={3 * 1024 ** 2}
          accept={type === "image" ? IMAGE_MIME_TYPE : ["video/mp4"]}
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
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      ) : (
        <div
          className="h-auto rounded-md border border-dashed border-gray-400 w-full flex 
      justify-center items-center p-[2px] relative"
        >
          <button
            onClick={() => setPreviewUrl(null)}
            className="absolute bottom-2 right-2 bg-red-500 p-2 rounded-md hover:bg-red-700"
          >
            <IconTrashFilled color="white" size={18} />

            <p className="sr-only">Delete Button</p>
          </button>

          {file?.type === "video/mp4" ? (
            <video
              src={previewUrl}
              controls
              className="h-full object-cover w-full rounded-md"
            />
          ) : (
            <img
              src={previewUrl}
              alt="thumbnail"
              className="h-full object-cover w-full rounded-md"
            />
          )}
        </div>
      )}
    </>
  );
};

export default FileUpload;
