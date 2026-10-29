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
      // The id is part of the key so each nodule has its own cached descriptions
      queryKey: ["descriptions", nodule_id],
      queryFn: fetchDescription,
      enabled: !!nodule_id,
    });
  };

  export default useDescription;