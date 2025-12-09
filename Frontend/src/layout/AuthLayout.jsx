import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div
        className="w-[400px] h-auto py-[40px] bg-[white] border-1 border-gray-200 shadow-xl rounded-xl flex flex-col justify-center items-center"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <Outlet />
        {/* Login and registration page will appear here */}
      </div>
    </div>
  );
};

export default AuthLayout;
