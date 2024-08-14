import express from "express";
import {
  createNewReservation,
  deleteReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservationController.js";
import {validateReservationBody} from "../middleware/ReservationBodyValidation.js";
import {validateIdParam} from "../middleware/validateIdParam.js";

const router = express.Router();

router.get("/reservations", getReservations);
router.post("/reservations", validateReservationBody, createNewReservation);
router.put(
  "/reservations/:id",
  validateIdParam,
  validateReservationBody,
  updateReservation
);
router.delete("/reservations/:id", validateIdParam, deleteReservation);

export default router;
