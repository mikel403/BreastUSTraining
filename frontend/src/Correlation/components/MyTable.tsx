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
  const parenthesisWrap = (wrap: String | number | undefined) => {
    if (wrap) {
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
                {intracorrelation?.[column as keyof Correlation]}{" "}
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
                {fleiss?.[column as keyof Correlation]}{" "}
                {parenthesisWrap(
                  numFleiss?.[column as keyof Correlation]
                )}
              </Th>
            ))}
          </Tr>
          {intercorrelations.map(
            ({ physician, correlation, numcorrelation }, index) => (
              <Tr key={index}>
                <Th><TranslationText text={"Intercorrelation"} /> {parenthesisWrap(physician)}</Th>
                {columns.map((column) => (
                  <Th key={column}>
                    {correlation[column as keyof Correlation]}{" "}
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
