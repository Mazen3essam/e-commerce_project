import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css"
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function Products(){

    let{userLogin , setuserLogin} =useContext(UserContext)
    let{addProductToCart, setitemsNumber , getLoggedUserWishlist , addProductToWishlist , deleteWishlistItem} = useContext(CartContext)
    let[AddToCartLoading, setAddToCartLoading] = useState(false)
    let[ WishlistDetails , setWishlistDetails ]=useState([])
    let[ products , setproducts ]=useState([])
    let[ searchedproducts , setsearchedproducts ]=useState([])
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
        setsearchedproducts(arr)
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

    function getProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            setproducts(res.data.data)
            
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
        getWishlist()
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
                        <input type="search" value={inputValue} onChange={change}  className="block w-full p-3 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 " placeholder="Name, Categories , Price..." required />
                        {inputValue== '' ?
                            <button type="submit" className="text-black absolute end-2.5 bottom-1  bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-4 py-2">Search</button>:
                            <button type="submit" onClick={()=>setinputValue('')} className="text-black absolute end-2.5 bottom-1  bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-4 py-2">Clear</button>
                        }
                        
                    </div>
                </div>
            </div>

            {inputValue != ''? 
                searchedproducts.length>0?
                    <>


                        <h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">Search Result <span className="text-amber-500 text-2xl"> {searchedproducts.length}</span> </h2>
                        { searchedproducts?.map((product)=>(

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


                    </>
                : <h2 className="text-amber-500 text-2xl mt-32 my-20 w-full">No Result</h2>
            :null}



            <h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">All products</h2>
            {products?.length > 0 ? products?.map((product)=>(

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

            )):<span className="loader"></span>}

        </div>      
    </>
}