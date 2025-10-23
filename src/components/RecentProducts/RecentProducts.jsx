import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css"
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import toast from 'react-hot-toast';




export default function RecentProducts(){

    let{userLogin , setuserLogin} =useContext(UserContext)
    let{addProductToCart, setitemsNumber , getLoggedUserWishlist , addProductToWishlist , deleteWishlistItem } = useContext(CartContext)
    let[AddToCartLoading, setAddToCartLoading] = useState(false)
    let[ WishlistDetails , setWishlistDetails ]=useState([])
    let[ products , setproducts ]=useState([])



    

    async function getWishlist(){
        let res = await getLoggedUserWishlist()
        
        
      if(res.data.status == "success"){
            setWishlistDetails(res.data.data)
            
        }
        else{        
            toast.error(res.data.message,{duration: 4000,})
        }
    }

    async function addToWishlist(id){
        let res = await addProductToWishlist(id)
        

        if(res.data.status == "success"){
            toast.success(res.data.message,{duration: 4000,})
            getWishlist()
        }
        else{
            toast.error(res.data.message,{duration: 4000,})
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

    

    useEffect(()=>{
        if(userLogin)
        {getWishlist()}
        getProducts()
    },[userLogin])

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


    function getProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            setproducts(res.data.data)
        })
        .catch((res)=>{})
    }


    return <>
        
        <div className="flex flex-wrap py-5 my-5 px-3">
            <h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">products</h2>
            {products?.length > 0 ? products?.map((product)=>(

                <div key={product.id} className="w-1/2 md:w-1/4 lg:w-1/6">
                    
                    <div className="relative p-3 text-start product">

                        {userLogin != null?
                            WishlistDetails?.length > 0 ?
                                WishlistDetails?.map((WishlistDetail)=>(
                                    WishlistDetail.id == product.id ?
                                        <i onClick={()=>deleteFromWishlist(product.id)} key={WishlistDetail.id} className="fa-solid fa-heart text-amber-400 absolute top-4 left-4 text-xl hrt z-40"></i>:
                                        <i onClick={()=>addToWishlist(product.id)} key={WishlistDetail.id} className="fa-regular fa-heart text-amber-400 absolute top-4 left-4 text-xl hrt"></i>
                        )):<i onClick={()=>addToWishlist(product.id)} className="fa-regular fa-heart text-amber-400 absolute top-4 left-4 text-xl hrt"></i>  
                        :null}
                        


                        <Link to={`productDetails/${product.category.name}/${product.id}`}>
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

            )):<span className="loader looad"></span>}

        </div>      
    </>
}