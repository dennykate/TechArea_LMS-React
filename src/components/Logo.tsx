import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={"/logo.svg"} alt="logo" className="h-[50px] object-cover" />
      <p className="text-base">Galaxy LMS</p>
    </Link>
  );
};

export default Logo;
