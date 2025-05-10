import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let CartContext = createContext();

export default function CartContextProvider(props){

    let headers= {token : localStorage.getItem("userToken")}
    let[itemsNumber, setitemsNumber] = useState(0)
    let{userLogin , setuserLogin} =useContext(UserContext)

    function addProductToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId},{ headers })
        .then((res)=>res).catch((err)=>err)
    }

    function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
        .then((res)=>{
            setitemsNumber(res.data.numOfCartItems)
            return res
        }).catch((err)=>err)
    }

    function updateCartProductQuantity(productId,newCount){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount},{ headers })
        .then((res)=>res).catch((err)=>err)
    }

    function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ headers })
        .then((res)=>res).catch((err)=>err)
    }

    function deleteCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{ headers })
        .then((res)=>res).catch((err)=>err)
    }


    function getLoggedUserWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
        .then((res)=>res).catch((err)=>err)
    }

    function addProductToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{ headers })
        .then((res)=>res).catch((err)=>err)
    }

    function deleteWishlistItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{ headers })
        .then((res)=>res).catch((err)=>err)
    }




    useEffect(()=>{
        getLoggedUserCart()
    },[userLogin])

    return <CartContext.Provider value={ { addProductToCart,getLoggedUserCart,updateCartProductQuantity,deleteCartItem , deleteCart , itemsNumber , setitemsNumber , getLoggedUserWishlist , addProductToWishlist , deleteWishlistItem } }>
        {props.children}
    </CartContext.Provider>
}