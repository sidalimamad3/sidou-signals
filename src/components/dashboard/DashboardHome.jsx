import { Link } from 'react-router-dom'
import { FiTrendingUp, FiTrendingDown, FiZap, FiArrowRight, FiBarChart2, FiDollarSign, FiStar, FiClock } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

const mockSignals = [
  { pair: 'EUR/USD', direction: 'BUY', entry: 1.0852, tp: 1.0920, sl: 1.0790, status: 'active', pips: '+45' },
  { pair: 'BTC/USDT', direction: 'SELL', entry: 67250, tp: 65800, sl: 68500, status: 'active', pips: '-12' },
  { pair: 'GBP/JPY', direction: 'BUY', entry: 191.45, tp: 192.80, sl: 190.50, status: 'closed', pips: '+135' },
  { pair: 'XAU/USD', direction: 'BUY', entry: 2340.50, tp: 2380.00, sl: 2315.00, status: 'active', pips: '+28' },
]

const markets = [
  { name: 'EUR/USD', price: '1.0852', change: '+0.12%', up: true },
  { name: 'BTC/USDT', price: '67,250', change: '-1.34%', up: false },
  { name: 'XAU/USD', price: '2,340.50', change: '+0.45%', up: true },
  { name: 'GBP/JPY', price: '191.45', change: '+0.23%', up: true },
]

export default function DashboardHome() {
  const { user, profile, isPremium } = useAuth()
  const { darkMode } = useTheme()
  const role = profile?.role || 'free'
  const card = darkMode ? 'bg-[#111827] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome back, {user?.user_metadata?.full_name || 'Trader'} 👋
        </h1>
        <p className={`mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Here's your trading dashboard overview</p>
      </motion.div>

      {/* Account Status */}
      {!isPremium && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="gradient-bg rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg">Upgrade to Premium</h3>
            <p className="text-white/70 mt-1">Get unlimited signals, advanced analysis, and priority support</p>
          </div>
          <Link to="/#pricing" className="px-6 py-2.5 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap">
            Upgrade Now <FiArrowRight className="inline ml-1" />
          </Link>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Signals', value: '12', icon: FiZap, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Win Rate', value: '85.7%', icon: FiTrendingUp, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Total Profit', value: '$2,450', icon: FiDollarSign, color: 'text-secondary', bg: 'bg-secondary/10' },
          { label: 'Open Positions', value: '5', icon: FiBarChart2, color: 'text-accent', bg: 'bg-accent/10' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
            className={`${card} rounded-2xl p-4 sm:p-5`}>
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className={stat.color} />
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Signals + Market Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Signals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className={`lg:col-span-2 ${card} rounded-2xl p-5 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Signals</h2>
            <Link to="/dashboard/signals" className="text-primary-light text-sm hover:text-primary">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`text-xs ${darkMode ? 'text-dark-muted' : 'text-gray-500'} border-b ${darkMode ? 'border-white/5' : 'border-gray-200'}`}>
                  <th className="text-left pb-3 font-medium">Pair</th>
                  <th className="text-left pb-3 font-medium">Direction</th>
                  <th className="text-left pb-3 font-medium">Entry</th>
                  <th className="text-left pb-3 font-medium">TP / SL</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-left pb-3 font-medium">Pips</th>
                </tr>
              </thead>
              <tbody>
                {mockSignals.map((s, i) => (
                  <tr key={i} className={`border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
                    <td className={`py-3 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.pair}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold ${s.direction === 'BUY' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        {s.direction === 'BUY' ? <FiTrendingUp /> : <FiTrendingDown />} {s.direction}
                      </span>
                    </td>
                    <td className={`py-3 ${darkMode ? 'text-dark-muted' : 'text-gray-600'}`}>{s.entry}</td>
                    <td className={`py-3 ${darkMode ? 'text-dark-muted' : 'text-gray-600'}`}>{s.tp} / {s.sl}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${s.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-gray-500/10 text-gray-400'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className={`py-3 font-semibold ${s.pips.startsWith('+') ? 'text-success' : 'text-danger'}`}>{s.pips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Market Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className={`${card} rounded-2xl p-5 sm:p-6`}>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Market Overview</h2>
          <div className="space-y-3">
            {markets.map((m, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div>
                  <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{m.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{m.price}</p>
                </div>
                <span className={`text-sm font-semibold ${m.up ? 'text-success' : 'text-danger'}`}>{m.change}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'View Signals', icon: FiZap, to: '/dashboard/signals', color: 'text-primary' },
          { label: 'Analytics', icon: FiBarChart2, to: '/dashboard/analytics', color: 'text-secondary' },
          { label: 'My Profile', icon: FiStar, to: '/dashboard/profile', color: 'text-accent' },
          { label: 'Support', icon: FiClock, to: '/#contact', color: 'text-success' },
        ].map((a, i) => (
          <Link key={i} to={a.to} className={`${card} rounded-2xl p-4 text-center hover:scale-105 transition-transform`}>
            <a.icon className={`text-2xl ${a.color} mx-auto mb-2`} />
            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{a.label}</p>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
