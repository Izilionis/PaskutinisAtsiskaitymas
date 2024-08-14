import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "./RegisterPage.module.css";
import {Button, TextField, Alert} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const body = {
      username,
      password,
    };
    try {
      await axios.post(API_URL + "/register", body);
      setRegisterSuccessful(true);

      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        {registerSuccessful ? (
          <Alert variant="outlined" severity="success">
            Your login request was successfull
          </Alert>
        ) : (
          <form onSubmit={handleRegister}>
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
              Register
            </Button>
          </form>
        )}
        {error && (
          <div className={styles.error}>
            <Alert variant="outlined" severity="error">
              Username is taken or your password is to week.
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
