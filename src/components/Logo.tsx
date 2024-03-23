import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={"https://i.postimg.cc/8z2k1W3p/tech-logo.jpg"}
        alt="logo"
        className="h-[50px] object-cover"
      />
      <p className="text-base">Galaxy</p>
    </Link>
  );
};

export default Logo;
