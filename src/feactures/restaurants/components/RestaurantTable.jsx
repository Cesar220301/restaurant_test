import { useMemo, useState } from "react"
import { Box, Pagination, Stack } from "@mui/material"
import { CardRestaurant } from "./CardRestaurant"

const size_limit = 6

export function RestaurantTable({ restaurants }) {
  const [page, setPage] = useState(1)

  const pageCount = useMemo(() => {
    if (!restaurants?.length) return 0
    return Math.ceil(restaurants.length / size_limit)
  }, [restaurants])

  const pagedRestaurants = useMemo(() => {
    if (!restaurants?.length) return []
    const startIndex = (page - 1) * size_limit
    return restaurants.slice(startIndex, startIndex + size_limit)
  }, [page, restaurants])

  return (
    <Stack spacing={2}>
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-around" }}>
        {pagedRestaurants.map((r) => {
          const address = r.address?.state + " - " + r.address?.city
          return (
            <CardRestaurant
              key={r.id ?? r.name}
              name={r.name}
              phone={r.contact?.phone}
              address={address}
              site={r.contact?.site}
              rating={r.rating}
            />
          )
        })}
      </Box>
    </Stack>
  )
}
