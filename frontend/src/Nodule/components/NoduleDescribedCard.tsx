import { Nodule } from "../noduleHooks/NoduleInfo";
import { Badge, Box, Card, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  nodule: Nodule;
}

const NoduleDescribedCard = ({ nodule }: Props) => {
  const navigate = useNavigate();
  // const {
  //   data: descriptions,
  //   error,
  //   isLoading,
  // } = useDescription(nodule.id);
  let color = "#cddbb8";
  if (nodule.numDescriptions == 1) {
    color = "#d4d6eb";
  } else if (nodule.numDescriptions >= 2) {
    color = "#efdbdf";
  }
  let biradsString=""
  if (nodule.descriptions?.length == 1) {
    biradsString = "BIRADS: "+nodule.descriptions[0].birads;
  } else {
    let biradsArray = nodule.descriptions?.map(
      (description) => description.birads
    );
    biradsString = "BIRADS: [" + biradsArray?.join(", ") + "]";
  }
  return (
    <Card
      className="card"
      onClick={() =>
        navigate("/breastultrasound/described-nodules/" + nodule.name, {
          state: { nodule: nodule },
        })
      }
    >
      <Image boxSize="120px" src={nodule.image} />
      <Text>{nodule.name}</Text>
      <Text>{biradsString}</Text>
      {/* <Box>
      
      </Box> */}
      <Badge bg={color}> Times described {nodule.numDescriptions}</Badge>
    </Card>
  );
};

export default NoduleDescribedCard;
