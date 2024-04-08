import MyButton from "@/components/buttons/MyButton";
import VideoPlayer from "@/components/common/VideoPlayer";
import Heading from "@/components/typography/Heading";
import { Link } from "react-router-dom";

const LearnCourseContentCard = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div>
        <VideoPlayer
          url="https://www.youtube.com/watch?v=Oextk-If8HQ"
          type="youtube"
        />
      </div>

      <div className=" space-y-2 px-[6px] mt-4">
        <Heading tag="h6">How to be a programmer ?</Heading>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sint
          quasi dolore voluptatem perferendis hic debitis sapiente mollitia
          autem obcaecati corporis, placeat possimus quisquam laboriosam totam
          aliquid deserunt laborum reiciendis.
        </p>
        <p className="text-sm text-gray-500">
          Created by -{" "}
          <Link to={""} className="underline text-gray-800">
            Ma Ma Thwe
          </Link>
        </p>
        <p className="text-sm text-gray-500">Completed At - 01 Dec 2000</p>
        <p className="text-sm text-gray-500">Status - Not Complete</p>

        <div className="flex justify-end items-center gap-2 mt-4">
          <MyButton>Make As Complete</MyButton>
        </div>
      </div>
    </div>
  );
};

export default LearnCourseContentCard;
