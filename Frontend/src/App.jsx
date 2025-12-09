import "./App.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 3000 }}
        reverseOrder={false}
      />
      <RouterProvider router={AppRouter} />
    </>
  );  
}

export default App;
