import React, { useState } from "react";
import { Text, Button } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconFileText } from "@tabler/icons-react";
import { usePostDataMutation } from "@/redux/api/formApi";
import { useSelector } from "react-redux";
import { selectCurrentChatData } from "@/redux/services/chatSlice";

const ACCEPTED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface UploadedFile extends File {
  path: string;
  preview: string;
}
interface PropData {
  close: () => void;
}

const FileSend: React.FC<PropData> = ({ close }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [sendReport, { isLoading }] = usePostDataMutation();
  const userData = useSelector(selectCurrentChatData);
  const [postFile, setPostFile] = useState<File[] | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    const mappedFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      ...file,
      preview: file.type.startsWith("image")
        ? URL.createObjectURL(file)
        : undefined,
    }));
    setPostFile(acceptedFiles);
    setUploadedFiles(mappedFiles);
  };

  const handleSubmit = async () => {
    if (!userData || !userData.partner || !userData.partner.id) {
      console.error("Receiver ID is undefined");
      return;
    }

    const formData = new FormData();
    postFile?.forEach((file) => {
      formData.append("attachment", file);
    });

    formData.append("partner_id", userData.partner.id.toString());
    formData.append("message", "Send file");

    try {
      const result = await sendReport({
        url: "/messages",
        method: "POST",
        body: formData,
      }).unwrap();
      console.log("Success:", result);
      setUploadedFiles([]);
      setPostFile(null);
      close(); 
    } catch (apiError) {
      console.error("Error submitting files:", apiError);
    }
  };

  const thumbs = uploadedFiles.map((file) => (
    <div className="border rounded p-3 flex items-center gap-5" key={file.path}>
      <div>
        {file.preview ? (
          <img
            src={file.preview}
            alt="Preview"
            style={{ width: "100px", height: "100px" }}
            onLoad={() => URL.revokeObjectURL(file.preview)}
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
        <div className="my-2 flex flex-col gap-4">
          {thumbs}
          <Button
            variant="outline"
            onClick={handleSubmit}
            disabled={uploadedFiles.length === 0 || isLoading}
          >
            {isLoading ? "Sending..." : "Send Files"}
          </Button>
        </div>
      ) : (
        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => console.error("Rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={ACCEPTED_MIME_TYPES}
        >
          <Text size="xl" inline>
            Drag files here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5MB
          </Text>
        </Dropzone>
      )}
    </div>
  );
};

export default FileSend;
