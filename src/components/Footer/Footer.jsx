import React from "react";
import style from "./Footer.module.css"

export default function Footer(){
    return <>
    <div className="bg-gray-200 fixed bottom-0 left-0 right-0 ">
        <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl p-1.5">
            <ul className="flex gap-10">
                <li><i className="fab fa-facebook text-gray-500 text-2xl"></i></li>
                <li><i className="fab fa-youtube text-gray-500 text-2xl"></i></li>
                <li><i className="fab fa-instagram text-gray-500 text-2xl"></i></li>
                <li><i className="fab fa-linkedin text-gray-500 text-2xl"></i></li>
                <li><i className="fab fa-twitter text-gray-500 text-2xl"></i></li>
                <li><i className="fab fa-tiktok  text-gray-500 text-2xl"></i></li>
            </ul>
        </div>    
    </div>
    </>
}