import axiosClient from "../../../app/api/axiosClient";


export async function fetchRestaurants(){
  const res = await axiosClient.get('/exec')
  return res.data
}