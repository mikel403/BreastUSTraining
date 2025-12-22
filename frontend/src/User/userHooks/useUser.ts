
import axios from "../../libs/axios";
import {User} from "./userInfo"
import { useQuery } from "@tanstack/react-query";

  
  const useUser = () => {
      const fetchUser = () =>
        axios
          .get<User>(
            "/auth/users/me"
          )
          .then((res) => res.data);
    
      // return AIDescription(nodule_id);
      return useQuery<User, Error>({
        queryKey: ["Users"],
        queryFn: fetchUser,
      });
    };
  
    export default useUser;