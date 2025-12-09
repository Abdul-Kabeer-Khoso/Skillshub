import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseVideoBox = ({ url, title, courseStatus, changeVideo, course }) => {
  // Get thumbnail image from youtube video url
  const getYoutubeThumbnail = (videoUrl) => {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const myCourse = course;

  return (
    <div className="w-[286px] h-[260px] pb-2 flex flex-col mt-8 border-1 rounded-xl shadow-lg border-gray-300 relative">
      {courseStatus !== "accepted" && (
        <div className="w-[286px] h-[260px] h-full flex justify-center items-center rounded-xl bg-[#00000098] text-white absolute">
          <FontAwesomeIcon
            icon={faLock}
            size="2xl"
            style={{ color: "#ffffffff" }}
          />
        </div>
      )}
      <div
        className="w-full h-[160px] rounded-xl bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${getYoutubeThumbnail(url)})` }}
      ></div>
      <div className="w-full h-auto flex-col justify-start mt-2 p-2">
        <div className="w-full h-auto pr-2 text-lg font-semibold overflow-hidden">
          <p className="line-clamp-2">{title}</p>
        </div>
        <button
          className="bg-orange-500 w-[40%] py-1 rounded-md text-sm border-1 border-gray-200 text-white mt-2  hover:cursor-pointer hover:bg-orange-600 hover:font-semibold"
          onClick={() => {
            changeVideo(myCourse, title);
          }}
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

export default CourseVideoBox;
