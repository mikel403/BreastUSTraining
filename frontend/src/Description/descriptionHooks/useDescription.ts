import { useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import { Description } from "./DescriptionInfo";

const useDescription = (
    nodule_id: string | undefined,
  ) => {
    const fetchDescription = () =>
      axios
        .get<Description[]>(
          "/api/nodules/" + nodule_id + "/descriptions"
        )
        .then((res) => res.data);
  
    // return AIDescription(nodule_id);
    return useQuery<Description[], Error>({
      queryKey: ["descriptions"],
      queryFn: fetchDescription,
    });
  };

  export default useDescription;