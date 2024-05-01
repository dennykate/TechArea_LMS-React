/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Button,
  Group,
  useMantineTheme,
  rem,
  Image,
  ActionIcon,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import UploadedImages from "./UploadedImages";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import { usePostDataMutation } from "@/redux/api/queryApi";

interface DataProps {
  initialContent: {
    image: string;
    created_by: string;
    content: string;
    comment_count: number;
    reaction_count: number;
    created_at: string;
    id: string;
    is_reactor: unknown;
  };
  close: () => void;
  resetData: () => void;
}

const UpdateField: React.FC<DataProps> = ({
  initialContent,
  close,
  resetData,
}) => {
  const theme = useMantineTheme();
  const [content, setContent] = useState<string>(initialContent.content);
  const [uploadedImage, setUploadedImage] = useState<File[]>([]);
  const [updatePost, { isLoading }] = usePostDataMutation();
  const [isCancel, setIsCancel] = useState(false);

  useEffect(() => {
    setContent(initialContent.content);
  }, [initialContent]);

  const handleDrop = (files: File[]) => {
    setUploadedImage(files);
  };

  console.log(content);
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    uploadedImage.forEach((file) => formData.append("image", file));

    try {
      const response = (await updatePost({
        url: `/posts/${initialContent.id}`,
        method: "POST",
        body: formData,
      })) as any;
      console.log("Update response:", response);
      if (response?.data?.status === "success") {
        setUploadedImage([]);
        setContent("");
        close();
        resetData();
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="md:p-10 flex flex-col">
      <div className="flex flex-col h-full items-center mb-5 gap-5">
        <TextEditorInput
          label="Content"
          value={content}
          onChange={(e) => setContent(e)}
        />
        <div className="w-full h-full md:p-5">
          {isCancel ? (
            uploadedImage.length > 0 ? (
              <UploadedImages
                uploadedImage={uploadedImage.map((file) =>
                  URL.createObjectURL(file)
                )}
                setUploadedImage={setUploadedImage}
              />
            ) : (
              <Dropzone
                onDrop={handleDrop}
                onReject={(files) => console.log("Rejected files:", files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
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
                </Group>
              </Dropzone>
            )
          ) : (
            <div className="relative">
              <img
                className=" h-[40vh] overflow-hidden object-cover"
                src={initialContent.image}
              />
              <ActionIcon
                variant="outline"
                color="red"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  borderRadius: "50%",
                }}
                onClick={() => setIsCancel(true)}
                aria-label="Remove image"
              >
                <IconX size={16} stroke={1.5} />
              </ActionIcon>
            </div>
          )}
        </div>
      </div>
      <Button variant="outline" type="submit" disabled={isLoading}>
        Update Post
      </Button>
    </form>
  );
};

export default UpdateField;
