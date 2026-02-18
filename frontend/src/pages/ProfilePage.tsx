import { FormEvent, useMemo, useRef, useState } from "react";
import { Box, Button, Center, FormLabel, Input, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import usePhysician from "../User/userHooks/usePhysician";
import setUser from "../User/userHooks/setUser";
import useUser from "../User/userHooks/useUser";
import setPhysician from "../User/userHooks/setPhysician";
import useAuthStore from "../store/store";
import { useEffect } from "react";
const ProfilePage = () => {
  const test_username = useAuthStore.getState().username;
  const navigate = useNavigate();
  const { data: user } = useUser();
  const isPhysician = !!user?.is_physician;
  console.log(isPhysician);
  console.log(user);
  const { data: physician } = usePhysician({ enabled: isPhysician });

  
  const [email, setEmail] = useState<string>("");
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [experience, setExperience] = useState<number | "">("");
  const [profession, setProfession] = useState<string>("");

  useEffect(() => {
    if (user) {
      setEmail(user.email ?? "");
      setFirst_name(user.first_name ?? "");
      setLast_name(user.last_name ?? "");
    }
  }, [user]);

  useEffect(() => {
    if (physician) {
      setProfession(physician.profession ?? ""); // si existe en tu backend
      setExperience(
        typeof physician.experience === "number" ? physician.experience : "",
      );
    } else {
      // si no es physician, limpia por si vienes de otra sesión/estado
      setProfession("");
      setExperience("");
    }
  }, [physician]);

  const userFile = useMemo(
    () => ({
      username: user?.username ?? "",   // obligatorio
      first_name,
      last_name,
      email,
    }),
    [user?.username,first_name, last_name, email],
  );
  const physicianFile = useMemo(
    () => ({
      profession, // asegúrate de que tu API lo acepte
      experience: experience === "" ? undefined : experience,
    }),
    [profession, experience],
  );

  // const userref = useRef<HTMLInputElement>(undefined);
  // const emailref = useRef<HTMLInputElement>(undefined);
  // const nameref = useRef<HTMLInputElement>(undefined);
  // const surnameref = useRef<HTMLInputElement>(undefined);
  // const experienceref = useRef<HTMLInputElement>(undefined);
  // const userTyperef = useRef<HTMLInputElement>(undefined);

  const [errorMessage, setErrorMessage] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setFetchResult("");
    if (test_username != "TestUser") {
      setUser({ userFile, setFetchResult, setErrorMessage });
      if (isPhysician) setPhysician(physicianFile);
    }
  };
  return (
    <>
      <Center>
        <div className="profile-container">
          <form onSubmit={handleSubmit}>
            <Box display="flex">
              <Box mr={4} width={350}>
                <Box display="flex">
                  <FormLabel htmlFor="username" className="form-label">
                    <a>Username</a>
                  </FormLabel>
                </Box>
                <Input
                  value={user?.username ?? ""}
                  id="username"
                  className="form-control"
                  disabled={true}
                />
              </Box>
              <Box width={350}>
                <FormLabel htmlFor="email" className="form-label">
                  Email
                </FormLabel>
                <Input
                  mr={3}
                  value={email}
                  id="email"
                  type="email"
                  className="form-control"
                  disabled={test_username === "TestUser"}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Box>
            </Box>
            <Box mt={4} display="flex">
              <Box mr={4} width={350}>
                <FormLabel htmlFor="first_name" className="form-label">
                  <a>Name</a>
                </FormLabel>
                <Input
                  value={first_name}
                  id="first_name"
                  className="form-control"
                  disabled={test_username === "TestUser"}
                  onChange={(event) => setFirst_name(event.target.value)}
                />
              </Box>
              <Box width={350}>
                <FormLabel htmlFor="last_name" className="form-label">
                  <a>Last name</a>
                </FormLabel>
                <Input
                  value={last_name}
                  id="last_name"
                  className="form-control"
                  disabled={test_username === "TestUser"}
                  onChange={(event) => setLast_name(event.target.value)}
                />
              </Box>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Box width={350}>
                <FormLabel
                  width={310}
                  htmlFor="profession"
                  className="form-label"
                >
                  <a>Profession</a>
                </FormLabel>
                <Input
                  id="profession"
                  className="form-control"
                  disabled={!isPhysician}
                  value={profession}
                  onChange={(event) => setProfession(event.target.value)}
                />
              </Box>
              <Box>
                <Box width={350}>
                  <FormLabel htmlFor="experience" className="form-label">
                    <a>Experience in breast ultrasound: years</a>
                  </FormLabel>
                </Box>
                <Input
                  
                  type="number"
                  id="experience"
                  className="form-control"
                  disabled={!isPhysician}
                  value={experience}
                  onChange={(event) => {
                    const v = event.target.value;
                    setExperience(v === "" ? "" : parseInt(v, 10));
                  }}
                />
              </Box>
            </Box>
            {test_username === "TestUser" ? (
              <div className="text-danger">
                As a test user you can not change the information
              </div>
            ) : !isPhysician ? (
              <div className="text-warning">
                Only radiologists can fill in profession and experience. If you want a radiologist user contact mcarrilero@dia.uned.es
              </div>
            ) : null}
            <Button mt={4} type="submit">
              Save Changes
            </Button>

            <div className="mb-3" style={{ textAlign: "center" }}>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              {fetchResult && <p className="text-success">{fetchResult}</p>}
            </div>
          </form>
        </div>
      </Center>
      <Box display="flex" justifyContent="space-evenly">
        <Box
          className="link"
          mt={5}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/breastultrasound/change-password");
          }}
        >
          Change password
        </Box>
        <Box
          className="link"
          mt={5}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/breastultrasound/change-username");
          }}
        >
          Change username
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
