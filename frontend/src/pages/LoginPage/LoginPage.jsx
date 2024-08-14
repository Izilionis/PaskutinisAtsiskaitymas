import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField, Alert} from "@mui/material";
import styles from "./LoginPage.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const body = {
      username,
      password,
    };
    try {
      const response = await axios.post(API_URL + "/login", body);
      localStorage.setItem("token", response.data.token);
      navigate("/main");
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <br />
        <br />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <br />
        <Button variant="contained" color="success" type="submit">
          Login
        </Button>
        {error && (
          <div className={styles.error}>
            <Alert variant="outlined" severity="error">
              Username or password is not correct
            </Alert>
          </div>
        )}
      </form>
    </div>
  );
}
