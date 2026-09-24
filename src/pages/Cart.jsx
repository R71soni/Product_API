function Cart({
    cart = [],
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
}) {

    // =========================
    // CALCULATE TOTAL
    // =========================

    const total = cart.reduce(
        (sum, item) => {
            const price = Number(item.price || 0);
            const quantity = Number(item.quantity || 1);

            return sum + price * quantity;
        },
        0
    );




    // =========================
    // EMPTY CART
    // =========================

    if (cart.length === 0) {
        return (
            <div className="cart-page">

                <h1>Shopping Cart</h1>

                <div className="empty">
                    Your cart is empty.
                </div>

            </div>
        );
    }


    // =========================
    // CART UI
    // =========================

    return (
        <div className="cart-page">

            <h1>Shopping Cart</h1>


            {/* =========================
                CART ITEMS
            ========================= */}

            <div className="cart-items">

                {cart.map((item) => {

                    const price = Number(item.price || 0);

                    const quantity = Number(item.quantity || 1);

                    const subtotal = price * quantity;


                    return (
                        <div
                            className="cart-item"
                            key={item.id}
                        >

                            {/* PRODUCT IMAGE */}

                            <img
                                src={
                                    item.image ||
                                    "https://placehold.co/100x100/png?text=No+Image"
                                }
                                alt={item.title || "Product"}
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://placehold.co/100x100/png?text=No+Image";
                                }}
                            />


                            {/* PRODUCT INFORMATION */}

                            <div className="cart-item-info">

                                <h3>
                                    {item.title}
                                </h3>


                                <p>
                                    Price: ₹{price.toFixed(2)}
                                </p>


                                {/* QUANTITY */}

                                <div className="quantity-control">

                                    <button
                                        type="button"
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        −
                                    </button>

                                    <span>
                                        {item.quantity || 1}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => increaseQuantity(item.id)}
                                    >
                                        +
                                    </button>

                                </div>


                                {/* SUBTOTAL */}

                                <p>
                                    Subtotal: ₹{subtotal.toFixed(2)}
                                </p>

                            </div>


                            {/* REMOVE */}

                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                Remove
                            </button>

                        </div>
                    );
                })}

            </div>


            {/* =========================
                CART SUMMARY
            ========================= */}

            <div className="cart-summary">

                <h2>
                    Total: ₹{total.toFixed(2)}
                </h2>


                <button
                    type="button"
                    className="checkout-btn"
                    onClick={() =>
                        alert("Checkout coming soon!")
                    }
                >
                    Checkout
                </button>

            </div>

        </div>
    );
}

export default Cart;