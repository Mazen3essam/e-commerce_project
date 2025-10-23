import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css"
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";




export default function Cart(){


    let{getLoggedUserCart , updateCartProductQuantity , deleteCartItem , deleteCart ,itemsNumber , setitemsNumber } = useContext(CartContext)
    let[ CartDetails , setCartDetails ]=useState(null)
    let[IsLoading, setIsLoading] = useState(false)
    let[deleteLoading, setdeleteLoading] = useState(false)
    let[deleteAllLoading, setdeleteAllLoading] = useState(false)


    async function getCartItems(){
        let res = await getLoggedUserCart()
        
        if(res.data.status == "success"){
            setCartDetails(res.data.data)
        }
        else{        
            toast.error(res.data.message,{duration: 4000,})
        }
    }

    async function updateQuantity(productId , newCount){
        setIsLoading(true)
        if(newCount==0){
            deleteItem(productId)
            setIsLoading(false)
        }
        else{
            let res = await updateCartProductQuantity(productId , newCount)

            if(res.data.status == "success"){
                toast.success("Done",{duration: 4000,icon: '👌'})
                setCartDetails(res.data.data)
                setIsLoading(false)
            }
            else{
                setIsLoading(false)
                toast.error("try again",{duration: 4000,icon: '😞'})
            }
        }
        
    }

    async function deleteItem(productId){
        setdeleteLoading(true)
        let res = await deleteCartItem(productId)

        if(res.data.status == "success"){
            toast.success("Deleted",{duration: 4000,icon: '👍'})
            setCartDetails(res.data.data)
            setdeleteLoading(false)
            setitemsNumber(res.data.numOfCartItems)
        }
        else{
            toast.error("try again",{duration: 4000,icon: '😞'})
            setdeleteLoading(false)
        }
    }

    async function deleteAllCart(){
        setdeleteAllLoading(true)
        let res = await deleteCart()
        
        if(res.data.message == "success"){
            toast.success("Deleted",{duration: 4000,icon: '👍'})
            setitemsNumber(0)
            setdeleteAllLoading(false)
            
        }
        else{        
            toast.error(res.data.message,{duration: 4000,})
            setdeleteAllLoading(false)

        }
    }

    useEffect(()=>{
        getCartItems()
    },[CartDetails])



    return <>        
        {itemsNumber==0? <div className="text-4xl mt-60">cart is empty</div>:<span className="loader"></span>}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-16">
            
            {CartDetails?.products.length > 0 ? <>
                <table className="w-full text-sm text-left rtl:text-right text-gray-600">

                    <thead className="text-xs text-gray-600 uppercase bg-gray-200 ">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-20 py-3 ">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                <span onClick={()=>deleteAllCart()} className="cursor-pointer text-red-600">{deleteAllLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : "Delete All" }</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody> 
                    
                        {CartDetails?.products.map((product)=>(

                            <tr key={product.product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">

                                <td className="p-4">
                                    <Link to={`/productDetails/${product.product.category.name}/${product.product.id}`}>
                                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full"></img>
                                    </Link>
                                </td>

                                <td className="px-6 py-4 font-semibold text-black">
                                    <Link to={`/productDetails/${product.product.category.name}/${product.product.id}`}>
                                        {product.product.title}
                                    </Link>
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex items-center">
                                        <button onClick={()=>updateQuantity(product.product.id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-600 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <div>
                                            <span className="bg-gray-50 w-14 border border-gray-300 text-black text-sm rounded-lg block px-2.5 py-1 text-center" >
                                                {IsLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : product.count }
                                            </span>
                                        </div>
                                        <button onClick={()=>updateQuantity(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>

                                </td>

                                <td className="px-6 py-4 text-center font-semibold text-gray-900">
                                    {product.price} EGP
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <span onClick={()=>deleteItem(product.product.id)} className="cursor-pointer text-2xl text-red-600">{deleteLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-trash-can"></i> }</span>
                                </td>

                            </tr>    

                        ))}

                    </tbody>

                </table>
                <div className="w-full flex bg-gray-200 py-5 px-5">
                    <h3 className="w-1/2 px-5 text-left text-3xl text-gray-600 font-bold">
                        Total price :- 
                    </h3>
                    <h3 className="w-1/2 px-5 text-right text-3xl text-gray-600 font-bold">
                        {CartDetails.totalCartPrice} EGP
                    </h3>
                </div>
                <div>
                    <button type="button" className=" text-black bg-amber-400 hover:bg-amber-500 rounded-lg text-lg px-5 py-2 my-3 text-center  items-center">
                        Check out
                    </button>
                </div>
            </>:<span className="loader"></span>}
                    
        </div>

    </>
}