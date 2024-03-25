import axios from "axios";
//NestJS API
//keep access tokens in memory
const BASE_URL ='http://localhost:3000'
export default axios.create({
   baseURL:BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL, 
    headers: {'Content-Type':'application/json'},
    withCredentials:true
    
})