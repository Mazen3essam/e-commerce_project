import React, { useContext } from "react";
import style from "./Home.module.css"
import RecentProducts from './../RecentProducts/RecentProducts';
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { UserContext } from "../../context/UserContext";
import VendorHome from './../VendorHome/VendorHome';

export default function Home(){

    let{userLogin , setuserLogin ,userRole , setuserRole} =useContext(UserContext)


    return <>
        {userRole != "vendor"?
            userRole != "admin"?
                <><CategoriesSlider/>
                <RecentProducts/></>
            :null
        :<VendorHome/>}
        
    </>
}