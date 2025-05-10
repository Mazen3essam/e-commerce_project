import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css"
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

export default function CategoriesSlider(){

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1000,
      };


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
    <h2 className="text-gray-600 font-semibold text-xl my-4 capitalize">shop populer categories</h2>
        <Slider {...settings}>
            {data?.data?.data.map((category)=><div>
                <img src={category.image} className="w-full h-[200px] object-cover"/>
                <h4 className="pt-2">{category.name}</h4>
            </div>)}

        </Slider>
    </>
}