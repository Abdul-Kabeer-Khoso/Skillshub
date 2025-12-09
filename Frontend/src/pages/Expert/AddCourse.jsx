import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddCourse = () => {
  const navigate = useNavigate();
  const [formOpt, setFormOpt] = useState("Playlist");
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    price: "",
    link: "",
    topic: "",
    description: "",
  });

  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  // Check role
  useEffect(() => {
    axios
      .get("http://localhost:5000/expert/auth", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error("User must be logged in");
          navigate("/auth/login");
        } else if (err.response?.status === 403) {
          toast.error("Access denied: wrong role");
          navigate("/");
        }
      });
  }, [navigate]);

  // fetch course details method
  const fetchCourseDetails = () => {
    const userId = user?._id;
    axios
      .post(
        "http://localhost:5000/expert/addcoursevideo",
        { userId },
        { withCredentials: true }
      )
      .then((res) => {
        setCourses(res.data.uniqueCourses);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  // Fetching course details
  useEffect(() => {
    if (formOpt === "Video") {
      fetchCourseDetails();
    }
  }, [formOpt]);

  // Set by default selected course
  useEffect(() => {
    if (courses.length > 0) {
      setSelectedCourse(courses[0].courseName);
    }
  }, [courses]);

  // handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // add course to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payLoad;
      if (formOpt === "Playlist") {
        const isCourseExist = courses.some(
          (c) => c.courseName.toLowerCase() === formData.name.toLowerCase()
        );
        if (isCourseExist) {
          toast.error("Course name already exists! Choose a different name.");
          return;
        }
      }

      if (formOpt === "Video") {
        const selectedObj = courses.find((c) => c.courseName == selectedCourse);
        payLoad = {
          name: selectedCourse,
          topic: formData.topic,
          price: Number(selectedObj?.coursePrice),
          subject: selectedObj?.courseSubject,
          link: formData.link,
          description: formData.description,
          formOpt: formOpt,
        };
      } else {
        payLoad = {
          name: formData.name,
          topic: formData.topic,
          price: Number(formData.price),
          subject: formData.subject,
          link: formData.link,
          description: formData.description,
        };
      }
      const response = await axios.post(
        "http://localhost:5000/expert/addcourse",
        payLoad,
        { withCredentials: true }
      );
      setFormData({
        name: "",
        subject: "",
        price: "",
        link: "",
        topic: "",
        description: "",
      });
      toast.success("Course added successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen flex justify-between items-center relative">
      <div
        className="w-[60px] h-[60px] rounded-[50%] flex justify-center items-center bg-[white] border-1 border-gray-400  shadow-lg absolute left-5 top-5 hover:cursor-pointer"
        onClick={() => {
          navigate("/expert/dashboard");
        }}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="xl"
          style={{ color: "#195707ff" }}
        />
      </div>
      <div className="w-[50%] h-screen rounded-r-xl shadow-lg bg-[url(https://plus.unsplash.com/premium_photo-1681487867978-1b83ce2625c5?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-no-repeat"></div>

      <div className="w-[50%] h-screen flex flex-col justify-center items-center px-7">
        <div className="flex jusitfy-center items-center">
          <button
            className={`w-[120px] h-[40px] px-2 ${
              formOpt == "Playlist" ? "bg-orange-500 text-white" : "bg-gray-300"
            } shadow-lg rounded-md hover:cursor-pointer`}
            onClick={() => {
              setFormOpt("Playlist");
            }}
          >
            Add Course
          </button>
          <button
            className={`w-[120px] h-[40px] px-2 ${
              formOpt == "Video" ? "bg-orange-500 text-white" : "bg-gray-300"
            } shadow-lg rounded-md ml-[50px] hover:cursor-pointer`}
            onClick={() => {
              setFormOpt("Video");
            }}
          >
            Add Video
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {formOpt == "Video" && courses.length == 0 ? (
            <div className="w-full h-[200px] font-bold text-2xl text-center text-gray-400 flex justify-center items-center ">
              "You can't add video, because there is no course added yet"
            </div>
          ) : (
            <>
              {formOpt == "Video" ? (
                <select
                  className="w-[90%] h-[40px] p-2 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courses.map((course, index) => (
                    <option key={index} value={course.courseName}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Course Name"
                  className="w-[90%] h-[40px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
                />
              )}

              <input
                type="text"
                name="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                placeholder="Topic Name"
                className="w-[90%] h-[40px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
              />

              {formOpt == "Video" ? (
                <></>
              ) : (
                <>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-[90%] h-[40px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
                  />

                  <input
                    type="text"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Course Price"
                    className="w-[90%] h-[40px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
                  />
                </>
              )}

              <input
                type="text"
                name="link"
                required
                value={formData.link}
                onChange={handleChange}
                placeholder="Video Link"
                className="w-[90%] h-[40px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
              />

              {formOpt == "Video" ? (
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-[90%] h-[130px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
                  placeholder="Video Description"
                ></textarea>
              ) : (
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-[90%] h-[130px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
                  placeholder="Course Description"
                ></textarea>
              )}

              <button
                type="submit"
                className="w-[90%] h-[50px] p-3 rounded-lg mt-[30px] bg-green-500 text-lg text-[white] font-semibold hover:cursor-pointer"
              >
                Add
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
