import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faMicrophone,
  faSquareRootVariable,
  faPaintBrush,
  faLanguage,
  faEarth,
  faBook,
  faCamera,
  faBasketball,
} from "@fortawesome/free-solid-svg-icons";
const SubjectIconsBox = () => {
  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          icon={faSquareRootVariable}
          size="xl"
          style={{ color: "#585959" }}
        />
        <p className="text-[#585959] text-sm font-semibold">Mathematic</p>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          icon={faMicrophone}
          size="xl"
          style={{ color: "#585959" }}
        />
        <p className="text-[#585959] text-sm font-semibold">Singing</p>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          icon={faComputer}
          size="xl"
          style={{ color: "#585959" }}
        />
        <p className="text-[#585959] text-sm font-semibold">Computer</p>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          icon={faPaintBrush}
          size="xl"
          style={{ color: "#585959" }}
        />
        <p className="text-[#585959] text-sm font-semibold">Drawing</p>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          icon={faLanguage}
          size="xl"
          style={{ color: "#585959" }}
        />
        <p className="text-[#585959] text-sm font-semibold">Language</p>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          icon={faEarth}
          size="xl"
          style={{ color: "#585959" }}
        />
        <p className="text-[#585959] text-sm font-semibold">Geography</p>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon icon={faBook} size="xl" style={{ color: "#585959" }} />
        <p className="text-[#585959] text-sm font-semibold">Reading</p>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          icon={faCamera}
          size="xl"
          style={{ color: "#585959" }}
        />
        <p className="text-[#585959] text-sm font-semibold">Photography</p>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          icon={faBasketball}
          size="xl"
          style={{ color: "#585959" }}
        />
        <p className="text-[#585959] text-sm font-semibold">Sports</p>
      </div>
    </div>
  );
};

export default SubjectIconsBox;
