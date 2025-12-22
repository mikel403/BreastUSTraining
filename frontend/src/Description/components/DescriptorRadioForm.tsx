import { useState } from "react";
import ProgressBar from "./ProgressBar";

interface Props {
  heading: string;
  descriptors: string[];
  AI_descriptor: any;
  panelDescriptor: any;
  Value: string | null;
  setValue: (Value: string | null) => void;
}
const DescribeForm = ({
  heading,
  descriptors,
  AI_descriptor,
  panelDescriptor,
  Value,
  setValue,
}: Props) => {
  const onClick = (event: any) => {
    Value === event.target.value
      ? setValue(null)
      : setValue(event.target.value);
  };
  let max=0;
  for (const carac in panelDescriptor) {
    if (carac==="total"){continue}
    if (panelDescriptor[carac]>max){max=panelDescriptor[carac]}
  }
  let max_ai=0;
  for (const carac in AI_descriptor) {
    if (AI_descriptor[carac]>max_ai){max_ai=AI_descriptor[carac]}
  }
  return (
    <>
      <h3>{heading}</h3>{" "}
      {panelDescriptor && (
        <a style={{ color: "green" }}>
          Number of experts for this descriptor {panelDescriptor.total}{" "}
        </a>
      )}
      {descriptors.map((descriptor) => (
        <div key={descriptor} className="form-check">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name={heading}
              value={descriptor}
              id={descriptor}
              checked={Value === descriptor}
              onClick={onClick}
              onChange={onClick}
            />
            {descriptor}
            
            {AI_descriptor && AI_descriptor[descriptor]==max_ai && (
              <ProgressBar completed={AI_descriptor[descriptor] } color={"#7683bd"} labelcolor={"white"} total={100} message={`${(AI_descriptor[descriptor]*100).toFixed(2)}%`}/>
            )}
            {AI_descriptor && (descriptor in AI_descriptor) && AI_descriptor[descriptor]!=max_ai && (
              <ProgressBar completed={AI_descriptor[descriptor] } color={"#929acb"} labelcolor={"black"} total={100} message={`${(AI_descriptor[descriptor]*100).toFixed(2)}%`}/>
            )}
            {panelDescriptor && panelDescriptor[descriptor]==max && (
              <ProgressBar completed={panelDescriptor[descriptor] } color={"#427562"} labelcolor={"white"} total={panelDescriptor["total"]} message={`${panelDescriptor[descriptor]*panelDescriptor["total"]} of ${panelDescriptor["total"]}`}/>
            )}
            {panelDescriptor && (descriptor in panelDescriptor) && panelDescriptor[descriptor]!=max && (
              <ProgressBar completed={panelDescriptor[descriptor] } color={"#86a699"} labelcolor={"black"} total={panelDescriptor["total"]} message={`${panelDescriptor[descriptor]*panelDescriptor["total"]} of ${panelDescriptor["total"]}`}/>
            )}
            
          </label>
        </div>
      ))}
    </>
  );
};

export default DescribeForm;
