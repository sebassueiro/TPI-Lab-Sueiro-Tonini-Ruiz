import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import AddProduct from "./components/addProduct/AddProduct";
import CreateAdmin from "./components/createAdmin/CreateAdmin";
import ManageUser from "./components/manageUser/ManageUser";
import ManageProducts from "./components/manageProducts/ManageProducts";
import Protected from "./components/protected/Protected";

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
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/addProduct",
      element: (
        <Protected>
          <AddProduct />
        </Protected>
      ),
    },
    {
      path: "/manageProducts",
      element: (
        <Protected>
          <ManageProducts />
        </Protected>
      ),
    },
    {
      path: "/manageUser",
      element: (
        <Protected>
          <ManageUser />
        </Protected>
      ),
    },
    {
      path: "/createAdmin",
      element: (
        <Protected>
          <CreateAdmin />
        </Protected>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
