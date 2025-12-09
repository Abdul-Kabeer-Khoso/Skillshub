import Course from "../model/Course.js";

// showing dashboard for authorized user
export const dashboard = (req, res) => {
  res.json({
    message: "Expert Dashboard Route works",
    user: req.user,
  });
};

// authorization
export const auth = (req, res) => {
  res.json({
    message: "course Route works",
    user: req.user,
  });
};

// Create Unique course
export const addCourse = async (req, res) => {
  try {
    const { name, topic, subject, price, link, description, formOpt } =
      req.body;

    if (formOpt == "Playlist") {
      const existingCourse = await Course.findOne({
        courseName: req.body.name,
      });

      if (existingCourse) {
        return res.status(400).json({ message: "Course name already exists!" });
      }
    }

    // Count how many videos/topics already exist for this course
    const existingTopicsCount = await Course.countDocuments({
      courseName: name,
    });

    // Create numbered topic title
    const numberedTopic = `${existingTopicsCount + 1}- ${topic}`;

    const course = await Course.create({
      expertId: req.user._id,
      courseName: name,
      topicName: numberedTopic,
      courseSubject: subject,
      coursePrice: price,
      courseLink: link,
      courseDescription: description,
    });

    //  Send response
    res.status(201).json({ message: "Course added successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Getting user's courses
export const getCourses = async (req, res) => {
  const userId = req.body.userId;
  try {
    if (!userId) {
      res.status(404).json({ message: "User Id not found" });
    }
    const courses = await Course.find({
      expertId: userId,
    });

    const uniqueCourses = Object.values(
      courses.reduce((acc, course) => {
        if (!acc[course.courseName]) acc[course.courseName] = course;
        return acc;
      }, {})
    );

    res.status(200).json({
      uniqueCourses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  const { courseId, courseName } = req.body;

  try {
    const result = await Course.deleteMany({
      courseName: courseName,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
