import axios from "axios";
import {Baseurl} from './constants'

const instance = axios.create({
  baseURL: Baseurl + "/api/v1/",
});

instance.interceptors.request.use((config) => {
  let token = localStorage.getItem("ut");
  config.headers.token = token;
  return config;
});

export default instance;
