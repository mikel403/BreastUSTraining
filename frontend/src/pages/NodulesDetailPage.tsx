import NodulesDetailList from "../Description/components/NodulesDetailList";
import { useLocation, useParams } from "react-router-dom";
import useDescription from "../Description/descriptionHooks/useDescription";
import { Nodule } from "../Nodule/noduleHooks/NoduleInfo";

const NodulesDetailPage = () => {
  const nodule= useLocation().state.nodule as Nodule;
  const {
    data: descriptions,
    error,
    isLoading,
  } = useDescription(nodule.id);
  
  return <NodulesDetailList descriptions={descriptions!} nodule={nodule}/>;
};

export default NodulesDetailPage;
