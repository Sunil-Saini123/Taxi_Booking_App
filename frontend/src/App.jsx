import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import CaptainHome from "./pages/CaptainHome";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {

  // useEffect(() => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  // }, []);

  // use logout

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />

      {/* Protected User Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute requiredRole="user">
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/riding"
        element={
          <ProtectedRoute requiredRole="user">
            <Riding />
          </ProtectedRoute>
        }
      />

      {/* Protected Captain Routes */}
      <Route
        path="/captain-home"
        element={
          <ProtectedRoute requiredRole="captain">
            <CaptainHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/captain-riding"
        element={
          <ProtectedRoute requiredRole="captain">
            <CaptainRiding />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
