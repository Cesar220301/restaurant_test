import { useQuery } from "@tanstack/react-query"
import { fetchRestaurants } from "../api/restaurants.api"

export function RestaurantPage(){
  const {data,isLoading,isError} = useQuery({
    queryKey: ['restaurants'],
    queryFn: ()=> fetchRestaurants()
  })
  return <pre>
    {JSON.stringify(data,null,2)}
  </pre>
}