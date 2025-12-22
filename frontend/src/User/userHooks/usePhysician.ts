import { useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import { Physician } from "./userInfo";


const usePhysician = () => {
    const fetchPhysician = () =>
      axios
        .get<Physician>(
          "/api/physicists/me"
        )
        .then((res) => res.data);
  
    // return AIDescription(nodule_id);
    return useQuery<Physician, Error>({
      queryKey: ["Physicians"],
      queryFn: fetchPhysician,
    });
  };

  export default usePhysician;