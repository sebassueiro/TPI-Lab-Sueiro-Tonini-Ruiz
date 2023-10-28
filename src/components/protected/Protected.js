import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const Protected = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userType = userData ? userData.userType : null;

  if (!user) {
    return <Navigate to="/mainPage" replace />;
  } else if (userType !== "admin" || userType !== "superAdmin") {
    return <Navigate to="/mainPage" replace />;
  } else if (userType !== "superAdmin") {
    return <Navigate to="/mainPage" replace />;
  } else return children;
};

export default Protected;
