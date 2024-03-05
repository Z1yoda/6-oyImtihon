import "./index.css";
import icon from "../../assets/icon.svg";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from '../../functions.js'
import { useParams } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState({
        emailError: "",
        passwordError: "",
        userError: "",
    });

    function handleClick() {
        if (validateLogin(emailRef, passwordRef, setError)) {
            const user = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            const userInfos = JSON.parse(localStorage.getItem("userInfos"))

            const filtered = userInfos.filter((userInfo, index) => {
                return userInfo.email === user.email
            })

            navigate(`/`)
        }
    }

    return (
        <div className="box">
            <img className="icon" src={icon} alt="" />
            <h1>Login</h1>
            <form id="form">
                <input
                    className={`${error.emailError ? 'error' : ''}`}
                    type="email"
                    placeholder={error.emailError || "Email address"}
                    ref={emailRef}
                    id="emailInput"
                />
                <input
                    className={`${error.passwordError ? 'error' : ''}`}
                    type="password"
                    placeholder={error.passwordError || "Password"}
                    ref={passwordRef}
                    id="passwordInput"
                />
            </form>
            {error.userError && (
                <p id="userError">{error.userError}</p>
            )}
            <button onClick={handleClick}>Login to your account</button>
            <p className="loginP">
                Don't have an account?<a href="/register">Sign up</a>
            </p>
        </div>
    );
}

export default Login;
