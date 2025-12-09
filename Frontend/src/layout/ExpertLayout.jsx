import { Outlet } from "react-router-dom";

const ExpertLayout = () => {
  return (
    <div
      className="w-full h-auto flex flex-col"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Outlet />
    </div>
  );
};

export default ExpertLayout;
