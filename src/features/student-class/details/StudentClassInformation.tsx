import MyButton from "@/components/buttons/MyButton";
import ImportantInformation from "./ImportantInformation";

const StudentClassInformation = () => {
  return (
    <div className=" ">
      <div className="">
        <h2 className="sm:text-xl text-base font-[400] mb-5">Class Details</h2>

        <div className="space-y-2 mt-2">
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Title
            </p>
            <span className="sm:text-sm text-xs">- Exam</span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Description
            </p>
            <p className="sm:text-sm text-xs w-[90%]">
              - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              quisquam a amet fugiat, dicta excepturi iure voluptas sunt
              deserunt minima, quasi aut! Perferendis amet iure tempore eaque
              officia sequi aspernatur. Officiis maiores ipsa molestias vel
              magnam labore eum tenetur, quod minima saepe cumque quasi rerum
              ipsum repellendus voluptates laudantium, ratione autem assumenda
              sed eveniet consectetur eligendi fugiat! Commodi, nulla iure.
            </p>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Start Date
            </p>
            <span className="sm:text-sm text-xs">- 1-12-2000 10:00 AM</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              End Date
            </p>
            <span className="sm:text-sm text-xs">- 12-12-2000 10:00 AM</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Type
            </p>
            <span className="sm:text-sm text-xs">- Exam</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Created by
            </p>
            <span className="sm:text-sm text-xs">- Thwe Thwe</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Created at
            </p>
            <span className="sm:text-sm text-xs">- 29-3-2024</span>
          </div>
        </div>

        <h2 className="sm:text-xl text-base font-[400] my-5">
          Important Information <span className="text-red-500"> ***</span>
        </h2>

        <div className="w-full flex items-center gap-6 flex-wrap">
          <ImportantInformation label="Meeting ID" value="8438274831" />

          <ImportantInformation label="Meeting Password" value="123123" />
          
          <MyButton size="lg" className="rounded-full">
            Direct Enter
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default StudentClassInformation;
