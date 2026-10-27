import TranslationText from "../../TranslationText";
import { Table, Thead, Tbody, Tr, Th, TableCaption } from "@chakra-ui/react";
import {
  Correlation,
  PhysicianCorrelation,
} from "../correlationHooks/CorrelationInfo";

// Define the columns for your table
const columns = [
  "shape",
  "margin",
  "orientation",
  "echogenicity",
  "posterior",
  "calcification",
  "special cases",
  "birads",
];

interface Props {
  intracorrelation: Correlation | undefined;
  intercorrelations: PhysicianCorrelation[];
  numIntracorrelation: Correlation | undefined;
  fleiss: Correlation | undefined;
  numFleiss: Correlation | undefined;
}

// Create your React component
const MyTable = ({
  intercorrelations,
  intracorrelation,
  numIntracorrelation,
  fleiss,
  numFleiss,
}: Props) => {
  // Fleiss results use the backend field name for "special cases"
  const fleissKey = (column: string) =>
    (column === "special cases" ? "suggestivity" : column) as keyof Correlation;
  // A kappa computed over 0 instances is not defined, so it is not shown as 0
  const cellValue = (value: number | undefined, num: number | undefined) =>
    num === 0 ? "–" : value;
  const parenthesisWrap = (wrap: String | number | undefined) => {
    if (wrap || wrap === 0) {
      return "(" + wrap + ")";
    } else {
      return "";
    }
  };
  return (
    <>
      <p>
        <TranslationText text={"In brackets is the number of instances for which the kappa was calculated. Only nodes for which both raters (experts) give a descriptor are considered"} /> </p>
      <Table variant="simple" mb={3}>
        <TableCaption placement="top">
          <b><TranslationText text={"Correlation"} /></b>
        </TableCaption>
        <Thead>
          <Tr>
            <Th></Th>
            {columns.map((column) => (
              <Th key={column}>
                <b><TranslationText text={column} /></b>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th><TranslationText text={"Intracorrelation"} /></Th>
            {columns.map((column) => (
              <Th key={column}>
                {cellValue(
                  intracorrelation?.[column as keyof Correlation],
                  numIntracorrelation?.[column as keyof Correlation]
                )}{" "}
                {parenthesisWrap(
                  numIntracorrelation?.[column as keyof Correlation]
                )}
              </Th>
            ))}
          </Tr>
          <Tr>
            <Th><TranslationText text={"Fleiss"} /></Th>
            {columns.map((column) => (
              <Th key={column}>
                {cellValue(
                  fleiss?.[fleissKey(column)],
                  numFleiss?.[fleissKey(column)]
                )}{" "}
                {parenthesisWrap(numFleiss?.[fleissKey(column)])}
              </Th>
            ))}
          </Tr>
          {intercorrelations.map(
            ({ physician, correlation, numcorrelation }, index) => (
              <Tr key={index}>
                <Th><TranslationText text={"Intercorrelation"} /> {parenthesisWrap(physician)}</Th>
                {columns.map((column) => (
                  <Th key={column}>
                    {cellValue(
                      correlation[column as keyof Correlation],
                      numcorrelation[column as keyof Correlation]
                    )}{" "}
                    {parenthesisWrap(
                      numcorrelation[column as keyof Correlation]
                    )}
                  </Th>
                ))}
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default MyTable;
