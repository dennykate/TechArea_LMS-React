/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel } from "@mantine/carousel";
import ModalImage from "../ModalImage";

interface PropsType {
  slides: any;
}
const MyCarousel = ({ slides }: PropsType) => {
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
            <img
              src={slide?.url}
              alt="img"
              className="w-full h-full object-cover"
            />
          </ModalImage>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
