import {
  faCheckSquare,
  faPlay,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WaitingCourse = ({ course, changeStatus }) => {
  return (
    <div className="w-full h-[20%] bg-gray-100 rounded-lg p-2 mt-3 border-1 border-gray-200 flex items-center justify-evenly">
      {/* User Icon */}
      <div className="w-[23%] h-full flex justify-start items-center">
        <div className="w-[40px] h-[95%] rounded-full bg-orange-500 mr-3 flex justify-center items-center">
          <FontAwesomeIcon
            icon={faUser}
            size="xl"
            style={{ color: "#ffffffff" }}
          />
        </div>
        {/* User name */}
        <p className="font-semibold text-lg">{course.userId.name}</p>
      </div>

      {/* Video Icon Box */}
      <div className="w-[30%] h-full flex justify-start items-center">
        <div className="w-[40px] h-[80%] rounded-md flex justify-center items-center bg-gray-500">
          <FontAwesomeIcon
            icon={faPlay}
            size="xl"
            style={{ color: "#ffffffff" }}
          />
        </div>
        <p className="font-bold text-lg ml-2 ">{course.courseId.courseName}</p>
      </div>

      {/* Price Box */}
      <div className="w-[15%] h-full flex justify-start items-center font-bold text-lg">
        PKR {course.courseId.coursePrice}
      </div>

      {/* Buttons */}
      <div className="w-[23%] h-full flex justify-between items-center">
        <button
          className="flex pl-1 pr-3 py-2 rounded-md bg-red-500 text-white justify-center items-center hover:cursor-pointer"
          onClick={() => {
            changeStatus({
              st: "cancelled",
              c_id: `${course.courseId._id}`,
              userId: `${course.userId._id}`,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faTrash}
            size="lg"
            style={{ color: "#ffffffff" }}
            className="mr-2"
          />
          Cancel
        </button>

        <button
          className="px-2 py-2 rounded-sm bg-green-500 text-white flex justify-between items-center hover:cursor-pointer"
          onClick={() => {
            changeStatus({
              st: "accepted",
              c_id: `${course.courseId._id}`,
              userId: `${course.userId._id}`,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faCheckSquare}
            size="xl"
            style={{ color: "#ffffffff" }}
            className="mr-2"
          />
          Accept
        </button>
      </div>
    </div>
  );
};

export default WaitingCourse;
