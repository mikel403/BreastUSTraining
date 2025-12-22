import useNodules from "../noduleHooks/useNodules";
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import useAuthStore from "../../store/store";
import { FormEvent, useRef, useState } from "react";
import ToDescribeNodulesList from "./ToDescribeNodulesList";
import DescribedNodulesList from "./DescribedNodulesList";
import { PostQuery } from "../noduleHooks/NoduleInfo";

interface Props {
  described: boolean;
}

const NodulesList = ({ described }: Props) => {
  const pageSize = 45;
  const [page, setPage] = useState(1);
  const [randomTumour, setRandomTumour] = useState(false);
  const [totalTumors, setTotalTumors] = useState(0);
  const nameref = useRef<HTMLInputElement>(null);
  const timesDescribedref = useRef<HTMLSelectElement>(null);
  const yourDataref = useRef<HTMLInputElement>(null);

  const { username } = useAuthStore();
  const [findName, setFindName] = useState<string | null | undefined>(
    undefined
  );
  const [findTimesDescribed, setFindTimesDescribed] = useState<
    string | undefined
  >(undefined);
  const [findYourData, setFindYourData] = useState<boolean | undefined>(
    undefined
  );

  const query: PostQuery = {
    page,
    pageSize,
    findName,
    findTimesDescribed,
    findYourData,
  };
  const handleSubmit = (event: FormEvent) => {
    {
      event.preventDefault();
      setPage(1);
      setFindName(nameref.current?.value);
      setFindTimesDescribed(timesDescribedref.current?.value);
      setFindYourData(yourDataref.current?.checked);
    }
  };
  const handleRandomTumour = () => {
    setRandomTumour(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {!described && (
          <p>
            These are the nodules you can describe. You can apply a filter to
            find nodules by name, number of times you have described them, or to get the
            nodules you have uploaded. Select a nodule and click on it to start describing it. Remember that you can describe a nodule more than
            once.
          </p>
        )}
        {described && (
          <p>
            These are all the nodules you have described so far. The BI-RADS you
            gave for each nodule is shown. You can select one to see your
            descriptions.
          </p>
        )}
        <Box>
          <Input
            ref={nameref}
            type="text"
            placeholder="Find nodule by name"
            // onChange={(event) => {
            //   name = event.currentTarget.value;
            // }}
          ></Input>
          <FormLabel mt={3}>Times described</FormLabel>
          <Select
            ref={timesDescribedref}
            // onChange={(event) => {
            //   timesDesc = event.currentTarget.value;
            // }}
          >
            <option>all</option>
            <option value="0">never</option>
            <option value="1">one time</option>
            <option value="2">several times</option>
          </Select>
          <Checkbox
            mt={3}
            ref={yourDataref}
            // onChange={(event) => {
            //   yourData = event.target.checked;
            // }}
          >
            Show only the images you uploaded{" "}
          </Checkbox>
        </Box>
        <Box mt={3} mb={3} display="flex" justifyContent="space-between">
          <Button id={"normalbutton"} type="submit">
            {" "}
            Search
          </Button>
          <Button id={"normalbutton"} onClick={handleRandomTumour}>
            {" "}
            Describe a random tumour
          </Button>
        </Box>
      </form>
      {!described && (
        <ToDescribeNodulesList
          username={username}
          query={query}
          random={randomTumour}
          setTotalTumors={setTotalTumors}
        />
      )}
      {described && (
        <DescribedNodulesList
          username={username}
          query={query}
          setTotalTumors={setTotalTumors}
        />
      )}

      {/* <Button onClick={}>Next</Button> */}
      <Box display="flex" justifyContent="space-between">
        <Button
          mt={4}
          colorScheme="teal"
          isDisabled={page === 1}
          onClick={() => setPage(page - 1)}
          id={"normalbutton"}
        >
          Previous
        </Button>
        <Center>
          <strong>
            showing from {1 + page * pageSize - pageSize} until{" "}
            {Math.min(page * pageSize, totalTumors)}
          </strong>
        </Center>
        <Button
          mt={4}
          colorScheme="teal"
          isDisabled={totalTumors <= page * pageSize}
          onClick={() => setPage(page + 1)}
          id={"normalbutton"}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default NodulesList;
