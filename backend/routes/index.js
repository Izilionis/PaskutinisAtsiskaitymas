import express from "express";
import jwtRoutes from "./jwtRoutes.js";
import reservation from "./reservation.js";

const router = express.Router();

router.use(jwtRoutes);
router.use(reservation);

export default router;
