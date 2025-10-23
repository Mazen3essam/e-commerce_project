import React from "react";
import style from "./VendorLayout.module.css"
import { Outlet } from "react-router-dom";
import Navbar from './../Navbar/Navbar';

export default function VendorLayout(){
    return <>
        <Navbar/>

        <div className="container my-5 py-15 md:py-5">
            <Outlet/>
        </div>

    </>
}