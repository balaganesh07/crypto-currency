import axios from "axios";
import { configVariables } from "../env";
import { toast } from "react-toastify";

/**
 * Custom service for axios methods
 */
export const apiServices = {};
apiServices.get = get;

axios.defaults.baseURL = configVariables.baseURL;

axios.interceptors.response.use(
  function (response) {
    let data = response.data;
    if (data) {
      return Promise.resolve(data);
    } else {
      let error = data.error || data.msg || "Api failed";
      return Promise.reject(error);
    }
  },
  function (error) {
    if (error?.request?.status === 401) {
      toast.warn(error.response?.data.message);
    } else if (error?.request?.status === 500) {
      toast.error(error.response?.data.message);
    } else {
      toast.error("Network connection failed ");
    }
    toast.clearWaitingQueue();
    return Promise.reject(error);
  }
);

//To get data from the Rest API
function get(url) {
  return axios.get(url).then((resp) => {
    return resp;
  });
}
