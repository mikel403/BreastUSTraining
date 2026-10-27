import axios from "../../libs/axios";

const setDescription = (id: string, noduledescription: any) => {
    return axios
      .post("/api/nodules/" + id + "/descriptions/", noduledescription)
      .then((res) => res.data);
  };
  
  export default setDescription;