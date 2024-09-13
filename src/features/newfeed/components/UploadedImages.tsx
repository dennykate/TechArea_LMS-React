import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface UploadProps {
  uploadedImage: string[];
  setUploadedImage: (value: File[] | ((prevState: File[]) => File[])) => void;
}

const UploadedImages: React.FC<UploadProps> = ({
  uploadedImage,
  setUploadedImage,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const removeImage = (indexToRemove: number) => {
    setUploadedImage((currentImages) =>
      currentImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="flex gap-4 justify-center items-center flex-wrap">
      {uploadedImage?.map((image, index) => (
        <div
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          className={twMerge(
            "relative ",
            uploadedImage?.length > 1 ? "w-[48%] h-[150px]" : "w-full h-[300px]"
          )}
          key={index}
        >
          <img
            src={image}
            alt={`Uploaded ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {hoverIndex === index && (
            <ActionIcon
              variant="outline"
              color="red"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                borderRadius: "50%",
              }}
              onClick={() => removeImage(index)}
              aria-label="Remove image"
            >
              <IconX size={16} stroke={1.5} />
            </ActionIcon>
          )}
        </div>
      ))}
    </div>
  );
};

export default UploadedImages;
