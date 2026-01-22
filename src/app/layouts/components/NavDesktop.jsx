import {  Box } from "@mui/material";
import { NavButton } from "./NavButton";

export function NavDesktop({ mapIcon, listIcon }) {
  return <>
    <Box sx={{ flexGrow: 1 }} />
    <NavButton
      to="/"
      label="Lista"
      startIcon={listIcon}
    ></NavButton>
    <NavButton
      to="/mapa"
      label="Mapa"
      startIcon={mapIcon}
    ></NavButton>
  </>

}