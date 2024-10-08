/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import MediaViewer from "@/components/common/MediaViewer";
import MyCarousel from "@/components/common/MyCarousel";
import FileUpload from "@/components/inputs/FileUpload";
import { banRoles } from "@/data/banRoles";
import withPermissions from "@/hocs/withPermissions";
import useMutate from "@/hooks/useMutate";
import useQuery from "@/hooks/useQuery";
import { Alert, Loader } from "@mantine/core";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdAssignment } from "react-icons/md";
import { useParams } from "react-router-dom";

const Submit = () => {
  const { assignmentId } = useParams();
  const [data, setData] = useState<any>();
  const [files, setFiles] = useState<File[] | null>([]);

  const { isLoading } = useQuery(`/assignments/${assignmentId}`, setData);

  const [onSubmit, { isLoading: submitLoading }] = useMutate();

  const onSubmitHandler = () => {
    if (!files || files?.length === 0) return toast.error("Files are required");

    const formData = new FormData();

    formData.append("assignment_id", assignmentId as string);
    formData.append("content", "" as string);

    files?.forEach((file: any, index: number) => {
      formData?.append(`files[${index}]`, file);
    });

    onSubmit("/assignment-reports", formData, "POST", true);
  };

  if (isLoading)
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="sm:p-8 p-2 flex lg:flex-row flex-col lg:gap-8 gap-3 lg:justify-between items-start">
      <div className=" w-full">
        <div className="flex gap-5 items-center mb-1 w-full">
          <MdAssignment size={32} className="fill-primary sm:block hidden" />
          <h1 className="text-[32px] font-medium text-primary">
            {data?.title}
          </h1>
        </div>
        <div className="sm:ml-12 ">
          <div className="space-y-2 pb-4 border-b border-primary">
            <p className="text-base font-normal text-gray-500">
              {data?.created_by}
            </p>
            <div className="flex justify-between font-medium text-gray-700">
              <p>{data?.marks} points</p>
              <p>Deadline {data?.deadline}</p>
            </div>
          </div>

          <div className="py-5 sm:space-y-5 space-y-2">
            <p>Topic: {data?.title}</p>
            <p>
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
            </p>
            <p>Deadline - {data?.deadline}</p>
          </div>
          {data?.medias?.length > 0 && (
            <div className="mt-5 flex flex-col gap-2 sm:text-sm text-xs font-[300] text-black/70">
              <p className="text-lg font-medium text-black mb-3">Lessons</p>
              <MyCarousel slides={data?.medias} />
            </div>
          )}
          {data?.my_assignment_report && (
            <>
              {data?.my_assignment_report?.marks && (
                <div className="mb-4">
                  <Alert>
                    You got {data?.my_assignment_report?.marks} Marks in this
                    assignment
                  </Alert>
                </div>
              )}
              <div className="">
                <p>My Submitted Answer(s): </p>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {data?.my_assignment_report?.attachments?.map(
                    (attachment: any) => (
                      <div className="w-[200px] h-[200px]">
                        <img
                          src={attachment?.url}
                          alt="file"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}

          {data?.attachments?.length > 0 && (
            <div className="">
              <p>Lessons: </p>
              <div className="w-full mt-2">
                <MediaViewer attachments={data?.attachments} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" lg:ml-0 sm:ml-12 sm:mb-0 mb-5 min-w-[350px] w-[350px] p-5 rounded-lg shadow-md border bg-white ">
        <p className="text-2xl font-medium mb-2">Your work</p>
        <FileUpload
          type="all"
          multiple
          fileContainerClassName={`md:!grid-cols-2`}
          setMultileFile={setFiles as any}
          setSingleFile={(file) => setFiles((prev: any) => [...prev, file])}
        />
        <MyButton
          onClick={onSubmitHandler}
          loading={submitLoading}
          className="w-full mt-4 mb-2"
          disabled={data?.my_assignment_report}
        >
          Mark as done
        </MyButton>
        <i className="text-gray-400 italic text-sm">
          Work cannot be turned in after the due date
        </i>
      </div>
    </div>
  );
};

export default withPermissions(Submit, banRoles.student_assignments);
