import { useState } from "react";
import CalculateIntercorrelation from "../Correlation/components/CalculateIntercorrelation";
import MyTable from "../Correlation/components/MyTable";
import {
  Correlation,
  PhysicianCorrelation,
} from "../Correlation/correlationHooks/CorrelationInfo";
import CalculateIntracorrelation from "../Correlation/components/CalculateIntracorrelation";
import CalculateStatistics from "../Correlation/components/CalculateStatistics";
import CalculateFleiss from "../Correlation/components/CalculateFleiss";

const ResultsPage = () => {
  const [intercorrelations, setIntercorrelations] = useState<
    PhysicianCorrelation[]
  >([]);
  const [intracorrelation, setIntracorrelation] = useState<Correlation>();
  const [numIntracorrelation, setNumIntracorrelation] = useState<Correlation>();
  const [fleiss, setFleiss] = useState<Correlation>();
  const [numFleiss, setNumFleiss] = useState<Correlation>();
  const handleAddIntercorrelation = (
    physician: string,
    correlation: Correlation,
    numcorrelation: Correlation,
  ) => {
    setIntercorrelations((prev) => [
      ...prev,
      { physician, correlation, numcorrelation },
    ]);
  };

  return (
    <>
      <h1>Agreement analysis of your descriptions</h1>
      <div className="mb-3">
        In this section, you can evaluate the agreement of your tumour
        descriptions with other radiologists and with yourself over time. Use
        the options below to calculate interobserver agreement (Cohen’s kappa),
        intraobserver agreement, and your impact on team agreement (Δ Fleiss’
        kappa).
      </div>

      <CalculateIntracorrelation
        setIntracorrelation={setIntracorrelation}
        setNumIntracorrelation={setNumIntracorrelation}
      />

      <CalculateFleiss setFleiss={setFleiss} setNumFleiss={setNumFleiss} />

      <CalculateIntercorrelation
        onCalculate={(physician, correlation, numcorrelation) =>
          handleAddIntercorrelation(physician, correlation, numcorrelation)
        }
      />

      <MyTable
        intercorrelations={intercorrelations}
        intracorrelation={intracorrelation}
        numIntracorrelation={numIntracorrelation}
        fleiss={fleiss}
        numFleiss={numFleiss}
      />

      <h1 className="mt-3">Your Annotation Profile by BI-RADS</h1>
      <div>
        Explore how your tumour annotations are distributed across BI-RADS
        categories, and compare your patterns with the group.
      </div>
      <CalculateStatistics></CalculateStatistics>
    </>
  );
};

export default ResultsPage;
