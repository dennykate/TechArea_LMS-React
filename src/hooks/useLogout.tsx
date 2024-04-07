import { useNavigate } from "react-router-dom";
import useEncryptStorage from "./use-encrypt-storage";

const useLogout = () => {
  const { remove } = useEncryptStorage();
  const navigate = useNavigate();

  return () => {
    remove("token");
    remove("role");
    remove("userInfo");
    navigate("/login");
  };
};

export default useLogout;
