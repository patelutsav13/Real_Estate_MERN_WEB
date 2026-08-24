const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.startsWith("192.168."))

const rawUrl = import.meta.env.VITE_API_URL

let API_BASE = "http://localhost:5000"

if (rawUrl && rawUrl.trim() !== "") {
  API_BASE = rawUrl.trim()
} else if (isLocal) {
  API_BASE = "http://localhost:5000"
} else {
  API_BASE = "https://real-estate-mern-backend-rwew.onrender.com"
}

const API_URL = API_BASE.replace(/\/$/, "")

const config = {
  API_URL: API_URL,
}

// Named export for components using: import { API } from "../config"
export const API = API_URL

// Default export for components using: import config from "../config"
export default config


