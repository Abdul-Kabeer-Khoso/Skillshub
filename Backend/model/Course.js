import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  topicName: {
    type: String,
    required: true,
    unique: true,
  },
  courseSubject: {
    type: String,
    required: true,
  },
  courseLink: {
    type: String,
    required: true,
    unique: true,
  },
  coursePrice: {
    type: Number,
    required: true,
    min: [500, "Price must be greater than Rs:500"],
    max: [10000, "Price must be less than Rs:10000"],
  },
  courseDescription: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
