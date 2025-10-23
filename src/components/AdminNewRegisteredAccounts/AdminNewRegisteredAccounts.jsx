import React, { useContext, useEffect, useState } from "react";
import style from "./AdminNewRegisteredAccounts.module.css"
import axios from "axios";
import toast from "react-hot-toast";



export default function AdminNewRegisteredAccounts(){

    let[Loading, setLoading] = useState(false)
    let[rejectLoading, setrejectLoading] = useState(false)
    let[acceptLoading, setacceptLoading] = useState(false)
    let headers= {token : localStorage.getItem("userToken")}
    let[ accounts , setaccounts ]=useState([])
    let[ viewAccounts , setviewAccounts ]=useState([])

    //search
    let[ inputValue , setinputValue ]=useState('')
    let change = (event) =>{
        setinputValue(event.target.value)
        search(event.target.value);
    }


    function search(value){
        var arr =[]
        if(accounts.length>0){
            for(var x =0 ; x < accounts.length ; x++){
                if(accounts[x].title.toLowerCase().includes(value.toLowerCase()))
                {
                    arr.push(accounts[x])
                }
                else if(accounts[x].price.toString().includes(value))
                {
                    arr.push(accounts[x])
                }
                else if(accounts[x].category.name.toLowerCase().includes(value.toLowerCase()))
                {
                    arr.push(accounts[x])
                }
                
            }
        }
        setviewAccounts(arr)
    }


/*--------------------------------------------------------------------------------------------------------------------------------*/ 
    function getAccounts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            setaccounts(res.data.data)
            setviewAccounts(res.data.data)
            setLoading(false) 
           // console.log(res.data.data);
            
        })
        .catch((res)=>{
            setLoading(false)
        })  
    }


    function acceptItem(accountId){
        setacceptLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/cart/${accountId}`,{ headers })
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


    function rejectItem(accountId){
        setrejectLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/cart/${accountId}`,{ headers })
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
        getAccounts()
    },[])
/*--------------------------------------------------------------------------------------------------------------------------------*/ 





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

            <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg mt-10">

                {!Loading? 
                    viewAccounts.length>0?    
                    <>
                        {inputValue != ''? 
                            <h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">Search Result <span className="text-amber-500 text-2xl"> {viewAccounts.length}</span> </h2>
                            :<h2 className="text-gray-600 font-semibold text-xl my-4 capitalize w-full">account <span className="text-amber-500 text-2xl"> {viewAccounts.length}</span> </h2>
                        }

                        <table className="w-full text-md rtl:text-right text-gray-500 text-center">
                            <thead className="text-sm text-black uppercase bg-gray-100">
                                <tr>

                                    <th scope="col" className="px-6 py-3"></th>
                                    <th scope="col" className="px-6 py-3 text-left">Name</th>
                                    <th scope="col" className="px-6 py-3">email </th>                                                 
                                    <th scope="col" className="px-6 py-3">accept</th>
                                    <th scope="col" className="px-6 py-3">reject</th>
                                </tr>
                            </thead>
                            { viewAccounts?.map((account)=>(
                                <tbody key={account.id} >
                                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-4 text-left">
                                            <i className="fa-solid fa-circle-user text-3xl"></i>
                                        </td>
                                        <td className="p-4 pl-1 text-left">
                                            {account.title.split(" ").slice(0,2).join(" ")}
                                        </td>
                                        <th className="px-6 py-4 font-medium text-black">
                                           {account.category.name}@email.com
                                        </th>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>acceptItem(account.id)} className="cursor-pointer text-2xl text-green-500 ">{acceptLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-check"></i> }</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={()=>rejectItem(account.id)} className="cursor-pointer text-2xl text-red-600">{rejectLoading ? <i className="fas fa-spinner fa-spin text-black"></i> : <i className="fa-solid fa-xmark"></i> }</span>
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