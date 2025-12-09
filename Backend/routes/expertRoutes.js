import express from "express";
import {
  auth,
  addCourse,
  dashboard,
  getCourses,
  deleteCourse,
} from "../controller/ExpertController.js";
import { authorizeRole } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/dashboard", authorizeRole(["expert"]), dashboard);
router.get("/auth", authorizeRole(["expert"]), auth);
router.post("/addcourse", authorizeRole(["expert"]), addCourse);
router.post("/addcoursevideo", authorizeRole(["expert"]), getCourses);
router.post("/deletecourse", authorizeRole(["expert"]), deleteCourse);

export default router;
