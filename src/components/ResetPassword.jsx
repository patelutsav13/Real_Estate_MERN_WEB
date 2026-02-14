"use client"

import { useState } from "react"
import config from "../config"
import { Lock, Eye, EyeOff } from "lucide-react"

const ResetPassword = ({ setCurrentPage }) => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        setLoading(true)
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (!token) {
                alert("Invalid or missing token");
                setLoading(false);
                return;
            }

            const res = await fetch(`${config.API_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            })

            if (res.ok) {
                alert("Password reset successfully! Please login.")
                setCurrentPage("login")
            } else {
                alert("Failed to reset password")
            }
        } catch (err) {
            alert("Server error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-gray-300">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-12 py-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white input"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-12 py-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white input"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:scale-105 transition"
                    >
                        {loading ? "Resetting..." : "Reset My Password"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
