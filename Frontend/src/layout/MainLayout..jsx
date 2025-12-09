import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      className="w-full h-auto flex flex-col relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Outlet />
    </div>
  );
};

export default MainLayout;
