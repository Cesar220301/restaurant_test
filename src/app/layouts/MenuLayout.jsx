import {
  AppBar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { NavDesktop } from "./components/NavDesktop";
import { NavMobile } from "./components/NavMobile";

import MapIcon from "@mui/icons-material/Map";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

export function MenuLayout() {
  const [view, setView] = useState("list")
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={isMobile ? { pb: 8 } : { pt: 8 }}>
      {
        isMobile ?

          <NavMobile
            view={view}
            setView={setView}
            listIcon={<FormatListBulletedOutlinedIcon/>}
            mapIcon={<MapIcon/>}
          ></NavMobile>

          :
          <NavDesktop
            listIcon={<FormatListBulletedOutlinedIcon/>}
            mapIcon={<MapIcon/>}
          />
      }
      <Container component="main">
        <Outlet />
      </Container>


    </Box>
  );
}
