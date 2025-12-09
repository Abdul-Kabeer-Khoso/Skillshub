import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ExpertProfileCard = ({ url, name, description, price, courseId }) => {
  // Get thumbnail image from youtube video url
  const getYoutubeThumbnail = (videoUrl) => {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const navigate = useNavigate();

  // Watch course
  const watchCourse = () => {
    navigate(`/learner/course/${courseId}`);
  };

  return (
    <div
      className="w-[278px] h-[300px] pb-2 flex flex-col mt-8 border-1 rounded-xl shadow-lg border-gray-300 hover:cursor-pointer"
      onClick={() => watchCourse()}
    >
      <div
        className="w-full h-[155px] rounded-xl bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${getYoutubeThumbnail(url)})` }}
      ></div>
      <div className="w-full h-auto flex-col justify-start mt-2 p-2">
        <div className="w-full h-[70px] pr-2 text-sm font-semibold overflow-hidden">
          {name}
          <span className="text-sm font-normal line-clamp-2">
            {description}{" "}
          </span>
        </div>

        <div className="w-full h-auto flex justify-between items-center mt-2">
          <span className="text-md font-semibold">PKR {price}</span>
          <div>
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              style={{ color: "#ffee00ff" }}
            />
            <span className="text-sm font-semibold">5</span>
            <span className="text-sm">(50 reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfileCard;
