import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Layout from "../layout/layout";

const HomePage = lazy(() => import("../pages/HomePage"));
const CalendarPage = lazy(() => import("../pages/CalendarPage"));
const MapsPage = lazy(() => import("../pages/MapsPage"));
const GraphicsPage = lazy(() => import("../pages/GraphicsPage"));
const UsersPage = lazy(() => import("../pages/UsersPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='maps' element={<MapsPage />} />
          <Route path='calendar' element={<CalendarPage />} />
          <Route path='graphics' element={<GraphicsPage />} />
          <Route path='users' element={<UsersPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default RoutesComponent;