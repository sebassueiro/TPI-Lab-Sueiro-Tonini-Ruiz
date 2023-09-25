import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/mainPage" replace />,
    },
    {
      path: "/mainPage",
      element: <MainPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:"/signUp",
      element: <SignUp/>
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
