import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../services/productService";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProduct = async () => {

            try {

                const data =
                    await productService.getProductById(id);

                setProduct(data);

            } catch (error) {

                console.error(error);

                alert("Product not found.");

            } finally {

                setLoading(false);

            }

        };

        loadProduct();

    }, [id]);

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

            await productService.updateProduct(id, {
                ...product,
                price: Number(product.price),
                stock: Number(product.stock)
            });

            alert("Product updated successfully!");

            navigate("/products");

        } catch (error) {

            console.error(error);

            alert("Failed to update product.");

        }

    };

    if (loading) {
        return (
            <div className="loading">
                Loading...
            </div>
        );
    }

    return (

        <div className="form-page">

            <div className="form-container">

                <h1>Edit Product</h1>

                <form onSubmit={handleSubmit}>

                    <label>Product Name</label>

                    <input
                        name="name"
                        value={product.name || ""}
                        onChange={handleChange}
                        required
                    />

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={product.description || ""}
                        onChange={handleChange}
                        required
                    />

                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        value={product.price || ""}
                        onChange={handleChange}
                        required
                    />

                    <label>Image URL</label>

                    <input
                        name="image"
                        value={product.image || ""}
                        onChange={handleChange}
                    />

                    <label>Category</label>

                    <input
                        name="category"
                        value={product.category || ""}
                        onChange={handleChange}
                    />

                    <label>Stock</label>

                    <input
                        type="number"
                        name="stock"
                        value={product.stock || ""}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Update Product
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditProduct;