import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchRestaurants } from "../api/restaurants.api"
import { Alert, Box, CircularProgress, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from "@mui/material"
import { CardRestaurant } from "../components/CardRestaurant"
const size_max = 6
export function RestaurantPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => fetchRestaurants(),
    refetchOnWindowFocus: false,
  })
  const [page, setPage] = useState(1)
  const [sortOrder, setSortOrder] = useState("name-asc")
  const pageCount = useMemo(() => {
    if (!data?.length) return 0
    return Math.ceil(data.length / size_max)
  }, [data])

  const restaurants = useMemo(() => {
    if (!data?.length) return []
    const sorted = [...data].sort((a, b) => {
      if (sortOrder === "rating-asc" || sortOrder === "rating-desc") {
        const ratingA = Number(a.rating ?? 0)
        const ratingB = Number(b.rating ?? 0)
        return sortOrder === "rating-asc" ? ratingA - ratingB : ratingB - ratingA
      }
      const nameA = (a.name ?? "").toLowerCase()
      const nameB = (b.name ?? "").toLowerCase()
      if (nameA < nameB) return sortOrder === "name-asc" ? -1 : 1
      if (nameA > nameB) return sortOrder === "name-asc" ? 1 : -1
      return 0
    })
    const startIndex = (page - 1) * size_max
    return sorted.slice(startIndex, startIndex + size_max)
  }, [data, page, sortOrder])
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

  return <Stack spacing={2} sx={{mt:2}}>
    <FormControl size="small">
      <InputLabel>Ordenar por</InputLabel>
      <Select
        value={sortOrder}
        label="Ordenar"
        onChange={(event) => {
          setSortOrder(event.target.value)
          setPage(1)
        }}
      >
        <MenuItem value="name-asc">Ascendente</MenuItem>
        <MenuItem value="name-desc">Descendente</MenuItem>
        <MenuItem value="rating-desc">Mejor rating</MenuItem>
        <MenuItem value="rating-asc">Peor rating</MenuItem>
      </Select>
    </FormControl>
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
