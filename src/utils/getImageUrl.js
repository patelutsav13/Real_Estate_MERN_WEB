import config from "../config"

export const getImageUrl = (img) => {
  if (!img) return "/placeholder.svg"
  
  if (typeof img === "string") {
    if (
      img.startsWith("http://") ||
      img.startsWith("https://") ||
      img.startsWith("data:") ||
      img.startsWith("blob:")
    ) {
      if (img.includes("localhost:5000")) {
        return img
          .replace("http://localhost:5000", config.API_URL)
          .replace("https://localhost:5000", config.API_URL)
      }
      return img
    }

    if (img.startsWith("/assets/") || img.startsWith("assets/")) {
      return img.startsWith("/") ? img : `/${img}`
    }

    if (img.startsWith("/uploads")) {
      return `${config.API_URL}${img}`
    }
    return `${config.API_URL}/uploads/${img}`
  }

  return "/placeholder.svg"
}

export default getImageUrl
