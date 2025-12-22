import axios from "../../libs/axios";
import { Description, Panel } from "./DescriptionInfo";

const CalculateAIDescription = (
  nodule_id: string | undefined,
  setDescriptionAI: React.Dispatch<React.SetStateAction<Panel | undefined>>
) => {
  axios
    .post<Panel | undefined>("/api/nodules/" + nodule_id + "/AIDescription")
    .then((res) => setDescriptionAI(res.data));
};

export default CalculateAIDescription;
