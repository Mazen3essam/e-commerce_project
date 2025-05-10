import React, { useContext } from "react";
import style from "./Navbar.module.css"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { CartContext } from "../../context/cartContext";


export default function Navbar(){


    let{userLogin , setuserLogin} =useContext(UserContext)
    let{ itemsNumber } = useContext(CartContext)
    let navigate = useNavigate()

    function signout(){
        localStorage.removeItem("userToken");
        setuserLogin(null);
        navigate("/")
        toast.success("Bye Bye",{duration: 6000,icon: '😞'})
    }

    return <>
        
        
        

<nav className="bg-gray-200 fixed top-0 left-0 right-0 z-50">

    <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-1.5">

        <div className="flex items-center gap-2 md:gap-7">

            <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
                <i className="fa-solid fa-hat-cowboy text-amber-500 text-5xl"></i>
                <span className=" text-black text-3xl font-bold">Gargerko</span>
            </Link> 

            <ul className="flex gap-3 text-gray-600">
                <li><Link className="text-gray-600" to="">Home</Link></li>

                {userLogin != null ? <>
                    <li><Link className="text-gray-600 relative" to="cart">Cart
                        <div className="absolute top-[-15px] right-[-10px] size-4 text-xs font-semibold bg-amber-500 text-black rounded-full flex items-center justify-center">
                            {itemsNumber}
                        </div>

                    </Link></li>
                    <li><Link className="text-gray-600" to="products">Products</Link></li>
                    <li><Link className="text-gray-600" to="categories">Categories</Link></li>
                    <li><Link className="text-gray-600" to="wishlist">Wishlist</Link></li>
                </>:null}
            </ul>

        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse mx-2 md:mx-0">

            <ul className="flex gap-3">
                
                {userLogin != null ?<li><span onClick={signout} className="text-amber-600 cursor-pointer">Logout</span></li>:<>
                    <li><Link className="text-amber-600" to="login">Login</Link></li>
                    <li><Link className="text-amber-600" to="register">Register</Link></li>
                </>}

            </ul>

        </div>


    </div>

</nav>




    </>
}