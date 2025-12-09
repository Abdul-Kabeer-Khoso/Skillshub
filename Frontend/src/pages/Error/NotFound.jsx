import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen  flex justify-center items-center relative">
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

      <img
        src="/page not found.png"
        alt="Page not found image"
        className="w-[50%]"
      />
    </div>
  );
};

export default NotFound;
