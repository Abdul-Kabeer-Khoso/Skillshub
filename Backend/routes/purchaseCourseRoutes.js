import express from "express";
import { authorizeRole } from "../middlewares/authMiddleware.js";
import {
  buycourse,
  getPurchaseCourse,
  changeStatus,
  getStatus
} from "../controller/PurchaseCourseController.js";

const router = express.Router();

router.post("/buycourse", authorizeRole(["learner"]), buycourse);
router.post("/purchasedcourses", authorizeRole(["expert"]), getPurchaseCourse);
router.post("/getstatus", authorizeRole(["learner"]), getStatus)
router.post("/changestatus", authorizeRole(["expert"]), changeStatus);

export default router;
