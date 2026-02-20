import React, { FormEvent } from "react";
import { Correlation } from "../correlationHooks/CorrelationInfo";
import { Box, Button } from "@chakra-ui/react";
import getFleiss from "../correlationHooks/getFleiss";

interface Props {
  setFleiss: React.Dispatch<React.SetStateAction<Correlation | undefined>>;
  setNumFleiss: React.Dispatch<React.SetStateAction<Correlation | undefined>>;
}
const CalculateIntracorrelation = ({ setFleiss, setNumFleiss }: Props) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getFleiss(setFleiss, setNumFleiss);
  };
  return (
    <>
      <Box className="mb-3">
        <p>
          Evaluate how your annotations affect the overall agreement of the
          radiologist team. This metric shows the change in team agreement (Δ
          Fleiss’ kappa) when your descriptions are included versus
          excluded.{" "}
        </p>
        <Button onClick={handleSubmit} id={"normalbutton"}>
          Your Impact on Team Agreement (Δ Fleiss’ κ)
        </Button>
      </Box>
    </>
  );
};

export default CalculateIntracorrelation;
