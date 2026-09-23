import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";


function App() {

    const [cart, setCart] = useState([]);

    // Add product to cart
    const addToCart = (product) => {

        setCart((prevCart) => {

            const existingProduct = prevCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {

                return prevCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );

            }

            return [
                ...prevCart,
                {
                    ...product,
                    quantity: 1
                }
            ];

        });

    };


    // Remove product from cart
    const removeFromCart = (id) => {

        setCart((prevCart) =>
            prevCart.filter(
                (item) => item.id !== id
            )
        );

    };


    return (

        <BrowserRouter>

            <Navbar
                cartCount={cart.reduce(
                    (total, item) =>
                        total + item.quantity,
                    0
                )}
            />

            <Routes>

                {/* Home */}
                <Route
                    path="/"
                    element={<Home />}
                />


                {/* Products */}
                <Route
                    path="/products"
                    element={<Products />}
                />


                {/* Product Details */}
                <Route
                    path="/products/:id"
                    element={
                        <ProductDetails
                            addToCart={addToCart}
                        />
                    }
                />


                {/* Add Product */}
                <Route
                    path="/admin/add"
                    element={<AddProduct />}
                />


                {/* Edit Product */}
                <Route
                    path="/admin/edit/:id"
                    element={<EditProduct />}
                />


                {/* Cart */}
                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            removeFromCart={removeFromCart}
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;