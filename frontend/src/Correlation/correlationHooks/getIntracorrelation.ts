import axios from "../../libs/axios";
import { Correlation } from "./CorrelationInfo";


const getIntracorrelation = (
    setIntracorrelation: React.Dispatch<
      React.SetStateAction<Correlation | undefined>>,
    setNumIntracorrelation: React.Dispatch<
      React.SetStateAction<Correlation | undefined>>
    
  ) => {
    axios.post("/api/intracorrelation").then((res) => {
      console.log(res.data);
      setIntracorrelation(res.data["correlation"]);
      setNumIntracorrelation(res.data["num_descriptor"]);
    });
  };

export default getIntracorrelation;