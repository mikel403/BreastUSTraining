import TranslationText from "../../TranslationText";
import { useRef, useState } from "react";
import axios from "../../libs/axios";
import i18n from "../../i18n";
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
      setErrorMessage(null);
      axios
        .post<Statistics>("/api/" + physicistRef.current.value + "/statistics")
        .then((res) => {
          setOtherData(res.data.statistics);
          setOtherBiradsData(res.data.statistics_birads);
          setPhysicians(res.data.physicians);
        })
        .catch((err) => {
          // Only radiologists (or "Overall") can be compared
          setErrorMessage(
            i18n.t(
              err.response?.status === 404
                ? "Radiologist not found"
                : "It is not possible to connect to the server, try again later",
            ),
          );
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
      <Accordion allowToggle onChange={handleCharts} mt={3}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              <TranslationText text={"Statistics: graphs"} /> </Box>
            <AccordionIcon />
          </AccordionButton>
        </AccordionItem>
      </Accordion>
      {data && isChartClick && (
        <Box display={"flex"} justifyContent={"space-between"} mt={4}>
          <Box width={"46%"}>
            <FormLabel htmlFor="physicist" className="form-label">
              <TranslationText text={"The graphs display the distribution of annotation descriptors (including BI-RADS descriptors and related tumour features) across BI-RADS assessment categories. Select a normalisation method to interpret the patterns:"} /> </FormLabel>
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
                <TranslationText text={"Descriptor normalisation: shows how BI-RADS varies for each descriptor category. Each line sums to 100%."} /> </label>
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
                <TranslationText text={"BI-RADS normalisation: shows which descriptor categories are most common within each BI-RADS group. Each BI-RADS column sums to 100%."} /> </label>
            </div>
          </Box>
          <Box width={"46%"}>
            <FormLabel htmlFor="physicist" className="form-label">
              <TranslationText text={"Compare your patterns with those of other radiologists. “Overall” includes all users except yourself."} /> </FormLabel>
            <Input
              ref={physicistRef}
              defaultValue={"Overall"}
              id="physicist"
              type="text"
              className="form-control"
            />
            <Button mt={3} onClick={handleotherCharts} id={"normalbutton"}>
              <TranslationText text={"Compare"} /> </Button>
          </Box>
          {errorMessage && (
            <Alert status="error" mt={3}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      )}
      {data && isChartClick && otherData && (
        <Box mt={10} display="flex" justifyContent={"space-between"} mb={4}>
          <Box width={"46%"}>
            <Center>
              <h2><TranslationText text={"Your graphs"} /></h2>
            </Center>
          </Box>
          <Box width={"46%"}>
            <Center>
              <h2>
                <TranslationText text={"Compared with"} />{" "}
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

      <Accordion allowToggle onChange={handleSubmit} mt={3} mb={3}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              <TranslationText text={"Statistics: tables"} /> </Box>
            <AccordionIcon />
          </AccordionButton>
        </AccordionItem>
      </Accordion>

      {data && isTableClick && (
        <>
          <p>
            <TranslationText text={"The rows represent the categories within each descriptor, and the columns represent the BI-RADS classifications. These tables show how descriptor patterns are distributed across BI-RADS categories."} /> </p>
          {Object.keys(data).map((key) => (
            <StatisticsTable
              key={key}
              descriptor={key}
              data={data[key as keyof typeof data]}
            />
          ))}
        </>
      )}
    </>
  );
};

export default CalculateStatistics;
