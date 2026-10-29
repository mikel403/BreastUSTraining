import { useLocation } from "react-router-dom";
import DescribeForm from "../Description/components/DescribeForm";
import { Nodule } from "../Nodule/noduleHooks/NoduleInfo";
import { baseUrl } from "../libs/url";

const NodulesDescribePage = () => {
  // Hooks must be called on every render, so the location is read before any condition
  const nodule = useLocation().state?.nodule as Nodule | undefined;
  let id = "0";
  let image = "";
  let full_image = "";
  let isPublic = false;
  if (nodule) {
    isPublic = !!nodule.public_image_url;
    id = nodule.id;

    image = nodule.public_image_url
      ? nodule.public_image_url
      : baseUrl + nodule.private_image_url;
    
    full_image = nodule.public_full_image_url
      ? nodule.public_full_image_url
      : baseUrl + nodule.private_full_image_url;
  }
  return <DescribeForm id={id} image={image} full_image={full_image} isPublic={isPublic}/>;
};

export default NodulesDescribePage;
