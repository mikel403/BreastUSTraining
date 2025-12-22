import axios from "../../libs/axios";
import { Nodule } from "./NoduleInfo";

const setNodule = (
    form_data: FormData,
    returnNodule?: React.Dispatch<React.SetStateAction<Nodule | undefined>>,
    setCropNodule?:(nodule:Nodule)=>void,
  ) => {
    axios.post("api/nodules/", form_data).then((res) => {
      returnNodule? returnNodule(res.data): res.data;
      setCropNodule? setCropNodule(res.data): res.data;
    });
  };

export default setNodule;