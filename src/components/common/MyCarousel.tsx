/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel } from "@mantine/carousel";
import ModalImage from "../ModalImage";
import { IconTrashFilled } from "@tabler/icons-react";

interface PropsType {
  slides: any;
  onDelete?: any;
  isLoading?: boolean;
}
const MyCarousel = ({ slides, onDelete, isLoading }: PropsType) => {
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
      {slides?.map((slide: any, i: number) => (
        <Carousel.Slide className="" key={i}>
          <ModalImage imageURL={slide?.url}>
            <div className="relative w-full h-[250px]">
              <img
                src={slide?.url}
                alt="img"
                className="h-[250px] w-full object-cover"
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
      ))}
    </Carousel>
  );
};

export default MyCarousel;
