import axios from "../libs/axios";
interface Props {
  setFetchResult: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
const resetUsername = ({ setFetchResult, setError }: Props) => {
  const reset = (current_password: string, new_username: string) =>
    axios
      .post("/auth/users/set_username/", { current_password, new_username })
      .then((res) => setFetchResult("The username has been changed"))
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (err.response.status === 500) {
            setError(err.response.data.error);
          } else if (err.response.status === 400) {
            if (err.response.data.new_username){
            setError(err.response.data.new_username)};
            if (err.response.data.current_password){
                setError(err.response.data.current_password)};
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

export default resetUsername;
