import  { Description} from "../descriptionHooks/DescriptionInfo";
import { Nodule } from "../../Nodule/noduleHooks/NoduleInfo";
import {Image} from "@chakra-ui/react"
import { baseUrl } from "../../libs/url";

interface Props{
  descriptions: Description[],
  nodule: Nodule,
}
const DescriptionList = ({descriptions,nodule}:Props) => {
  return (
    <>
    {nodule.image && <Image src={baseUrl+nodule.image} />}
    <ul className="list-group">
      {descriptions?.map((description) => (
        <li key={description.id} className="list-group-item">
          {description.shape}
        </li>
      ))}
    </ul>
    </>
  );
};

export default DescriptionList;
