import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import moment, { Moment } from "moment/moment";
import DateRangePicker, { DateOrString, Options } from "daterangepicker";
import { IoMdArrowDropdown } from "react-icons/io";

interface PropsType {
  dateRange: {
    start: Moment;
    end: Moment;
  };
  setDateRange: Dispatch<
    SetStateAction<{
      start: Moment;
      end: Moment;
    }>
  >;
}

const DateRangePickerComponent = ({ dateRange, setDateRange }: PropsType) => {
  const reportRangeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function setDate(start: Moment, end: Moment) {
      setDateRange({ start, end });
    }
    const ranges: { [name: string]: [DateOrString, DateOrString] } = {
      All: [
        moment()
          .subtract(moment().year() - 2000, "year")
          .startOf("year"),
        moment(),
      ],
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7Days": [moment().subtract(6, "days"), moment()],
      "Last 30Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Previous Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
      "This Year": [moment().startOf("year"), moment().endOf("year")],
      "Previous Year": [
        moment().subtract(1, "year").startOf("year"),
        moment().subtract(1, "year").endOf("year"),
      ],
    };

    const options: Options = {
      startDate: dateRange.start,
      endDate: dateRange.end,
      ranges,
      opens: "left",
    };

    if (reportRangeRef.current) {
      const rangeRef = reportRangeRef.current as HTMLElement; // Use the appropriate type

      rangeRef.addEventListener("dblclick", () => {
        const { start, end } = dateRange;
        setDate(start, end);
      });

      const daterangepicker = new DateRangePicker(rangeRef, options, setDate);

      return () => {
        daterangepicker.remove();
      };
    }
  }, [reportRangeRef]);

  return (
    <button
      ref={reportRangeRef}
      className="px-3 py-2 bg-primary-500 rounded flex items-center"
    >
      <span className="px-2 text-white text-sm whitespace-nowrap">
        {dateRange.start.format("MMM D YYYY")} -{" "}
        {dateRange.end.format("MMM D YYYY")}
      </span>
      <div className="sm:min-w-[10px] min-w-[5px]">
        <IoMdArrowDropdown className="sm:text-lg text-base text-white" />
      </div>
    </button>
  );
};

export default DateRangePickerComponent;
