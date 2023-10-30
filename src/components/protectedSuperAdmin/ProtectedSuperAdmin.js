import React from 'react'
import { Navigate } from "react-router";


const ProtectedSuperAdmin = ({children}) => {

    const userData = JSON.parse(localStorage.getItem("user"));
    const userType = userData ? userData.userType : null;
  
    if (userType === "superAdmin") {
        return children;
      } else return <Navigate to="/mainPage" replace />;
}

export default ProtectedSuperAdmin