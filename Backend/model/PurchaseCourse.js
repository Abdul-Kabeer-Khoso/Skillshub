import mongoose from "mongoose";

const purchaseCourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Prevent same user from purchasing same course again
purchaseCourseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const PurchaseCourse = mongoose.model("PurchaseCourse", purchaseCourseSchema);

export default PurchaseCourse;
