import { Nodule } from "../noduleHooks/NoduleInfo";
import { Badge, Card, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../libs/url";

interface Props {
  nodule: Nodule;
}

const NoduleCard = ({ nodule }: Props) => {
  const navigate = useNavigate();
  let color = "#cddbb8";
  if (nodule.numDescriptions == 1) {
    color = "#d4d6eb";
  } else if (nodule.numDescriptions >= 2) {
    color = "#efdbdf";
  }
  return (
    <Card className="card"
      onClick={() =>
        navigate("/breastultrasound/nodules/" + nodule.name, { state: { nodule: nodule } })
      }
    >
      <Image boxSize="120px" src={baseUrl + nodule.image} />
      <Text>{nodule.name}</Text>
      <Badge bg={color}>
        {" "}
        Times described {nodule.numDescriptions}
      </Badge>
    </Card>
  );
};

export default NoduleCard;
