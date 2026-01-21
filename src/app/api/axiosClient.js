import axios from "axios";


const axiosClient = axios.create({
  baseURL: "https://script.google.com/macros/s/AKfycbxOz4Etidu_0728m8DZyItsWkB48F1cij_Zbzbp8fwKyLOxxDQskrBuHMLa7H8sUj51hA",
  headers: {"Content-Type": "aplications/json"},
  timeout: 10000
})

export default axiosClient;