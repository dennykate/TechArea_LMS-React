/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel } from "@mantine/carousel";
import ModalImage from "../ModalImage";
import { IconTrashFilled } from "@tabler/icons-react";

const imageExts = [".png", ".jpg", ".jpeg", ".webp"];

interface PropsType {
  slides: any;
  onDelete?: any;
  isLoading?: boolean;
}

const getFileExtension = (url: string): string => {
  const match = url.match(/\.[a-zA-Z0-9]+$/);
  return match ? match[0].toLowerCase() : "";
};

const MyCarousel = ({ slides, onDelete, isLoading }: PropsType) => {
  const isImageUrl = (url: string): boolean => {
    const ext = getFileExtension(url);
    return imageExts.includes(ext);
  };

  return (
    <Carousel
      withControls
      height={250}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
      controlSize={30}
      classNames={{ control: "bg-primary text-white opacity-100" }}
    >
      {slides?.map((slide: any, i: number) => {
        const url = slide?.url;
        const isValidImage = isImageUrl(url);

        return (
          <Carousel.Slide className="" key={i}>
            <ModalImage imageURL={url}>
              <div className="relative w-full h-[250px]">
                {isValidImage ? (
                  <img
                    src={url}
                    alt="img"
                    className="h-[250px] w-full object-cover"
                  />
                ) : (
                  <div className="h-[250px] rounded-md w-full flex items-center justify-center bg-gray-200 text-gray-600">
                    <p>Unknown File Type</p>
                  </div>
                )}
                {onDelete && (
                  <button
                    disabled={isLoading}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(slide?.id);
                    }}
                    className="absolute bottom-2 right-2 bg-red-500 p-2 rounded-md hover:bg-red-700"
                  >
                    <IconTrashFilled color="white" size={18} />
                    <p className="sr-only">Delete Button</p>
                  </button>
                )}
              </div>
            </ModalImage>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default MyCarousel;
