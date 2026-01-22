import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchRestaurants } from "../api/restaurants.api"
import { Alert, Box, CircularProgress, Pagination, Stack } from "@mui/material"
import { CardRestaurant } from "../components/CardRestaurant"
const size_max = 6
export function RestaurantPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => fetchRestaurants(),
    refetchOnWindowFocus: false,
  })
  const [page, setPage] = useState(1)
  const pageCount = useMemo(() => {
    if (!data?.length) return 0
    return Math.ceil(data.length / size_max)
  }, [data])

  const restaurants = useMemo(() => {
    if (!data?.length) return []
    const startIndex = (page - 1) * size_max
    return data.slice(startIndex, startIndex + size_max)
  }, [data, page])
  if (isLoading) {
    return <Stack justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <CircularProgress></CircularProgress>
    </Stack>
  }
  if (isError) {
    return <Box sx={{ p: 4 }}>
      <Alert severity="error">Error al cargar Restaurantes</Alert>
    </Box>
  }

  return <Stack spacing={2}>
    {pageCount > 1 && (
      <Stack direction="row" justifyContent="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
        />
      </Stack>
    )}
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2,justifyContent: "space-around" }}>
      {
        restaurants.map(r => {
          const address = r.address?.state + " - " + r.address?.city
          return <CardRestaurant
            key={r.id}
            name={r.name}
            phone={r.contact?.phone}
            address={address}
            site={r.contact?.site}
            rating={r.rating}
          />
        })
      }
    </Box>

  </Stack>
}
