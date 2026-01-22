import { createBrowserRouter } from "react-router-dom";
import { MenuLayout } from "../layouts/MenuLayout";
import { RestaurantPage } from "../../feactures/restaurants/pages/RestaurantPage";
import { MapPage } from "../../feactures/restaurants/pages/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuLayout />,
    children: [
      { index: true, element: <RestaurantPage /> },
      { path: "mapa", element: <MapPage /> },
    ],
  },
]);

export default router;
