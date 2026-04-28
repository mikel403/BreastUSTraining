import axios from "../../libs/axios";
import { Nodule } from "./NoduleInfo";

const setNodule = (
  form_data: FormData,
  returnNodule?: React.Dispatch<React.SetStateAction<Nodule | undefined>>,
  setCropNodule?: (nodule: Nodule) => void,
) => {
  axios.post("api/nodules/", form_data).then((res) => {
    if (returnNodule) returnNodule(res.data);
    if (setCropNodule) setCropNodule(res.data);
  });
};


export default setNodule;