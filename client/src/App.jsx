import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AuthForm from "./pages/AuthForm";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoutes";
import Notes from "./components/Notes";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />{" "}
            {/* ✅ This renders at /dashboard */}
            <Route path="home" element={<Home />} />{" "}
            {/* ✅ Optional: allows /dashboard/home */}
            <Route path="notes" element={<Notes />} />
            <Route path="about" element={<About />} />
            
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
