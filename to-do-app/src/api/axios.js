import axios from "axios";
//NestJS API
//keep access tokens in memory
export default axios.create({
    baseURL:'http://localhost:3000/api/v1'
})