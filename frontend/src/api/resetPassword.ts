import axios from "../libs/axios";
interface Props {
  setFetchResult: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
const resetPassword = ({ setFetchResult, setError }: Props) => {
  const reset = (new_password: string, re_new_password: string) =>
    axios
      .post("/reset-password/", { new_password, re_new_password })
      .then((res) => setFetchResult(res.data.detail))
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (err.response.status === 500) {
            setError(
              "It seems that the password entered is invalid, try again. Please note that the password cannot be very common, it cannot be similar to the username, the minimum number of characters is 8 and it must have numbers."
            );
          } else if (err.response.status === 400) {
            setError(err.response.data.error);
          }
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setError(
            "It is not possible to connect to the server, try again later"
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(err.message);
        }
        console.log(err.config);
      });
  return reset;
};

export default resetPassword;
