import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [role, setRole] = useState("learner");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, role };
    try {
      const response = await axios.post(
        "http://localhost:5000/users/auth/register",
        dataToSend,
        { withCredentials: true }
      );

      if (response.data.user) {
        toast.success(role + " registered successfully");
        setFormData({ name: "", email: "", password: "" });
        navigate("/");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-[30px]">REGISTER</h1>

      <div className="w-[90%] h-auto flex justify-center">
        <div
          className={`px-2 py-1 rounded-l-md hover:cursor-pointer ${
            role == "learner"
              ? "bg-green-500 shadow-md text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setRole("learner")}
        >
          Learner
        </div>

        <div
          className={`px-2 py-1 rounded-r-md hover:cursor-pointer ${
            role == "expert"
              ? "bg-green-500 shadow-md text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setRole("expert")}
        >
          Expert
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-content items-center"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-[90%] h-[50px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-[90%] h-[50px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-[90%] h-[50px] p-3 border-1 border-gray-200 rounded-lg mt-[20px] outline-none focus:border-[#086788]"
        />

        <button
          type="submit"
          className="w-[90%] h-[50px] p-3 rounded-lg mt-[30px] bg-[#086788] text-lg text-[white] hover:cursor-pointer"
        >
          Register
        </button>
      </form>

      <div className="w-[90%] h-auto flex justify-center text-sm mt-[25px]">
        <p className="mr-[5px] text-gray-600">Already have an account?</p>
        <Link to="/auth/login" className="text-[#086788] hover:underline">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;
