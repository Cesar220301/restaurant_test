import { createBrowserRouter } from "react-router-dom";
import { RestaurantPage } from "../../feactures/restaurants/pages/RestaurantPage";

const router = createBrowserRouter([
  {
    path: "/", element: <RestaurantPage/>
  }
])

export default router;