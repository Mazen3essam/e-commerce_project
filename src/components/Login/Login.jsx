import React, { useContext, useState } from "react";
import style from "./Login.module.css"
import { useFormik } from "formik";
import * as yup from "yup"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";



export default function Login(){

    let{userLogin , setuserLogin , userRole , setuserRole } =useContext(UserContext)
    let navigate = useNavigate()
    let[IsLoading, setIsLoading] = useState(false)

    function handleLogin(values) {
        setIsLoading(true)
        //call api
        // http://marketplace.runasp.net/

        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)

        .then((res)=>{
            setIsLoading(false)
            //
            if(res.data.message =="success"){
                localStorage.setItem("userRole","user")

                if( localStorage.getItem("userRole") == "vendor"){
                    //console.log(res.data.user.role);
                    localStorage.setItem("userToken",res.data.token)
                    setuserLogin(res.data.token) 
                    setuserRole("vendor")    
                    toast.success("Welcome back",{duration: 6000,icon: '❤️'})
                    navigate("/")
                }
                else if( localStorage.getItem("userRole") == "admin"){
                    //console.log(res.data.user.role);
                    localStorage.setItem("userToken",res.data.token)
                    setuserLogin(res.data.token) 
                    setuserRole("admin")    
                    toast.success("Welcome back",{duration: 6000,icon: '❤️'})
                    navigate("/")
                }
                else if( localStorage.getItem("userRole") == "user"){
                    //console.log(res.data.user.role);
                    localStorage.setItem("userToken",res.data.token)
                    setuserLogin(res.data.token) 
                    setuserRole("user")    
                    toast.success("Welcome back",{duration: 6000,icon: '❤️'})
                    navigate("/")
                }
            }
            //

            /*
            if(res.data.message =="success"){
                if(res.data.user.role == "user"){
                    localStorage.setItem("userRole","user")
                    localStorage.setItem("userToken",res.data.token)
                    setuserLogin(res.data.token) 
                    setuserRole("user")    
                    toast.success("Welcome back",{duration: 6000,icon: '❤️'})
                    navigate("/")
                }
                else if(res.data.user.role == "vendor"){
                    localStorage.setItem("userRole","vendor")
                    localStorage.setItem("userToken",res.data.token)
                    setuserLogin(res.data.token) 
                    setuserRole("vendor")    
                    toast.success("Welcome back",{duration: 6000,icon: '❤️'})
                    navigate("/vendor")
                }
                    else if(res.data.user.role == "admin"){
                    localStorage.setItem("userRole","admin")
                    localStorage.setItem("userToken",res.data.token)
                    setuserLogin(res.data.token) 
                    setuserRole("admin")    
                    toast.success("Welcome back",{duration: 6000,icon: '❤️'})
                    navigate("/admin")
                }
            }
            
            */
        })
        .catch((res)=>{
            setIsLoading(false)
            toast.error(res.response.data.message,{duration: 6000,})
        })


    }

    let myValidation = yup.object().shape({
        email: yup.string().email(" not valid email ").required(" email is required ").matches(/^[a-zA-Z]{3,}/,"email must start with 3 char at least") ,
        password: yup.string().min(6, " min lenght is 6 ").required(" password is required ") ,
    })

    let formik = useFormik({
        initialValues :{
            email:"",
            password:"",
        },
        validationSchema: myValidation,
        onSubmit:handleLogin,
    })


    return <>
        
        
    <div className="mb-5 col-span-12 block text-2xl font-medium text-gray-700 ">Login</div>
    <form onSubmit={formik.handleSubmit} className="w-5/6 mx-auto mt-5 lg:grid lg:grid-cols-12 lg:gap-2">


        <div className="mb-5 col-span-12">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 ">Email</label>
            <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 " placeholder="name@gmail.com" required />
            { formik.errors.email && formik.touched.email ?(
                <div className="p-3 text-sm text-red-800" role="alert">
                    <span className="font-medium">{formik.errors.email}</span>
                </div> ): null
            }
        </div>


        <div className="mb-5 col-span-12">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 ">password</label>
            <input type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 " required />
            { formik.errors.password && formik.touched.password ?(
                <div className="p-3 text-sm text-red-800" role="alert">
                    <span className="font-medium">{formik.errors.password}</span>
                </div> ): null
            }
        </div>


        <button type="submit" className="text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center col-end-10 col-start-4">
            {IsLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : "Login"}
        </button>


        <div className=" text-amber-600 font-medium text-sm py-2.5 text-center col-end-10 col-start-4">
           <span className="text-gray-600"> Don't have an account ? </span> <Link to={"/register"}> Register now </Link>
        </div>
  
    </form>

    </>
}