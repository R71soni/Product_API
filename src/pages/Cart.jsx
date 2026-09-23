function Cart({ cart = [], removeFromCart }) {

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );

    return (
        <div className="cart-page">

            <h1>Shopping Cart</h1>

            {cart.length === 0 ? (

                <div className="empty">
                    Your cart is empty.
                </div>

            ) : (

                <>
                    <div className="cart-items">

                        {cart.map((item) => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >

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

                                <div className="cart-item-info">

                                    <h3>
                                        {item.title}
                                    </h3>

                                    <p>
                                        Price: ₹
                                        {Number(item.price || 0).toFixed(2)}
                                    </p>

                                    <p>
                                        Quantity: {item.quantity}
                                    </p>

                                    <p>
                                        Subtotal: ₹
                                        {(
                                            Number(item.price || 0) *
                                            Number(item.quantity || 0)
                                        ).toFixed(2)}
                                    </p>

                                </div>

                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        if (removeFromCart) {
                                            removeFromCart(item.id);
                                        }
                                    }}
                                >
                                    Remove
                                </button>

                            </div>

                        ))}

                    </div>

                    <div className="cart-summary">

                        <h2>
                            Total: ₹{total.toFixed(2)}
                        </h2>

                        <button
                            className="checkout-btn"
                            onClick={() =>
                                alert("Checkout coming soon!")
                            }
                        >
                            Checkout
                        </button>

                    </div>
                </>

            )}

        </div>
    );
}

export default Cart;