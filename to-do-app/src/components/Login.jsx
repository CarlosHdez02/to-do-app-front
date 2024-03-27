import {useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import {Link, useNavigate, useLocation ,Navigate, } from 'react-router-dom';

//Route to the backend
const LOGIN_URL = 'http://localhost:3000/api/v1/auth/login';
//const LOGIN_URL = 'auth/login'

const Login = ()=>{
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/" //user back to home


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');


    useEffect( ()=>{
        userRef.current.focus();
    },[])

    useEffect( ()=>{
        setErrMsg('');
    },[user,pwd])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL,
                //JSON.stringify({user,pwd}
                JSON.stringify({email:user,password:pwd} ),
                    {
                        headers:{'Content-Type':'application/json'},
                        withCredentials:true
                    }
                    );
            console.log(JSON.stringify(response?.data))
           
            const accessToken = response?.data?.accessToken;
            setAuth({email,password,accessToken})
            //setAuth({user,pwd,accessToken})
            setUser('');
            setPwd('');
            navigate(from,{replace:true});
            <Navigate to="input"/>

        }catch(err){
            if(!err?.response){
                setErrMsg('No server Response');
            }else if(err.response?.status === 400){
                setErrMsg('Missing UserName or Password')
                //Shouldnt get this error cuz there are no roles
            }else if(err.response?.status === 401){
                setErrMsg('Unauthorized')
            }else{
                setErrMsg('Loggin failed')
            }
            errRef.current.focus()
        }
       

    }
  
    const myNavigate = useNavigate()
    const pageHandler = ()=>{
        myNavigate('/app');
    }
    return(
        <>
        <div className="  flex justify-center items-center ">
        <section className="rounded px-8 pt-6 pb-8 mb-4">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive">{errMsg}</p>
                <h1 >Iniciar Sesion</h1>
                <form 
                className="flex flex-col justify-center items-center "
                onSubmit={handleSubmit}>
                    <div className="flex flex-col pb-2">
                    <label htmlFor='username'>Email:</label>

                    <input 
                        type="text" 
                        placeholder="correo@algo.com"
                        className="w-[327px] h-[40px] rounded-lg border border-blue-500"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange ={(e)=>setUser(e.target.value)}
                        value={user}
                        required
                        />
                    </div>

                    <div className="flex flex-col pb-2">

                    <label htmlFor="password" >Password:</label>
                    <input 
                        type="password"
                        placeholder="********"
                        className="w-[327px] h-[40px] rounded-lg border border-blue-500"
                        id="password"
                        onChange = {(e)=>setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    </div>
                    
                    <button 
                    onClick={pageHandler}
                    className="w-[327px] h-[40px] rounded-lg bg-gray-500 text-white ">
                
                        Iniciar sesion</button>
                </form>
                <p > Necesitas una cuenta?  </p> 
                
                <br />
                    <span >
                        {/*} React router link{*/}
                        <a href="/register">Crear cuenta</a>
                    </span>
               
        </section>
        </div>
        
        
        </>
    )
}
export default Login;