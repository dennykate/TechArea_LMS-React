import { MdDashboard, MdPeople } from "react-icons/md";
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
        icon: PiChalkboardTeacherLight,
        label: "Teachers",
        link: "/accounts/teachers/list",
      },
      { icon: IoPeopleOutline, label: "Staffs", link: "/accounts/staffs/list" },
      { icon: RiAdminLine, label: "Admins", link: "/accounts/admins/list" },
      { icon: PiStudent, label: "Students", link: "/accounts/students/list" },
    ],
  },
];

export default sideBarTabs;
