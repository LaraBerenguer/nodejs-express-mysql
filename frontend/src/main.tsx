import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { EventProvider } from './context/EventsContext.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { LocationProvider } from './context/LocationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <UserProvider>
      <EventProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </EventProvider>
    </UserProvider>
  </StrictMode>
);
