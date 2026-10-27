import TranslationText from "../TranslationText";
import { FormEvent, useState } from "react";
import resetPassword from "../api/resetPassword";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import useAuthStore from "../store/store";
import i18n from "../i18n";
const ChangePasswordPage = () => {
  const username = useAuthStore.getState().username;
  const isTestUser = username == "TestUser";
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const reset = resetPassword({ setFetchResult, setError });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setFetchResult("");
    if (isTestUser) return;
    // Quick checks before calling the backend, which validates everything again
    if (!currentPassword || !newPassword || !reNewPassword) {
      setError(i18n.t("All fields are required"));
      return;
    }
    if (newPassword !== reNewPassword) {
      setError(i18n.t("Passwords do not match"));
      return;
    }
    if (newPassword === currentPassword) {
      setError(i18n.t("The new password must be different from the current one"));
      return;
    }
    setIsSaving(true);
    reset(currentPassword, newPassword, reNewPassword).then((ok) => {
      setIsSaving(false);
      if (ok) {
        setCurrentPassword("");
        setNewPassword("");
        setReNewPassword("");
      }
    });
  };

  return (
    <div className="password-container">
      <form onSubmit={handleSubmit} id="main">
        <div className="mb-3">
          <FormLabel htmlFor="currentpassword" className="form-label">
            <a><TranslationText text={"Current password"} /></a>
          </FormLabel>
          <Input
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            id="currentpassword"
            type="password"
            autoComplete="current-password"
            className="form-control"
            disabled={isTestUser}
          />
        </div>
        <div className="mb-3">
          <FormLabel htmlFor="newpassword" className="form-label">
            <a><TranslationText text={"New password"} /></a>
          </FormLabel>
          <Input
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            id="newpassword"
            type="password"
            autoComplete="new-password"
            className="form-control"
            disabled={isTestUser}
          />
        </div>
        <div className="mb-3">
          <FormLabel htmlFor="repassword" className="form-label">
            <TranslationText text={"Repite the new password"} /> </FormLabel>
          <Input
            value={reNewPassword}
            onChange={(event) => setReNewPassword(event.target.value)}
            id="repassword"
            type="password"
            autoComplete="new-password"
            className="form-control"
            disabled={isTestUser}
          />
        </div>
        <p>
          <TranslationText text={"The password must have at least 8 characters, can not be entirely numeric, too common or similar to your personal information"} />
        </p>
        {isTestUser && (
          <div className="text-danger">
            <TranslationText text={"As a test user you can not change the password"} /> </div>
        )}
        <Button mt={4} type="submit" isDisabled={isTestUser} isLoading={isSaving}>
          <TranslationText text={"Change password"} /> </Button>
        <div className="mt-3" style={{ textAlign: "center" }}>
          {error && <p className="text-danger">{error}</p>}
          {fetchResult && <p className="text-success">{fetchResult}</p>}
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
