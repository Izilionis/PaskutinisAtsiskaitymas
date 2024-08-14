import axios from "axios";
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import styles from "./AddReservation.module.css";

const API_HOST = import.meta.env.VITE_API_URL;

export default function AddReservation() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    const body = {
      fullname,
      email,
      age,
    };
    try {
      await axios.post(API_HOST + `/reservations`, body);
      setFullname("");
      setEmail("");
      setAge("");
    } catch {
      alert(
        "All fields is required && email should not be used 2 times && and only users over 12yr are allowed to register"
      );
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className={styles.container}>
      <TextField
        label="Fullname"
        minLength={3}
        maxLength={50}
        type="text"
        id="name"
        placeholder="Fullname"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      {/* <br /> */}
      <TextField
        label="Email"
        type="email"
        id="email"
        placeholder="Example@init.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <br /> */}
      <TextField
        label="Age"
        type="number"
        minLength={12}
        id="age"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br />
      <Button type="submit" variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
}
