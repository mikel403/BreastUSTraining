import { useNavigate } from "react-router-dom";
import axios from "../libs/axios";
import useAuthStore from "../store/store";

const loginRequest = () => {
  const { setaccesstoken, setrefreshtoken, setusername } = useAuthStore();
  const navigate = useNavigate();
  const login = (username: string, password: string) =>
    axios.post("/auth/jwt/create/", { username, password }).then((res) => {
      setaccesstoken(res.data.access);
      setrefreshtoken(res.data.refresh);
      setusername(username);
      navigate("/breastultrasound/home");
    });
  return login;
};
export default loginRequest;
