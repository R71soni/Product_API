import { Link } from "react-router-dom";

function ProductCard({
    product,
    onDelete,
    addToCart
}) {

    return (
        <div className="product-card">

            {/* =========================
                PRODUCT IMAGE
            ========================= */}

            <img
                src={
                    product.image ||
                    "https://placehold.co/300x300/png?text=No+Image"
                }
                alt={product.title || "Product"}
                className="product-image"
                onError={(e) => {
                    e.currentTarget.src =
                        "https://placehold.co/300x300/png?text=No+Image";
                }}
            />


            <div className="product-content">

                {/* CATEGORY */}

                <p className="category">
                    {product.category}
                </p>


                {/* TITLE */}

                <h3>
                    {product.title}
                </h3>


                {/* DESCRIPTION */}

                <p className="description">
                    {product.description}
                </p>


                {/* PRICE */}

                <div className="product-price">
                    ₹{Number(product.price || 0).toFixed(2)}
                </div>


                {/* STOCK */}

                <p className="stock">
                    Stock: {product.stockQuantity}
                </p>


                {/* =========================
                    BUTTONS
                ========================= */}

                <div className="product-buttons">

                    {/* VIEW */}

                    <Link
                        to={`/products/${product.id}`}
                        className="btn view-btn"
                    >
                        View
                    </Link>


                    {/* ADD TO CART */}

                    <button
                        type="button"
                        className="btn cart-btn"
                        onClick={() => addToCart(product)}
                        disabled={
                            !product.stockQuantity ||
                            product.stockQuantity <= 0
                        }
                    >
                        {product.stockQuantity > 0
                            ? "Add to Cart"
                            : "Out of Stock"
                        }
                    </button>


                    {/* EDIT */}

                    <Link
                        to={`/admin/edit/${product.id}`}
                        className="btn edit-btn"
                    >
                        Edit
                    </Link>


                    {/* DELETE */}

                    <button
                        type="button"
                        className="btn delete-btn"
                        onClick={() => onDelete(product.id)}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;