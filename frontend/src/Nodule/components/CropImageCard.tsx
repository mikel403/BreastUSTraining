
import { Button, Card, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    croppedImage: string;
}

const CropImageCard = ({ croppedImage }: Props) => {
  // console.log(nodule)
  const [isDeleted,setDeleted]=useState(false);
  if (!isDeleted){
  return (
    <Card>
      <Image boxSize='120px' src={croppedImage} maxW="100%" maxH="200px"/>
      <Button onClick={()=>setDeleted(true)}>Delete crop</Button>
    </Card>
  );
  }
};

export default CropImageCard;
