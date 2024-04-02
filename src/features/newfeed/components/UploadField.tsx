import React, { useState, FormEvent } from "react";
import {
  TextInput,
  Button,
  Group,
  Text,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import UploadedImages from "./UploadedImages";

const UploadField = (props: Partial<DropzoneProps>) => {
  const theme = useMantineTheme();

  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDrop = (files: File[]) => {
    const newImageUrls: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImageUrls.push(reader.result as string);

        if (newImageUrls.length === files.length) {
          setUploadedImage((prevImages) => [...prevImages, ...newImageUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = {
      title,
      description,
      images: uploadedImage,
    };
    console.log(formData);
    // Here you would typically send formData to your backend
    // Example: axios.post('your-endpoint', formData)
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-10">
      <div className="flex h-[40vh] items-center ">
        <div className="flex flex-col justify-between gap-10 w-1/2 p-5">
          <TextInput
            placeholder="Title"
            label="Title"
            required
            size="lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            placeholder="Description"
            label="Description"
            required
            size="lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="outline" type="submit">
            Submit
          </Button>
        </div>
        {/* for uploading photo  */}
        <div className="w-1/2 p-5">
          {uploadedImage.length > 0 ? (
            <UploadedImages
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          ) : (
            <Dropzone
              onDrop={handleDrop}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              {...props}
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
    </form>
  );
};

export default UploadField;
