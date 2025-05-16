/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom"; // use react-router-dom
import Home from "./pages/Home";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import EventForm from "./pages/EventForm";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-form"
          element={
            <ProtectedRoute>
              <EventForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
