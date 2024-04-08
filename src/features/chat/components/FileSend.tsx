import React, { useState } from "react";
import { Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconFileText,
  IconFile,
} from "@tabler/icons-react";

const ACCEPTED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface UploadedFile extends File {
  preview?: string | undefined;
  path?: string;
}

const FileSend = () => {
  const theme = useMantineTheme();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // drop
  const handleDrop = (acceptedFiles: File[]) => {
    console.log("Accepted files:", acceptedFiles);
    const mappedFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      ...file,
      preview: file.type.includes("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    setUploadedFiles(mappedFiles);
  };

  // Ensure to revoke the data uris to avoid memory leaks
  console.log(uploadedFiles);
  const thumbs = uploadedFiles.map((file) => (
    <div className="border rounded p-3 flex items-center gap-5" key={file.path}>
      <div>
        {file.preview ? (
          <img
            src={file.preview}
            alt="Preview"
            style={{ width: "100px", height: "100px" }}
            onLoad={() => {
              if (file.preview) {
                URL.revokeObjectURL(file.preview);
              }
            }}
          />
        ) : (
          <IconFileText size={48} />
        )}
      </div>
      <Text size="sm">{file.path}</Text>
    </div>
  ));

  return (
    <div>
      {uploadedFiles.length > 0 ? (
        <div>{thumbs}</div>
      ) : (
        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => console.log("Rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={ACCEPTED_MIME_TYPES}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: "220px", pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={32}
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
                size={32}
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFile size={32} stroke={1.5} />
              <IconPhoto size={32} stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag files here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5MB
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </div>
  );
};

export default FileSend;
