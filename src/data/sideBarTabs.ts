import { MdDashboard, MdPeople } from "react-icons/md";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";

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
        link: "/teachers/list",
      },
      { icon: IoPeopleOutline, label: "Staffs", link: "/staffs/list" },
      { icon: GrUserAdmin, label: "Admins", link: "/admins/list" },
      { icon: PiStudent, label: "Students", link: "/students/list" },
    ],
  },
];

export default sideBarTabs;
