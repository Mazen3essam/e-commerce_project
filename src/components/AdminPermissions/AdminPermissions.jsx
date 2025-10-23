import React, { useContext, useEffect, useState } from "react";
import style from "./AdminPermissions.module.css"
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";





export default function AdminPermissions(){

    let[Loading, setLoading] = useState(false)
    let[deleteLoading, setdeleteLoading] = useState(false)
    let headers= {token : localStorage.getItem("userToken")}
    let[ products , setproducts ]=useState([])
    let[ viewproducts , setviewproducts ]=useState([])
    let[ product , setproduct ]=useState(null)

    //search
    let[ inputValue , setinputValue ]=useState('')
    let change = (event) =>{
        setinputValue(event.target.value)
        search(event.target.value);
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



    return <>

        <div className="flex flex-wrap py-5 my-5 px-3">

            <div className=" w-full">
                <div className="w-full md:w-1/2 lg:w-1/3 justify-self-end">   
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                        </div>
                        <input type="search" value={inputValue} onChange={change}  className="block w-full p-3 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 " placeholder="Name, Email" required />
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
                            :<h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">Vendors <span className="text-amber-500 text-2xl"> {viewproducts.length}</span> </h2>
                        }

                        <table className="w-full text-md rtl:text-right text-gray-500 text-center">
                            <thead className="text-sm text-black uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3"></th>
                                    <th scope="col" className="px-6 py-3 text-left">Name</th>
                                    <th scope="col" className="px-6 py-3">email </th>                                                 
                                    {/*<th scope="col" className="px-6 py-3">Units number</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">rating number</th>*/}
                                    <th scope="col" className="px-6 py-3"> add </th>
                                    <th scope="col" className="px-6 py-3">update</th>
                                    <th scope="col" className="px-6 py-3">delete</th>
                                    <th scope="col" className="px-6 py-3">all permissions to add posts</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-6"></th>
                                    <th scope="col" className="px-6"></th>
                                    <th scope="col" className="px-6"></th>                                                 
                                    {/*<th scope="col" className="px-6 py-3">Units number</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">rating number</th>*/}
                                    <th scope="col" className="px-6 py-3 lowercase "><span class="bg-red-200 text-red-800 text-sm font-medium px-2.5 py-1 rounded-md cursor-pointer">select all</span> </th>
                                    <th scope="col" className="px-6 py-3 lowercase "><span class="bg-red-200 text-red-800 text-sm font-medium px-2.5 py-1 rounded-md cursor-pointer">select all</span> </th>
                                    <th scope="col" className="px-6 py-3 lowercase "><span class="bg-green-200 text-green-800 text-sm font-medium px-2.5 py-1 rounded-md cursor-pointer">select all</span> </th>
                                    <th scope="col" className="px-6 py-3 lowercase "><span class="bg-red-200 text-red-800 text-sm font-medium px-2.5 py-1 rounded-md cursor-pointer">select all</span> </th>

                                </tr>
                            </thead>
                            { viewproducts?.map((product)=>(
                                <tbody key={product.id} >
                                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-4 text-left">
                                            <i className="fa-solid fa-circle-user text-3xl"></i>
                                        </td>
                                        <td className="p-4 pl-1 text-left">
                                            {product.title.split(" ").slice(0,2).join(" ")}
                                        </td>
                                        <th className="px-6 py-4 font-medium text-black text-left">
                                           {product.category.name}@email.com
                                        </th>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>showView(product)} className="cursor-pointer text-2xl text-blue-500">{deleteLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-file-circle-plus"></i> }</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>showupdate(product)} className="cursor-pointer text-2xl text-amber-400">{deleteLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-regular fa-pen-to-square"></i> }</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>deleteItem(product.id)} className="cursor-pointer text-2xl text-red-600">{deleteLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-trash-can"></i> }</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>deleteItem(product.id)} className="cursor-pointer text-2xl text-green-500">{deleteLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-bullhorn"></i> }</span>
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