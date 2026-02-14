const API_URL = import.meta.env.VITE_API_URL || "https://real-estate-mern-backend-rwew.onrender.com";

const config = {
    API_URL: API_URL,
};

// Named export for components using: import API from "../config/api"
export const API = API_URL;

// Default export for components using: import config from "../config"
export default config;
