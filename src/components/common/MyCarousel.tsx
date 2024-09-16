/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel } from "@mantine/carousel";
import ModalImage from "../ModalImage";
import { IconTrashFilled } from "@tabler/icons-react";
import MediaRenderer from "../images/MediaRenderer";
import { twMerge } from "tailwind-merge";

interface PropsType {
  slides: any;
  onDelete?: any;
  isLoading?: boolean;
  className?: string;
  height?: number;
}

// const getFileExtension = (url: string): string => {
//   const match = url.match(/\.[a-zA-Z0-9]+$/);
//   return match ? match[0].toLowerCase() : "";
// };

const MyCarousel = ({
  slides,
  onDelete,
  isLoading,
  className,
  height = 250,
}: PropsType) => {
  return (
    <Carousel
      withControls
      height={height}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
      controlSize={30}
      classNames={{ control: "bg-primary text-white opacity-100" }}
    >
      {slides?.map((slide: any, i: number) => {
        return (
          <Carousel.Slide className="" key={i}>
            <ModalImage imageURL={slide?.url}>
              <div className={twMerge("relative w-full h-[250px]", className)}>
                <MediaRenderer
                  className="h-full w-full object-cover"
                  src={slide?.url}
                />
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
