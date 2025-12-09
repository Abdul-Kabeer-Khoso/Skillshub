import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarCheck,
  faChartLine,
  faCheckSquare,
  faDoorOpen,
  faMultiply,
  faPlus,
  faShoppingCart,
  faSpinner,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios, { CanceledError } from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import DashboardCourseBox from "../../components/DashboardCourseBox";
import WaitingCourse from "../../components/WaitingCourse";
import AcceptedCourse from "../../components/AcceptedCourse";
import CancelledCourse from "../../components/CancelledCourse";
import PurchaseCourseBox from "../../components/PurchaseCourseBox";
import NoPurchasedCourse from "../../components/NoPurchasedCourse";

const ExpertDashboard = () => {
  const [showOrderOpt, setShowOrderOpt] = useState("A");
  const [sidebarOpt, setSidebarOpt] = useState("A");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [time, setTime] = useState("");
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [waitingCourses, setWaitingCourses] = useState([]);
  const [cancelledCourses, setCancelledCourses] = useState([]);
  const [acceptedCourses, setAcceptedCourses] = useState([]);
  const navigate = useNavigate();

  // Clock method
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get user id data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/expert/dashboard", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 401) {
          toast.error("User must be logged in");
          navigate("/auth/login");
        } else if (err.response?.status === 403) {
          toast.error("Access denied: wrong role");
          navigate("/");
        } else {
          toast.error("Something went wrong");
          navigate("/");
        }
      });
  }, []);

  // fetch course method
  const fetchCourse = () => {
    axios
      .post(
        "http://localhost:5000/expert/addcoursevideo",
        { userId: user._id },
        { withCredentials: true }
      )
      .then((res) => setCourses(res.data.uniqueCourses))
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };

  // Getting user's courses from backend
  useEffect(() => {
    if (!user?._id) return;
    fetchCourse();
  }, [sidebarOpt, user]);

  // Get purchased Course details from backend
  const fetchPurchasedCourse = () => {
    axios
      .post(
        "http://localhost:5000/purchase/purchasedcourses",
        { courses },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const purchased = res.data.purchasedCourses;
        setPurchasedCourses(purchased);
        // Waiting Courses
        setWaitingCourses(
          purchased.filter((course) => course.status === "waiting")
        );

        // Cancelled Courses
        setCancelledCourses(
          purchased.filter((course) => course.status === "cancelled")
        );

        // Accepted Courses
        setAcceptedCourses(
          purchased.filter((course) => course.status === "accepted")
        );
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };

  // Get purchased Course useEffect
  useEffect(() => {
    if (!user?._id) return;
    if (courses.length === 0) return;
    fetchPurchasedCourse();
  }, [sidebarOpt, user, courses]);

  // Change Status
  const changeStatus = (obj) => {
    const cId = obj.c_id;
    const st = obj.st;
    const userId = obj.userId;
    console.log("Change status is working");
    axios
      .post(
        "http://localhost:5000/purchase/changestatus",
        { st, cId, userId },
        { withCredentials: true }
      )
      .then((res) => {
        fetchPurchasedCourse();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };

  // Delete Course
  const deleteCourse = (courseName) => {
    axios
      .post(
        "http://localhost:5000/expert/deletecourse",
        { courseName },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Course Deleted Successfully");

        // Remove deleted courses
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.courseName !== courseName)
        );
      })
      .catch((err) => {
        toast.err(err.response?.data?.message || "Something went wrong");
      });
  };

  // Handle Logout method
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/users/auth/logout", {
      withCredentials: true,
    });
    navigate("/");
    toast.success("User logged out");
  };

  let totalRevenue = 0;

  if (courses.length > 0) {
    let totalPrice = courses.reduce(
      (sum, course) => sum + course.coursePrice,
      0
    );
    totalRevenue = totalPrice;
  }

  return (
    <>
      {loading === false ? (
        <div className="w-full h-auto p-2 flex flex-col justify-center items-center relative bg-gray-100">
          <div className="w-full h-[97vh] flex justify-between items-center">
            {/* side bar */}
            <div className="w-[28%] h-[98%] border-1 border-gray-200 rounded-xl shadow-2xl shadow-grey-400/50 bg-white z-2 mr-1">
              <p className="text-xl font-bold p-5 ">SkillsHub Sukkur</p>

              <div className="h-[84%] flex flex-col justify-between items-center mt-3 px-3">
                <div className="w-full flex flex-col items-center justify-center">
                  <div
                    className={`w-full h-[40px] flex items-center px-2 ${
                      sidebarOpt == "A" ? "bg-blue-500" : ""
                    } rounded-sm hover:cursor-pointer`}
                    onClick={() => setSidebarOpt("A")}
                  >
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      size="md"
                      className={`${
                        sidebarOpt == "A" ? "text-[white]" : "text-gray-700"
                      }`}
                    />
                    <p
                      className={`font-semibold ${
                        sidebarOpt == "A" ? "text-[white]" : "text-gray-500"
                      } text-sm ml-1`}
                    >
                      Manage Course
                    </p>
                  </div>

                  <div
                    className={`w-full h-[40px] flex items-center px-2 ${
                      sidebarOpt == "B" ? "bg-blue-500" : ""
                    } mt-3 rounded-sm hover:cursor-pointer`}
                    onClick={() => setSidebarOpt("B")}
                  >
                    <FontAwesomeIcon
                      icon={faBook}
                      size="md"
                      className={`${
                        sidebarOpt == "B" ? "text-[white]" : "text-gray-700"
                      }`}
                    />
                    <p
                      className={`font-semibold ${
                        sidebarOpt == "B" ? "text-white" : "text-gray-500"
                      } text-sm ml-1 `}
                    >
                      Courses
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <div
                  className="w-full h-[40px] shadow-md flex items-center mt-3  bg-[#ff777777] px-2 rounded-sm hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    size="sm"
                    style={{ color: "#ff7777ff" }}
                  />
                  <p className="font-semibold text-[#ff7777ff] text-sm ml-1 ">
                    Logout
                  </p>
                </div>
              </div>
            </div>

            {sidebarOpt == "B" ? (
              <div className="w-full h-[98%] py-5 px-11 mx-5 flex flex-wrap gap-10 bg-white border-1 border-gray-200 rounded-xl  overflow-y-scroll">
                {courses.length == 0 ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <img
                      src="/no course.avif"
                      className="w-[50%] h-auto"
                      alt="no course found image"
                    />
                  </div>
                ) : (
                  <>
                    {courses.map((course, index) => {
                      return (
                        <DashboardCourseBox
                          courseName={course.courseName}
                          courseId={course._id}
                          key={index}
                          deleteCourse={deleteCourse}
                          url={course.courseLink}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              <>
                {/* dashboard */}
                <div className="w-full h-full mx-5 flex flex-col justify-center items-center">
                  {/* First Intro Box */}
                  <div className="w-full h-[10%] py-2 px-4 bg-[white] border-1 border-gray-200 rounded-xl flex justify-between items-center">
                    {/* Title */}
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-bold">Course Tracker</p>
                      <p className="text-md ">Welcome to SkillsHub Sukkur</p>
                    </div>

                    <div className="h-full flex justify-center items-center">
                      {/* Clock */}
                      <div className="flex justify-between items-center bg-green-800/30 px-2 py-1 rounded-lg mr-8">
                        <FontAwesomeIcon
                          icon={faCalendarCheck}
                          size="md"
                          style={{ color: "#195707ff" }}
                        />
                        <p className="text-md ml-2">{time}</p>
                      </div>

                      {/* Profile */}
                      <div className="h-[80%] aspect-[1/1] bg-blue-400 mr-4 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faUser}
                          size="xl"
                          style={{ color: "#ffffffff" }}
                        />
                      </div>
                      <div className="flex flex-col justify-center items-start">
                        <p className="text-md">
                          {user?.name?.charAt(0).toUpperCase() +
                            user?.name?.slice(1)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user?.role?.charAt(0).toUpperCase() +
                            user?.role?.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info Boxes */}
                  <div className="w-full h-[20%] flex justify-between items-center mt-5">
                    <div className="flex flex-col w-[23%] h-full p-5 bg-[white] rounded-xl border-1 border-gray-200">
                      <FontAwesomeIcon
                        icon={faBook}
                        size="lg"
                        style={{ color: "#aaadaaff" }}
                      />
                      <p className="text-md text-gray-500 mt-5">
                        Total Courses
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        {courses.length}
                      </p>
                    </div>

                    <div className="flex flex-col w-[23%] h-full p-5 bg-[white] rounded-xl border-1 border-gray-200">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        size="lg"
                        style={{ color: "#aaadaaff" }}
                      />
                      <p className="text-md text-gray-500 mt-5">
                        Pending Courses
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        {waitingCourses.length}
                      </p>
                    </div>

                    <div className="flex flex-col w-[23%] h-full p-5 bg-[white] rounded-xl border-1 border-gray-200">
                      <FontAwesomeIcon
                        icon={faChartLine}
                        size="lg"
                        style={{ color: "#aaadaaff" }}
                      />
                      <p className="text-md text-gray-500 mt-5">
                        Total Revenue
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        PKR {totalRevenue}
                      </p>
                    </div>

                    <div className="flex flex-col w-[23%] h-full p-5 bg-[white] rounded-xl border-1 border-gray-200">
                      <FontAwesomeIcon
                        icon={faStar}
                        size="lg"
                        style={{ color: "#aaadaaff" }}
                      />
                      <p className="text-md text-gray-500 mt-5">
                        Customer Feedback
                      </p>
                      <p className="text-lg font-semibold mt-1">10</p>
                    </div>
                  </div>

                  {/* Show Details */}
                  <div className="w-full h-[10%] py-1 px-2 bg-[white] mt-5 border-1 border-gray-200 rounded-xl flex justify-start items-center">
                    <div className="w-[50%] h-[80%] bg-gray-200 px-2 rounded-xl flex justify-between items-center">
                      <div
                        className={`flex justify-center items-center ${
                          showOrderOpt == "A" ? "bg-white" : ""
                        } rounded-lg py-1 pl-[4px] pr-[10px] hover:cursor-pointer`}
                        onClick={() => setShowOrderOpt("A")}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          size="md"
                          style={{ color: "#aaadaaff" }}
                        />
                        <p className="text-[15px] text-gray-600 ml-1 font-semibold">
                          New
                        </p>
                      </div>

                      <div
                        className={`flex justify-center items-center ${
                          showOrderOpt == "B" ? "bg-white" : ""
                        } py-1 pl-[4px] pr-[10px] rounded-lg hover:cursor-pointer`}
                        onClick={() => setShowOrderOpt("B")}
                      >
                        <FontAwesomeIcon
                          icon={faMultiply}
                          size="md"
                          style={{ color: "#aaadaaff" }}
                        />
                        <p className="text-[15px] text-gray-600 ml-1 font-semibold">
                          Cancelled
                        </p>
                      </div>

                      <div
                        className={`flex justify-center items-center ${
                          showOrderOpt == "C" ? "bg-white" : ""
                        } py-1 pl-[4px] pr-[10px] rounded-lg hover:cursor-pointer`}
                        onClick={() => setShowOrderOpt("C")}
                      >
                        <FontAwesomeIcon
                          icon={faSpinner}
                          size="md"
                          style={{ color: "#aaadaaff" }}
                        />
                        <p className="text-[15px] text-gray-600 ml-1 font-semibold">
                          Waiting
                        </p>
                      </div>

                      <div
                        className={`flex justify-center items-center ${
                          showOrderOpt == "D" ? "bg-white" : ""
                        } py-1 pl-[4px] pr-[10px] rounded-lg hover:cursor-pointer`}
                        onClick={() => setShowOrderOpt("D")}
                      >
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          size="md"
                          style={{ color: "#aaadaaff" }}
                        />
                        <p className="text-[15px] text-gray-600 ml-1 font-semibold">
                          Accepted
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Data Box */}

                  {/* Add New Course Box */}
                  {showOrderOpt == "A" ? (
                    <div className="w-full h-[49%] p-10 bg-[white] mt-5 border-1 border-gray-200 rounded-xl flex justify-center items-center">
                      <img
                        src="/addCourse.png"
                        alt="Add Course Icon"
                        className="w-[10%] h-auto hover:cursor-pointer"
                        onClick={() => navigate("/expert/course")}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Cancelled Course Box */}
                  {showOrderOpt == "B" && (
                    <>
                      {cancelledCourses.length > 0 ? (
                        <PurchaseCourseBox>
                          {cancelledCourses.map((course) => (
                            <CancelledCourse key={course._id} course={course} />
                          ))}
                        </PurchaseCourseBox>
                      ) : (
                        <NoPurchasedCourse />
                      )}
                    </>
                  )}

                  {/* Wating Course Box */}
                  {showOrderOpt == "C" && (
                    <>
                      {waitingCourses.length > 0 ? (
                        <PurchaseCourseBox>
                          {waitingCourses.map((course) => (
                            <WaitingCourse
                              key={course._id}
                              course={course}
                              changeStatus={changeStatus}
                            />
                          ))}
                        </PurchaseCourseBox>
                      ) : (
                        <NoPurchasedCourse />
                      )}
                    </>
                  )}

                  {/* Accepted Course */}
                  {showOrderOpt == "D" && (
                    <>
                      {acceptedCourses.length > 0 ? (
                        <PurchaseCourseBox>
                          {acceptedCourses.map((course) => (
                            <AcceptedCourse key={course._id} course={course} />
                          ))}
                        </PurchaseCourseBox>
                      ) : (
                        <NoPurchasedCourse />
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ExpertDashboard;
