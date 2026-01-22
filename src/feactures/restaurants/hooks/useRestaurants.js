import { useQuery } from "@tanstack/react-query"
import { fetchRestaurants } from "../api/restaurants.api"

export function useRestaurants() {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchRestaurants(),
    refetchOnWindowFocus: false,
  })
}
