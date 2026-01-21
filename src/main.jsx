import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "leaflet/dist/leaflet.css";
import { RouterProvider } from 'react-router-dom';
import router from './app/routes/index'
import { QueryProvider } from './app/providers/QueryProvider';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
)
