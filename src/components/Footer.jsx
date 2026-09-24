import { Link } from "react-router-dom";
import "../AllCSS/Footer.css"

function Footer() {
    return (
        <footer className="footer">

            {/* Back to Top */}
            <button
                className="back-to-top"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }
            >
                ↑ Back to top
            </button>

            {/* Main Footer */}
            <div className="footer-main">

                {/* Brand */}
                <div className="footer-column brand-column">
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

                    <p>
                        Your trusted online shopping destination
                        for quality products at great prices.
                    </p>

                    <div className="social-icons">
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="Instagram">◎</a>
                        <a href="#" aria-label="Twitter">𝕏</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                    </div>
                </div>

                {/* Get to Know Us */}
                <div className="footer-column">
                    <h3>Get to Know Us</h3>

                    <Link to="/">About Us</Link>
                    <Link to="/">Careers</Link>
                    <Link to="/">Our Story</Link>
                    <Link to="/">Contact Us</Link>
                </div>

                {/* Shop */}
                <div className="footer-column">
                    <h3>Shop</h3>

                    <Link to="/products">All Products</Link>
                    <Link to="/products">Electronics</Link>
                    <Link to="/products">Fashion</Link>
                    <Link to="/products">Home & Kitchen</Link>
                    <Link to="/products">Books</Link>
                </div>

                {/* Help */}
                <div className="footer-column">
                    <h3>Let Us Help You</h3>

                    <Link to="/cart">Your Cart</Link>
                    <Link to="/order">orders</Link>
                    <Link to="/">Shipping</Link>
                    <Link to="/">Returns & Refunds</Link>
                    <Link to="/">Help Center</Link>
                </div>

            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">

                <div>
                    <h3>Stay updated</h3>
                    <p>
                        Subscribe for new products and special offers.
                    </p>
                </div>

                <div className="newsletter-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                    />

                    <button type="button">
                        Subscribe
                    </button>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">

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

                <p>
                    © 2026 Shop.in. All rights reserved.
                </p>

                <div className="footer-legal">
                    <Link to="/">Privacy</Link>
                    <Link to="/">Terms</Link>
                    <Link to="/">Cookies</Link>
                </div>

            </div>

        </footer>
    );
}

export default Footer;