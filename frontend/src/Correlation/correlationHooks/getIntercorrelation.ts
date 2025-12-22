import axios from "../../libs/axios";
import { Correlation } from "./CorrelationInfo";

const getIntercorrelation = (physician: string) => {
  return axios
    .post(`/api/${physician}/intercorrelation`)
    .then((res) => {
      return {
        correlation: res.data.correlation || null,
        num_descriptor: res.data.num_descriptor || null,
        error: res.data.error || null,
      };
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return {
          correlation: null,
          num_descriptor: null,
          error: 'Physician not found',
        };
      } else {
        return {
          correlation: null,
          num_descriptor: null,
          error: 'An error occurred while fetching the data',
        };
      }
    });
};

export default getIntercorrelation;
