import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./Auth/Login"
import Register from "./Auth/Register"

function App() {

    // =====================================
    // CART STATE
    // =====================================

    const [cart, setCart] = useState([]);


    // =====================================
    // SEARCH STATE
    // =====================================

    const [search, setSearch] = useState("");


    // =====================================
    // ADD TO CART
    // =====================================

    const addToCart = (product) => {

        setCart((previousCart) => {

            const existingProduct = previousCart.find(
                (item) => item.id === product.id
            );

            // Product already exists
            if (existingProduct) {

                return previousCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            // New product
            return [
                ...previousCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };


    // =====================================
    // REMOVE FROM CART
    // =====================================

    const removeFromCart = (id) => {

        setCart((previousCart) =>
            previousCart.filter(
                (item) => item.id !== id
            )
        );
    };


    // =====================================
    // CART COUNT
    // =====================================

    const cartCount = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    return (
        <BrowserRouter>

            {/* =================================
                NAVBAR
            ================================= */}

            <Navbar
                cartCount={cartCount}
                search={search}
                setSearch={setSearch}
            />


            {/* =================================
                ROUTES
            ================================= */}

            <Routes>

                {/* Products Page */}

                <Route
                    path="/"
                    element={
                        <Products
                            search={search}
                            addToCart={addToCart}
                        />
                    }
                />


                <Route
                    path="/products"
                    element={
                        <Products
                            search={search}
                            addToCart={addToCart}
                        />
                    }
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/Login"
                    element={<Login />}
                />

                 <Route
                    path="/Register"
                    element={<Register />}
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
                    element={
                        <AddProduct />
                    }
                />


                {/* Edit Product */}

                <Route
                    path="/admin/edit/:id"
                    element={
                        <EditProduct />
                    }
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


            {/* =================================
                FOOTER
            ================================= */}

            <Footer />

        </BrowserRouter>
    );
}

export default App;