import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useRef, useState, useEffect} from 'react'
import axios from '../api/axios'

//import {faCheck} from "@fontawesome/free-solid-svg-icons"
//import {FontAwesomeIcon} from "@fontawesome/react-fontawesome";

//Havent installed style dependencies, FontAwesome its servers down
//Add connection to

//letters a/A to-zZ, -_ and length 4-24 added the @ in user
const userRegx = /^[a-zA-Z][a-zA-Z0-9-_@.]{3,23}$/;

const pwdRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const registerUrl = './register'

const Register = ()=>{
    const userRef = useRef() //user input
    const errRef = useRef() //user error

    const [user,setUser]= useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect( ()=>{
        userRef.current.focus()
    },[])

    useEffect( ()=>{
        const result = userRegx.test(user)
        
        console.log(user)
        console.log(result)
        setValidName(result);
    }, [user])

    useEffect( ()=>{
        const result = pwdRegx.test(pwd);
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd;
       
        console.log(`pwd are ${pwd} ${matchPwd}`)
        setValidMatch(match)
        console.log(match);
    }, [pwd, matchPwd])

    useEffect( ()=>{
        setErrMsg('');
    },[user,pwd,matchPwd])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //if button was manipulated from devtools
        const v1 = userRegx.test(user)
        const v2 = pwdRegx.test(pwd)
        if(!v1 || !v2){
            setErrMsg('invalid entry');
            return;
        }
        try{
            const response = await axios.post(registerUrl,
                // JSON.stringify({user:email,pwd:password}))
                JSON.stringify({user,pwd}),{
                    headers:{'Content-Type':'application/json'},
                    withCredentials:true
                }
                
            );
               
               console.log(response.data)
               console.log(response.accessToken);
               console.log(JSON.stringify(response));
               setSuccess(true);
               //Clear input fields
               setValidName('')
               setPwd('')
               setMatchPwd('')
        }catch(err){
            if(!err?.response){
                setErrMsg('No server response');
            }else if(err.response?.status === 409){
                setErrMsg('UserName taken');
            }else{
                setErrMsg('Registration failed')
            }
            errRef.current.focus();
        }
    }
    return(
        <>
       {success ? (
            <section>
                <h1>Sucess</h1>
                <p>
                    <a href="#">Sign in</a>
                </p>
            </section>
       ): (

   
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : "offscreen"} 
            aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                  {/*}  <span className={validName ? "valid":"hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>

                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes }/>
                    </span>
                    {*/}

                    </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e)=> setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={()=> setUserFocus(true)}
                    onBlur={()=> setUserFocus(false)}
                />
                <p id="uidnote" classsName={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    {/*}<FontAwesomeIcon icon={faInfoCircle} />{*/}
                    4 a 24 characteres. <br />
                    Debe comenzar con una letra <br/>
                    Letras, numeros, guiones bajos y guiones permitidos y arroba
                </p>
                
                <label htmlFor='password'>
                    Password:
                    <span className={validPwd ? "valid" :"hide"}>
                         {/*} <FontAwesomeIcon icon={faCheck} />  {*/}
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                      {/*}  <FontAwesomeIcon icon={faTimes} /> {*/}
                    </span>
                </label>
                <input  
                    type="password"
                    id="password"
                    onChange = {(e)=> setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby='pwdnote'
                    onFocus = {()=> setPwdFocus(true)}
                    onBlur = {() => setPwdFocus(false)}
                    />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    {/*}<FontAwesomeIcon icon={faInfoCircle}/>{*/}
                    8 to 24 characters <br />
                    Debe incluir Mayuscula y minusculas, un numero y un caracter especial <br />
                    Caracteres permitidos:
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirm password:
                    <span className={validMatch && matchPwd ? "valid" :"hide"}>
                       {/*} <FontAwesomeIcon icon={faCheck} /> {*/}
                    </span>

                    <span className={validMatch || !matchPwd ? "hide": "invalid"}>
                      {/*}  <FontAwesomeIcon icon={faTimes}/>{*/}
                    </span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange = {(e)=> setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby='confirmnote'
                    onFocus = {()=> setMatchFocus(true)}
                    onBlur = {()=>setMatchFocus(false)}
                    />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions": "offscreen"} >
                    {/*}<FontAwesomeIcon icon={faInfoCircle}/> {*/}
                    Both passwords must match
                </p>

                <button 
                    disabled={!validName || !validPwd || !validMatch ? true : false}>
                        Sign up
                    </button>
            </form>

            <p>
                Registrado?<br />
                <span className="line">
                    {/*}Router Link {*/}
                    <a href="/login">Iniciar sesion</a>
                </span>
            </p>
        </section>
        )}
        </>
    )
}
export default Register;