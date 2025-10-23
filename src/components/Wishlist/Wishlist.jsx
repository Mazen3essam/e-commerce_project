import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css"
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import toast from 'react-hot-toast';



export default function Wishlist(){

    let{userLogin , setuserLogin} =useContext(UserContext)
    let{addProductToCart, setitemsNumber , getLoggedUserWishlist ,deleteWishlistItem } = useContext(CartContext)
    let[AddToCartLoading, setAddToCartLoading] = useState(false)
    let[AddToWishlistLoading, setAddToWishlistLoading] = useState(false)
    let[ WishlistDetails , setWishlistDetails ]=useState(null)



    

    async function getWishlist(){
        setAddToWishlistLoading(true)
        let res = await getLoggedUserWishlist()
        
        
      if(res.data.status == "success"){
            setWishlistDetails(res.data.data)
            setAddToWishlistLoading(false)
        }
        else{        
            toast.error(res.data.message,{duration: 4000,})
            setAddToWishlistLoading(false)
        }
    }

    async function deleteFromWishlist(id){
        let res = await deleteWishlistItem(id)

        if(res.data.status == "success"){
            toast.success(res.data.message,{duration: 4000,})
            getWishlist()
        }
        else{
            toast.error(res.data.message,{duration: 4000,})
        }
               
    }
    

    

    async function addToCart(id){
        setAddToCartLoading(true)
        let res = await addProductToCart(id)
        

        if(res.data.status == "success"){
            toast.success(res.data.message,{duration: 4000,})
            setAddToCartLoading(false)
            setitemsNumber(res.data.numOfCartItems)
        }
        else{
            toast.error(res.data.message,{duration: 4000,})
            setAddToCartLoading(false)
        }
        
    }



    useEffect(()=>{
        getWishlist()
    },[])


    return <>
        
        
        <div className="flex flex-wrap py-5 my-5 px-3">
            {WishlistDetails?.length==0? <div className="w-full text-center text-4xl mt-50">wishlist is empty</div>:
            <h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">Wishlist products</h2>}
            
            { !AddToWishlistLoading ? WishlistDetails?.map((product)=>(

                <div key={product.id} className="w-1/2 md:w-1/4 lg:w-1/6">
                    
                    <div className="relative p-3 text-start product">

                        <i onClick={()=>deleteFromWishlist(product.id)} className="fa-solid fa-heart text-amber-400 absolute top-4 left-4 text-xl hrt"></i>                        


                        <Link to={`/productDetails/${product.category.name}/${product.id}`}>
                            <img src={product.imageCover} className="w-full"/>
                            <h3 className=" text-amber-600 mx-2 text-sm pt-2">{product.category.name}</h3>
                            <h3 className="mb-3 mx-2">{product.title.split(" ").slice(0,2).join(" ")}</h3>
                            <div className="flex justify-between mx-2 text-sm text-gray-600 mb-3">
                                <span>{product.price} EGP</span>
                                <span><i className="fas fa-star text-amber-400"></i> {product.ratingsAverage}</span>
                            </div>
                        </Link>
                        {userLogin != null ?
                            <button onClick={()=> addToCart(product.id) } className="btn bg-amber-300 py-1">
                                {AddToCartLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : "Add to cart"}
                            </button>:
                            <Link className="btn col-span-12 flex items-center p-2.5 text-red-800 border border-red-800 rounded-lg bg-red-100" to="/login">
                                <span className="w-full text-center"> Login to buy now</span>
                            </Link>
                        }
                    </div>
                </div>                

            )):<span className="loader"></span>}

        </div>      
    </>
}