import { Link } from "react-router-dom";

function ProductCard({ product, onDelete }) {

    return (
        <div className="product-card">

            <img
                src={
                    product.image ||
                    "https://via.placeholder.com/300"
                }
                alt={product.title}
                className="product-image"
            />

            <div className="product-content">

                <p className="category">
                    {product.category}
                </p>

                <h3>
                    {product.title}
                </h3>

                <p className="description">
                    {product.description}
                </p>

                <div className="product-price">
                    ₹{product.price}
                </div>

                <p className="stock">
                    Stock: {product.stockQuantity}
                </p>

                <div className="product-buttons">

                    <Link
                        to={`/products/${product.id}`}
                        className="btn view-btn"
                    >
                        View
                    </Link>

                    <Link
                        to={`/admin/edit/${product.id}`}
                        className="btn edit-btn"
                    >
                        Edit
                    </Link>

                    <button
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