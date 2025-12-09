import { faPlay, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CancelledCourse = ({ course }) => {
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

      <p className="font-semibold text-red-500 text-md">CANCELLED</p>
    </div>
  );
};

export default CancelledCourse;
