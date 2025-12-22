import { useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";

interface Physicist{
  username: string,
}

const usePhysicist = () => {
    const fetchPhysicist = () =>
      axios
        .get<Physicist[]>(
          "/api/physicists"
        )
        .then((res) => res.data);
  
    // return AIDescription(nodule_id);
    return useQuery<Physicist[], Error>({
      queryKey: ["physicists"],
      queryFn: fetchPhysicist,
    });
  };

  export default usePhysicist;