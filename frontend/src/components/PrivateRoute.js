import React from "react";
import { isLoggedIn } from "../helpers/login-helpers";
import { Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
    const islogged = isLoggedIn();

    if (!islogged) return (<Navigate to="/" />);
    return (
        <div>{props.children}</div>
    )
}