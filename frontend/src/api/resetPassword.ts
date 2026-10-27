import axios from "../libs/axios";
import i18n from "../i18n";
interface Props {
  setFetchResult: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
// Backend error codes (including Django password validators) mapped to translation keys
const errorMessages: Record<string, string> = {
  test_user: "As a test user you can not change the password",
  required: "All fields are required",
  wrong_password: "The current password is not correct",
  password_mismatch: "Passwords do not match",
  same_password: "The new password must be different from the current one",
  password_too_short: "The password must contain at least 8 characters",
  password_too_common: "The password is too common",
  password_entirely_numeric: "The password can not be entirely numeric",
  password_too_similar: "The password is too similar to your personal information",
};
const resetPassword = ({ setFetchResult, setError }: Props) => {
  const reset = (
    current_password: string,
    new_password: string,
    re_new_password: string
  ) =>
    axios
      .post("/reset-password/", { current_password, new_password, re_new_password })
      .then((res) => {
        setFetchResult(i18n.t(res.data.detail));
        return true;
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const codes: string[] = err.response.data?.codes ?? [];
          const messages = codes.map((code) =>
            errorMessages[code] ? i18n.t(errorMessages[code]) : null
          );
          if (messages.length > 0 && messages.every((m) => m !== null)) {
            setError(messages.join(" "));
          } else {
            setError(
              err.response.data?.error ??
                i18n.t("The password could not be changed, please try again")
            );
          }
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setError(
            i18n.t("It is not possible to connect to the server, try again later")
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(err.message);
        }
        return false;
      });
  return reset;
};

export default resetPassword;
