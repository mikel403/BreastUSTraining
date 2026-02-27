import axios from "../../libs/axios";
import { Description, Panel } from "./DescriptionInfo";

const CalculateDescriptionRadiologist = (
  nodule_id: string | undefined,
  physician__username: string,
) => {
  return axios
    .post(
      "/api/nodules/" +
        nodule_id +
        "/" +
        physician__username +
        "/physician_ground_truth",
    )
    .then((res) => {
      console.log(res.data);
      return {
        DescriptionRadiologist: res.data,
        error: res.data.error || null,
      };
    })
    .catch((error) => {
      const detail = error.response.data?.detail;
      if (error.response && error.response.status === 404) {
        console.log(error.response);
        if (detail === "physician_not_found") {
          return {
            DescriptionRadiologist: undefined,
            error: "User not found",
          };
        } else {
          return {
            DescriptionRadiologist: undefined,
            error: "This user has not described this nodule",
          };
        }
      } else {
        return {
          DescriptionRadiologist: undefined,
          error: "An error occurred while fetching the data",
        };
      }
    });
};

export default CalculateDescriptionRadiologist;
