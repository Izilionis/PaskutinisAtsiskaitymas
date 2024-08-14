import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ReservationsContainer from "../../components/ReservationsContainer/ReservationsContainer";
import AddReservation from "../../components/AddReservation/AddReservation";

const API_HOST = import.meta.env.VITE_API_URL;

export default function MainPage() {
  const [users, setUsers] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(API_HOST + "/users", {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setUsers(res.data))
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            alert("Kazkas negerai, pabandykite veliau");
          }
        });
    }
  }, []);

  return (
    <div>
      <AddReservation />
      <ReservationsContainer />
    </div>
  );
}
