import React, { useRef, useState } from "react";
import axios from "../../libs/axios";
import {
  BiradsPanel,
  Panel,
  Statistics,
} from "../../Description/descriptionHooks/DescriptionInfo";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Alert,
  Box,
  Button,
  Center,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import StatisticsTable from "./StatisticsTable";
import StatisticsGraph from "./StatisticsGraph";

const CalculateStatistics = () => {
  const [data, setData] = useState<Panel>();
  const [biradsData, setBiradsData] = useState<BiradsPanel>();
  const [otherData, setOtherData] = useState<Panel>();
  const [otherBiradsData, setOtherBiradsData] = useState<BiradsPanel>();
  const [physicians, setPhysicians] = useState<number>();
  const [isChartClick, setChartClick] = useState(false);
  const [isTableClick, setTableClick] = useState(false);
  const physicistRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [characNormalize, setCharacNormalize] = useState<boolean>(false);

  const handleSubmit = () => {
    axios
      .post<Statistics>("/api/statistics")
      .then((res) => setData(res.data.statistics));
    setTableClick(!isTableClick);
  };
  const handleCharts = () => {
    axios.post<Statistics>("/api/statistics").then((res) => {
      setData(res.data.statistics);
      setBiradsData(res.data.statistics_birads);
    });
    axios.post<Statistics>("/api/" + "Overall" + "/statistics").then((res) => {
      setOtherData(res.data.statistics);
      setOtherBiradsData(res.data.statistics_birads);
      setPhysicians(res.data.physicians);
    });
    setChartClick(!isChartClick);
  };
  const handleotherCharts = () => {
    if (physicistRef.current) {
      axios
        .post<Statistics>("/api/" + physicistRef.current.value + "/statistics")
        .then((res) => {
          setOtherData(res.data.statistics);
          setOtherBiradsData(res.data.statistics_birads);
          setPhysicians(res.data.physicians);
        });
    }
  };

  const onClick = (event: any) => {
    if (characNormalize) {
      setCharacNormalize(false);
    } else {
      setCharacNormalize(true);
    }
  };

  return (
    <>
      <Accordion allowToggle onChange={handleSubmit} mt={3} mb={3}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              Statistics: tables
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </AccordionItem>
      </Accordion>
      <p>
        The rows are the characteristics within each descriptor. The columns are
        the BI-RADS malignancy classifications. These tables will help you
        understand the influence of each characteristic in the classification.
        To see this graphically, click on 'Show graphs'
      </p>
      {data &&
        isTableClick &&
        Object.keys(data).map((key) => (
          <StatisticsTable
            descriptor={key}
            data={data[key as keyof typeof data]}
          />
        ))}

      <Accordion allowToggle onChange={handleCharts} mt={3}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              Statistics: graphs
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </AccordionItem>
      </Accordion>
      {data && isChartClick && (
        <Box display={"flex"} justifyContent={"space-between"} mt={4}>
          <Box width={"46%"}>
            <FormLabel htmlFor="physicist" className="form-label">
              The graphs are normalised by dividing by the total number of
              descriptions for each characteristic, i.e. the sum of a line in
              each graph adds up to one. This is useful to easily see the
              evolution of each characteristic in the BI-RADS classification.
              You can change the normalisation to BI-RADS so that the
              characteristics sum to one for each BI-RADS. This is useful to
              understand the importance of each characteristic in a specific
              malignancy
            </FormLabel>
            <div className="form-check">
              <input
                name={"Normalize by characteristic"}
                value={"characNormalize"}
                id={"characNormalize"}
                type="radio"
                className="form-check-input"
                checked={characNormalize}
                onClick={onClick}
                onChange={onClick}
              />
              <label className="form-check-label" htmlFor="characNormalize">
                Characteristic normalization
              </label>
            </div>
            <div className="form-check">
              <input
                name={"Normalize by BI-RADS"}
                value={"biradsNormalize"}
                id={"biradsNormalize"}
                type="radio"
                className="form-check-input"
                checked={!characNormalize}
                onClick={onClick}
                onChange={onClick}
              />
              <label className="form-check-label" htmlFor="biradsNormalize">
                BI-RADS normalization
              </label>
            </div>
          </Box>
          <Box width={"46%"}>
            <FormLabel htmlFor="physicist" className="form-label">
              Compare your graphs with those of other experts. The default is
              Overall, which takes into account all users except yourself
            </FormLabel>
            <Input
              ref={physicistRef}
              defaultValue={"Overall"}
              id="physicist"
              type="text"
              className="form-control"
            />
            <Button mt={3} onClick={handleotherCharts} id={"normalbutton"}>
              Compare
            </Button>
          </Box>
          {/* {errorMessage && (
            <Alert status="error" mt={3}>
              {errorMessage}
            </Alert>
          )} */}
        </Box>
      )}
      {data && isChartClick && otherData && (
        <Box mt={10} display="flex" justifyContent={"space-between"} mb={4}>
          <Box width={"46%"}>
            <Center>
              <h2>Your graphs</h2>
            </Center>
          </Box>
          <Box width={"46%"}>
            <Center>
              <h2>
                Compared with{" "}
                {physicistRef.current ? physicistRef.current.value : "Overall"}
                {physicistRef.current?.value === "Overall"
                  ? ` (experts: ${physicians})`
                  : ""}
              </h2>
            </Center>
          </Box>
        </Box>
      )}
      {data &&
        biradsData &&
        isChartClick &&
        Object.keys(data).map((key) => (
          <Box display="flex" justifyContent={"space-between"} mb={4} key={key}>
            <StatisticsGraph
              descriptor={key}
              data={data[key as keyof typeof data]}
              birads_data={biradsData[key as keyof typeof data]}
              characNormalize={characNormalize}
            />
            {otherData && otherBiradsData && (
              <StatisticsGraph
                descriptor={key}
                data={otherData[key as keyof typeof data]}
                birads_data={otherBiradsData[key as keyof typeof data]}
                characNormalize={characNormalize}
              />
            )}
          </Box>
        ))}
    </>
  );
};

export default CalculateStatistics;
