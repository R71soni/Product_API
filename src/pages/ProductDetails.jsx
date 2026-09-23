import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../services/productService";

function ProductDetails({ addToCart }) {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProduct = async () => {

            try {
                setLoading(true);
                setError("");

                const data = await productService.getProductById(id);

                setProduct(data);

            } catch (error) {

                console.error("Error loading product:", error);

                setError(
                    error.response?.data?.message ||
                    "Product not found."
                );

            } finally {
                setLoading(false);
            }
        };

        loadProduct();

    }, [id]);

    if (loading) {
        return (
            <div className="loading">
                Loading product...
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                {error}
                <br />

                <Link to="/products">
                    ← Back to Products
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="error-message">
                Product not found.
            </div>
        );
    }

    return (
        <div className="details-page">

            {/* Product Image */}
            <div className="details-image">

                <img
                    src={
                        product.image ||
                        "https://via.placeholder.com/500"
                    }
                    alt={product.title}
                />

            </div>

            {/* Product Information */}
            <div className="details-content">

                {/* Category */}
                <p className="category">
                    {product.category}
                </p>

                {/* Title */}
                <h1>
                    {product.title}
                </h1>

                {/* Description */}
                <p className="details-description">
                    {product.description}
                </p>

                {/* Price */}
                <h2>
                    ₹{product.price}
                </h2>

                {/* Stock */}
                <p>
                    Available Stock: {product.stockQuantity}
                </p>

                {/* Add To Cart */}
                <button
                    className="add-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={product.stockQuantity <= 0}
                >
                    {product.stockQuantity > 0
                        ? "Add to Cart"
                        : "Out of Stock"}
                </button>

                {/* Back */}
                <Link
                    to="/products"
                    className="back-link"
                >
                    ← Back to Products
                </Link>

            </div>

        </div>
    );
}

export default ProductDetails;