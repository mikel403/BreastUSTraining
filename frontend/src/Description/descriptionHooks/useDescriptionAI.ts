import axios from "../../libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Description } from "./DescriptionInfo";

const useDescriptionAI = (
  nodule_id: string | undefined,
  AI_name: string
) => {
  const fetchDescription = () =>
    axios
      .get<Description>(
        "/api/" + AI_name + "/nodules/" + nodule_id + "/descriptions"
      )
      .then((res) => res.data);

  // return AIDescription(nodule_id);

  return useQuery<Description, Error>({
    queryKey: ["descriptions"],
    queryFn: fetchDescription,
  });
};

export default useDescriptionAI;
