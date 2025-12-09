import PurchaseCourse from "../model/PurchaseCourse.js";
import mongoose from "mongoose";

// Buy course
export const buycourse = async (req, res) => {
  const user_Id = req.body.user._id;
  const course_Id = req.body.course._id;
  const purchaseStatus = req.body.status;
  const cName = req.body.course.courseName;
  try {
    const course = await PurchaseCourse.create({
      userId: user_Id,
      courseName: cName,
      courseId: course_Id,
      status: purchaseStatus,
    });
    res.json({
      message: "buy course route is working",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get purchase course details
export const getPurchaseCourse = async (req, res) => {
  const userCourses = req.body.courses;
  const courseIds = userCourses.map((course) => course._id);

  try {
    const purchasedCourses = await PurchaseCourse.find({
      courseId: { $in: courseIds },
    })
      .populate("userId")
      .populate("courseId");

    res.json({
      purchasedCourses,
      message: "get purchase course route works",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change status of purchased course
export const changeStatus = async (req, res) => {
  const newStatus = req.body.st;
  const course_id = req.body.cId;
  const userId = req.body.userId;
  try {
    const updateCourse = await PurchaseCourse.findOneAndUpdate(
      {
        userId: new mongoose.Types.ObjectId(userId),
        courseId: new mongoose.Types.ObjectId(course_id),
      },
      { status: newStatus },
      { new: true }
    );
    res.json({ updateCourse, message: "Change status route is working" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get status of current course
export const getStatus = async (req, res) => {
  try {
    const userId = req.body.user._id;
    const courseName = req.body.course.courseName;
    const currentPurchaseCourse = await PurchaseCourse.findOne({
      userId: userId,
      courseName: courseName,
    });
    res.json({
      currentPurchaseCourse,
      message: "get status code is working",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
