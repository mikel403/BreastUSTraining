import { FormEvent, useRef, useState } from "react";
import resetPassword from "../api/resetPassword";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import resetUsername from "../api/resetUsername";
import useAuthStore from "../store/store";
const ChangeUserPage = () => {
  const username = useAuthStore.getState().username;
  const passwordref = useRef<HTMLInputElement>(null);
  const new_userref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const reset = resetUsername({ setFetchResult, setError });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setFetchResult("");
    if (
      passwordref.current !== null &&
      new_userref.current !== null &&
      username != "TestUser"
    ) {
      reset(passwordref.current.value, new_userref.current.value);
    }
  };

  return (
    <div className="password-container">
      <form onSubmit={handleSubmit} id="main">
        <div className="mb-3">
          <FormLabel htmlFor="password" className="form-label">
            <a>Password</a>
          </FormLabel>
          <Input
            ref={passwordref}
            id="newpassword"
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormLabel htmlFor="password" className="form-label">
            New username
          </FormLabel>
          <Input ref={new_userref} id="username" className="form-control" />
        </div>
        {username == "TestUser" && (
          <div className="text-danger">
            As a test user you can not change the username
          </div>
        )}
        <Button mt={4} type="submit">
          Change username
        </Button>
        <div className="mt-3" style={{ textAlign: "center" }}>
          {error && <p className="text-danger">{error}</p>}
          {fetchResult && <p className="text-success">{fetchResult}</p>}
        </div>
      </form>
    </div>
  );
};

export default ChangeUserPage;
