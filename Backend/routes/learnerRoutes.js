import express from "express";
import { auth, course, getCourses } from "../controller/LearnerController.js";
import { authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/course/:id", authorizeRole(["learner", "expert"]), course);
router.get("/courses", getCourses);
router.get("/auth", auth);

export default router;
