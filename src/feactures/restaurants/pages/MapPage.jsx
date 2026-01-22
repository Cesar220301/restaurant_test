import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Badge, Box, Stack, TextField, Typography } from "@mui/material"
import { Circle, MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import { fetchRestaurants } from "../api/restaurants.api"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import StarIcon from "@mui/icons-material/Star"

const default_center_cdmx = [19.4326, -99.1332]
const default_zoom = 15

function metersBetween(pointA, pointB) {
  const R = 6371000
  const toRad = (value) => (value * Math.PI) / 180
  const lat1 = toRad(pointA.lat)
  const lat2 = toRad(pointB.lat)
  const dLat = toRad(pointB.lat - pointA.lat)
  const dLng = toRad(pointB.lng - pointA.lng)

  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const a = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function MapClickHandler({ onPick }) {
  useMapEvents({
    click(event) {
      onPick({ lat: event.latlng.lat, lng: event.latlng.lng })
    },
  })
  return null
}

export function MapPage() {
  const { data } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchRestaurants(),
    refetchOnWindowFocus: false,
  })

  const [centerPoint, setCenterPoint] = useState({
    lat: default_center_cdmx[0],
    lng: default_center_cdmx[1],
  })
  const [radiusMeters, setRadiusMeters] = useState(200)

  const { count, averageRating } = useMemo(() => {
    if (!data?.length) {
      return { count: 0, averageRating: 0 }
    }
    let total = 0
    let sumRating = 0
    data.forEach((restaurant) => {
      const location = restaurant.address?.location
      if (!location) return
      const distance = metersBetween(centerPoint, { lat: location.lat, lng: location.lng })
      if (distance <= radiusMeters) {
        total += 1
        sumRating += Number(restaurant.rating ?? 0)
      }
    })
    return {
      count: total,
      averageRating: total ? sumRating / total : 0,
    }
  }, [centerPoint, data, radiusMeters])

  return (
    <Stack spacing={2} sx={{pt:2}}>
      <Box sx={{display: "flex", gap: 3, alignItems: "center"}}>
          <TextField
            type="number"
            label="Radio (metros)"
            value={radiusMeters}
            onChange={(event) => setRadiusMeters(Number(event.target.value || 0))}
            inputProps={{ min: 0 }}
            size="small"
            fullWidth
          />
          <Badge color="success" badgeContent={count}>
            <RestaurantIcon fontSize="medium"/>
          </Badge>
          <Badge color="warning" badgeContent={averageRating.toFixed(2)}>
            <StarIcon fontSize="medium"/>
          </Badge>
        
      </Box>
      <MapContainer center={default_center_cdmx} zoom={default_zoom} style={{ height: "calc(100vh - 220px)", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onPick={setCenterPoint} />
        <Marker position={[centerPoint.lat, centerPoint.lng]} draggable eventHandlers={{
          dragend: (event) => {
            const marker = event.target
            const position = marker.getLatLng()
            setCenterPoint({ lat: position.lat, lng: position.lng })
          },
        }} />
        <Circle center={[centerPoint.lat, centerPoint.lng]} radius={radiusMeters} />
      </MapContainer>
    </Stack>
  )
}
