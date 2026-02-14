import { useAuth } from "../context/AuthContext"

const Logout = ({ setCurrentPage }) => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    setCurrentPage("login")
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  )
}

export default Logout
