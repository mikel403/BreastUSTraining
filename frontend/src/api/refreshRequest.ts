import axios from "../libs/axios";
import useAuthStore from "../store/store";
const refreshRequest = () => {
  const refresh = useAuthStore.getState().refreshtoken;
  const setaccesstoken = useAuthStore.getState().setaccesstoken;
  axios
    .post("/auth/jwt/refresh/", { refresh })
    .then((res) => {
      setaccesstoken(res.data.access);
    });
};
export default refreshRequest;
