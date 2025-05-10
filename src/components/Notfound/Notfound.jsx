import React from "react";
import style from "./Notfound.module.css"
import { Link } from "react-router-dom";

export default function Notfound(){
    return <>

        <div className="container px-6 lg:py-12 lg:mt-24 lg:flex lg:items-center lg:gap-12">

            <div className="w-full lg:w-1/2 lg:text-left">
                <p className="text-lg font-medium text-amber-500">404 error</p>
                <h1 className="mt-3 font-semibold text-black text-4xl">Page not found</h1>
                <p className="mt-4 text-gray-500 w-full">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>
                <div className="flex items-center mt-6 gap-x-3">
                    <Link  className="w-full lg:w-1/2 px-5 py-2 text-sm  text-black bg-amber-400 rounded-lg  hover:bg-amber-500 text-center" to="/">Take me home</Link>
                </div>

            </div>

            <div className=" w-full mt-8 lg:w-1/2 lg:mt-0">
                <i className="w-full fa-solid fa-hat-cowboy text-amber-500 text-9xl pb-3.5"></i>
                <span className="w-full text-black text-6xl font-bold ">Gargerko</span>
            </div>

        </div>

    </>
}