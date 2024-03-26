import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';

const userRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwdRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const registerUrl = './register';

const Register = () => {
    const userNameRef = useRef();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = userRegx.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = pwdRegx.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = userRegx.test(user);
        const v2 = pwdRegx.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            const response = await axios.post(registerUrl, JSON.stringify({ user, pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            setValidName('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username taken');
            } else {
                setErrMsg('Registration failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div className=" bg-custom-background  flex justify-center items-center min-h-screen">
            {success ? (
                <section>
                    <h1>Success</h1>
                    <p>
                        <a href="#">Sign in</a>
                    </p>
                </section>
            ) : (
                <section className=" rounded px-8 pt-6 pb-8 mb-4">
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1 >Register</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                        <div className="flex flex-col pb-2">
                            <label htmlFor="name"  >Username:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nombre de usuario"
                                className="w-[327px] h-[40px] rounded-lg"
                                ref={userNameRef}
                                autoComplete="on"
                                required
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center pb-2">
                            <label htmlFor="email" >Email:</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="micorreo@algo.com"
                                className="w-[327px] h-[40px] rounded-lg"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p >
                                4 a 24 caracteres. <br />
                                Debe comenzar con una letra. <br />
                                Letras, números, guiones bajos y guiones permitidos, así como el símbolo de arroba.
                            </p>
                        </div>
                        <div className=" flex flex-col justify-center items-center pb-2">
                        <label htmlFor='password'  >Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="********"
                                className="w-[327px] h-[40px] rounded-lg"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? 'false' : 'true'}
                                aria-describedby='pwdnote'
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p className=" flex flex-col justify-center items-center">
                                8 a 24 caracteres <br />
                                Debe incluir mayúsculas y minúsculas, un número y un caracter especial <br />
                                Caracteres permitidos: !, @, #, $, %
                            </p>
                        </div>
                        <div className=" flex flex-col justify-center items-center pb-2">
                            <label htmlFor="confirm_pwd"  >Confirm password:</label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                placeholder="********"
                                className="w-[327px] h-[40px] rounded-lg"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? 'false' : 'true'}
                                aria-describedby='confirmnote'
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p >
                                Ambas contraseñas deben coincidir
                            </p>
                        </div>
                        <button
                        disabled={!validName || !validPwd || !validMatch} className="w-[327px] h-[40px] rounded-lg bg-gray-500">
                            
                            Sign up
                        </button>
                    </form>
                    <p >
                        Registrado?
                        <br />
                        <span >
                            <a href="/login"
                           
                            >Iniciar sesión</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    );
};

export default Register;
                 