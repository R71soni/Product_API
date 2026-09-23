import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Shop Smart.
                        <br />
                        Live Better.
                    </h1>

                    <p>
                        Discover amazing products at the best prices.
                    </p>

                    <Link to="/products"
                        className="hero-button"
                    >
                        Shop Now
                    </Link>

                </div>

            </section>

            <section className="features">

                <div className="feature">
                    <span>🚚</span>
                    <h3>Fast Delivery</h3>
                    <p>Quick and reliable delivery.</p>
                </div>

                <div className="feature">
                    <span>🔒</span>
                    <h3>Secure Payment</h3>
                    <p>Your payment is protected.</p>
                </div>

                <div className="feature">
                    <span>⭐</span>
                    <h3>Quality Products</h3>
                    <p>High quality products.</p>
                </div>

            </section>

        </div>
    );
}

export default Home;