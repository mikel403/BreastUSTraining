import { FormEvent, useRef, useState } from "react";
import resetPassword from "../api/resetPassword";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import useAuthStore from "../store/store";
const ChangePasswordPage = () => {
  const username = useAuthStore.getState().username;
  const newpasswordref = useRef<HTMLInputElement>(null);
  const re_new_passwordref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const reset = resetPassword({ setFetchResult, setError });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setFetchResult("");
    if (
      newpasswordref.current !== null &&
      re_new_passwordref.current !== null &&
      username != "TestUser"
    ) {
      reset(newpasswordref.current.value, re_new_passwordref.current.value);
    }
  };

  return (
    <div className="password-container">
      <form onSubmit={handleSubmit} id="main">
        <div className="mb-3">
          <FormLabel htmlFor="password" className="form-label">
            <a>New password</a>
          </FormLabel>
          <Input
            ref={newpasswordref}
            id="newpassword"
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormLabel htmlFor="password" className="form-label">
            Repite the new password
          </FormLabel>
          <Input
            ref={re_new_passwordref}
            id="repassword"
            type="password"
            className="form-control"
          />
        </div>
        {username == "TestUser" && (
          <div className="text-danger">
            As a test user you can not change the password
          </div>
        )}
        <Button mt={4} type="submit">
          Change password
        </Button>
        <div className="mt-3" style={{ textAlign: "center" }}>
          {error && <p className="text-danger">{error}</p>}
          {fetchResult && <p className="text-success">{fetchResult}</p>}
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
