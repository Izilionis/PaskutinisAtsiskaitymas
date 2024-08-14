import {Button} from "@mui/material";
import styles from "./Navigator.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Navigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? `${styles.buttonss} ${styles.active}`
      : styles.buttonss;
  };
  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <Link to="/register" className={getLinkClass("/register")}>
        Register
      </Link>
      <Link to="/main" className={getLinkClass("/main")}>
        Main
      </Link>
      {!isAuthenticated ? (
        <Link to="/login" className={getLinkClass("/login")}>
          Login
        </Link>
      ) : (
        <button onClick={logout} className={styles.buttonss}>
          Logout
        </button>
      )}
    </div>
  );
}
