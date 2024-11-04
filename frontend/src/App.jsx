import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.get("http://127.0.0.1:8000/api/user/", config);
          setLoggedIn(true);
          setUsername(response.data.username);
        } catch (error) {
          setLoggedIn(false);
          setUsername("");
        }
      }
    };
    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
        await axios.post("http://127.0.0.1:8000/api/logout/", { refresh: refreshToken }, config);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
      } catch (error) {
        console.error("Failed to logout", error.response?.data || error.message);
      }
    }
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

      <div className="d-flex">
        {isLoggedIn && <Sidebar />} {/* Show Sidebar if logged in */}

        <div className="flex-grow-1 p-4">
          <Routes>
            {/* Redirect to /home if logged in and accessing / */}
            <Route 
              path="/" 
              element={isLoggedIn ? <Navigate to="/home" /> : <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} 
            />
            {/* Home route, only accessible if logged in */}
            <Route path="/home" element={isLoggedIn ? <Home username={username} /> : <Navigate to="/" />} />
            {/* Register route, only accessible if logged in */}
            <Route path="/register" element={isLoggedIn ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
