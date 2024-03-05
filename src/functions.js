function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateRegister(email, password, setError, repassword) {
    let isValid = true;

    const existingUserInfos = JSON.parse(localStorage.getItem("userInfos")) || [];

    const isEmailRegistered = existingUserInfos.some(user => user.email === email.current.value);

    if (isEmailRegistered) {
        setError(prevError => ({ ...prevError, userError: "This email is already registered" }));
        email.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, userError: '' }));
    }

    if (!validateEmail(email.current.value)) {
        setError(prevError => ({ ...prevError, emailError: "Invalid email format" }));
        email.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, emailError: '' }));
    }

    if (!email.current.value) {
        setError(prevError => ({ ...prevError, emailError: "Can't be empty" }));
        email.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, emailError: '' }));
    }

    if (password.current.value.trim().length < 3) {
        setError(prevError => ({ ...prevError, passwordError: "Password must be at least 3 characters" }));
        if (isValid) {
            password.current.focus();
            isValid = false;
        }
    } else {
        setError(prevError => ({ ...prevError, passwordError: '' }));
    }

    if (password.current.value !== repassword.current.value) {
        setError(prevError => ({ ...prevError, repasswordError: "Passwords don't match" }));
        if (isValid) {
            repassword.current.focus();
            isValid = false;
        }
    } else {
        setError(prevError => ({ ...prevError, repasswordError: '' }));
    }

    return isValid;
}

function validateLogin(email, password, setError) {
    let isValid = true;

    if (!validateEmail(email.current.value)) {
        setError(prevError => ({ ...prevError, emailError: "Invalid email format" }));
        email.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, emailError: '' }));
    }

    if (!email.current.value) {
        setError(prevError => ({ ...prevError, emailError: "Can't be empty" }));
        email.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, emailError: '' }));
    }

    if (password.current.value.trim().length < 3) {
        setError(prevError => ({ ...prevError, passwordError: "Password must be at least 3 characters" }));
        if (isValid) {
            password.current.focus();
            isValid = false;
        }
    } else {
        setError(prevError => ({ ...prevError, passwordError: '' }));
    }

    const existingUserInfos = JSON.parse(localStorage.getItem("userInfos")) || [];

    // Check if the email and password match any registered user
    const isRegisteredEmail = existingUserInfos.some(user => user.email === email.current.value);
    const isRegisteredPassword = existingUserInfos.some(user => user.password === password.current.value);

    if (!isRegisteredEmail) {
        setError(prevError => ({ ...prevError, userError: "Email is incorrect" }));
        email.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, userError: '' }));
    }

    if (!isRegisteredPassword) {
        setError(prevError => ({ ...prevError, userError: "Password is incorrect" }));
        password.current.focus();
        isValid = false;
    } else {
        setError(prevError => ({ ...prevError, userError: '' }));
    }

    return isValid;
}

export { validateRegister, validateLogin };
