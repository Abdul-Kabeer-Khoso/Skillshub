import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ExpertProfileCard from "./ExpertProfileCards";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ExpertProfile = ({ inputValue }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("http://localhost:5000/learner/courses", {
          withCredentials: true,
        });
        setCourses(res.data);
        setFilteredCourses(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    };

    fetchCourse();
  }, []);

  // Searching functionality
  useEffect(() => {
    if (inputValue === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.courseName.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [inputValue, courses]);

  return (
    <div className="w-full h-auto py-13 px-20">
      {filteredCourses.length == 0 ? (
        <div className="flex justify-center items-center">
          <img
            src="/No-course-found.jpg"
            alt="No course found image"
            className="w-[40vw]"
          />
        </div>
      ) : (
        <>
          <span className="font-bold text-xl">
            1 million reviewed tutors &nbsp;
            <span>
              <FontAwesomeIcon
                icon={faStar}
                size="2xs"
                style={{ color: "#ff6363" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="2xs"
                style={{ color: "#ff6363" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="2xs"
                style={{ color: "#ff6363" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="2xs"
                style={{ color: "#ff6363" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="2xs"
                style={{ color: "#ff6363" }}
              />
            </span>
          </span>

          <div className="flex flex-wrap gap-5">
            {filteredCourses.map((course, index) => (
              <ExpertProfileCard
                key={index}
                courseId={course._id}
                url={course.courseLink}
                name={course.courseName}
                description={course.courseDescription}
                price={course.coursePrice}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpertProfile;
