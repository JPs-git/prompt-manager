import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import CreatePrompt from "../pages/CreatePrompt";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/create/:id",
    element: <CreatePrompt />,
  },
  {
    path: "/create",
    element: <CreatePrompt />,
  },
  // 其余重定向至/home
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
]);

export default router;
