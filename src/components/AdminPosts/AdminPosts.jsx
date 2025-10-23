import React, { useContext, useEffect, useState } from "react";
import style from "./AdminPosts.module.css"
import axios from "axios";
import toast from "react-hot-toast";




export default function AdminPosts(){

    let[Loading, setLoading] = useState(false)
    let[rejectLoading, setrejectLoading] = useState(false)
    let[acceptLoading, setacceptLoading] = useState(false)
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


/*--------------------------------------------------------------------------------------------------------------------------------*/ 


    function getProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            setproducts(res.data.data)
            setviewproducts(res.data.data)
            setLoading(false) 
           // console.log(res.data.data);
            
            
        })
        .catch((res)=>{
            setLoading(false)
        })
        
        
    }

    function acceptItem(productId){
        setacceptLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ headers })
        .then((res)=>{
            toast.success("accepted",{duration: 4000,icon: '👍'})
            setaccounts(res.data.data)
            setacceptLoading(false)
        })
        .catch((err)=>{
            toast.error("try again",{duration: 4000,icon: '😞'})
            setacceptLoading(false)
        })
    }


    function rejectItem(productId){
        setrejectLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ headers })
        .then((res)=>{
            toast.success("rejected",{duration: 4000,icon: '👍'})
            setaccounts(res.data.data)
            setrejectLoading(false)
        })
        .catch((err)=>{
            toast.error("try again",{duration: 4000,icon: '😞'})
            setrejectLoading(false)
        })
    }


    useEffect(()=>{
        setLoading(true)
        getProducts()
    },[])
/*--------------------------------------------------------------------------------------------------------------------------------*/ 





    return <>




        <div>


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
                            <h3 className="text-gray-500 my-1 sm-my-5">{product?.quantity} Unit</h3>
                            <h3 className="text-gray-500 my-1 sm-my-5">{product?.price} EGP</h3>
                        </div>
                    </div>
                </div>
            </>:null}

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
                            :<h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">Posts <span className="text-amber-500 text-2xl"> {viewproducts.length}</span> </h2>
                        }

                        <table className="w-full text-md rtl:text-right text-gray-500 text-center">
                            <thead className="text-sm text-black uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">image</th>
                                    <th scope="col" className="px-6 py-3 text-left">Product name </th>                                                 
                                    <th scope="col" className="px-6 py-3">Units number</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Vendor email</th>
                                    <th scope="col" className="px-6 py-3"> Price</th>
                                    <th scope="col" className="px-6 py-3">view</th>
                                    <th scope="col" className="px-6 py-3">accept</th>
                                    <th scope="col" className="px-6 py-3">reject</th>
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
                                            {product.quantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.category.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            omar@gmail.com
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price} EGP
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>showView(product)} className="cursor-pointer text-2xl text-blue-500"><i className="fa-regular fa-eye"></i></span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>acceptItem(product.id)} className="cursor-pointer text-2xl text-green-500 ">{acceptLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-check"></i> }</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>rejectItem(product.id)} className="cursor-pointer text-2xl text-red-600">{rejectLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-xmark"></i> }</span>
                                        </td>
                                    </tr>
                                </tbody>
                                
                            ))}
                        </table>
                    </>
                    :inputValue != ''? <h2 className="text-amber-500 text-2xl mt-32 my-20 w-full"> No Result</h2>
                            :<h2 className="text-amber-500 text-2xl mt-32 my-20 w-full">there is no posts</h2>

                :<div className="w-full h-96"><span className="loader loaad"></span></div>}
            </div>

        </div>      
    </>
}