import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { IoImagesOutline } from "react-icons/io5";
// import useLanguage from "@/hooks/useLanguage";

interface PropsType {
  label: string;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  defaultImage?: string;
  withAsterisk?: boolean;
}

export default function ImageUpload({
  label,
  setFile,
  defaultImage,
  withAsterisk,
}: PropsType) {
  // const { locale } = useLanguage();

  const handleDefaultImage = useCallback(() => {
    if (defaultImage) {
      setImages([{ data_url: defaultImage }]);
    }
  }, [defaultImage]);

  useEffect(() => handleDefaultImage(), [handleDefaultImage]);

  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType
    // addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList);
    setFile(imageList[0]?.file as File);
  };

  return (
    <div className="flex flex-col justify-center items-center md:justify-start md:items-start">
      <p className="sm:text-[16px] text-[14px] font-medium mb-1">
        {label} {withAsterisk && <span className="text-red-400">*</span>}
      </p>
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, isDragging, dragProps }) => (
          // write your building UI
          <div
            onClick={onImageUpload}
            {...dragProps}
            className={`cursor-pointer w-[200px] h-[200px] border ${
              isDragging ? "border-primary-500" : "border-gray-400"
            }
             rounded-[5px] border-dashed flex flex-col gap-3 justify-center items-center  overflow-hidden`}
          >
            {imageList.length > 0 ? (
              imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img
                    src={image["data_url"]}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
              ))
            ) : (
              <>
                <IoImagesOutline className="text-primary-500" size={32} />
                <p className="text-center sm:text-[16px] text-[14px]">
                  Click here to select or <br /> Drag here
                </p>
              </>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
