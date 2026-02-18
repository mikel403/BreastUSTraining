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
        if (err.response.status === 500) {
          setErrorMessage(
            "Parece ser que la contraseña introducida no es válida, pruebe de nuevo. Tenga en cuenta que la contraseña no puede ser muy común, no puede ser similar al usuario, el mínimo de caracteres es de 8 y debe tener números."
          );
        } else if (err.response.status === 400) {
          setErrorMessage(err.response.data.error);
        }
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        setErrorMessage(
          "Parece que hay algún problema al conectar con el servidor. Pruebe más tarde"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage(err.message);
      }
      console.log(err.config);
    });
};

export default setUser;
