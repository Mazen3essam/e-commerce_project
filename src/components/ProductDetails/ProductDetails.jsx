import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";


export default function ProductDetails(){

    let{userLogin , setuserLogin} =useContext(UserContext)
    let {id , categoryName} = useParams()
    let[ product , setproduct ]=useState(null)
    let[ products , setproducts ]=useState([])
    let{addProductToCart, setitemsNumber , getLoggedUserWishlist , addProductToWishlist , deleteWishlistItem} = useContext(CartContext)
    let[AddToCartLoading, setAddToCartLoading] = useState(false)
    let[ WishlistDetails , setWishlistDetails ]=useState([])

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




    function getProduct(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then((res)=>{
            setproduct(res.data.data)
            
        })
        .catch((res)=>{})
    }


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
        getProduct(id)
        getProducts()
        getWishlist()
    },[id , categoryName])







    

    function getProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            /*
            console.log(res.data.data);*/
            setproducts(res.data.data.filter((product)=>product.category.name == categoryName))
        })
        .catch((res)=>{})
    }









    return <>
        <div className="flex flex-wrap py-5 px-3 items-center">



        {product != null && products.length > 0 ? <>
            <div className="relative w-full sm:w-1/4 pr-5">


                {userLogin != null?
                    WishlistDetails?.length > 0 ?
                    WishlistDetails?.map((WishlistDetail)=>(
                        WishlistDetail.id == product.id ?
                            <i onClick={()=>deleteFromWishlist(product.id)} key={WishlistDetail.id} className="fa-solid fa-heart text-amber-400 absolute top-4 left-4 text-xl z-40 cursor-pointer"></i>:
                            <i onClick={()=>addToWishlist(product.id)} key={WishlistDetail.id} className="fa-regular fa-heart text-amber-400 absolute top-4 left-4 text-xl cursor-pointer"></i>
                    )):<i onClick={()=>addToWishlist(product.id)} className="fa-regular fa-heart text-amber-400 absolute top-4 left-4 text-xl hrt cursor-pointer"></i>  
                :null}


                <img src={product?.imageCover} className="w-full" alt="" />
            </div>
            <div className="w-full sm:w-3/4 pl-5 text-start">
                <h3 className="text-black text-3xl font-semibold">{product?.title}</h3>
                <h3 className="text-gray-400 my-5 px-1">{product?.description}</h3>
                <h3 className="text-gray-500 my-5">{product?.category.slug}</h3>
                <div className="flex justify-between text-sm text-gray-600 my-5">
                    <span>{product?.price} EGP</span>
                    <span><i className="fas fa-star text-amber-400"></i> {product?.ratingsAverage}</span>
                </div>
                {userLogin != null ?<button onClick={()=> addToCart(product.id) } className="btn bg-amber-300 py-2">{AddToCartLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : "Add to cart"}</button>:
                    <Link className=" col-span-12 flex items-center p-2.5 text-sm text-red-800 border border-red-800 rounded-lg bg-red-100" to="/login">
                       <span className="w-full text-center"> Login to buy now</span>
                    </Link>
                }
            </div>

            <div className="flex flex-wrap py-5 ">
                <h3 className="text-center text-black text-4xl w-full pb-5 ">Related Products</h3>
                {products.map((product)=>(

                    <div key={product.id} className="w-1/2 md:w-1/4 lg:w-1/6">
                        <div className="relative p-3 text-start product ">

                            {userLogin != null?
                                WishlistDetails?.length > 0 ?
                                WishlistDetails?.map((WishlistDetail)=>(
                                    WishlistDetail.id == product.id ?
                                    <i onClick={()=>deleteFromWishlist(product.id)} key={WishlistDetail.id} className="fa-solid fa-heart text-amber-400 absolute top-4 left-4 text-xl hrt z-40"></i>:
                                    <i onClick={()=>addToWishlist(product.id)} key={WishlistDetail.id} className="fa-regular fa-heart text-amber-400 absolute top-4 left-4 text-xl hrt"></i>
                                )):<i onClick={()=>addToWishlist(product.id)} className="fa-regular fa-heart text-amber-400 absolute top-4 left-4 text-xl hrt"></i>  
                            :null}

                            <Link to={`/productDetails/${product.category.name}/${product.id}`}>
                                <img src={product.imageCover} className="w-full"/>
                                <h3 className=" text-amber-600 mx-2 text-sm pt-2">{product.category.name}</h3>
                                <h3 className="mb-3 mx-2">{product.title.split(" ").slice(0,2).join(" ")}</h3>
                                <div className="flex justify-between mx-2 text-sm text-gray-600 mb-3">
                                    <span>{product.price} EGP</span>
                                    <span><i className="fas fa-star text-amber-400"></i> {product.ratingsAverage}</span>
                                </div>
                            </Link>
                            {userLogin != null ?<button onClick={()=> addToCart(product.id) } className="btn bg-amber-300 py-1">{AddToCartLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : "Add to cart"}</button>:
                                <Link className="btn col-span-12 flex items-center p-2.5 text-red-800 border border-red-800 rounded-lg bg-red-100" to="/login">
                                    <span className="w-full text-center"> Login to buy now</span>
                                </Link>
                            }
                        </div>
                    </div>                
                ))}
            </div>

        </>:<span className="loader"></span>}




        


        </div>
    </>
}