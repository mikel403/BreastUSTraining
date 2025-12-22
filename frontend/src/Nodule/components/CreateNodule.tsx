import { Nodule } from "../noduleHooks/NoduleInfo";
import setNodule from "../noduleHooks/setNodule";


const CreateNodule = (image: File, returnNodule?:React.Dispatch<React.SetStateAction<Nodule | undefined>>,setCropNodule?:(nodule: Nodule) => void) => {
  const form_data = new FormData();
  form_data.append("image", image, image.name);
  const name = "your_" + image.name.slice(0, -4);
  form_data.append("name", name);
  returnNodule? setNodule(form_data,returnNodule):setNodule(form_data);
  setCropNodule? setNodule(form_data,undefined,setCropNodule):setNodule(form_data);
};
export default CreateNodule;