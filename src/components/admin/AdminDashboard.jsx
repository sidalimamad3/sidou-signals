import { FiUsers, FiDollarSign, FiWifi, FiTrendingUp, FiUserPlus, FiSend, FiBarChart2, FiActivity } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

const mockRecentUsers = [
  { name: 'Ahmed K.', email: 'ahmed@email.com', role: 'premium', date: '2025-01-15' },
  { name: 'Sarah M.', email: 'sarah@email.com', role: 'free', date: '2025-01-14' },
  { name: 'Omar L.', email: 'omar@email.com', role: 'lifetime', date: '2025-01-13' },
  { name: 'Fatima B.', email: 'fatima@email.com', role: 'free', date: '2025-01-12' },
  { name: 'Youssef R.', email: 'youssef@email.com', role: 'premium', date: '2025-01-11' },
]

export default function AdminDashboard() {
  const { darkMode } = useTheme()
  const card = darkMode ? 'bg-[#111827] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'

  const stats = [
    { label: 'Total Users', value: '1,247', icon: FiUsers, color: 'text-primary', bg: 'bg-primary/10', change: '+12%' },
    { label: 'Premium Subs', value: '342', icon: FiStar, color: 'text-yellow-500', bg: 'bg-yellow-500/10', change: '+8%' },
    { label: 'Revenue (MTD)', value: '$16,758', icon: FiDollarSign, color: 'text-success', bg: 'bg-success/10', change: '+23%' },
    { label: 'Signals Sent', value: '856', icon: FiWifi, color: 'text-secondary', bg: 'bg-secondary/10', change: '+15%' },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</h1>
        <p className={`mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Platform overview and management</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`${card} rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}><s.icon className={s.color} /></div>
              <span className="text-xs font-semibold text-success">{s.change}</span>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.value}</p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className={`lg:col-span-2 ${card} rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Revenue Overview</h2>
            <FiActivity className={darkMode ? 'text-dark-muted' : 'text-gray-400'} />
          </div>
          <div className="h-48 flex items-end gap-2">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 95, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  className="w-full gradient-bg rounded-t-lg min-h-[4px]"></motion.div>
                <span className={`text-[10px] ${darkMode ? 'text-dark-muted' : 'text-gray-400'}`}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className={`${card} rounded-2xl p-6`}>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Users</h2>
          <div className="space-y-3">
            {mockRecentUsers.map((u, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-colors`}>
                <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">{u.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{u.name}</p>
                  <p className={`text-xs truncate ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{u.email}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${u.role === 'premium' ? 'bg-yellow-500' : u.role === 'lifetime' ? 'bg-cyan-500' : 'bg-gray-500'}`}>{u.role}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Manage Users', icon: FiUsers, desc: 'View & manage all users', to: '/admin/users', color: 'text-primary' },
          { label: 'Send Signal', icon: FiSend, desc: 'Broadcast a new signal', to: '#', color: 'text-success' },
          { label: 'View Reports', icon: FiBarChart2, desc: 'Detailed analytics', to: '#', color: 'text-secondary' },
        ].map((a, i) => (
          <a key={i} href={a.to} className={`${card} rounded-2xl p-5 hover:scale-[1.02] transition-transform block`}>
            <a.icon className={`text-2xl ${a.color} mb-3`} />
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{a.label}</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{a.desc}</p>
          </a>
        ))}
      </motion.div>
    </div>
  )
}

function FiStar(props) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
