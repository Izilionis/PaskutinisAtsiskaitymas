import express from "express";

import {validateJwt} from "../middleware/validateJwtMiddleware.js";
import {
  getUsers,
  loginUser,
  registerNewUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.get("/users", validateJwt, getUsers);

export default router;
