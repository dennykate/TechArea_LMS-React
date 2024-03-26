import { MdChat, MdDashboard, MdPeople } from "react-icons/md";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";

const sideBarTabs = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    initiallyOpened: false,
    link: "/dashboard",
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
    label: "Chat",
    icon: MdChat,
    initiallyOpened: false,
    link: "/chat",
  },
];

export default sideBarTabs;
