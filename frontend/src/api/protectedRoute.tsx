import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/store";
import verifyToken from "./verifyToken";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const accesstoken = useAuthStore((state) => state.accesstoken);
  useEffect(() => {
    const validateToken = async () => {
      if (accesstoken) {
        const isValid = await verifyToken();
        setIsTokenValid(isValid ?? false);
      } else {
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [accesstoken]);
  if ((isTokenValid !== null) && (!isTokenValid)){
    // Redirect to login if the token is invalid or expired
    return <Navigate to="/breastultrasound"/>;
  }
  // Otherwise, render the requested route
  return children;
};

export default ProtectedRoute;