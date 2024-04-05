import MyButton from "@/components/buttons/MyButton";
import FileUpload from "@/components/inputs/FileUpload";
import React from "react";
import { MdAssignment } from "react-icons/md";

const Submit = () => {
  return (
    <div className="sm:p-8 p-2 flex lg:flex-row flex-col lg:gap-8 gap-3">
      <div className="">
        <div className="flex gap-5 items-center mb-1 w-full">
          <MdAssignment size={32} className="fill-primary sm:block hidden" />
          <h1 className="text-[32px] font-medium text-primary">Assignment 1</h1>
        </div>
        <div className="sm:ml-12 ">
          <div className="space-y-2 pb-4 border-b border-primary">
            <p className="text-base font-normal text-gray-500">
              Thwe Thwe &#183; Apr 2
            </p>
            <div className="flex justify-between font-medium text-gray-700">
              <p>40 points</p>
              <p>Due Apr 22, 6:30AM</p>
            </div>
          </div>

          <div className="py-5 sm:space-y-5 space-y-2">
            <p>Topic: Assignment</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates voluptatibus, impedit in fugiat assumenda, iusto
              dolorem aperiam repellat, quos rerum corporis a autem. Reiciendis
              quasi beatae, eaque accusamus iusto ipsum!
            </p>
            <p>Deadline</p>
            <p>Due date - 21 April 2024 (8:00 pm)</p>
          </div>
        </div>
      </div>
      <div className=" lg:ml-0 sm:ml-12 sm:mb-0 mb-5 min-w-[350px] p-5 rounded-lg shadow-md border bg-white ">
        <p className="text-2xl font-medium mb-2">Your work</p>
        <FileUpload type="all" />
        <MyButton className="w-full mt-4 mb-2">Mark as done</MyButton>
        <i className="text-gray-400 italic text-sm">
          Work cannot be turned in after the due date
        </i>
      </div>
    </div>
  );
};

export default Submit;
