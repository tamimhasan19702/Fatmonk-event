/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom"; // use react-router-dom
import Home from "./pages/Home";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import SinglEvent from "./pages/SingleEvent";
import AddEvent from "./pages/AddEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutes>
              <Home />
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-event"
          element={
            <ProtectedRoute>
              <AddEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/single-event/:id"
          element={
            <ProtectedRoute>
              <SinglEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
