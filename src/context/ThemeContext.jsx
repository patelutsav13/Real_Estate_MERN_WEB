import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage or system preference
        if (localStorage.getItem("theme")) {
            return localStorage.getItem("theme")
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    })

    useEffect(() => {
        const root = window.document.documentElement

        // Remove both specific classes first to reset
        root.classList.remove("light", "dark")

        // Add the current theme class
        root.classList.add(theme)

        // Save to localStorage
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
