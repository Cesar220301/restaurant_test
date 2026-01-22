import { useMemo, useState } from "react"
import { useRestaurants } from "../hooks/useRestaurants"
import { Alert, Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material"
import { RestaurantTable } from "../components/RestaurantTable"
export function RestaurantPage() {
  const { data, isLoading, isError } = useRestaurants()
  const [sortOrder, setSortOrder] = useState("rating-desc")

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
    return sorted
  }, [data, sortOrder])
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

  return <Stack spacing={2} sx={{ mt: 2 }}>
    <FormControl size="small">
      <InputLabel>Ordenar</InputLabel>
      <Select
        value={sortOrder}
        label="Ordenar"
        onChange={(event) => setSortOrder(event.target.value)}
      >
        <MenuItem value="name-asc">Ascendente</MenuItem>
        <MenuItem value="name-desc">Descendente</MenuItem>
        <MenuItem value="rating-desc">Mejor rating</MenuItem>
        <MenuItem value="rating-asc">Peor rating</MenuItem>
      </Select>
    </FormControl>
    <RestaurantTable restaurants={restaurants} />
  </Stack>
}
