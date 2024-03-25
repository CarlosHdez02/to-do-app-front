import { useNavigate } from "react-router-dom";
const Missing = ()=>{
    const navigate = useNavigate
    navigate('/login',{state:{from:location},replace:true})

}
export default Missing;