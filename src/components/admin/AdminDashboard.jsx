import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, properties: 0, agents: 0, buyPayments: 0, buyCount: 0, rentCount: 0, sellCount: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token")
                // Fetch basic stats
                const res = await axios.get(`${API}/api/admin/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                // Fetch properties to calculate ratios
                const propRes = await axios.get(`${API}/api/properties`);
                const allProps = propRes.data;
                const buy = allProps.filter(p => p.status === 'For Sale' || p.status === 'For Buy').length;
                const rent = allProps.filter(p => p.status === 'For Rent').length;

                setStats({
                    ...res.data,
                    buyCount: buy,
                    rentCount: rent,
                    sellCount: buy
                })
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Analytics...</div>

    const StatCard = ({ title, count, color, icon }) => (
        <div className={`relative overflow-hidden bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-700 transition-all hover:transform hover:scale-[1.02] hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)]`}>
            <div className={`absolute -top-4 -right-4 p-4 opacity-10 text-9xl font-bold ${color}`}>
                {icon}
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 z-10 relative">{title}</h3>
            <p className={`text-6xl font-extrabold ${color} z-10 relative drop-shadow-sm`}>{count}</p>
        </div>
    )

    // Chart Data
    const pieData = {
        labels: ['Buy/Sell', 'Rent'],
        datasets: [
            {
                label: '# of Properties',
                data: [stats.buyCount, stats.rentCount],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)', // Modern Blue
                    'rgba(168, 85, 247, 0.8)', // Modern Purple
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(168, 85, 247, 1)',
                ],
                borderWidth: 2,
                hoverOffset: 15
            },
        ],
    };

    const barData = {
        labels: ['Users', 'Properties', 'Agents'],
        datasets: [
            {
                label: 'System Counts',
                data: [stats.users, stats.properties, stats.agents],
                backgroundColor: 'rgba(99, 102, 241, 0.8)', // Indigo
                borderRadius: 12,
                borderSkipped: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 25,
                    font: {
                        size: 13,
                        family: "'Inter', sans-serif",
                        weight: 'bold'
                    },
                    color: '#6B7280'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            }
        },
        layout: {
            padding: 10
        }
    }

    return (
        <div className="animate-fade-in-up space-y-10">
            <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-10 tracking-tight">
                Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Total Users"
                    count={stats.users}
                    color="text-blue-600 dark:text-blue-400"
                    icon="👥"
                />
                <StatCard
                    title="Total Properties"
                    count={stats.properties}
                    color="text-purple-600 dark:text-purple-400"
                    icon="🏠"
                />
                <StatCard
                    title="Active Agents"
                    count={stats.agents}
                    color="text-green-600 dark:text-green-400"
                    icon="🕴️"
                />
                <StatCard
                    title="Buy Payments"
                    count={stats.buyPayments}
                    color="text-orange-600 dark:text-orange-400"
                    icon="💰"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                        Property Distribution
                    </h3>
                    <div className="h-80 flex justify-center items-center">
                        <Pie data={pieData} options={chartOptions} />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                        System Growth
                    </h3>
                    <div className="h-80">
                        <Bar data={barData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
