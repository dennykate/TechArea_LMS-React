import {
  MdDashboard,
  MdPeople,
  MdOutlineMenuBook,
  MdSchool,
  MdQuiz,
  MdQuestionAnswer,
  MdAssignment,
  MdAssignmentTurnedIn,
  // MdChat,
  // MdPodcasts,
} from "react-icons/md";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { FaBookReader, FaCalendarAlt } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";
import { BiLogoZoom } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { HiSpeakerphone } from "react-icons/hi";
import { TbTimelineEventFilled } from "react-icons/tb";
import { FaHardDrive } from "react-icons/fa6";

import { banRoles } from "./banRoles";

const sideBarTabs = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    initiallyOpened: false,
    link: "/dashboard",
    banRoles: banRoles.dashboard,
  },
  {
    label: "Accounts",
    icon: MdPeople,
    initiallyOpened: false,
    link: undefined,
    banRoles: banRoles.accounts.overall,
    links: [
      {
        icon: RiAdminLine,
        label: "Admins",
        link: "/accounts/admins/list",
        path: "/accounts/admins",
        banRoles: banRoles.accounts.admins,
      },
      {
        icon: IoPeopleOutline,
        label: "Staffs",
        link: "/accounts/staffs/list",
        path: "/accounts/staffs",
        banRoles: banRoles.accounts.staffs,
      },
      {
        icon: PiChalkboardTeacherLight,
        label: "Teachers",
        link: "/accounts/teachers/list",
        path: "/accounts/teachers",
        banRoles: banRoles.accounts.teachers,
      },
      {
        icon: PiStudent,
        label: "Students",
        link: "/accounts/students/list",
        path: "/accounts/students",
        banRoles: banRoles.accounts.students,
      },
    ],
  },
  {
    label: "Calendar",
    icon: FaCalendarAlt,
    initiallyOpened: false,
    link: "/calendar",
  },
  {
    label: "Courses",
    icon: MdOutlineMenuBook,
    initiallyOpened: false,
    link: "/courses",
    banRoles: banRoles.courses,
  },
  {
    label: "Quizzes",
    icon: MdQuiz,
    initiallyOpened: false,
    link: "/quizzes",
    banRoles: banRoles.quizzes,
  },
  {
    label: "Assignments",
    icon: MdAssignment,
    initiallyOpened: false,
    link: "/assignments",
    banRoles: banRoles.assignments,
  },
  {
    label: "Announcements",
    icon: HiSpeakerphone,
    initiallyOpened: false,
    link: "/announcements",
    banRoles: banRoles.announcements,
  },
  {
    label: "Events",
    icon: TbTimelineEventFilled,
    initiallyOpened: false,
    link: "/events",
    banRoles: banRoles.events,
  },
  {
    label: "Grades",
    icon: MdSchool,
    initiallyOpened: false,
    link: "/grades",
    banRoles: banRoles.grades,
  },
  {
    label: "Schedules",
    icon: AiFillSchedule,
    initiallyOpened: false,
    link: "/schedules",
    banRoles: banRoles.schedules,
  },
  {
    label: "Zoom Meetings",
    icon: BiLogoZoom,
    initiallyOpened: false,
    link: "/zoom-meetings",
    banRoles: banRoles.zoom_meetings,
  },
  {
    label: "Zoom Record",
    icon: FaHardDrive,
    initiallyOpened: false,
    link: "/zoom-records",
    banRoles: banRoles.zoom_records,
  },
  {
    label: "Courses",
    icon: FaBookReader,
    initiallyOpened: false,
    link: "/student-courses",
    banRoles: banRoles.student_courses,
  },
  {
    label: "Quizzes",
    icon: MdQuestionAnswer,
    initiallyOpened: false,
    link: "/student-quizzes",
    banRoles: banRoles.student_quizzes,
  },
  {
    label: "Assignments",
    icon: MdAssignmentTurnedIn,
    initiallyOpened: false,
    link: "/student-assignments",
    banRoles: banRoles.student_assignments,
  },
  {
    label: "Zoom Meetings",
    icon: SiGoogleclassroom,
    initiallyOpened: false,
    link: "/student-classes",
    banRoles: banRoles.student_classes,
  },
  {
    label: "Zoom Records",
    icon: SiGoogleclassroom,
    initiallyOpened: false,
    link: "/student-zoom-records",
    banRoles: banRoles.zoom_records,
  },
  // {
  //   label: "Chat",
  //   icon: MdChat,
  //   initiallyOpened: false,
  //   link: "/chat",
  // },
  // {
  //   label: "New Feed",
  //   icon: MdPodcasts,
  //   initiallyOpened: false,
  //   link: "/new-feed",
  // },
];

export default sideBarTabs;
