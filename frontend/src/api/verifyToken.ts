
import axios from "../libs/axios";
import useAuthStore from "../store/store";

const verifyToken = async () => {
  const accesstoken = useAuthStore.getState().accesstoken;

  try {
    const response = await axios.post(
      "/auth/jwt/verify/", // Replace with your actual API base URL
      { token: accesstoken }
    );

    if (response.status === 200) {
      // Token is valid
      return true;
    }
  } catch (error) {
    // If token is invalid or expired
    console.error("Token verification failed:", error);
    return false;
  }
};

export default verifyToken;