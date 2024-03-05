import "./index.css";
import icon from "../../assets/icon.svg";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../functions.js";

function Register() {
    const navigate = useNavigate()
    const emailRef = useRef();
    const passwordRef = useRef();
    const repasswordRef = useRef();
    const [error, setError] = useState({
        emailError: "",
        passwordError: "",
        repasswordError: "",
        userError: ""
    });

    function handleClick(e) {
        e.preventDefault();

        if (validateRegister(emailRef, passwordRef, setError, repasswordRef)) {
            const existingUserInfos = JSON.parse(localStorage.getItem("userInfos")) || []

            const userInfo = {
                id: Date.now(),
                email: emailRef.current.value,
                password: passwordRef.current.value,
                repassword: repasswordRef.current.value,
            };

            existingUserInfos.push(userInfo);

            localStorage.setItem("userInfos", JSON.stringify(existingUserInfos));

            if (localStorage.getItem('userInfos')) {
                navigate('/login')
            }

        }
    }

    return (
        <div className="box">
            <img className="icon" src={icon} alt="" />
            <h1>Sign up</h1>
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
                <input
                    className={`${error.repasswordError ? 'error' : ''}`}
                    type="password"
                    placeholder={error.repasswordError || "Repeat password"}
                    ref={repasswordRef}
                    id="repasswordInput"
                />
            </form>
            {error.userError && (
                <p id="userError">{error.userError}</p>
            )}
            <button onClick={handleClick}>Create an account</button>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default Register;
