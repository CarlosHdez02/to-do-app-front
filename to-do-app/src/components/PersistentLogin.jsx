import {Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react'
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
//storing user token in cookies is not safe, so a better implementation is
//saving them in jwt
const PersistentLogin = ()=>{
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect( ()=>{
        const verifyRefreshToken = async ()=>{
            try{
                await refresh();
            }catch(err){
                console.error(err)
            }finally{
                setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    },[])
  
    useEffect( ()=>{
        console.log(`isLoading: ${isLoading}`)
        console.log(`AcessToken: ${JSON.stringify(auth?.accessToken)}`)
    },[isLoading])

    return(
        <>
            {isLoading ? <p>Loading...</p> : <Outlet/>}
        </>
    )
}
export default PersistentLogin;
