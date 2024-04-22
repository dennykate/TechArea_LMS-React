import React, { useState, FormEvent, useEffect } from "react";
import { Button, Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import UploadedImages from "./UploadedImages";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import { usePostDataMutation } from "@/redux/api/queryApi";
import toast from "react-hot-toast";

interface ModalProps {
  close?: () => void;
  latest: boolean;
  setLatest: (latest: boolean) => void;
}

const UploadField: React.FC<ModalProps & Partial<DropzoneProps>> = ({
  latest,
  setLatest,
  close,
  ...dropzoneProps
}) => {
  const theme = useMantineTheme();
  const [uploadPost, { isLoading }] = usePostDataMutation();
  const [uploadedImage, setUploadedImage] = useState<File[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    // Cleanup created object URLs
    return () => {
      uploadedImage.forEach((file) =>
        URL.revokeObjectURL(URL.createObjectURL(file))
      );
    };
  }, [uploadedImage]);

  const handleDrop = (files: File[]) => {
    setUploadedImage(files);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    uploadedImage.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const response = await uploadPost({
        method: "POST",
        url: "/posts",
        body: formData,
      });
      console.log(response);
      if (response?.data?.status === "success") {
        setUploadedImage([]);
        setContent("");
        if (close) close();
        toast.success("Upload post Successfully!");
        setLatest(!latest);
      }
    } catch (error) {
      console.error("Failed to upload data:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="md:p-10 flex flex-col">
      <div className="flex flex-col-reverse md:flex-row h-full items-center mb-5 gap-5">
        <TextEditorInput
          label="Content"
          value={content}
          onChange={(e) => setContent(e)}
        />
        <div className="md:w-1/2 h-full md:p-5">
          {uploadedImage.length > 0 ? (
            <UploadedImages
              uploadedImage={uploadedImage.map((file) =>
                URL.createObjectURL(file)
              )}
              setUploadedImage={setUploadedImage}
            />
          ) : (
            <Dropzone
              onDrop={handleDrop}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              {...dropzoneProps}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: rem(220), pointerEvents: "none" }}
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
                    color={
                      theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                    }
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
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          )}
        </div>
      </div>
      <Button variant="outline" type="submit" disabled={isLoading}>
        Post
      </Button>
    </form>
  );
};

export default UploadField;
