import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const NavButton = ({ to, label,startIcon }) => (
  <NavLink to={to} >
    {({ isActive }) => (
      <Button sx={{mr:2}} variant={isActive ? "contained" : "text"} startIcon={startIcon}>
        {label}
      </Button>
    )}
  </NavLink>
);