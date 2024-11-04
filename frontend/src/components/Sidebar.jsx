import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="d-flex flex-column bg-light p-3" style={styles.sidebar}>
      <h4>Navigation</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        {/* Add more sidebar links here as needed */}
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    minHeight: "100vh",
    borderRight: "1px solid #dee2e6"
  }
};
