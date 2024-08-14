import {useEffect, useState} from "react";
import axios from "axios";
import Reservation from "../Reservation/Reservation";
import styles from "./ReservationsContainer.module.css";

const API_HOST = import.meta.env.VITE_API_URL;

export default function ReservationsContainer() {
  const [reservations, setReservations] = useState([]);
  const [sortBy, setSortBy] = useState("");

  function getReservations() {
    axios
      .get(API_HOST + "/reservations", {params: {sortBy}})
      .then((response) => setReservations(response.data))
      .catch(() => alert("Something went wrong"));
  }

  useEffect(() => {
    if (sortBy) {
      getReservations({sortBy});
    }
  }, [sortBy]);

  useEffect(() => {
    getReservations();
  }, [reservations]);

  return (
    <div className={styles.container}>
      <div className={styles.sort}>
        <label>Sort By:</label>
        <select
          className={styles.select}
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="">None</option>
          <option value="fullname">Name</option>
          <option value="age">Age</option>
        </select>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Age</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <Reservation
              key={reservation._id}
              reservationData={reservation}
              refetchData={getReservations}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
