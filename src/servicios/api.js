import axios from "axios";

const API = axios.create({
  baseURL: "https://backendbaguette-production.up.railway.app/api/v1"
});


export default API;