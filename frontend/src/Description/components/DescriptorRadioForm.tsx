import { useState } from "react";
import ProgressBar from "./ProgressBar";

interface Props {
  heading: string;
  descriptors: string[];
  AI_descriptor: any;
  panelDescriptor: any;
  radiologistDescriptor: any;
  Value: string | null;
  setValue: (Value: string | null) => void;
}
const DescribeForm = ({
  heading,
  descriptors,
  AI_descriptor,
  panelDescriptor,
  radiologistDescriptor,
  Value,
  setValue,
}: Props) => {
  const onClick = (event: any) => {
    Value === event.target.value
      ? setValue(null)
      : setValue(event.target.value);
  };

  let max = 0;
  for (const carac in panelDescriptor) {
    if (carac === "total") {
      continue;
    }
    if (panelDescriptor[carac] > max) {
      max = panelDescriptor[carac];
    }
  }
  let max_rad = 0;
  for (const carac in radiologistDescriptor) {
    if (carac === "total") {
      continue;
    }
    if (radiologistDescriptor[carac] > max_rad) {
      max_rad = radiologistDescriptor[carac];
    }
  }
  let max_ai = 0;
  for (const carac in AI_descriptor) {
    if (AI_descriptor[carac] > max_ai) {
      max_ai = AI_descriptor[carac];
    }
  }
  return (
    <>
      <h3>{heading}</h3>{" "}
      {panelDescriptor && (
        <div style={{ color: "green" }}>
          Number of experts for this descriptor {panelDescriptor.total}{" "}
        </div>
      )}
      {radiologistDescriptor && (
        <a style={{ color: "red" }}>
          Number of times the expert described the nodule{" "}
          {radiologistDescriptor.total}{" "}
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

            {AI_descriptor && AI_descriptor[descriptor] == max_ai && (
              <ProgressBar
                completed={AI_descriptor[descriptor]}
                color={"#7683bd"}
                labelcolor={"white"}
                total={100}
                message={`${(AI_descriptor[descriptor] * 100).toFixed(2)}%`}
              />
            )}
            {AI_descriptor &&
              descriptor in AI_descriptor &&
              AI_descriptor[descriptor] != max_ai && (
                <ProgressBar
                  completed={AI_descriptor[descriptor]}
                  color={"#929acb"}
                  labelcolor={"black"}
                  total={100}
                  message={`${(AI_descriptor[descriptor] * 100).toFixed(2)}%`}
                />
              )}
            {panelDescriptor && panelDescriptor[descriptor] == max && (
              <ProgressBar
                completed={panelDescriptor[descriptor]}
                color={"#427562"}
                labelcolor={"white"}
                total={panelDescriptor["total"]}
                message={`${panelDescriptor[descriptor] * panelDescriptor["total"]} of ${panelDescriptor["total"]}`}
              />
            )}
            {panelDescriptor &&
              descriptor in panelDescriptor &&
              panelDescriptor[descriptor] != max && (
                <ProgressBar
                  completed={panelDescriptor[descriptor]}
                  color={"#86a699"}
                  labelcolor={"black"}
                  total={panelDescriptor["total"]}
                  message={`${panelDescriptor[descriptor] * panelDescriptor["total"]} of ${panelDescriptor["total"]}`}
                />
              )}

            {radiologistDescriptor &&
              radiologistDescriptor[descriptor] === max_rad && (
                <ProgressBar
                  completed={radiologistDescriptor[descriptor]}
                  color={"#c0392b"} // rojo fuerte (radiólogo)
                  labelcolor={"white"}
                  total={radiologistDescriptor["total"]}
                  message={`${Math.round(
                    radiologistDescriptor[descriptor] *
                      radiologistDescriptor["total"],
                  )} of ${radiologistDescriptor["total"]}`}
                />
              )}

            {radiologistDescriptor &&
              descriptor in radiologistDescriptor &&
              radiologistDescriptor[descriptor] !== max_rad && (
                <ProgressBar
                  completed={radiologistDescriptor[descriptor]}
                  color={"#f5b7b1"} // rojo claro (radiólogo)
                  labelcolor={"black"}
                  total={radiologistDescriptor["total"]}
                  message={`${Math.round(
                    radiologistDescriptor[descriptor] *
                      radiologistDescriptor["total"],
                  )} of ${radiologistDescriptor["total"]}`}
                />
              )}
          </label>
        </div>
      ))}
    </>
  );
};

export default DescribeForm;
