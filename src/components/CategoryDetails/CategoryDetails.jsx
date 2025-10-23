import React, { useContext, useEffect, useState } from "react";
import style from "./CategoryDetails.module.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";


export default function CategoryDetails(){

    let{userLogin , setuserLogin} =useContext(UserContext)
    let {id , categoryName} = useParams()
    let[ category , setcategory ]=useState(null)
    let[ products , setproducts ]=useState([])
    let[ WishlistDetails , setWishlistDetails ]=useState([])
    let{addProductToCart, setitemsNumber, getLoggedUserWishlist , addProductToWishlist , deleteWishlistItem} = useContext(CartContext)
    let[IsLoading, setIsLoading] = useState(false)
    let[AddToCartLoading, setAddToCartLoading] = useState(false)

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




    function getcategory(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        .then((res)=>{
            setcategory(res.data.data)
            
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
        getcategory(id)
        getProducts()
        getWishlist()
    },[id , categoryName])



    function getProducts() {
        setIsLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            /*
            console.log(res.data.data);*/
            setproducts(res.data.data.filter((product)=>product.category.name == categoryName))
            setIsLoading(false)
            
        })
        .catch((res)=>{setIsLoading(false)})
    }


    return <>
        <div className="flex flex-wrap py-5 px-3 items-center">



        {category != null ? <>
            <div className="w-full sm:w-1/4 pr-5">
                <img src={category?.image} className="w-full" alt="" />
            </div>
            <div className="w-full sm:w-3/4 pl-5 text-start">
                <h3 className="text-black text-3xl font-semibold">{category?.name}</h3>
                <h3 className="text-gray-400 my-5 px-1">{category?.slug}</h3>
            </div>

            {products.length > 0 ? <>
                <div className="flex flex-wrap py-5 ">
                    <h3 className="text-center text-black text-4xl w-full pb-5 ">Products of this category </h3>
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
            </>:IsLoading ? <span className="loader looad"></span> : <h3 className="text-center text-amber-600 text-4xl w-full my-16 ">No products in this category </h3>}
            

        </>:<span className="loader"></span>}




        


        </div>
    </>
}