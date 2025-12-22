import axios from "axios";
import useAuthStore from "../store/store";
import { baseUrl } from "./url";

const authApi = axios.create({
  ...axios,
  baseURL: baseUrl,
  // withCredentials: true,
});
// authApi.defaults.headers.common["Authorization"]="JWT "+ useAuthStore.getState().accesstoken
authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accesstoken;
  config.headers["Authorization"] = "JWT " + token;
  return config;
});

export default authApi;
