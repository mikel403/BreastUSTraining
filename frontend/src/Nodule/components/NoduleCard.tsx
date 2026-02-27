import { Nodule } from "../noduleHooks/NoduleInfo";
import { Badge, Card, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../libs/url";
import SecureImage from "../../api/SecureImage";

interface Props {
  nodule: Nodule;
}

const NoduleCard = ({ nodule }: Props) => {
  const navigate = useNavigate();
  
  const thumb = nodule.public_image_url;
  let color = "#cddbb8";
  if (nodule.numDescriptions == 1) {
    color = "#d4d6eb";
  } else if (nodule.numDescriptions >= 2) {
    color = "#efdbdf";
  }
  return (
    <Card
      className="card"
      onClick={() =>
        navigate("/breastultrasound/nodules/" + nodule.name, {
          state: { nodule: nodule },
        })
      }
    >
      {thumb ? (
        <Image boxSize="120px" src={thumb} />
      ) : (
        <SecureImage boxSize="120px" url={nodule.private_image_url} />
      )}
      
      <Text>{nodule.name}</Text>
      <Badge bg={color}> Times described {nodule.numDescriptions}</Badge>
    </Card>
  );
};

export default NoduleCard;
