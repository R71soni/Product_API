// animated login page using tailwind 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AllCSS/Login.css";
import productService from "../services/productService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    // =========================
    // LOGIN
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            // Call backend
            const response =
                await productService.loginUser(formData);

            console.log("Logged in user:", response);


            // =========================
            // SAVE USER
            // =========================

            localStorage.setItem(
                "user",
                JSON.stringify(response)
            );


            // =========================
            // INFORM NAVBAR
            // =========================

            window.dispatchEvent(
                new Event("userLogin")
            );


            // =========================
            // SUCCESS
            // =========================

            setMessage("Login successful!");


            // Redirect to home
            setTimeout(() => {
                navigate("/");
            }, 700);


        } catch (error) {

            console.error("Login error:", error);


            if (error.response) {

                setMessage(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : error.response.data?.message ||
                          "Invalid email or password"
                );

            } else {

                setMessage(
                    "Backend server is not running"
                );

            }

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="login-container">

            <div className="login-card">

                {/* =========================
                    LOGO
                ========================= */}

                <div className="login-logo">
                    J
                </div>


                {/* =========================
                    HEADING
                ========================= */}

                <h1>
                    Welcome Back
                </h1>

                <p className="login-subtitle">
                    Sign in to continue to your account
                </p>


                {/* =========================
                    FORM
                ========================= */}

                <form onSubmit={handleSubmit}>

                    {/* EMAIL */}

                    <div className="login-input-group">

                        <label>
                            Email Address
                        </label>

                        <div className="login-input-wrapper">

                            <span className="login-input-icon">
                                ✉
                            </span>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="login-input"
                            />

                        </div>

                    </div>


                    {/* PASSWORD */}

                    <div className="login-input-group">

                        <label>
                            Password
                        </label>

                        <div className="login-input-wrapper">

                            <span className="login-input-icon">
                                🔒
                            </span>

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                                className="login-input"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword
                                    ? "🙈"
                                    : "👁"}
                            </button>

                        </div>

                    </div>


                    {/* FORGOT PASSWORD */}

                    <div className="forgot-password">

                        <button type="button">
                            Forgot password?
                        </button>

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="login-button"
                    >

                        {loading ? (

                            <span className="login-loading">

                                <span className="login-spinner"></span>

                                Signing in...

                            </span>

                        ) : (

                            <>
                                Sign In →
                            </>

                        )}

                    </button>

                </form>


                {/* =========================
                    MESSAGE
                ========================= */}

                {message && (

                    <div
                        className={`login-message ${
                            message === "Login successful!"
                                ? "login-success"
                                : "login-error"
                        }`}
                    >
                        {message}
                    </div>

                )}


                {/* =========================
                    DIVIDER
                ========================= */}

                <div className="login-divider">
                    <span>OR</span>
                </div>


                {/* =========================
                    REGISTER
                ========================= */}

                <p className="login-register">

                    Don't have an account?

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/Register")
                        }
                    >
                        Create Account
                    </button>

                </p>


                {/* =========================
                    FOOTER
                ========================= */}

                <div className="login-footer">

                    <p>
                        🔒 Secure authentication
                    </p>

                    <p>
                        Your information is protected
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;