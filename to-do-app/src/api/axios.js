import axios from "axios";
//NestJS API
export default axios.create({
    baseURL:'http://localhost:3000/api/v1'
})