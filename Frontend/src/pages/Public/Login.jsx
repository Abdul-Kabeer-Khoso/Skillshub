import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("learner");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, role };
    try {
      const response = await axios.post(
        "http://localhost:5000/users/auth/login",
        dataToSend,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-[20px]">LOGIN</h2>

      <div className="w-[90%] h-auto flex justify-center">
        <div
          className={`px-2 py-1 rounded-l-md border-none ${
            role === "learner"
              ? "bg-green-500 shadow-md text-white"
              : "bg-gray-100 shadow-none"
          } hover:cursor-pointer`}
          onClick={() => setRole("learner")}
        >
          Learner
        </div>
        <div
          className={`px-2 py-1 rounded-r-md border-none ${
            role === "expert"
              ? "bg-green-500 shadow-md text-white"
              : "bg-gray-100 shadow-none"
          } hover:cursor-pointer`}
          onClick={() => setRole("expert")}
        >
          Expert
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center"
      >
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
          placeholder="Email"
          className="w-[90%] h-[50px] p-3 border-1 border-gray-300 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
        />

        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-[90%] h-[50px] p-3 border-1 border-gray-300 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
        />

        <button
          type="submit"
          className="w-[90%] h-[50px] p-3 rounded-1 rounded-lg bg-[#086788] text-lg text-[white] mt-[30px] hover:cursor-pointer "
        >
          Login
        </button>
      </form>

      <div className="w-[90%] h-auto flex justify-center mt-[25px] text-sm">
        <p className="text-gray-600 mr-[5px]">Don't have an account?</p>
        <Link to="/auth/register" className="text-[#086788] hover:underline">
          Register
        </Link>
      </div>
    </>
  );
};

export default Login;
