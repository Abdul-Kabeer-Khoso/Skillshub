import SubjectIconsBox from "./SubjectIconsBox";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from "axios";

const HeroSection = ({formData, onChange}) => {
  const navigate = useNavigate();
  const { loading, loggedIn, user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/users/auth/logout", {
      withCredentials: true,
    });
    window.location.href = "/";
    toast.success("Logged out successfully");
  };

  return (
    <div className="w-full h-[85vh] bg-gradient-to-t from-[#32c4c0] to-[#8de9d5] rounded-b-[50px] flex flex-col justify-center items-center">
      <div className="flex w-[98vw] justify-between h-auto px-5 absolute top-0 left-0">
        <img src="/logo.png" className="w-[9vw]" />
        {user == null ? (
          <div className="h-auto py-10">
            <button
              className="bg-[#086788] rounded-[50px] w-auto px-4 h-10 shadow-lg text-white font-semibold hover:cursor-pointer"
              onClick={() => navigate("/auth/register")}
            >
              Register
            </button>
            <button
              className="bg-[#ff6600] rounded-[45px] w-[100px]  h-10 shadow-lg text-white font-semibold ml-5 hover:cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="h-[60px] mt-10 mr-1 pl-3 pr-15 flex justify-start items-center relative bg-[#32c4c0] border-1 border-[#32f4cf] rounded-4xl">
            <div
              className="w-[40px] h-[40px] rounded-[50%] bg-green-500 border-2 border-white flex justify-center items-center text-[18px] font-semibold text-white mr-4 hover:cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            >
              {user.name[0]}
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="font-semibold text-[16px]">{user.name}</p>
              <p className="text-[14px]">{user.role}</p>
            </div>
            {showProfile ? (
              <div className="absolute top-17 w-[170px] flex flex-col items-start bg-gray-100 shadow-lg border-1 border-gray-200 rounded-lg px-1 py-2">
                <Link
                  to={
                    user.role == "learner"
                      ? "/learner/dashboard"
                      : "/expert/dashboard"
                  }
                  className="pl-1 pr-[51%] flex items-center rounded-sm hover:bg-gray-300 "
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    size="md"
                    style={{ color: "#1eac02ff" }}
                    className="mr-1"
                  />
                  Profile
                </Link>
                <Link
                  onClick={handleLogout}
                  className="pl-1 pr-[49%] mt-1 flex items-center rounded-sm hover:bg-gray-300"
                >
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    size="md"
                    style={{ color: "#c01206ff" }}
                    className="mr-1"
                  />
                  Logout
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <p className="font-bold text-[3vw]">Find the</p>
      <p className="font-bold text-[3vw]">perfect tutor</p>
      <div className="relative mt-7">
        <input
          className="w-[40vw] h-15 pl-5 pr-35 py-3 rounded-4xl bg-[white] border-1 border-[white] font-semibold text-gray-800 outline-none focus:border-[#086788]"
          type="text"
          value={formData}
          onChange={onChange}
          placeholder="What you want to learn?"
        />
        <button className="bg-[#086788] rounded-[50px] w-[8vw] h-12 text-white absolute right-[5px] top-[5px] font-semibold hover:cursor-pointer">
          Search
        </button>
      </div>

      <div className="w-[70vw] h-20 rounded-[100px] bg-[white] mt-10 px-7">
        <SubjectIconsBox />
      </div>
    </div>
  );
};

export default HeroSection;
