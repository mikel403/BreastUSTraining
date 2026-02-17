import axios from "../libs/axios";

const registerRequest = () => {
  const register = (username: string, password: string) =>
    axios.post("/auth/users/", {
      username,
      password,
      re_password: password,
    });

  return register;
};

export default registerRequest;