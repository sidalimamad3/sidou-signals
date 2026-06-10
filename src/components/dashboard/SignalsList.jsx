import { useState } from 'react'
import { FiTrendingUp, FiTrendingDown, FiLock, FiFilter, FiClock } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

const allSignals = [
  { id: 1, pair: 'EUR/USD', direction: 'BUY', entry: 1.0852, tp: 1.0920, sl: 1.0790, status: 'active', pips: '+45', time: '2 hours ago', premium: false },
  { id: 2, pair: 'BTC/USDT', direction: 'SELL', entry: 67250, tp: 65800, sl: 68500, status: 'active', pips: '-12', time: '3 hours ago', premium: true },
  { id: 3, pair: 'GBP/JPY', direction: 'BUY', entry: 191.45, tp: 192.80, sl: 190.50, status: 'closed', pips: '+135', time: '5 hours ago', premium: true },
  { id: 4, pair: 'XAU/USD', direction: 'BUY', entry: 2340.50, tp: 2380.00, sl: 2315.00, status: 'active', pips: '+28', time: '1 hour ago', premium: true },
  { id: 5, pair: 'USD/CAD', direction: 'SELL', entry: 1.3680, tp: 1.3610, sl: 1.3740, status: 'pending', pips: '0', time: '30 min ago', premium: true },
  { id: 6, pair: 'ETH/USDT', direction: 'BUY', entry: 3520, tp: 3680, sl: 3400, status: 'active', pips: '+68', time: '4 hours ago', premium: true },
  { id: 7, pair: 'NZD/USD', direction: 'SELL', entry: 0.6145, tp: 0.6080, sl: 0.6200, status: 'closed', pips: '+65', time: '8 hours ago', premium: false },
  { id: 8, pair: 'SOL/USDT', direction: 'BUY', entry: 145.20, tp: 158.00, sl: 138.50, status: 'active', pips: '+22', time: '6 hours ago', premium: true },
  { id: 9, pair: 'AUD/USD', direction: 'BUY', entry: 0.6530, tp: 0.6600, sl: 0.6470, status: 'closed', pips: '-60', time: '12 hours ago', premium: false },
  { id: 10, pair: 'USD/JPY', direction: 'SELL', entry: 157.80, tp: 156.20, sl: 159.00, status: 'pending', pips: '0', time: '15 min ago', premium: true },
]

export default function SignalsList() {
  const [filter, setFilter] = useState('all')
  const { isPremium } = useAuth()
  const { darkMode } = useTheme()
  const card = darkMode ? 'bg-[#111827] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'

  const filtered = filter === 'all' ? allSignals : allSignals.filter(s => s.status === filter)

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'closed', label: 'Closed' },
    { key: 'pending', label: 'Pending' },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Trading Signals</h1>
        <p className={`mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Real-time signals from our expert analysts</p>
      </motion.div>

      {/* Filter Tabs */}
      <div className={`flex gap-2 p-1 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === t.key ? 'gradient-bg text-white' : darkMode ? 'text-dark-muted hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Signals Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((signal, i) => {
          const locked = signal.premium && !isPremium
          return (
            <motion.div key={signal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`${card} rounded-2xl p-5 relative overflow-hidden`}>
              {locked && (
                <div className="absolute inset-0 bg-[#0A0E1A]/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                  <div className="text-center">
                    <FiLock className="text-3xl text-primary mx-auto mb-2" />
                    <p className="text-white font-semibold text-sm">Premium Signal</p>
                    <p className="text-dark-muted text-xs mt-1">Upgrade to unlock</p>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{signal.pair}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold ${signal.direction === 'BUY' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {signal.direction === 'BUY' ? <FiTrendingUp /> : <FiTrendingDown />} {signal.direction}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${signal.status === 'active' ? 'bg-primary/10 text-primary' : signal.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-gray-500/10 text-gray-400'}`}>
                  {signal.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Entry</p>
                  <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{signal.entry}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Take Profit</p>
                  <p className="font-semibold text-sm text-success">{signal.tp}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Stop Loss</p>
                  <p className="font-semibold text-sm text-danger">{signal.sl}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className={`font-bold ${signal.pips.startsWith('+') ? 'text-success' : signal.pips.startsWith('-') ? 'text-danger' : darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>
                  {signal.pips} pips
                </span>
                <span className={`flex items-center gap-1 text-xs ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>
                  <FiClock className="text-xs" /> {signal.time}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
