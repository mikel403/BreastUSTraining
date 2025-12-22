import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/store";

const logoutRequest = () => {
  const { setaccesstoken, setrefreshtoken, setusername } = useAuthStore();
  const navigate = useNavigate();
    return () => {
      setaccesstoken("");
      setrefreshtoken("");
      setusername("");
      navigate("/breastultrasound/");
    };
};
export default logoutRequest;
