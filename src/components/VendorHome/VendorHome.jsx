import React, { useContext, useEffect, useState } from "react";
import style from "./VendorHome.module.css"
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";



export default function VendorHome(){

    let[Loading, setLoading] = useState(false)
    let[deleteLoading, setdeleteLoading] = useState(false)
    let headers= {token : localStorage.getItem("userToken")}
    let[ products , setproducts ]=useState([])
    let[ viewproducts , setviewproducts ]=useState([])
    let[ product , setproduct ]=useState(null)
    let[ update , setupdate ]=useState(false)
    let[ add , setadd ]=useState(false)
    let[ deletee , setdeletee ]=useState(false)

    //search
    let[ inputValue , setinputValue ]=useState('')
    let change = (event) =>{
        setinputValue(event.target.value)
        search(event.target.value);
    }

    //update and add
    let[showUpdate , setshowUpdate]=useState(false)
    
    let showupdate =(product)=>{
        setproduct(product)
        setshowUpdate(prev => !prev)
    }

    //view

    let[show , setshow]=useState(false)
    
    let showView =(product)=>{
        setproduct(product)
        setshow(prev => !prev)
    }










    function search(value){
        var arr =[]
        if(products.length>0){
            for(var x =0 ; x < products.length ; x++){
                if(products[x].title.toLowerCase().includes(value.toLowerCase()))
                {
                    arr.push(products[x])
                }
                else if(products[x].price.toString().includes(value))
                {
                    arr.push(products[x])
                }
                else if(products[x].category.name.toLowerCase().includes(value.toLowerCase()))
                {
                    arr.push(products[x])
                }
                
            }
        }
        setviewproducts(arr)
    }

    function getProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            setproducts(res.data.data)
            setviewproducts(res.data.data)
            setLoading(false) 
            
        })
        .catch((res)=>{
            setLoading(false)
        })
        
        
    }

    /*function deleteItem(productId){
        setdeleteLoading(true)
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ headers })
        .then((res)=>{
            toast.success("Deleted",{duration: 4000,icon: '👍'})
            setproducts(res.data.data)
            setdeleteLoading(false)
        })
        .catch((err)=>{
            toast.error("try again",{duration: 4000,icon: '😞'})
            setdeleteLoading(false)
        })
    }*/


    useEffect(()=>{
        setLoading(true)
        getProducts()
    },[])



    let formik = useFormik({
        initialValues :{
            //img:<img src={updatedproduct?.imageCover} className="h-30 fixed z-0"/> || undefined,
            name:product?.title || '',
            category:product?.category.name || '',
            units:product?.price || '',
            price:product?.price || '',
        },
        onSubmit:(values)=>{console.log(values);},
        enableReinitialize: true,
    })



    return <>




        <div>

            {showUpdate?<>

  
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-30" ></div>
            <div className="fixed top-0 left-0 z-40 h-screen p-4 pt-18 overflow-y-auto bg-gray-100 w-100">
                
                {product?.id?<h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase"><i className="fa-regular fa-pen-to-square pr-2"></i> update product </h5>
                :<h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase"><i className="fa-regular fa-pen-to-square pr-2"></i> Add product </h5>}
                <form onSubmit={formik.handleSubmit} className="mb-6">

                    <div className="flex items-center justify-center w-full mb-6">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer z-10">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <i className="fa-solid fa-cloud-arrow-up mb-4 text-3xl text-gray-500"></i>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input name="image" id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>


                    <div className="relative mb-6">
                        <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-gray-100 rounded-lg border-1 border-gray-300 focus:outline-none focus:ring-0 focus:border-amber-500 peer" placeholder=" " />
                        <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
                    </div>
                    <div className="relative mb-6">
                        <input type="text" id="category" name="category" value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-gray-100 rounded-lg border-1 border-gray-300 focus:outline-none focus:ring-0 focus:border-amber-500 peer" placeholder=" " />
                        <label htmlFor="category" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">category</label>
                    </div>
                    <div className="relative mb-6">
                        <input type="number" id="units" name="units" value={formik.values.units} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-gray-100 rounded-lg border-1 border-gray-300 focus:outline-none focus:ring-0 focus:border-amber-500 peer" placeholder=" " />
                        <label htmlFor="units" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Number of units</label>
                    </div> 
                    <div className="relative mb-6">
                        <input type="number" id="price" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-gray-100 rounded-lg border-1 border-gray-300 focus:outline-none focus:ring-0 focus:border-amber-500 peer" placeholder=" " />
                        <label htmlFor="price" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">price</label>
                    </div>
                    {product?.id?<button type="submit" className="text-white justify-center flex items-center bg-amber-500 hover:bg-amber-600 w-full  font-medium rounded-lg text-md px-5 py-2.5 mb-2">Update</button>   
                    :<button type="submit" className="text-white justify-center flex items-center bg-blue-500 hover:bg-blue-600 w-full  font-medium rounded-lg text-md px-5 py-2.5 mb-2">add</button>}
                    
                </form>
                <button type="button" onClick={()=>showupdate(null)} className="text-white justify-center flex items-center bg-red-600 hover:bg-red-700 w-full  font-medium rounded-lg text-md px-5 py-2.5 mb-2">Cancle</button>

            </div></>:null}






            {show?<>

                <div onClick={()=>showView(null)} className="fixed top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-30 " ></div>

                <div className="fixed mt-8 max-h-[calc(100vh-60px)] left-0 top-15 sm:top-1/2 md:left-1/4 transform md:-translate-x-1/6 sm:-translate-y-1/2 z-40 p-4 bg-gray-100  rounded-lg overflow-y-auto">
                    <button onClick={()=>showView(null)} type="button" className="text-gray-400 hover:bg-gray-200 hover:text-black rounded-lg text-sm w-8 h-8 absolute top-4 right-4">
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                    <div className="flex flex-wrap justify-between p-5 pt-7">
                        <div className="flex w-1/3 sm:w-1/4 pr-5 items-center"><img src={product?.imageCover} className="w-full shadow-md"/></div>
                        <div className="w-full sm:w-3/4 pl-5 text-start">
                            <h3 className="text-black text-xl sm:text-3xl font-semibold">{product?.title}</h3>
                            <h3 className="text-gray-400 my-1 sm-my-5 px-1">{product?.description}</h3>
                            <h3 className="text-gray-500 my-1 sm-my-5">{product?.category.slug}</h3>
                            <h3 className="text-gray-500 my-1 sm-my-5">5 Units</h3>
                            <div className="flex justify-between text-sm text-gray-600 my-5">
                                <span>{product?.price} EGP</span>
                                <span><i className="fas fa-star text-amber-400"></i> {product?.ratingsAverage}</span>
                            </div>
                        </div>
                    </div>

                    <div className=" relative w-full rounded-lg p-5">
                        <ul>
                            <li>
                                <div className="bg-gray-200 p-2 px-3 flex flex-wrap justify-around text-sm text-black uppercase text-center">
                                    <h3 className="w-28">email</h3>
                                    <h3 className="w-28">units</h3>
                                    <h3 className="w-28">price</h3>
                                </div>
                            </li>
                            <li className="border border-gray-100 ">
                                <div className="bg-white p-3 text-center flex flex-wrap justify-around">
                                    <h3 className="text-blue-500 hover:text-blue-600 text-md w-28">email@gmail.com</h3>
                                    <h3 className="text-black text-md w-28">5</h3>
                                    <h3 className="text-black text-md w-28">50 EGP</h3>
                                </div>
                            </li>
                        </ul>
                    </div>


                </div>
            </>:null}

        </div>


        <div className="fixed end-6 bottom-6 group z-20">
            <button type="button" onClick={()=>showupdate(null)} className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800">
                <i className="fa-solid fa-plus text-white text-2xl transition-transform group-hover:rotate-45"></i>
            </button>
        </div>


        <div className="flex flex-wrap py-5 my-5 px-3">

            <div className=" w-full">
                <div className="w-full md:w-1/2 lg:w-1/3 justify-self-end">   
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                        </div>
                        <input type="search" value={inputValue} onChange={change}  className="block w-full p-3 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 " placeholder="Name, Categories , Price..." required />
                        {inputValue== '' ?
                            <button type="submit" className="text-black absolute end-2.5 bottom-1  bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-4 py-2">Search</button>:
                            <button type="submit" onClick={()=>setinputValue('')} className="text-black absolute end-2.5 bottom-1  bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-4 py-2">Clear</button>
                        }
                        
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg mt-10">

                {!Loading? 
                    viewproducts.length>0?    
                    <>
                        {inputValue != ''? 
                            <h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">Search Result <span className="text-amber-500 text-2xl"> {viewproducts.length}</span> </h2>
                            :<h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">your products <span className="text-amber-500 text-2xl"> {viewproducts.length}</span> </h2>
                        }

                        <table className="w-full text-md rtl:text-right text-gray-500 text-center">
                            <thead className="text-sm text-black uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">image</th>
                                    <th scope="col" className="px-6 py-3 text-left">Product name </th>                                                 
                                    <th scope="col" className="px-6 py-3">Units number</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">rating number</th>
                                    <th scope="col" className="px-6 py-3"> Price</th>
                                    <th scope="col" className="px-6 py-3">view</th>
                                    <th scope="col" className="px-6 py-3">edit</th>
                                    <th scope="col" className="px-6 py-3">delete</th>
                                </tr>
                            </thead>
                            { viewproducts?.map((product)=>(
                                <tbody key={product.id} >
                                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-4">
                                            <img src={product.imageCover} className="w-28"/>
                                        </td>
                                        <th className="px-6 py-4 font-medium text-black text-left">
                                           {product.title.split(" ").slice(0,2).join(" ")}
                                        </th>
                                        <td className="px-6 py-4">
                                            5
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.category.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span><i className="fas fa-star text-amber-400"></i> {product.ratingsAverage}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price} EGP
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>showView(product)} className="cursor-pointer text-2xl text-blue-500"><i className="fa-regular fa-eye"></i></span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>showupdate(product)} className="cursor-pointer text-2xl text-amber-400"><i className="fa-regular fa-pen-to-square"></i></span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>deleteItem(product.id)} className="cursor-pointer text-2xl text-red-600">{deleteLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-trash-can"></i> }</span>
                                        </td>
                                    </tr>
                                </tbody>
                                
                            ))}
                        </table>
                    </>
                    :inputValue != ''? <h2 className="text-amber-500 text-2xl mt-32 my-20 w-full"> No Result</h2>
                            :<h2 className="text-amber-500 text-2xl mt-32 my-20 w-full">there is no products</h2>

                :<div className="w-full h-96"><span className="loader loaad"></span></div>}
            </div>

        </div>      
    </>
}