import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import registerRequest from "../api/registerRequest";
import { Box, Button, FormLabel, Input } from "@chakra-ui/react";

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const repeatPasswordref = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const register = registerRequest();
  const handleSubmit = (event: FormEvent) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    const username = usernameref.current?.value.trim() ?? "";
    const password = passwordref.current?.value ?? "";
    const repeatPassword = repeatPasswordref.current?.value ?? "";
    if (!username) {
      setError("User cannot be empty");
    } else if (!password) {
      setError("Password cannot be empty");
    } else if (password !== repeatPassword)
      return setError("Passwords do not match");
    else {
      register(username, password)
        .then(() => {
          setError("");
          setSuccess("Account created successfully ✔");
          setTimeout(() => {
            navigate("/breastultrasound");
          }, 1500);
        })
        .catch((err) => {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (err.response.status === 409) setError("User already exists");
            else if (err.response.status === 400) {
              const data = err.response.data;

              // data suele ser un objeto: { password: ["..."], username: ["..."], ... }
              const firstKey =
                data && typeof data === "object" ? Object.keys(data)[0] : null;
              const firstMsg =
                firstKey && Array.isArray(data[firstKey])
                  ? data[firstKey][0]
                  : null;

              setError(firstMsg ?? "Invalid data");
            } else setError("There is a mistake in the data, try again");
          } else if (err.request) {
            setError("Unable to contact the server, try again later");
          } else {
            setError(err.message);
          }
        });
    }
  };

  return (
    
    <div className="login-container">
      <div style={{ width: "60%", margin: "0 auto" }}>
        You are registering as a normal user. You will be able to access every
        element of the web page; however, you will not be considered in the expert panel when other users compare their descriptions. If you want to log in as a
        radiologist and help the project with your descriptions, contact
        mcarrilero@dia.uned.es.
      </div>
      <h1 className="login-title">Create your account</h1>
      <Box id="main">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <FormLabel htmlFor="username" className="form-label">
              User
            </FormLabel>
            <Input
              ref={usernameref}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <FormLabel htmlFor="password" className="form-label">
              Password
            </FormLabel>
            <Input
              ref={passwordref}
              id="password"
              type="password"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <FormLabel htmlFor="repeat-password" className="form-label">
              Repeat password
            </FormLabel>
            <Input
              ref={repeatPasswordref}
              id="repeat-password"
              type="password"
              className="form-control"
            />
          </div>

          <Button mt={6} type="submit">
            Create
          </Button>
          <div className="mb-3" style={{ textAlign: "center" }}>
            {error && <p className="text-danger">{error}</p>}
          </div>
          <div className="mb-3" style={{ textAlign: "center" }}>
            {success && <p className="text-success">{success}</p>}
          </div>
          <Button onClick={() => navigate("/breastultrasound/")}>
            Back to log in page
          </Button>
          {/* <a href="#">Forgot Username / Password?</a>
        <a href="#">Don't have an account? Sign up</a> */}
        </form>
      </Box>
    </div>
  );
};

export default CreateAccountPage;
