import { useState } from "react";
 import "../AllCSS/Orders.css";

function Orders() {

    // Temporary order data
    // Later we can load this from Spring Boot + MySQL
    const [orders, setOrders] = useState([
        {
            id: "ORD-1001",
            date: "23 Sep 2026",
            status: "Delivered",
            product: "Wireless Mouse",
            price: 56,
            quantity: 2,
            image: "https://placehold.co/120x120/png?text=Mouse"
        },
        {
            id: "ORD-1002",
            date: "20 Sep 2026",
            status: "Delivered",
            product: "Laptop",
            price: 55000,
            quantity: 1,
            image: "https://placehold.co/120x120/png?text=Laptop"
        }
    ]);

    const [returnMessage, setReturnMessage] = useState("");

    const handleReturn = (orderId) => {

        const confirmReturn = window.confirm(
            `Do you want to return order ${orderId}?`
        );

        if (!confirmReturn) {
            return;
        }

        setOrders((previousOrders) =>
            previousOrders.map((order) =>
                order.id === orderId
                    ? {
                        ...order,
                        status: "Return Requested"
                    }
                    : order
            )
        );

        setReturnMessage(
            `Return request submitted for ${orderId}`
        );
    };


    return (
        <div className="orders-page">

            <div className="orders-container">

                <h1>Returns & Orders</h1>

                <p className="orders-subtitle">
                    View your orders and manage returns.
                </p>


                {/* SUCCESS MESSAGE */}

                {returnMessage && (
                    <div className="return-message">
                        {returnMessage}
                    </div>
                )}


                {/* NO ORDERS */}

                {orders.length === 0 ? (

                    <div className="empty-orders">
                        <h2>No orders found</h2>

                        <p>
                            You have not placed any orders yet.
                        </p>
                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => {

                            const total =
                                Number(order.price) *
                                Number(order.quantity);

                            return (
                                <div
                                    className="order-card"
                                    key={order.id}
                                >

                                    {/* ORDER HEADER */}

                                    <div className="order-header">

                                        <div>
                                            <span>
                                                ORDER PLACED
                                            </span>

                                            <strong>
                                                {order.date}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>
                                                ORDER ID
                                            </span>

                                            <strong>
                                                {order.id}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>
                                                TOTAL
                                            </span>

                                            <strong>
                                                ₹{total.toFixed(2)}
                                            </strong>
                                        </div>

                                    </div>


                                    {/* ORDER BODY */}

                                    <div className="order-body">

                                        <img
                                            src={order.image}
                                            alt={order.product}
                                            className="order-image"
                                        />


                                        <div className="order-details">

                                            <h2>
                                                {order.product}
                                            </h2>

                                            <p>
                                                Price: ₹
                                                {Number(order.price).toFixed(2)}
                                            </p>

                                            <p>
                                                Quantity: {order.quantity}
                                            </p>

                                            <p>
                                                Status:
                                                <span
                                                    className={
                                                        order.status ===
                                                        "Return Requested"
                                                            ? "return-status"
                                                            : "order-status"
                                                    }
                                                >
                                                    {order.status}
                                                </span>
                                            </p>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="order-actions">

                                            <button
                                                className="view-order-btn"
                                                type="button"
                                            >
                                                View Order
                                            </button>

                                            {order.status ===
                                                "Delivered" && (
                                                <button
                                                    className="return-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        handleReturn(
                                                            order.id
                                                        )
                                                    }
                                                >
                                                    Return Item
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Orders;