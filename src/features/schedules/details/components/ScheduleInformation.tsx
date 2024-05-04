export interface ScheduleType {
  data: {
    title: string;
    description?: string;
    start_date: string;
    end_date: string;
    type: string;
    created_by: string;
    created_at: string;
    role: string;
  };
}
const ScheduleInformation = ({ data }: ScheduleType) => {
  return (
    <div className=" ">
      <div className="">
        <h2 className="sm:text-xl text-base font-[400] mb-5">
          Schedule Details
        </h2>

        <div className="space-y-2 mt-2">
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Title
            </p>
            <span className="sm:text-sm text-xs">- {data?.title}</span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Description
            </p>
            <p className="sm:text-sm text-xs w-[90%]">- {data?.description}</p>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Start Date
            </p>
            <span className="sm:text-sm text-xs">- {data?.start_date}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              End Date
            </p>
            <span className="sm:text-sm text-xs">- {data?.end_date}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Role
            </p>
            <span className="sm:text-sm text-xs">- {data?.role}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Type
            </p>
            <span className="sm:text-sm text-xs">- {data?.type}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Created by
            </p>
            <span className="sm:text-sm text-xs">- {data?.created_by}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Created at
            </p>
            <span className="sm:text-sm text-xs">- {data?.created_at}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInformation;
