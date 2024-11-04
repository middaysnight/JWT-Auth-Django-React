import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ isLoggedIn, username, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/"); // Redirect to the login page
  };

  const isOnLoginPage = location.pathname === "/";

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <h1 className="navbar-brand mb-0">Welcome to Our App</h1>
        
        <div className="d-flex align-items-center ms-auto">
          {isLoggedIn ? (
            <>
              <span className="me-2">Hi, {username}</span>
              <button onClick={onLogout} className="btn btn-outline-primary">
                Logout
              </button>
            </>
          ) : (
            !isOnLoginPage && (
              <button onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
