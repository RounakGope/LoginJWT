import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../util/constants";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext=createContext();
export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials=true;
    const backendURL=AppConstants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const[userData,setUserData]=useState(false)

    const getUserData=async()=>
    {
        try {
            const response=await axios.get(`${backendURL}/profile`);
        if(response.status==200)
        {
            setUserData(response.data);
            console.log("data got");
        }
        else 
        {
            toast.error("Unable to retrieve profile")
        }
            
        } catch (error) {
            toast.error(error.message);
            
        }
        

    }
    const getAuthState=async()=>
    {
        try{
            
            const response =await axios.get(backendURL+"/is-Authenticated");
            if(response.status==200 && response.data===true)
            {
                setIsLoggedIn(true);
                getUserData();
            }
            else
            {
                setIsLoggedIn(false);

            }
        }catch(e)
        {
            setIsLoggedIn(false);
            console.error(e);
            toast.error(e.message);
        }
    }
    useEffect(()=>
    {
        getAuthState();
    },[])

    const contextValue={
        backendURL,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData,

    }

    return(
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>

    )


}