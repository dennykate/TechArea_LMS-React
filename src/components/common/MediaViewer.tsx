import React from "react";
import VideoPlayer from "./VideoPlayer";
// import PDFViewer from "./PDFViewer";
import PdfPreviewer from "./PdfPreviewer";
// import MyCarousel from "./MyCarousel";
import { Carousel } from "@mantine/carousel";
import { twMerge } from "tailwind-merge";
import ModalImage from "../ModalImage";
import { IconTrashFilled } from "@tabler/icons-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropsType {
  attachments: any;
  onDelete?: (id: number) => void;
}

const MediaViewer: React.FC<PropsType> = ({ attachments, onDelete }) => {
  const renderMedia = (attachment: any) => {
    const fileType = attachment.url.split(".").pop().toLowerCase();

    if (attachment?.type == "youtube")
      return <VideoPlayer url={attachment.url} />;

    switch (fileType) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <img src={attachment.url} alt={`File ID: ${attachment.id}`} />;
      case "pdf":
        return <PdfPreviewer url={attachment.url} name={attachment.id} />;
      case "mp4":
        return <video controls src={attachment.url} />;
      default:
        return <p>Unsupported file type: {fileType}</p>;
    }
  };

  return (
    <Carousel
      withControls
      slideSize="25%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={1}
      controlSize={30}
      classNames={{ control: "bg-primary text-white opacity-100" }}
    >
      {attachments?.map((slide: any, i: number) => {
        return (
          <Carousel.Slide className="" key={i}>
            <ModalImage imageURL={slide?.url}>
              <div className={twMerge("relative w-full h-[250px]")}>
                {renderMedia(slide)}
                {onDelete && (
                  <button
                    // disabled={isLoading}
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

export default MediaViewer;
