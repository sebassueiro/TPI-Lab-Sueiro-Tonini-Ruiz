import React from 'react'
import { Navigate } from "react-router";

const ProtectedAdmin = ({children}) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userType = userData ? userData.userType : null;
    
    if (userType === "admin" || userType === "superAdmin") {
        return children;
      } else return <Navigate to="/mainPage" replace />;
}


export default ProtectedAdmin