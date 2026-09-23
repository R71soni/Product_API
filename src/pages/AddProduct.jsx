import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";

function AddProduct() {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        image: "",
        stockQuantity: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct({
            ...product,
            [name]: value
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError("");

        const productData = {
            title: product.title,
            description: product.description,
            category: product.category,
            price: Number(product.price),
            image: product.image,
            stockQuantity: Number(product.stockQuantity),
            active: true
        };

        console.log("Sending product:", productData);

        await productService.createProduct(productData);

        alert("Product created successfully!");

        navigate("/products");

    } catch (error) {

        console.error("Create product error:", error);

        setError(
            error.response?.data?.message ||
            error.response?.data ||
            "Unable to create product."
        );

    } finally {
        setLoading(false);
    }
};

    return (
        <div className="form-page">

            <h1>Add Product</h1>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />

                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    min="0"
                    required
                />

                <label>Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                />

                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                />

                <label>Stock</label>
                <input
                    type="number"
                    name="stockQuantity"
                    value={product.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating..."
                        : "Create Product"}
                </button>

            </form>

        </div>
    );
}

export default AddProduct;