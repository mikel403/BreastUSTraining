import axios from "../../libs/axios";
import { Correlation } from "./CorrelationInfo";


const getFleiss = (
    setFleiss: React.Dispatch<
      React.SetStateAction<Correlation | undefined>>,
    setNumFleiss: React.Dispatch<
      React.SetStateAction<Correlation | undefined>>
    
  ) => {
    axios.post("/api/intercorrelation_Fleiss").then((res) => {
      console.log(res.data);
      setFleiss(res.data["correlation"]);
      setNumFleiss(res.data["num_descriptor"]);
    });
  };

export default getFleiss;