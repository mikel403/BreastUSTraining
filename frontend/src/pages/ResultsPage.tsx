import { useState } from "react";
import CalculateIntercorrelation from "../Correlation/components/CalculateIntercorrelation";
import MyTable from "../Correlation/components/MyTable";
import { Correlation, PhysicianCorrelation } from "../Correlation/correlationHooks/CorrelationInfo";
import CalculateIntracorrelation from "../Correlation/components/CalculateIntracorrelation";
import CalculateStatistics from "../Correlation/components/CalculateStatistics";

const ResultsPage = () => {
  const [intercorrelations, setIntercorrelations] = useState<PhysicianCorrelation[]>([]);
  const [intracorrelation, setIntracorrelation] = useState<Correlation>();
  const [numIntracorrelation, setNumIntracorrelation] = useState<Correlation>();
  const handleAddIntercorrelation = (physician: string, correlation: Correlation, numcorrelation: Correlation) => {
    setIntercorrelations((prev) => [...prev, { physician, correlation, numcorrelation }]);
    
  };

  return (
    <>
      <CalculateIntercorrelation
        onCalculate={(physician, correlation, numcorrelation) => handleAddIntercorrelation(physician, correlation, numcorrelation)}
      />

      <CalculateIntracorrelation
        setIntracorrelation={setIntracorrelation}
        setNumIntracorrelation={setNumIntracorrelation}
      />

      <MyTable
        intercorrelations={intercorrelations}
        intracorrelation={intracorrelation}
        numIntracorrelation={numIntracorrelation}
      />
      <div>
        Explain my BI-RADS classification based on my descriptions. Each table
        and graph corresponds to a descriptor
      </div>

      <CalculateStatistics></CalculateStatistics>
    </>
  );
};

export default ResultsPage;
