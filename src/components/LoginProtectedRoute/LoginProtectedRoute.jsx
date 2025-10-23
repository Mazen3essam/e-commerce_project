import React from "react";
import style from "./LoginProtectedRoute.module.css"
import { Navigate } from "react-router-dom";

export default function LoginProtectedRoute(props){
    
    if(localStorage.getItem("userToken")&&localStorage.getItem("userRole")=="user"){
        return <Navigate to={"/"} />
    }
    else if(localStorage.getItem("userToken")&&localStorage.getItem("userRole")=="vendor"){
        return <Navigate to={"/"} />
    }
    else if(localStorage.getItem("userToken")&&localStorage.getItem("userRole")=="admin"){
        return <Navigate to={"/"} />
    }
    else{
        return props.children
    }
}



