import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src={
          "https://i.postimg.cc/FzL0bSm3/pngtree-building-and-construction-logo-design-template-image-317780.jpg"
        }
        alt="logo"
        className="h-[60px] object-cover"
      />
      <p className="text-base">Company Name</p>
    </Link>
  );
};

export default Logo;
