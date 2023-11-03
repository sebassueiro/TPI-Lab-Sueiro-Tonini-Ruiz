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
import ManageUser from "./components/manageUser/ManageUser";
import ManageProducts from "./components/manageProducts/ManageProducts";
import ProtectedAdmin from "./components/protectedAdmin/ProtectedAdmin";
import ProtectedSuperAdmin from "./components/protectedSuperAdmin/ProtectedSuperAdmin";
import CreateUser from "./components/createUser/CreateUser";
import Cart from "./components/cart/Cart";
import ProtectedUser from "./components/protectedUser/ProtectedUser";
import ManageSales from "./components/manageSales/ManageSales";

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
        <ProtectedAdmin>
          <AddProduct />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/manageProducts",
      element: (
        <ProtectedAdmin>
          <ManageProducts />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/manageUser",
      element: (
        <ProtectedSuperAdmin>
          <ManageUser />
        </ProtectedSuperAdmin>
      ),
    },
    {
      path: "/createUser",
      element: (
        <ProtectedSuperAdmin>
          <CreateUser />
        </ProtectedSuperAdmin>
      ),
    },
    {
      path: "/cart",
      element: (
        <ProtectedUser>
          <Cart />
        </ProtectedUser>
      ),
    },
    {
      path: "/manageSales",
      element: (
        <ProtectedAdmin>
          <ManageSales />
        </ProtectedAdmin>
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
