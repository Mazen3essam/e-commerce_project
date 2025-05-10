import React from "react";
import style from "./Categories.module.css"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";



export default function Categories(){



    function getcategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let {data, isError , error} = useQuery({
        queryKey:["getcategories"],
        queryFn:getcategories,
        staleTime:30000,
        refetchInterval:60000,
    })

    if(isError){
        return <h3>{error}</h3>
    }
    



    return <>
        <div className="flex flex-wrap py-5 my-5 px-3">
            <h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">categories</h2>
            {data?.data?.data.length > 0 ? data?.data?.data.map((category)=>(

                <div key={category._id} className="w-1/2 md:w-1/4 lg:w-1/6">
                    <div className="p-3 text-start">
                        <Link to={`/categoryDetails/${category.name}/${category._id}`}>
                            <img src={category.image} className="w-full h-[200px] object-cover"/>
                            <h3 className=" text-amber-600 mx-2 text-sm pt-2">{category.slug}</h3>
                            <h3 className="mb-3 mx-2">{category.name}</h3>
                        </Link>
                    </div>
                </div>                

            )):<span className="loader"></span>}

        </div>
    </>
}