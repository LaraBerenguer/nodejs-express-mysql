import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MapsPage from "../pages/MapsPage";
import CalendarPage from "../pages/CalendarPage";
import GraphicsPage from "../pages/GraphicsPage";
import Layout from "../layout/layout";
import UsersPage from "../pages/UsersPage";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/maps' element={<MapsPage />} />
          <Route path='/calendar' element={<CalendarPage />} />
          <Route path='/graphics' element={<GraphicsPage />} />
          <Route path='/users' element={<UsersPage />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default RoutesComponent;