import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Public/Login";
import Register from "../pages/Public/Register";
import Home from "../pages/Public/Home";
import MainLayout from "../layout/MainLayout.";
import ExpertLayout from "../layout/ExpertLayout";
import ExpertProfilePage from "../pages/Expert/ExpertProfilePage";
import AddCourse from "../pages/Expert/AddCourse";
import ExpertDashboard from "../pages/Expert/ExpertDashboard";
import WatchCourse from "../pages/Learner/WatchCourse";
import NotFound from "../pages/Error/NotFound";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <Home /> }],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "/learner/course/:id",
    element: <WatchCourse />,
  },

  {
    path: "/expert",
    element: <ExpertLayout />,
    children: [
      { path: "profile", element: <ExpertProfilePage /> },
      { path: "course", element: <AddCourse /> },
      { path: "dashboard", element: <ExpertDashboard /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default AppRouter;
