import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "./AuthenticationProvider";

type AuthProps = {
  children: React.ReactElement;
};
export const RequiredAuth = ({ children }: AuthProps) => {
  const result = useAuthentication();
  const authData = result?.authData;
  const location = useLocation();

  console.log("Require Auth says hello ", authData?.name);
  if (!authData?.name) {
    console.log("No USER!!!!!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
