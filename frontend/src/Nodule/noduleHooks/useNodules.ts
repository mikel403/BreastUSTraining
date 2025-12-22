import axios from "../../libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Nodule, PostQuery } from "./NoduleInfo";



const useNodules = (query: PostQuery) => {
  const fetchNodules = () =>
    axios
      .get<Nodule[]>("/api/nodules/", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
          _name: query.findName,
          _timesDescribed: query.findTimesDescribed,
          _yourData: query.findYourData,
        },
      })
      .then((res) => res.data);
  return useQuery<Nodule[], Error>({
    queryKey: ["nodules", query],
    queryFn: fetchNodules,
  });
};




export default useNodules;
