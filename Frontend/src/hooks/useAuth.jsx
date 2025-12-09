import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState({
    loading: true,
    loggedIn: false,
    user: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        setAuth({
          loading: false,
          loggedIn: res.data.loggedIn,
          user: res.data.user || null,
        });
      })
      .catch(() => {
        setAuth({ loading: false, loggedIn: false, user: null });
      });
  }, []);

  return auth;
};

export default useAuth;
