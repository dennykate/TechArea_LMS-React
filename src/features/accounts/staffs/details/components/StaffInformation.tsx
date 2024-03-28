const StaffInformation = () => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
      <div className="">
        <h2 className="sm:text-xl text-lg font-[400]">Personal Information</h2>

        <div className="space-y-2 mt-2">
          <div className="grid grid-cols-3">
            <p className="sm:text-sm text-xs font-[300] text-black/70">
              Gender - <span className="underline">Male</span>
            </p>
          </div>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Date of birth - <span className="underline">01 Dec 2000</span>
          </p>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Entrance date - <span className="underline">22 Dec 2002</span>
          </p>
        </div>
      </div>

      <div className="md:col-span-2 sm:col-span-2 col-span-1">
        <h2 className="sm:text-xl text-lg font-[400]">Contact Information</h2>

        <div className="space-y-2 mt-2">
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Phone number -{" "}
            <a className="underline" href={`tel:`}>
              +959 964 470 356
            </a>
          </p>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Email -{" "}
            <a className="underline" href={`mailto:`}>
              dennykate22@gmail.com
            </a>
          </p>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Address -{" "}
            <span className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Blanditiis vero natus corrupti perferendis esse non. At impedit id
              qui, consectetur ut quod dolore necessitatibus, dolorum optio
              provident vero commodi itaque.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffInformation;
