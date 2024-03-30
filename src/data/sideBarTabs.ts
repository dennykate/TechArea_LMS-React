import {
  MdDashboard,
  MdPeople,
  MdOutlineMenuBook,
  MdSchool,
  MdQuiz,
} from "react-icons/md";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";

const sideBarTabs = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    initiallyOpened: false,
    link: "/dashboard",
  },
  {
    label: "Courses",
    icon: MdOutlineMenuBook,
    initiallyOpened: false,
    link: "/courses",
  },
  {
    label: "Quizzes",
    icon: MdQuiz,
    initiallyOpened: false,
    link: "/quizzes",
  },
  {
    label: "Grades",
    icon: MdSchool,
    initiallyOpened: false,
    link: "/grades",
  },
  {
    label: "Schedules",
    icon: AiFillSchedule,
    initiallyOpened: false,
    link: "/schedules",
  },
  {
    label: "Accounts",
    icon: MdPeople,
    initiallyOpened: false,
    link: undefined,
    links: [
      {
        icon: RiAdminLine,
        label: "Admins",
        link: "/accounts/admins/list",
        path: "/accounts/admins",
      },
      {
        icon: IoPeopleOutline,
        label: "Staffs",
        link: "/accounts/staffs/list",
        path: "/accounts/staffs",
      },
      {
        icon: PiChalkboardTeacherLight,
        label: "Teachers",
        link: "/accounts/teachers/list",
        path: "/accounts/teachers",
      },
      {
        icon: PiStudent,
        label: "Students",
        link: "/accounts/students/list",
        path: "/accounts/students",
      },
    ],
  },
  {
    label: "Student Courses",
    icon: FaBookReader,
    initiallyOpened: false,
    link: "/student-courses",
  },
];

export default sideBarTabs;
