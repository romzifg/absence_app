import Absence from "./pages/Absence";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Report from "./pages/Report";
import Auth from "./pages/Auth";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Absence />,
    },
    {
      path: "/report",
      element: <Report />,
    },
    {
      path: "/login",
      element: <Auth />,
    },
  ]);

  return (
    <div className="h-full mx-10 my-3">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
