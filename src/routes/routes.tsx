import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import CalendarPage from "../pages/CalendarPage";
import GraphicsPage from "../pages/GraphicsPage";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/graphics' element={<GraphicsPage />} />
      </Routes>
    </Router>
  )
};

export default RoutesComponent;