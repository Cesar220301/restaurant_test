import { Box, Card, Divider, Link, Rating, Stack, Typography } from "@mui/material";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
export function CardRestaurant({name,address,phone,site}) {
  return (
    <Card sx={{ width: 275, p: 2 }}>
      <Typography variant="subtitle1">{name}</Typography>
      <Rating value={3} readOnly></Rating>
      <Divider sx={{my:2}}></Divider>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <PlaceOutlinedIcon size={16} color="disabled" />
          <Typography variant="body2" color="textSecondary">
            {address}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <LocalPhoneOutlinedIcon size={16} color="disabled" />
          <Typography variant="body2" color="textSecondary">
            {phone}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <LanguageOutlinedIcon size={16} color="disabled" />
          <Link href={""} target="_blank" variant="body2" color="textSecondary">
            {site}
          </Link>
        </Stack>
      </Stack>
    </Card>
  )
}