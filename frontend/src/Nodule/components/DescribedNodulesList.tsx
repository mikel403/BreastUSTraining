import { Box, Button, Center, SimpleGrid } from "@chakra-ui/react";
import NoduleDescribedCard from "./NoduleDescribedCard";
import { Nodule, PostQuery } from "../noduleHooks/NoduleInfo";
import useNodulesWithDescription from "../noduleHooks/useNodulesWithDescription";
import { useState } from "react";

interface Props {
  username: string;
  query: PostQuery;
  setTotalTumors: React.Dispatch<React.SetStateAction<number>>;
}

const DescribedNodulesList = ({ username, query, setTotalTumors }: Props) => {
  const { data: nodules, error, isLoading } = useNodulesWithDescription(query);
  if (isLoading){
    return <p>Loading images</p>
  }
  if (error){
    return <p>It seems there might be an error. Try to log in again or try later.</p>
  }
  if (!nodules || nodules.length === 0) {
    console.log("no nodules");
    return <h2>There are no nodules</h2>;
  } else {
    const numNodules2Times = nodules[0].numNodules2Times;
    const numNodulesDescribed = nodules[0].numNodulesDescribed;
    const totalTumors=numNodulesDescribed!;
    setTotalTumors(totalTumors);
    return (
      <>
        <h1>
          Number of nodules described with this filter: {numNodulesDescribed}
        </h1>
        <h3>
          Number of nodules described more than one time with this filter:{" "}
          {numNodules2Times}
        </h3>
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
          spacing={10}
        >
          {nodules?.map((nodule) => (
            <NoduleDescribedCard key={nodule.id} nodule={nodule} />
          ))}
        </SimpleGrid>
        
      </>
    );
  }
};

export default DescribedNodulesList;
