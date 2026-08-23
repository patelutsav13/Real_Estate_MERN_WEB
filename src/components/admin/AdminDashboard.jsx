import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Users, Home, UserCheck, DollarSign, Sparkles } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, properties: 0, agents: 0, buyPayments: 0, buyCount: 0, rentCount: 0, sellCount: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${API}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const propRes = await axios.get(`${API}/api/properties`)
        const allProps = propRes.data
        const buy = allProps.filter(p => p.status === 'For Sale' || p.status === 'For Buy').length
        const rent = allProps.filter(p => p.status === 'For Rent').length

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

  if (loading) return <div className="p-8 text-center text-amber-400 font-bold">Loading System Analytics...</div>

  const StatCard = ({ title, count, icon: Icon }) => (
    <div className="relative overflow-hidden bg-slate-950/80 backdrop-blur-2xl p-8 rounded-3xl border border-amber-500/30 shadow-2xl transition-all hover:border-amber-400 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
          <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">
            {count}
          </p>
        </div>
        <div className="p-4 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
          <Icon size={28} />
        </div>
      </div>
    </div>
  )

  const pieData = {
    labels: ['Buy/Sell', 'Rent'],
    datasets: [
      {
        label: '# of Properties',
        data: [stats.buyCount, stats.rentCount],
        backgroundColor: [
          'rgba(245, 158, 11, 0.85)',
          'rgba(234, 179, 8, 0.85)',
        ],
        borderColor: [
          'rgba(245, 158, 11, 1)',
          'rgba(234, 179, 8, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const barData = {
    labels: ['Users', 'Properties', 'Agents'],
    datasets: [
      {
        label: 'System Counts',
        data: [stats.users, stats.properties, stats.agents],
        backgroundColor: 'rgba(212, 175, 55, 0.85)',
        borderRadius: 12,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#FBBF24',
          font: { weight: 'bold' }
        }
      }
    },
    scales: {
      y: { ticks: { color: '#D1D5DB' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      x: { ticks: { color: '#D1D5DB' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  }

  return (
    <div className="animate-fade-in space-y-10 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          System Overview & Metrics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Registered Users" count={stats.users} icon={Users} />
        <StatCard title="Total Listed Estates" count={stats.properties} icon={Home} />
        <StatCard title="Active Certified Agents" count={stats.agents} icon={UserCheck} />
        <StatCard title="Total Payments Logged" count={stats.buyPayments} icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-950/80 backdrop-blur-2xl p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
          <h3 className="text-lg font-extrabold mb-6 text-amber-300">Property Category Distribution</h3>
          <div className="h-72 flex justify-center items-center">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-slate-950/80 backdrop-blur-2xl p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
          <h3 className="text-lg font-extrabold mb-6 text-amber-300">System Activity Metrics</h3>
          <div className="h-72">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
