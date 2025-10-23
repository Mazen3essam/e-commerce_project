import React from "react";
import style from "./AdminProtectedRoute.module.css"
import { Navigate } from "react-router-dom";


export default function AdminProtectedRoute(props){
    if(localStorage.getItem("userToken")&&localStorage.getItem("userRole")=="admin"){
        return props.children
    }
    else{
        return <Navigate to={"/login"} />
    }
}