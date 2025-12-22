import { FormEvent, useRef, useState } from "react";
import { Box, Button, Center, FormLabel, Input, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import usePhysician from "../User/userHooks/usePhysician";
import setUser from "../User/userHooks/setUser";
import setPhysician from "../User/userHooks/setPhysician";
import useAuthStore from "../store/store";
const ProfilePage = () => {
  const test_username = useAuthStore.getState().username;
  const navigate = useNavigate();
  const { data: physician, error, isLoading } = usePhysician();
  const [username, setUsername] = useState<string | undefined>(
    physician?.username
  );
  const [email, setEmail] = useState<string | undefined>(physician?.email);
  const [first_name, setFirst_name] = useState<string | undefined>(
    physician?.first_name
  );
  const [last_name, setLast_name] = useState<string | undefined>(
    physician?.last_name
  );
  const [experience, setExperience] = useState<number | undefined>(
    physician?.experience
  );
  const [profession, setProfession] = useState<string | undefined>(undefined);

  const userFile = {
    first_name: first_name,
    email: email,
    last_name: last_name,
  };
  const physicianFile = {
    experience: experience,
  };

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
    console.log(userFile);
    if (test_username != "TestUser") {
      setUser({ userFile, setFetchResult, setErrorMessage });
      setPhysician(physicianFile);
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
                  defaultValue={physician?.username}
                  id="username"
                  className="form-control"
                  disabled={true}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Box>
              <Box width={350}>
                <FormLabel htmlFor="email" className="form-label">
                  Email
                </FormLabel>
                <Input
                  mr={3}
                  defaultValue={physician?.email}
                  id="email"
                  type="email"
                  className="form-control"
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
                  defaultValue={physician?.first_name}
                  id="first_name"
                  className="form-control"
                  onChange={(event) => setFirst_name(event.target.value)}
                />
              </Box>
              <Box width={350}>
                <FormLabel htmlFor="last_name" className="form-label">
                  <a>Last name</a>
                </FormLabel>
                <Input
                  defaultValue={physician?.last_name}
                  id="last_name"
                  className="form-control"
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
                  id="profesion"
                  className="form-control"
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
                  defaultValue={physician?.experience}
                  type="number"
                  id="experience"
                  className="form-control"
                  onChange={(event) => {
                    if (event.target.value) {
                      setExperience(parseInt(event.target.value, 10));
                    }
                  }}
                />
              </Box>
            </Box>
            {test_username == "TestUser" && (
              <div className="text-danger">
                As a test user you can not change the information
              </div>
            )}
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
