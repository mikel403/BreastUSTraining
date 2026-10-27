import NodulesDetailList from "../Description/components/NodulesDetailList";
import { Navigate, useLocation } from "react-router-dom";
import useDescription from "../Description/descriptionHooks/useDescription";
import { Nodule } from "../Nodule/noduleHooks/NoduleInfo";

const NodulesDetailPage = () => {
  // The nodule comes from the described nodules list; opening the url directly has no state
  const nodule = useLocation().state?.nodule as Nodule | undefined;
  const { data: descriptions } = useDescription(nodule?.id);

  if (!nodule) return <Navigate to="/breastultrasound/described-nodules" replace />;
  return <NodulesDetailList descriptions={descriptions!} nodule={nodule}/>;
};

export default NodulesDetailPage;
