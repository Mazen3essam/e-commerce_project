import React from "react";
import style from "./Layout.module.css"
import Footer from './../Footer/Footer';
import Navbar from './../Navbar/Navbar';
import { Outlet } from "react-router-dom";


export default function Layout(){
    return <>
        <Navbar/>

        <div className="container my-5 py-15 md:py-5">
            <Outlet/>
        </div>



        <Footer/>
    </>
}