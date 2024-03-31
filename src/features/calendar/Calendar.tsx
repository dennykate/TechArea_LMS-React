/* eslint-disable @typescript-eslint/no-explicit-any */
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo, useState } from "react";
import { Modal, Text } from "@mantine/core";

const Calendar = () => {
  const events = useMemo(
    () => [
      {
        title: "Math Class",
        start: "2024-04-03T10:00:00",
        end: "2024-04-03T11:30:00",
        color: "blue",
        description: "This is a math class covering algebra and geometry.",
      },
      {
        title: "Science Exam",
        start: "2024-04-03",
        color: "red",
        description: "Final exam for the science course.",
      },
    ],
    []
  );
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<any>([]);

  const handleDateClick = (arg: DateClickArg) => {
    const clickedEvents = events.filter(
      (event) => arg.dateStr === event.start.split("T")[0]
    );
    if (clickedEvents.length > 0) {
      setSelectedEvents(clickedEvents);
      setModalOpened(true);
    }
  };

  return (
    <div className="md:p-8 sm:p-4 p-2 md:py-8 py-6 custom-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        events={events}
        dateClick={handleDateClick}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Event Details"
        centered
        size="lg"
      >
        {selectedEvents.map((event: any, index: number) => (
          <div key={index}>
            <Text>Date: {event.start.split("T")[0]}</Text>
            
            <Text>Title: {event.title}</Text>
            <Text>Description: {event.description}</Text>
            <hr className="my-4" />
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default Calendar;
