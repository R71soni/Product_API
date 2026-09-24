import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AllCSS/Navbar.css";

function Navbar({ cartCount = 0, search, setSearch }) {

    const navigate = useNavigate();


    // =========================
    // USER
    // =========================

    const [user, setUser] = useState(() => {

        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (error) {
            console.error("Invalid user data:", error);
            localStorage.removeItem("user");
            return null;
        }

    });


    // =========================
    // LISTEN FOR LOGIN / LOGOUT
    // =========================

    useEffect(() => {

        const handleUserChange = () => {

            const savedUser =
                localStorage.getItem("user");

            if (savedUser) {

                try {

                    setUser(
                        JSON.parse(savedUser)
                    );

                } catch (error) {

                    console.error(
                        "Invalid user data:",
                        error
                    );

                    localStorage.removeItem("user");
                    setUser(null);
                }

            } else {

                setUser(null);

            }
        };


        window.addEventListener(
            "userLogin",
            handleUserChange
        );

        window.addEventListener(
            "userLogout",
            handleUserChange
        );


        return () => {

            window.removeEventListener(
                "userLogin",
                handleUserChange
            );

            window.removeEventListener(
                "userLogout",
                handleUserChange
            );

        };

    }, []);


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        // Remove user from localStorage
        localStorage.removeItem("user");

        // Clear user from Navbar
        setUser(null);

        // Inform other components
        window.dispatchEvent(
            new Event("userLogout")
        );

        // Go to login page
        navigate("/Login");
    };


    // =========================
    // SEARCH
    // =========================

    const handleSearch = (e) => {

        setSearch(e.target.value);

    };


    return (
        <nav className="amazon-navbar">

            {/* =========================
                LOGO
            ========================= */}

            <Link
                to="/"
                className="navbar-logo"
            >
                <img
                    src="/Slider/rskart_logo.png"
                    alt="RS KART"
                    className="navbar-logo"
                />
            </Link>


            {/* =========================
                LOCATION
            ========================= */}

            <div className="location-box">

                <span className="location-icon">
                    📍
                </span>

                <div>

                    <span className="location-small">
                        Delivering to New Delhi 110059
                    </span>

                    <strong>
                        Update location
                    </strong>

                </div>

            </div>


            {/* =========================
                SEARCH
            ========================= */}

            <div className="search-container">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={handleSearch}
                    className="search-box"
                />

            </div>


            {/* =========================
                LANGUAGE
            ========================= */}

            <div className="language-box">

                <span>
                    🇮🇳
                </span>

                <strong>
                    EN
                </strong>

                <span>
                    ⌄
                </span>

            </div>


            {/* =========================
                ACCOUNT
            ========================= */}

            <div className="nav-item">

                <span className="small-text">

                    {user
                        ? `Hello, ${user.name || user.email}`
                        : "Hello, sign in"
                    }

                </span>


                {user ? (

                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                ) : (

                    <Link
                        to="/Login"
                        className="account-link"
                    >
                        Account & Lists
                    </Link>

                )}

            </div>


            {/* =========================
                ORDERS
            ========================= */}

            <Link
                to="/orders"
                className="nav-item"
            >

                <span className="small-text">
                    Returns
                </span>

                <strong>
                    & Orders
                </strong>

            </Link>


            {/* =========================
                CART
            ========================= */}

            <Link
                to="/cart"
                className="cart-box"
            >

                <div className="cart-icon">

                    🛒

                    <span className="cart-count">
                        {cartCount}
                    </span>

                </div>

                <strong>
                    Cart
                </strong>

            </Link>

        </nav>
    );
}

export default Navbar;