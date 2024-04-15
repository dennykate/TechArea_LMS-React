import MyButton from "@/components/buttons/MyButton";
import FileUpload from "@/components/inputs/FileUpload";
import useMutate from "@/hooks/useMutate";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface PropsType {
  onClose: () => void;
}

const CreateMemory: React.FC<PropsType> = ({ onClose }) => {
  const { eventId } = useParams();
  const [files, setFiles] = useState<File[] | undefined>([]);

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: () => onClose(),
  });

  const onSubmitHandler = () => {
    if (files?.length == 0) return toast.error("Please upload first");

    const formData = new FormData();

    formData.append("event_id", eventId as string);

    files?.forEach((file: File) => {
      formData.append("files[]", file);
    });

    onSubmit(`/event-galleries`, formData, "POST", true);
  };

  return (
    <div className="w-full space-y-4">
      <FileUpload type="image" setMultileFile={setFiles} multiple />

      <MyButton
        loading={isLoading}
        onClick={onSubmitHandler}
        className="w-full"
      >
        Upload
      </MyButton>
    </div>
  );
};

export default CreateMemory;
