import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, username, onLogout }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");  // Navigate to the login page
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Welcome to Home</h1>
      <div style={styles.authSection}>
        {isLoggedIn ? (
          <>
            <span style={styles.username}>Hi, {username}</span>
            <button onClick={onLogout} style={styles.authButton}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleLogin} style={styles.authButton}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6"
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  authSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  username: {
    fontSize: "1rem",
    color: "#333"
  },
  authButton: {
    padding: "5px 10px",
    fontSize: "1rem",
    cursor: "pointer",
    border: "1px solid #007bff",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff"
  }
};
