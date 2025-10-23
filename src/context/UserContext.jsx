import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

    const [userLogin , setuserLogin] = useState(null)
    const [userRole , setuserRole] = useState(null)

    useEffect(()=>{
        if(localStorage.getItem("userToken")){
            setuserLogin(localStorage.getItem("userToken") )
            setuserRole(localStorage.getItem("userRole") )
        }
    },[])

    return <UserContext.Provider value={ { userLogin , setuserLogin ,userRole , setuserRole } }>
        {props.children}
    </UserContext.Provider>
}