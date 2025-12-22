import axios from "../../libs/axios";
import {Physician} from "./userInfo"

const setPhysician = (Physician: any) => {
    axios
      .put("/api/physicists/me/", Physician)
      .then((res) => res.data);
  };
  
  export default setPhysician;