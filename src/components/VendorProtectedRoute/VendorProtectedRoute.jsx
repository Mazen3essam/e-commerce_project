import React from "react";
import style from "./VendorProtectedRoute.module.css"
import { Navigate } from "react-router-dom";


export default function VendorProtectedRoute(props){
    if(localStorage.getItem("userToken")&&localStorage.getItem("userRole")=="vendor"){
        return props.children
    }
    else{
        return <Navigate to={"/login"} />
    }
}