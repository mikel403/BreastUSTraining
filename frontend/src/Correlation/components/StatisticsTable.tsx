import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react";

interface Props {
  descriptor: string;
  data: any;
}

// Create your React component
const StatisticsTable = ({ descriptor, data }: Props) => {
  const columns = [descriptor, "2", "3", "4A", "4B", "4C", "5", "Total"];

  return (
    <>
      
      <ChakraProvider>
        <Table variant="simple">
          <TableCaption placement="top">
            <b>Table of {descriptor} grouped by BI-RADS </b>
          </TableCaption>
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th>
                  <b>{column}</b>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(data).map((descriptor) => (
              <Tr>
                <Th key={"descriptor"}>{descriptor}</Th>
                {Object.keys(data[descriptor]).map((birads) => (
                  <Th key={birads}> {data[descriptor][birads]}</Th>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ChakraProvider>
    </>
  );
};

export default StatisticsTable;
