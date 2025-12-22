import React, { FormEvent, useRef, useState} from "react";
import {Correlation} from "../correlationHooks/CorrelationInfo";
import { Alert, Button, FormLabel, Input, Select } from "@chakra-ui/react";
import getIntercorrelation from "../correlationHooks/getIntercorrelation";
import usePhysicist from "../correlationHooks/usePhysicist";

interface Props {
  onCalculate: (physician: string, correlation: Correlation, numcorrelation: Correlation) => void;
}
const CalculateIntercorrelation = ({ onCalculate }: Props) => {
  const { data: physicists, error, isLoading } = usePhysicist();

  const physicistRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (physicistRef.current) {
      const physician = physicistRef.current.value;
      getIntercorrelation(physician).then(({ correlation, num_descriptor, error }) => {
        if (error) {
          setErrorMessage(error);
        } else {
          console.log(correlation);
          onCalculate(physician, correlation, num_descriptor);
          setErrorMessage(null);  // Clear error message on successful calculation
        }
      });
    }
  };
  return (
    <>
      <div className="mb-3">
        <FormLabel htmlFor="physicist" className="form-label">
          Search for an expert by its username and check your agreement in Cohen's kappa
        </FormLabel>
        <Input
          ref={physicistRef}
          id="physicist"
          type="text"
          className="form-control"
        />
        {/* <Select
          ref={physicistref}
          // onChange={(event) => {
          //   timesDesc = event.currentTarget.value;
          // }}
        >
          <option>all</option>
          <option value="0">0 times</option>
          <option value="1">1 time</option>
          <option value="2">2 or more times</option>
        </Select> */}
        <Button mt={3} onClick={handleSubmit} id={"normalbutton"}>Calculate intercorrelation</Button>
        {errorMessage && <Alert status="error" mt={3}>{errorMessage}</Alert>}
      </div>
    </>
  );
};

export default CalculateIntercorrelation;
