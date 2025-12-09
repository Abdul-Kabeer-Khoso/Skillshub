import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardCourseBox = ({ url, courseId, courseName, deleteCourse}) => {
  // Get thumbnail image from youtube video url
  const getYoutubeThumbnail = (videoUrl) => {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };


  return (
    <div className="w-[278px] h-[260px] pb-2 flex flex-col  border-1 rounded-xl shadow-lg border-gray-300">
      <div
        className="w-full h-[170px] rounded-xl bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${getYoutubeThumbnail(url)})` }}
      ></div>
      <div className="w-full h-auto flex-col justify-start mt-2 p-2">
        <div className="w-full h-auto pr-2 text-lg font-semibold overflow-hidden">
          <p className="line-clamp-2">{courseName}</p>
        </div>
        <button
          className="bg-red-500 w-[33%] py-1 px-2 rounded-md text-md border-1 border-gray-200 flex justify-center items-center text-white mt-2  hover:cursor-pointer hover:bg-red-600"
          onClick={()=>deleteCourse(courseName)}
        >
          <FontAwesomeIcon
            icon={faTrash}
            size="md"
            className="mr-2"
            style={{ color: "#ffffffff" }}
          />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DashboardCourseBox;
