import React, { useContext, useState } from "react";
import style from "./Register.module.css"
import { useFormik } from "formik";
import * as yup from "yup"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";


export default function Register(){

    let{userLogin , setuserLogin} =useContext(UserContext)
    let navigate = useNavigate()
    let[IsLoading, setIsLoading] = useState(false)

    function handleRegister(values) {
        setIsLoading(true)
        //call api

        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)

        .then((res)=>{
            setIsLoading(false)
            if(res.data.message =="success"){
                if(res.data.user.role == "user"){
                    localStorage.setItem("userToken",res.data.token)
                    setuserLogin(res.data.token)
                    //go to customer home
                    toast.success("Welcome",{duration: 6000,icon: '🤗'})
                    navigate("/")
                }
                else{
                    // go to vendor home
                }
            }
        })
        .catch((res)=>{
            setIsLoading(false)
            toast.error(res.response.data.message,{duration: 6000,})
        })


    }

    let myValidation = yup.object().shape({
        name : yup.string().min(3, " min lenght is 3 char ").max(25 , " max lenght is 25 char ").required(" name is required ") ,
        email: yup.string().email(" not valid email ").required(" email is required ").matches(/^[a-zA-Z]{3,}/,"email must start with 3 char at least") ,
        password: yup.string().min(6, " min lenght is 6 ").required(" password is required ") ,
        rePassword: yup.string().oneOf( [ yup.ref("password") ] ,"not matched").required(" repassword is required ") ,
        phone: yup.string().matches(/^01[0125][0-9]{8}$/,"phone not valid").required(" phone is required ") ,
    })

    let formik = useFormik({
        initialValues :{
            name :"",
            email:"",
            password:"",
            rePassword:"",
            phone:"",
        },
        validationSchema: myValidation,
        onSubmit:handleRegister,
    })


    return <>
        
        
    <div className="mb-5 col-span-12 block text-2xl font-medium text-gray-700 ">Register</div>
    <form onSubmit={formik.handleSubmit} className="w-5/6 mx-auto mt-5 lg:grid lg:grid-cols-12 lg:gap-2">

    
        <div className="mb-5 col-span-12 ">
            <label for="name" className="block mb-2 text-sm font-medium text-gray-700 ">Name</label>
            <input 
                type="text"
                id="name" 
                name="name" 
                value={formik.values.name} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 "
                required />
            { formik.errors.name && formik.touched.name ?(
                <div className="p-3 text-sm text-red-800" role="alert">
                    <span className="font-medium">{formik.errors.name}</span>
                </div> ): null
            }
        </div>


        <div className="mb-5 col-span-6">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-700 ">Email</label>
            <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 " placeholder="name@gmail.com" required />
            { formik.errors.email && formik.touched.email ?(
                <div className="p-3 text-sm text-red-800" role="alert">
                    <span className="font-medium">{formik.errors.email}</span>
                </div> ): null
            }
        </div>


        <div className="mb-5 col-span-6">
            <label for="phone" className="block mb-2 text-sm font-medium text-gray-700 ">Phone</label>
            <input type="tel" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 " required />
            { formik.errors.phone && formik.touched.phone ?(
                <div className="p-3 text-sm text-red-800" role="alert">
                    <span className="font-medium">{formik.errors.phone}</span>
                </div> ): null
            }
        </div>


        <div className="mb-5 col-span-6">
            <label for="password" className="block mb-2 text-sm font-medium text-gray-700 ">password</label>
            <input type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 " required />
            { formik.errors.password && formik.touched.password ?(
                <div className="p-3 text-sm text-red-800" role="alert">
                    <span className="font-medium">{formik.errors.password}</span>
                </div> ): null
            }
        </div>


        <div className="mb-5 col-span-6">
            <label for="repeat-password" className="block mb-2 text-sm font-medium text-gray-700 ">Repeat password</label>
            <input type="password" id="repeat-password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 " required />
            { formik.errors.rePassword && formik.touched.rePassword ?(
                <div className="p-3 text-sm text-red-800" role="alert">
                    <span className="font-medium">{formik.errors.rePassword}</span>
                </div> ): null
            }
        </div>


        <div className="mb-5 col-span-6">
            <label for="age" className="block mb-2 text-sm font-medium text-gray-700 ">Age</label>
            <input type="number" id="age" className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 " required />
        </div>


        <div className="mb-5 col-span-6">
            <label for="stat" className="block mb-2 text-sm font-medium text-gray-700 ">hvm</label>
            <select id="stat" className="shadow-xs bg-amber-50 border border-amber-300 text-gray-700 text-sm rounded-lg focus:outline-amber-500 w-full p-2.5 ">

                <option>United States</option>
                <option>Canada</option>
            </select>
        </div>


        <button type="submit" className="text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center col-end-10 col-start-4">
            {IsLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : "Register new account"}
        </button>


        <div className=" text-amber-600 font-medium text-sm py-2.5 text-center col-end-10 col-start-4">
           <span className="text-gray-600"> Do you have an account ? </span> <Link to={"/login"}> Login now </Link>
        </div>
  
    </form>



    </>
}