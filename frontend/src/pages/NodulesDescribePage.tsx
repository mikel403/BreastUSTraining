import { useLocation } from "react-router-dom";
import DescribeForm from "../Description/components/DescribeForm";
import { Nodule } from "../Nodule/noduleHooks/NoduleInfo";
import { baseUrl } from "../libs/url";

const NodulesDescribePage = () => {
  let id = "0";
  let image = "";
  let full_image = "";
  if (useLocation().state) {
    const nodule = useLocation().state.nodule as Nodule;
    id = nodule.id;
    image = nodule.image;
    full_image = nodule.full_image;
  }
  return <DescribeForm id={id} image={baseUrl + image} full_image={baseUrl+full_image}/>;
};

export default NodulesDescribePage;
