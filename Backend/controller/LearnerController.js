import Course from "../model/Course.js";
import PurchaseCourse from "../model/PurchaseCourse.js";

// Watch specific course
export const course = async (req, res) => {
  try {
    const course_id = req.params.id;
    const user_id = req.body.user._id;

    // Get Details of purchased course
    const purchaseCourseDetails = await PurchaseCourse.findOne({
      courseId: course_id,
      userId: user_id,
    });

    const status = purchaseCourseDetails?.status;

    // Get the selected course by id
    const selectedCourse = await Course.findById(course_id);
    if (!selectedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Get all other course videos with same course name
    const playlist = await Course.find({
      courseName: selectedCourse.courseName,
    });

    // send response
    res.status(200).json({
      selectedCourse,
      playlist,
      status,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// auth
export const auth = (req, res) => {
  res.json({
    message: "course Route works",
    user: req.user,
  });
};

// Fetch all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.aggregate([
      // Sort by _id ascending (oldest first)
      { $sort: { _id: 1 } },

      // Group by courseName, take the first document in each group
      {
        $group: {
          _id: "$courseName", // group by course name
          course: { $first: "$$ROOT" }, // take the first document (oldest) in the group
        },
      },

      // Optionally, replace _id with courseName
      {
        $replaceRoot: { newRoot: "$course" },
      },
    ]);

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
