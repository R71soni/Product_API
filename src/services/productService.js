import axios from "axios";

// =========================
// BASE URL
// =========================

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
    console.error("VITE_API_URL is not defined in .env");
}


// =========================
// API URLS
// =========================

const API_URL = `${BASE_URL}/api/products`;
const AUTH_URL = `${BASE_URL}/api/v1/auth`;


// =========================
// PRODUCT SERVICE
// =========================

const productService = {

    // =========================
    // PRODUCTS
    // =========================

    getAllProducts: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },


    getProductById: async (id) => {
        const response = await axios.get(
            `${API_URL}/${id}`
        );

        return response.data;
    },


    createProduct: async (product) => {
        const response = await axios.post(
            API_URL,
            product
        );

        return response.data;
    },


    updateProduct: async (id, product) => {
        const response = await axios.put(
            `${API_URL}/${id}`,
            product
        );

        return response.data;
    },


    deleteProduct: async (id) => {
        await axios.delete(
            `${API_URL}/${id}`
        );
    },


    // =========================
    // AUTH
    // =========================

    registerUser: async (formData) => {

        const response = await axios.post(
            `${AUTH_URL}/register`,
            formData
        );

        return response.data;
    },


    loginUser: async (formData) => {

        const response = await axios.post(
            `${AUTH_URL}/login`,
            formData
        );

        return response.data;
    }

};


export default productService;