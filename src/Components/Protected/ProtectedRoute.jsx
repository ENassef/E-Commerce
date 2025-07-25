import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    let { userToken } = useContext(AuthContext);

    const { pathname } = useLocation();

    console.log(location.pathname);

    const isAuthenticated = localStorage.getItem("token") !== null && userToken !== null;
    const isAuthRoute = ["/login", "/register", "/resetPassword"].includes(pathname);

    if (isAuthenticated) {
        return isAuthRoute ? <Navigate to="/" /> : children;
    } else {
        return isAuthRoute ? children : <Navigate to="/login" />;
    }
}
