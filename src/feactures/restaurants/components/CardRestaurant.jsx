import { Box, Card, Divider, Link, Rating, Stack, Typography } from "@mui/material";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
export function CardRestaurant({name,address,phone,site,rating}) {
  return (
    <Card sx={{ width: 275, p: 2 }}>
      <Typography variant="subtitle1">
        <strong>{name}</strong>
      </Typography>
      <Rating value={rating} readOnly></Rating>
      <Divider sx={{my:2}}></Divider>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <PlaceOutlinedIcon size={16} color="info" />
          <Typography variant="body2">
            {address}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <LocalPhoneOutlinedIcon size={16} color="info" />
          <Typography variant="body2">
            {phone}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <LanguageOutlinedIcon size={16} color="info" />
          <Link href={""} target="_blank" variant="body2">
            {site}
          </Link>
        </Stack>
      </Stack>
    </Card>
  )
}