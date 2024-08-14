import reactDom from "react-dom";
import axios from "axios";
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import styles from "./UpdateReservationModal.module.css";

const API_HOST = import.meta.env.VITE_API_URL;

export default function UpdateReservationModal({
  reservationData,
  refetchData,
  onClose,
}) {
  const [fullname, setFullname] = useState(reservationData.fullname);
  const [email, setEmail] = useState(reservationData.email);
  const [age, setAge] = useState(reservationData.age);

  async function handleUpdate(e) {
    e.preventDefault();

    const body = {
      fullname,
      email,
      age,
    };

    try {
      await axios.put(API_HOST + `/reservations/${reservationData._id}`, body);
      refetchData();
      onClose();
    } catch (error) {
      alert(error.message);
    }
  }

  return reactDom.createPortal(
    <div className={styles.container}>
      <form onSubmit={handleUpdate}>
        <div className={styles.textField}>
          <div>
            <TextField
              id="name2"
              label="Fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Email"
              id="email2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.fields}
            />
          </div>
          <div>
            <TextField
              label="Age"
              id="age2"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <br />
        <div className={styles.buttons}>
          <div>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </div>
          <div>
            <Button onClick={onClose} variant="outlined" color="error">
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
}
