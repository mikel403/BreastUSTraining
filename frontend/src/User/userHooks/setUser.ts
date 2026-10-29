import axios from "../../libs/axios";
import { UserUpdate } from "./userInfo";

interface Props {
  userFile: UserUpdate;
  setFetchResult: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const setUser = ({ userFile, setFetchResult, setErrorMessage }: Props) => {
  axios
    .put("/auth/users/me/", userFile)
    .then((res) => {
      setFetchResult("The user was saved correctly");
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // 400: the first field error (e.g. an invalid email); it is translated when shown
        const data = err.response.data;
        const firstKey = data && typeof data === "object" ? Object.keys(data)[0] : null;
        const firstMsg = firstKey && Array.isArray(data[firstKey]) ? data[firstKey][0] : null;
        setErrorMessage(
          err.response.status === 400 && firstMsg
            ? firstMsg
            : "The changes could not be saved, please try again"
        );
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        setErrorMessage(
          "It is not possible to connect to the server, try again later"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage(err.message);
      }
    });
};

export default setUser;
