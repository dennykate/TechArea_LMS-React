import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footers/Footer";

interface PropsType {
  children: React.ReactNode;
}

const NavLayout: React.FC<PropsType> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar
        Icon={IoArrowBack}
        toggle={() => navigate(-1)}
        withShadow
        wrapperClassName="sticky top-0 left-0 z-10"
      />

      {children}

      <Footer />
    </>
  );
};

export default NavLayout;
