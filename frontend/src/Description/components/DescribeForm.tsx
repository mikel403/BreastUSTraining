import { FormEvent, useEffect, useState } from "react";
import DescriptorRadioForm from "./DescriptorRadioForm";
import { Box, Button, Center, Image, SimpleGrid } from "@chakra-ui/react";
import useDescriptionAI from "../descriptionHooks/useDescriptionAI";
import axios from "../../libs/axios";
import setDescription from "../descriptionHooks/setDescription";
import { Description, Panel } from "../descriptionHooks/DescriptionInfo";
import CalculateAIDescription from "../descriptionHooks/CalculateAIDescription";
import { useNavigate } from "react-router-dom";
import CalculateExpertPanelDescription from "../descriptionHooks/CalculateExpertPanelDescription";
import useAuthStore from "../../store/store";

interface Props {
  id: string;
  image: string | null;
  full_image: string | null;
}
const DescribeForm = ({ id, image, full_image }: Props) => {
  const username = useAuthStore.getState().username;
  const navigate = useNavigate();
  const [isDescribed, setDescribed] = useState(false);
  const handleOtherTumour = () => {
    navigate("/breastultrasound/nodules");
  };
  // const Shape = ["oval", "round", "lobulated", "irregular"];
  const Shape = ["oval", "round", "irregular"];
  const [ShapeValue, setShapeValue] = useState<string | null>(null);
  const Margin = [
    "circumscribed",
    "microlobulated",
    "indistinct",
    "angulated",
    "spiculated",
  ];
  const [MarginValue, setMarginValue] = useState<string | null>(null);
  const Orientation = ["parallel", "no orientation", "not parallel"];
  const [OrientationValue, setOrientationValue] = useState<string | null>(null);
  const Echogenicity = [
    "anechoic",
    "hypoechoic",
    "heterogeneous",
    "hyperechoic",
    "isoechoic",
    "complex cystic and solid",
  ];
  const [EchogenicityValue, setEchogenicityValue] = useState<string | null>(
    null
  );
  const Posterior = [
    "no features",
    "enhancement",
    "shadowing",
    "combined pattern",
  ];
  const [PosteriorValue, setPosteriorValue] = useState<string | null>(null);
  // const EchogenicHalo = ["no halo", "halo"];
  // const [EchogenicHaloValue, setEchogenicHaloValue] = useState<string | null>(
  //   null
  // );
  const Calcification = ["no calcifications", "calcifications"];
  const [CalcificationValue, setCalcificationValue] = useState<string | null>(
    null
  );
  const Suggestivity = [
    "simple cyst",
    "clustered microcysts",
    "complicated cyst",
    "mass in skin",
    "mass on skin",
    "lymph node",
    "postsurgical fluid collection",
    "fat necrosis",
  ];
  const [SuggestivityValue, setSuggestivityValue] = useState<string | null>(
    null
  );
  const Birads = ["2", "3", "4A", "4B", "4C", "5"];
  const [BiradsValue, setBiradsValue] = useState<string | null>(null);

  //Convert to FormData
  const noduledescription = {
    shape: ShapeValue,
    margin: MarginValue,
    orientation: OrientationValue,
    echogenicity: EchogenicityValue,
    posterior: PosteriorValue,
    // halo: EchogenicHaloValue,
    calcification: CalcificationValue,
    suggestivity: SuggestivityValue,
    birads: BiradsValue,
  };

  // const nodule = useLocation().state.nodule as Nodule;
  // const id=nodule.id
  // const image=nodule.image
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (username != "TestUser") {
      setDescription(id, noduledescription);
    }
    setDescribed(true);
  };
  // const {
  //   data: description,
  //   error,
  //   isLoading,
  // } = useDescriptionAI(id.toString(), "AI_Manuela");

  // const [descriptionAI, setDescriptionAI] = useState<Description | undefined>(
  //   description
  // );
  const [descriptionAI, setDescriptionAI] = useState<Panel | undefined>();
  const [panelResult, setPanelResult] = useState<Panel>();
  const handleExpertPanel = () => {
    CalculateExpertPanelDescription(id.toString(), setPanelResult);
  };

  // const [AIshape, setAIshape] = useState<string | null>(null);
  // const [AImargin, setAImargin] = useState<string | null>(null);
  // const [AIorientation, setAIorientation] = useState<string | null>(null);
  // const [AIposterior, setAIposterior] = useState<string | null>(null);
  // const [AIechogenicity, setAIechogenicity] = useState<string | null>(null);
  // // const [AIhalo, setAIhalo] = useState<string | null>(null);
  // const [AIcalcification, setAIcalcification] = useState<string | null>(null);
  // const [AIsuggestivity, setAIsuggestivity] = useState<string | null>(null);
  // const [AIbirads, setAIbirads] = useState<string | null>(null);
  const handleAIDescription = () => {
    CalculateAIDescription(id.toString(), setDescriptionAI);
  };

  // const handleAIDescription = () => {
  //   if (descriptionAI) {
  //     setAIcalcification(descriptionAI.calcification);
  //     // setAIhalo(descriptionAI.halo);
  //     setAIechogenicity(descriptionAI.echogenicity);
  //     setAImargin(descriptionAI.margin);
  //     setAIorientation(descriptionAI.orientation);
  //     setAIposterior(descriptionAI.posterior);
  //     setAIshape(descriptionAI.shape);
  //     setAIsuggestivity(descriptionAI.suggestivity);
  //     setAIbirads(descriptionAI.birads);
  //   }
  // };

  return (
    <>
      <Center>{full_image && <Image mb={4} src={full_image} />}</Center>
      <Center>{image && <Image mb={4} src={image} />}</Center>
      <a>
        It is not compulsory to select an option for every category
      </a>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={3} spacing={10}>
          <div>
            <DescriptorRadioForm
              heading="Shape"
              descriptors={Shape}
              Value={ShapeValue}
              setValue={setShapeValue}
              AI_descriptor={descriptionAI ? descriptionAI.shape : null}
              panelDescriptor={panelResult ? panelResult.shape : null}
            />
          </div>
          <div>
            <DescriptorRadioForm
              heading="Margin"
              descriptors={Margin}
              Value={MarginValue}
              setValue={setMarginValue}
              AI_descriptor={descriptionAI ? descriptionAI.margin : null}
              panelDescriptor={panelResult ? panelResult.margin : null}
            />
          </div>
          <div>
            <DescriptorRadioForm
              heading="Orientation"
              descriptors={Orientation}
              Value={OrientationValue}
              setValue={setOrientationValue}
              AI_descriptor={descriptionAI ? descriptionAI.orientation : null}
              panelDescriptor={panelResult ? panelResult.orientation : null}
            />
          </div>
          <div>
            <DescriptorRadioForm
              heading="Echogenicity"
              descriptors={Echogenicity}
              Value={EchogenicityValue}
              setValue={setEchogenicityValue}
              AI_descriptor={descriptionAI ? descriptionAI.echogenicity : null}
              panelDescriptor={panelResult ? panelResult.echogenicity : null}
            />
          </div>
          <div>
            <DescriptorRadioForm
              heading="Posterior"
              descriptors={Posterior}
              Value={PosteriorValue}
              setValue={setPosteriorValue}
              AI_descriptor={descriptionAI ? descriptionAI.posterior : null}
              panelDescriptor={panelResult ? panelResult.posterior : null}
            />
          </div>
          {/* <div>
            <DescriptorRadioForm
              heading="Echogenic Halo"
              descriptors={EchogenicHalo}
              Value={EchogenicHaloValue}
              setValue={setEchogenicHaloValue}
              AI_descriptor={AIhalo}
              panelDescriptor={panelResult? panelResult.halo: null}
            />
          </div> */}
          <div>
            <DescriptorRadioForm
              heading="Calcifications"
              descriptors={Calcification}
              Value={CalcificationValue}
              setValue={setCalcificationValue}
              AI_descriptor={descriptionAI ? descriptionAI.calcification : null}
              panelDescriptor={panelResult ? panelResult.calcification : null}
            />
          </div>
          <div>
            <DescriptorRadioForm
              heading="Special cases"
              descriptors={Suggestivity}
              Value={SuggestivityValue}
              setValue={setSuggestivityValue}
              AI_descriptor={descriptionAI ? descriptionAI.suggestivity : null}
              panelDescriptor={panelResult ? panelResult.suggestivity : null}
            />
          </div>
          <div>
            <DescriptorRadioForm
              heading="BI-RADS"
              descriptors={Birads}
              Value={BiradsValue}
              setValue={setBiradsValue}
              AI_descriptor={descriptionAI ? descriptionAI.birads : null}
              panelDescriptor={panelResult ? panelResult.birads : null}
            />
          </div>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={4}
          >
            <a>
              Make sure you have correctly selected all the descriptors. Once
              you have submitted your answer, it can not be changed.
            </a>
            {username == "TestUser" && (
              <a className="text-danger">
                As a test user the description will not be saved, but you can
                click the Submit button to enable the AI and Experts buttons
              </a>
            )}
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isDisabled={isDescribed}
            >
              Submit
            </Button>
            {isDescribed && (
              <Box mt={2} color="green">
                <a> The description has been saved</a>
              </Box>
            )}
          </Box>
        </SimpleGrid>
      </form>
      <Box display="flex" justifyContent="space-around" mb={4} mt={4}>
        <Button
          onClick={handleAIDescription}
          isDisabled={!isDescribed}
          id="normalbutton"
        >
          AI description
        </Button>
        <Button
          onClick={handleExpertPanel}
          isDisabled={!isDescribed}
          id="normalbutton"
        >
          Experts
        </Button>
      </Box>
      {descriptionAI && <a className="text-danger">Unfortunately, the AI was not trained with enough data to give all the descriptors. Your work helps us in this matter</a>}
      <Center>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={handleOtherTumour}
          id={"normalbutton"}
        >
          Describe other tumours
        </Button>
      </Center>{" "}
    </>
  );
};

export default DescribeForm;
