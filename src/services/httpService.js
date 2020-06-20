import axios from "axios";
import {toast} from "react-toastify";
import logger from "./logService";


axios.interceptors.response.use(null, error => {
    const expectedError = error.responce && error.responce.status >= 400 && error.responce.status < 500;
    if(!expectedError){
      logger.log(error);
      toast.error("An unexpected error occurs");
    }
    return Promise.reject(error);
});

function setJwt(jwt){
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default{
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    setJwt
}