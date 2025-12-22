import React, { FormEvent} from "react";
import { Correlation} from "../correlationHooks/CorrelationInfo";
import { Box, Button} from "@chakra-ui/react";
import getIntracorrelation from "../correlationHooks/getIntracorrelation";


interface Props {
  setIntracorrelation: React.Dispatch<
    React.SetStateAction<Correlation | undefined>
  >;
  setNumIntracorrelation: React.Dispatch<
    React.SetStateAction<Correlation | undefined>
  >;
}
const CalculateIntracorrelation = ({ setIntracorrelation,setNumIntracorrelation }: Props) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getIntracorrelation(setIntracorrelation,setNumIntracorrelation);
  };
  return (
    <>
      <Box className="mb-3">
        <p>Calculate your intracorrelation. The agreement you have with yourself when describing the same tumour after some time</p>
        <Button onClick={handleSubmit} id={"normalbutton"}>Calculate intracorrelation</Button>
      </Box>
    </>
  );
};

export default CalculateIntracorrelation;
