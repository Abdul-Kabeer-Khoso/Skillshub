import Footer from "../../components/Footer";
import CourseVideoBox from "../../components/CourseVideoBox";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const WatchCourse = () => {
  const navigate = useNavigate();

  //make course link to fit into iframe
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [courseStatus, setCourseStatus] = useState(null);

  // Check user is logged in
  useEffect(() => {
    axios
      .get("http://localhost:5000/learner/auth", {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.user) {
          toast.error("User must be logged in");
          navigate("/auth/login");
        } else {
          setUser(res.data.user);
        }
      })
      .catch(() => {
        toast.error("User must be logged in");
        navigate("/auth/login");
      });
  }, [navigate]);

  // Get Course
  useEffect(() => {
    if (!user) return;
    const fetchCourse = async () => {
      try {
        const res = await axios.post(
          `http://localhost:5000/learner/course/${id}`,
          { user },
          {
            withCredentials: true,
          }
        );
        setCourse(res.data.selectedCourse);
        setSelectedVideo(res.data.selectedCourse.topicName);
        setPlaylist(res.data.playlist);
        setCourseStatus(res.data.status);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    };

    fetchCourse();
  }, [id, user]);

  // Buy Course
  const buyCourse = () => {
    const status = "waiting";
    if (courseStatus == null) {
      try {
        axios
          .post(
            "http://localhost:5000/purchase/buycourse",
            { user, course, status },
            { withCredentials: true }
          )
          .then((res) => {
            toast.success("Request Send");
            setCourseStatus(status);
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || "Server error");
          });
      } catch (err) {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Already sent request");
    }
  };

  // Get course status detail
  useEffect(() => {
    if (!course || !user) return;
    axios
      .post(
        "http://localhost:5000/purchase/getstatus",
        { course, user },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setCourseStatus(res.data.currentPurchaseCourse?.status);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  }, [course, user]);

  // Change video
  const changeVideo = (myCourse, title) => {
    setSelectedVideo(title);
    setCourse(myCourse);
  };

  if (!course) return <p>Loading.</p>;

  return (
    <div
      className="w-full h-auto flex flex-col items-center rlative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className="w-[50px] h-[50px] rounded-[50%] flex justify-center items-center bg-[white] border-1 border-gray-400  shadow-lg absolute left-5 top-5 hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="xl"
          style={{ color: "#195707ff" }}
        />
      </div>
      <div className="w-full h-[65vh] bg-[#32c4c0] flex justify-center items-center rounded-b-4xl">
        <div className="w-[80vw] h-[85%] flex flex-justify-between items-center">
          <div className="w-[50%]  flex flex-col justify-start py-10 pr-15">
            <p className="text-4xl font-bold text-black">
              {course.courseName} Course
            </p>
            <p className="text-black-700 text-md font-semibold mt-2">
              {course.courseSubject}
            </p>
            <p className="text-black-700 text-md font-bold mt-7">
              {course.topicName}
            </p>

            <p className="text-md text-justify font-semibold text-black-700 mt-2">
              {course.courseDescription}
            </p>

            <div className="flex items-center">
              <button className="bg-red-500 rounded-md w-[150px] border-2 border-white py-2 mr-5 text-lg text-white font-semibold mt-5 hover:cursor-pointer">
                PKR {course.coursePrice}
              </button>
              <button
                className="bg-green-700 rounded-md w-[150px] border-2 border-white py-2 text-lg text-white font-semibold mt-5 hover:cursor-pointer"
                onClick={buyCourse}
              >
                {courseStatus == null ? "Buy Course" : courseStatus}
              </button>
            </div>
          </div>

          <div className="w-[50%] rounded-xl shadow-xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={getEmbedUrl(course.courseLink)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="w-[90vw] mt-10 mb-20">
        {playlist.length == 1 ? (
          <div className="w-full h-auto flex justify-center items-center">
            <img src="/no-video-available.jpg" alt="no video availabe image" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-5">
            {playlist.map((vid, index) => {
              if (vid.topicName !== selectedVideo) {
                return (
                  <CourseVideoBox
                    key={index}
                    courseStatus={courseStatus}
                    url={vid.courseLink}
                    title={vid.topicName}
                    changeVideo={changeVideo}
                    course={vid}
                  />
                );
              }
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WatchCourse;
