import { MdDashboard, MdPeople } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

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
    links: [{ icon: PiStudent, label: "Student List", link: "/students/list" }],
  },
];

export default sideBarTabs;
