import axios from "../../libs/axios";
import { Description, Panel } from "./DescriptionInfo";

const CalculateExpertPanelDescription = (
  nodule_id: string | undefined,
  setPanelResult: React.Dispatch<React.SetStateAction<Panel | undefined>>
) => {
  axios
    .post<Panel | undefined>("/api/nodules/" + nodule_id + "/expert-panel")
    .then((res) => setPanelResult(res.data));
};

export default CalculateExpertPanelDescription;
