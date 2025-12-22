import {
  Center,
  Grid,
  GridItem,
  HStack,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import logoutRequest from "../api/logoutRequest";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/LogoUNEDNegativo.jpg";

const NavBar = () => {
  const logout = logoutRequest();
  const navigate = useNavigate();

  const accordiondescribeRef = useRef<HTMLDivElement>(null);
  const [isDescribeOpen, setIsDescribeOpen] = useState(false);

  const accordionprofileRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      accordiondescribeRef.current &&
      !accordiondescribeRef.current.contains(event.target as Node)
    ) {
      setIsDescribeOpen(false);
    }
    if (
      accordionprofileRef.current &&
      !accordionprofileRef.current.contains(event.target as Node)
    ) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //El logo hay que poner breastultrasound antes en producción
  return (
    <Grid templateAreas={`"home describe my_profile" `}>
      <GridItem area="home" id="grid">
        <div
          onClick={() => navigate("/breastultrasound/home")}
          style={{ cursor: "pointer" }}
        >
          <HStack>
            <Image src={logo} boxSize="78px" />
            <Center w="100%">
              <a>Home</a>
            </Center>
          </HStack>
        </div>
      </GridItem>
      <GridItem area="describe" id="grid">
        <Accordion
          allowToggle
          ref={accordiondescribeRef}
          index={isDescribeOpen ? 0 : -1}
          onChange={() => setIsDescribeOpen(!isDescribeOpen)}
        >
          <AccordionItem className="accordion-item">
            <AccordionButton className="accordion-button">
              <Box flex="1" textAlign="center">
                Describe Ultrasound Images
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel className="accordion-panel">
              <div
                className="accordion-link"
                onClick={() => {
                  navigate("/breastultrasound/nodules");
                  setIsDescribeOpen(!isDescribeOpen);
                }}
                style={{ cursor: "pointer" }}
              >
                From Database
              </div>
              <div
                className="accordion-link"
                onClick={() => {
                  navigate("/breastultrasound/newNodules");
                  setIsDescribeOpen(!isDescribeOpen);
                }}
                style={{ cursor: "pointer" }}
              >
                New Image
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </GridItem>
      <GridItem area="my_profile" id="grid">
        <Accordion
          allowToggle
          ref={accordionprofileRef}
          index={isProfileOpen ? 0 : -1}
          onChange={() => setIsProfileOpen(!isProfileOpen)}
        >
          <AccordionItem className="accordion-item">
            <AccordionButton className="accordion-button">
              <Box flex="1" textAlign="center">
                Profile Options
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel className="accordion-panel">
              <div
                className="accordion-link"
                onClick={() => {
                  navigate("/breastultrasound/results");
                  setIsProfileOpen(!isProfileOpen);
                }}
                style={{ cursor: "pointer" }}
              >
                Results
              </div>
              {/* <div
                className="accordion-link"
                onClick={() => {
                  navigate("/breastultrasound/described-nodules");
                  setIsProfileOpen(!isProfileOpen);
                }}
                style={{ cursor: "pointer" }}
              >
                Described Nodules
              </div> */}
              <div
                className="accordion-link"
                onClick={() => {
                  navigate("/breastultrasound/profile");
                  setIsProfileOpen(!isProfileOpen);
                }}
                style={{ cursor: "pointer" }}
              >
                Edit Profile
              </div>
              <div
                className="accordion-link"
                onClick={() => {
                  logout();
                  setIsProfileOpen(!isProfileOpen);
                }}
                style={{ cursor: "pointer" }}
              >
                Log out
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <div
          onClick={() => navigate("/breastultrasound/described-nodules")}
          style={{ cursor: "pointer" }}
        >
          My Nodules
        </div>
      </GridItem>
    </Grid>
  );
};

export default NavBar;
