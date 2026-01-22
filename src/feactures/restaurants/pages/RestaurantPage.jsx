import { useQuery } from "@tanstack/react-query"
import { fetchRestaurants } from "../api/restaurants.api"
import { Box, CircularProgress, Stack } from "@mui/material"
import { CardRestaurant } from "../components/CardRestaurant"

export function RestaurantPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => fetchRestaurants(),
    refetchOnWindowFocus: false,
  })
  if(isLoading){
    return <Stack justifyContent="center" alignItems="center" sx={{mt:4}}>
      <CircularProgress></CircularProgress>
    </Stack>
  }
  if(isError){
    return <Box sx={{ p: 4 }}>
        <Alert severity="error">Error al cargar Restaurantes</Alert>
      </Box>
  }
  return <Box sx={{display: "flex",flexWrap: "wrap",gap: 2}}>
    {
      data.map(r=>{
        const address = r.address?.state + " - " + r.address?.city
        return <CardRestaurant
          name={r.name}
          phone={r.contact?.phone}
          address={address}
          site={r.contact?.site}
          rating={r.rating}
        />
      })
    }
  </Box>
}