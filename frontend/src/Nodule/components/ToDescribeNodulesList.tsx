import { Nodule, PostQuery } from "../noduleHooks/NoduleInfo";
import { Box, Button, Center, SimpleGrid } from "@chakra-ui/react";
import NoduleCard from "./NoduleCard";
import useNodules from "../noduleHooks/useNodules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  username: string;
  query: PostQuery;
  random: boolean;
  setTotalTumors: React.Dispatch<React.SetStateAction<number>>;
}
const ToDescribeNodulesList = ({
  username,
  query,
  random,
  setTotalTumors,
}: Props) => {
  const { data: nodules, error, isLoading } = useNodules(query);
  const navigate = useNavigate();
  if (isLoading) {
    return <p>Loading images</p>;
  }
  if (error) {
    return (
      <p>It seems there might be an error. Try to log in again or try later.</p>
    );
  }
  if (!nodules || nodules.length === 0) {
    return <h2>There are no nodules with the given filter</h2>;
  } else {
    
    if (random) {
      // Selecciona un nódulo aleatorio de la lista 'nodules'
      const randomNodule = nodules[Math.floor(Math.random() * nodules.length)];
      // Redirige a la página del nódulo aleatorio
      navigate("/breastultrasound/nodules/" + randomNodule.name, {
        state: { nodule: randomNodule },
      });
    }
    const numNodules = nodules[0].numNodules;
    const numNodulesDescribed = nodules[0].numNodulesDescribed;
    const totalTumors = numNodules! + numNodulesDescribed!;
    setTotalTumors(totalTumors);
    return (
      <>
        <h2>Number of nodules to describe with this filter: {numNodules}</h2>
        <h3>
          Number of nodules described with this filter: {numNodulesDescribed}
        </h3>
        {/* <h3>Number of nodules described more than one time: {numNodules2times}</h3> */}
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
          spacing={10}
        >
          {nodules?.map((nodule, index) => (
            <NoduleCard key={nodule.id} nodule={nodule} />
          ))}
        </SimpleGrid>
      </>
    );
  }
};

export default ToDescribeNodulesList;
