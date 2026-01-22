import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
export function NavMobile({view,setView,mapIcon,listIcon}){
  return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex:100}} elevation={3}>
            <BottomNavigation
              value={view}
              onChange={(_, value) => setView(value)}
              showLabels
              sx={{background: "#fff" }}
            >
              <BottomNavigationAction
                label="Restaurantes"
                value="list"
                icon={listIcon}
                component={NavLink}
                to="/"
              />
              <BottomNavigationAction
                label="Mapa"
                value="map"
                icon={mapIcon}
                component={NavLink}
                to="/mapa"
              />
            </BottomNavigation>
          </Paper>
}