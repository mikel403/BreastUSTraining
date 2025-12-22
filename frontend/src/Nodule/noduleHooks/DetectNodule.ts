import { Crop } from "react-image-crop";
import axios from "../../libs/axios";

const DetectNodule =(image:FormData,setCrops:React.Dispatch<React.SetStateAction<Crop[]>>)=>{
    axios.post("api/AIDetection",image).then((res)=>setCrops(res.data))
  };

export default DetectNodule;