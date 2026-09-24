
import { useState } from "react";
import "../AllCSS/Register.css";
import productService from "../services/productService";
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

     const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
           const response = await productService.registerUser(formData);

            console.log(response.data);

            setMessage("Registration successful!");


            setFormData({
                email: "",
                password: ""
            });

              // Redirect to home
            setTimeout(() => {
                navigate("/login")
            }, 700);


        } catch (error) {
            console.error(error);

            if (error.response) {
                setMessage(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Registration failed"
                );
            } else {
                setMessage("Backend server is not running");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">

            <div className="register-card">

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Register your account
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Create Account"}
                    </button>

                </form>

                {message && (
                    <p className={
                            message === "Registration successful!"
                                ? "success-message"
                                : "error-message"
                        }
                    >
                        {message}
                    </p>
                )}

                <p className="login-text">
                    Already have an account?
                    <a href="/login"> Login</a>
                </p>

            </div>

        </div>
    );
}

export default Register;




