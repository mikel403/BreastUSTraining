import { Nodule } from "../noduleHooks/NoduleInfo";
import setNodule from "../noduleHooks/setNodule";

const CreateNodule = (
  image: File,
  isPublic: Boolean,
  isResearch: Boolean,
  isDeclaration: Boolean,
  imageName: string,
  returnNodule?: React.Dispatch<React.SetStateAction<Nodule | undefined>>,
  setCropNodule?: (nodule: Nodule) => void,
) => {
  const form_data = new FormData();
  form_data.append("image", image, image.name);
  form_data.append("name", imageName);
  form_data.append("public",String(isPublic));
  form_data.append("research",String(isResearch));
  form_data.append("declaration",String(isDeclaration));
  setNodule(form_data, returnNodule, setCropNodule);
};
export default CreateNodule;
