import { Description } from "../../Description/descriptionHooks/DescriptionInfo";

export interface Nodule {
    id: string;
    name: string;
    image: string;
    full_image: string;
    new: string | null;
    numDescriptions: number;
    numNodules: number | null;
    numNodules2Times: number | null;
    numNodulesDescribed:number | null;
    descriptions?:Description[] | null;
    public_image_url:string | null;
    public_full_image_url:string | null;
    private_image_url:string;
    private_full_image_url:string;
  }
  
  export interface PostQuery {
    page: number;
    pageSize: number;
    findName?: string | null;
    findTimesDescribed?: string | null;
    findYourData?: boolean | null;
  }