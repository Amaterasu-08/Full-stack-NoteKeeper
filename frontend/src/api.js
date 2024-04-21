// write an  intersepter here the intersepter will interspet any request we send and automatically add appropriate header each time
// so we dont have to write it each time manuaally
// here we use axios intersepter so that each time we send a request it check if we have an access token it will automatically add t to that request

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api =axios.create(
    {
        baseURL : import.meta.env.VITE_API_URL
    }
)

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}`;

        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
)

export default api;