// making a wraper for a route here protected route means we need to have an access token before we can access this route

import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({children}){
    // check if we are authorised before we allow someone to access the room otherwise we redirect them to login in before they view this

    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() =>{
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try{
            // send reques to backend to get new access token
            const res = await api.post("/api/token/refresh/", {refresh : refreshToken});
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            }else{
                setIsAuthorized(false);
            }
        }catch(error){
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () =>{
        // check first if we have token
        const token = localStorage.getItem(ACCESS_TOKEN)

        if(!token){
            setIsAuthorized(false);
            return 
        }

        // if we do have the token decode it and get the expiration date
        const decode =  jwtDecode(token)
        const tokenExpiration = decode.exp;
        const now = Date.now()/1000 
        // get the date in miliseconds

        if(tokenExpiration < now){
            await refreshToken();
        }
        else{
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;