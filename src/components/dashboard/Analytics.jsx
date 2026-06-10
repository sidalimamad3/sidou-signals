import { useState } from 'react'
import { FiBarChart2, FiTrendingUp } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

export default function Analytics() {
  const { darkMode } = useTheme()
  const card = darkMode ? 'bg-[#111827] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'
  const [period, setPeriod] = useState('7d')

  const performanceData = [
    { label: 'Win Rate', value: '85.7%', change: '+3.2%', up: true },
    { label: 'Avg. Pips/Signal', value: '+42.5', change: '+5.1', up: true },
    { label: 'Risk/Reward', value: '1:2.8', change: '+0.3', up: true },
    { label: 'Drawdown', value: '4.2%', change: '-1.1%', up: false },
  ]

  const monthlyPerformance = [
    { month: 'Aug', wins: 22, losses: 5 },
    { month: 'Sep', wins: 19, losses: 7 },
    { month: 'Oct', wins: 25, losses: 4 },
    { month: 'Nov', wins: 21, losses: 6 },
    { month: 'Dec', wins: 24, losses: 3 },
    { month: 'Jan', wins: 18, losses: 3 },
  ]

  const maxWins = Math.max(...monthlyPerformance.map(m => m.wins + m.losses))

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics</h1>
          <p className={`mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Detailed performance metrics and analysis</p>
        </div>
        <div className={`flex gap-2 p-1 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
          {['7d', '30d', '90d', '1y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${period === p ? 'gradient-bg text-white' : darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>
              {p}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Performance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceData.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`${card} rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
              <FiBarChart2 className={darkMode ? 'text-dark-muted' : 'text-gray-400'} />
              <span className={`text-xs font-semibold ${s.up ? 'text-success' : 'text-danger'}`}>{s.change}</span>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.value}</p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className={`${card} rounded-2xl p-6`}>
        <h2 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Performance</h2>
        <div className="flex items-end gap-4 h-48">
          {monthlyPerformance.map((m, i) => {
            const total = m.wins + m.losses
            const winH = (m.wins / maxWins) * 100
            const lossH = (m.losses / maxWins) * 100
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-0.5" style={{ height: '160px', justifyContent: 'flex-end' }}>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${winH}%` }} transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    className="w-full bg-success/60 rounded-t-lg min-h-[4px]"></motion.div>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${lossH}%` }} transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    className="w-full bg-danger/60 rounded-b-lg min-h-[2px]"></motion.div>
                </div>
                <span className={`text-xs ${darkMode ? 'text-dark-muted' : 'text-gray-400'}`}>{m.month}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-6 mt-4">
          <span className="flex items-center gap-2 text-sm"><span className="w-3 h-3 bg-success/60 rounded"></span><span className={darkMode ? 'text-dark-muted' : 'text-gray-500'}>Wins</span></span>
          <span className="flex items-center gap-2 text-sm"><span className="w-3 h-3 bg-danger/60 rounded"></span><span className={darkMode ? 'text-dark-muted' : 'text-gray-500'}>Losses</span></span>
        </div>
      </motion.div>

      {/* Top Performing Signals */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className={`${card} rounded-2xl p-6`}>
        <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Top Performing Signals</h2>
        <div className="space-y-3">
          {[
            { pair: 'EUR/USD', pips: '+285', winRate: '92%', trend: 'up' },
            { pair: 'XAU/USD', pips: '+210', winRate: '88%', trend: 'up' },
            { pair: 'GBP/JPY', pips: '+178', winRate: '85%', trend: 'up' },
            { pair: 'BTC/USDT', pips: '+145', winRate: '80%', trend: 'up' },
          ].map((s, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <FiTrendingUp className="text-success" />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.pair}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-success font-semibold text-sm">{s.pips} pips</span>
                <span className={`text-sm ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{s.winRate} win</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
