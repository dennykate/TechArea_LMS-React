/* eslint-disable @typescript-eslint/no-explicit-any */
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo, useState } from "react";
import useQuery from "@/hooks/useQuery";
import moment from "moment";
import useUserInfo from "@/hooks/use-user-info";
import { Modal } from "@mantine/core";
// import List from "../schedules/list/List";
import Create from "../schedules/create/Create";
import List from "../schedules/list/List";

type EventType = "exams" | "meetings" | "holidays" | "events";

const typeObj: { [key in EventType]: string } = {
  exams: "blue",
  meetings: "orange",
  holidays: "red",
  events: "green",
};

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [currentRange, setCurrentRange] = useState({
    start: moment(),
    end: moment(),
  });
  const userInfo = useUserInfo();

  const { data } = useQuery(
    `/academic-calendar-events?${
      userInfo.role_id == 3 ? "" : `filter[role_id]=${userInfo?.role_id}&`
    }limit=100&start_date=${moment(currentRange.start)
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD")}&end_date=${moment(currentRange.end)
      .add(1, "month")
      .endOf("month")
      .format("YYYY-MM-DD")}${
      userInfo?.role_id == 1 ? `&filter[grade_id]=${userInfo?.grade_id}` : ""
    }`
  );

  const events = useMemo(
    () =>
      data?.map((item: any) => {
        return {
          title: item?.title,
          description: item?.description,
          start: item?.start_at,
          end: item?.end_at,
          color: typeObj[item?.type as EventType],
          display: "block",
        };
      }),
    [data]
  );

  const handleDateSet = (dateInfo: any) => {
    setCurrentRange({
      start: dateInfo.startStr,
      end: dateInfo.endStr,
    });
  };

  return (
    <div>
      <div className="md:px-8 sm:px-4 px-2 md:pt-8 pt-6 custom-calendar sm:overflow-x-hidden overflow-y-auto overflow-x-auto">
        <div className="flex sm:items-center items-start justify-between mb-4 sm:flex-row flex-col gap-4">
          <div className="flex items-center gap-4">
            {Object.entries(typeObj)?.map(([key, val]) => (
              <div key={key} className="flex items-center gap-1">
                <div
                  style={{ background: val }}
                  className="w-[14px] h-[14px] rounded "
                />
                <p className="text-sm capitalize">{key}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-3 rounded-md">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={events}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            displayEventTime={false}
            eventContent={(arg) => ({ html: arg.event.title })}
            datesSet={handleDateSet} // Use this callback to respond to date changes
            dateClick={(arg) => setStartDate(arg.date)}
          />
        </div>
      </div>
      <List />

      <Modal
        opened={!!startDate}
        onClose={() => setStartDate(undefined)}
        title="Create Schedule"
        centered
      >
        <Create startDate={startDate} />
      </Modal>
    </div>
  );
};

export default Calendar;
