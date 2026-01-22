import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { NavButton } from "./NavButton";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

export function NavDesktop({mapIcon,listIcon}){
  return <AppBar component="nav" sx={{background: "#fff",color:"#000"}} elevation={1} >
            <Toolbar>
              <Typography variant="h6">
                <RestaurantMenuIcon color="primary"/>
                <strong>Restaurantes</strong>
              </Typography>
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
            </Toolbar>
          </AppBar>
}