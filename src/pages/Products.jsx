import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productService from "../services/productService";
import AutoSlider from "../components/AutoSlider";

function Products({ search, addToCart }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================
    // LOAD PRODUCTS
    // =========================

    const loadProducts = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await productService.getAllProducts();

            setProducts(data);

        } catch (error) {

            console.error(
                "Error loading products:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load products. Please check your backend."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadProducts();
    }, []);


    // =========================
    // DELETE PRODUCT
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await productService.deleteProduct(id);

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (product) => product.id !== id
                )
            );

            alert("Product deleted successfully.");

        } catch (error) {

            console.error(
                "Error deleting product:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to delete product."
            );
        }
    };


    // =========================
    // SEARCH PRODUCTS BY TITLE
    // =========================

    const filteredProducts = products.filter((product) =>
        product.title
            ?.toLowerCase()
            .includes(search.trim().toLowerCase())
    );


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="loading">
                Loading products...
            </div>
        );

    }


    // =========================
    // UI
    // =========================

    return (
        <>

            {/* =========================
                AUTO SLIDER
            ========================= */}

            <AutoSlider />


            {/* =========================
                PRODUCTS
            ========================= */}

            <div className="products-page">

                <div className="page-header">

                    <div>

                        <h1>
                            Our Products
                        </h1>

                        <p>
                            Find the perfect product for you.
                        </p>

                    </div>

                </div>


                {/* =========================
                    ERROR
                ========================= */}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {/* =========================
                    PRODUCTS LIST
                ========================= */}

                {filteredProducts.length === 0 ? (

                    <div className="empty">

                        {search.trim()
                            ? "No products match your search."
                            : "No products found."
                        }

                    </div>

                ) : (

                    <div className="products-grid">

                        {filteredProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                                onDelete={handleDelete}
                                addToCart={addToCart}
                            />

                        ))}

                    </div>

                )}

            </div>

        </>
    );
}

export default Products;