import express from "express";
import {
  auth,
  createUser,
  loginUser,
  logout,
} from "../controller/UserController.js";

const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);
router.get("/auth/logout", logout);
router.get("/auth/me", auth);

export default router;
