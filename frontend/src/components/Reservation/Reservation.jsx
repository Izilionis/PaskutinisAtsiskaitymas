import axios from "axios";
import UpdateReservationModal from "../UpdateReservationModal/UpdateReservationModal";
import {useState} from "react";
import {Button} from "@mui/material";

const API_HOST = import.meta.env.VITE_API_URL;

export default function Reservation({reservationData, refetchData}) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  function handleUpdateModal() {
    setShowUpdateModal(true);
  }
  function handleUpdateCancelModal() {
    setShowUpdateModal(false);
  }

  async function handleDelete() {
    const shouldDelete = confirm(`Ar tikrai nori istrinti ?`);

    if (shouldDelete) {
      try {
        await axios.delete(API_HOST + `/reservations/${reservationData._id}`);
        refetchData();
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <>
      <tr>
        <td>{reservationData.fullname}</td>
        <td>{reservationData.email}</td>
        <td>{reservationData.age}</td>
        <td>
          <Button onClick={() => setShowUpdateModal(true)} color="secondary">
            Update
          </Button>
        </td>
        <td>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
        </td>
      </tr>
      {showUpdateModal && (
        <UpdateReservationModal
          refetchData={refetchData}
          reservationData={reservationData}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
}
