import { FormEvent, useRef, useState } from "react";
import loginRequest from "../api/loginRequest";
import { Box, Button, FormLabel, Input, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const login = loginRequest();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (usernameref.current !== null && passwordref.current !== null) {
      login(usernameref.current.value, passwordref.current.value).catch(
        (err) => {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (err.response.status === 401) {
              setError("Incorrect user or password");
            } else if (err.response.status === 400) {
              setError("User and password cannot be empty");
            } else {
              setError("There is a mistake in the data, try again");
            }
          } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            setError("Unable to contact with the server, try again later");
          } else {
            // Something happened in setting up the request that triggered an Error
            setError(err.message);
          }
        },
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Breast Ultrasound Imaging SharePage</h1>
      <Box id="main">
        <Button onClick={() => login("TestUser", "TestUserPassword")}>
          {" "}
          Log in as a test user
        </Button>
        <Divider
          width="100%"
          mx="auto"
          my={4}
          borderWidth="1px"
          borderColor="gray.500"
        />
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

          <Button mt={6} type="submit">
            Log in
          </Button>

          <Button
            mt={3}
            variant="outline"
            colorScheme="teal"
            onClick={() => navigate("/breastultrasound/register")}
          >
            Create an account
          </Button>

          <div className="mb-3" style={{ textAlign: "center" }}>
            {error && <p className="text-danger">{error}</p>}
          </div>
          {/* <a href="#">Forgot Username / Password?</a>
        <a href="#">Don't have an account? Sign up</a> */}
        </form>
      </Box>
    </div>
  );
};

export default LoginPage;
