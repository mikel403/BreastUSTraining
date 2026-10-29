import TranslationText from "../../TranslationText";
import React, { FormEvent, useRef, useState} from "react";
import {Correlation} from "../correlationHooks/CorrelationInfo";
import { Alert, Button, FormLabel, Input, Select } from "@chakra-ui/react";
import getIntercorrelation from "../correlationHooks/getIntercorrelation";
import usePhysicians from "../correlationHooks/usePhysicians";

interface Props {
  onCalculate: (physician: string, correlation: Correlation, numcorrelation: Correlation) => void;
}
const CalculateIntercorrelation = ({ onCalculate }: Props) => {
  const { data: physicians, error, isLoading } = usePhysicians();

  const physicianRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (physicianRef.current) {
      const physician = physicianRef.current.value;
      getIntercorrelation(physician).then(({ correlation, num_descriptor, error }) => {
        if (error) {
          setErrorMessage(error);
        } else {
          onCalculate(physician, correlation, num_descriptor);
          setErrorMessage(null);  // Clear error message on successful calculation
        }
      });
    }
  };
  return (
    <>
      <div className="mb-3">
        <FormLabel htmlFor="physician" className="form-label">
          <TranslationText text={"Search for a radiologist and evaluate your agreement using Cohen's kappa."} /> </FormLabel>
        <Input
          ref={physicianRef}
          id="physician"
          type="text"
          className="form-control"
        />
        {/* <Select
          ref={physicianref}
          // onChange={(event) => {
          //   timesDesc = event.currentTarget.value;
          // }}
        >
          <option>all</option>
          <option value="0">0 times</option>
          <option value="1">1 time</option>
          <option value="2">2 or more times</option>
        </Select> */}
        <Button mt={3} onClick={handleSubmit} id={"normalbutton"}><TranslationText text={"Compare Agreement with Another Radiologist (Cohen’s κ)"} /></Button>
        {errorMessage && <Alert status="error" mt={3}><TranslationText text={errorMessage} /></Alert>}
      </div>
    </>
  );
};

export default CalculateIntercorrelation;
