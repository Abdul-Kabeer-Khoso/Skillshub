import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const useCheckRole = (url) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url, { withCredentials: true })
    then()
    .catch((err) => {
      if (err.response?.status === 401) {
        toast.error("You must be logged in");
        navigate("/auth/login");
      } else if (err.response?.status === 403) {
        toast.error("Access denied: wrong role");
        navigate("/");
      }
    });
  }, [URL, navigate]);
};

export default useCheckRole;
