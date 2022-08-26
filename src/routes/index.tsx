import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

interface Props {
   children: any;
}

function PrivateRoute({ children }: Props) {
   const authContext = useAuth();
   return !authContext.isLogged ? <Navigate to="/" /> : children;
}

export default PrivateRoute;
