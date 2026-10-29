import { useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";

interface Physician{
  username: string,
}

const usePhysicians = () => {
    const fetchPhysicians = () =>
      axios
        .get<Physician[]>(
          "/api/physicians"
        )
        .then((res) => res.data);
  
    // return AIDescription(nodule_id);
    return useQuery<Physician[], Error>({
      queryKey: ["physicians"],
      queryFn: fetchPhysicians,
    });
  };

  export default usePhysicians;