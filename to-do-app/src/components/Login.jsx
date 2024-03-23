import {useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import {Link, useNavigate, useLocation} from 'react-router-dom';

//Route to the backend
const LOGIN_URL = 'auth'
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
    return(
        <>
        
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive">{errMsg}</p>
                <h1>Iniciar Sesion</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input 
                        type="text" 
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange ={(e)=>setUser(e.target.value)}
                        value={user}
                        required
                        />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id="password"
                        onChange = {(e)=>setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Iniciar sesion</button>
                </form>
                <p>
                    Necesitas una cuenta? <br />
                    <span className='line'>
                        {/*} React router link{*/}
                        <a href="#">Crear cuenta</a>
                    </span>
                </p>
        </section>
        </>
    )
}
export default Login;