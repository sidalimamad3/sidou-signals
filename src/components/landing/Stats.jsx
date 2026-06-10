import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { FiUsers, FiTrendingUp, FiWifi, FiDollarSign } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const stats = [
  { icon: FiUsers, value: 12500, suffix: '+', label: 'Active Traders', color: 'text-primary' },
  { icon: FiTrendingUp, value: 85.7, suffix: '%', label: 'Win Rate', decimals: 1, color: 'text-success' },
  { icon: FiWifi, value: 2500, suffix: '+', label: 'Signals Sent', color: 'text-secondary' },
  { icon: FiDollarSign, value: 2.5, suffix: 'M+', label: 'Profit Generated', decimals: 1, color: 'text-accent' },
]

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { darkMode } = useTheme()

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5"></div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary-light text-sm font-semibold uppercase tracking-wider">Statistics</span>
          <h2 className={`text-3xl sm:text-4xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Trusted by <span className="gradient-text">Thousands</span></h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`${darkMode ? 'glass-card bg-[#111827]/80' : 'bg-white border border-gray-200 shadow-sm'} rounded-2xl p-6 text-center`}>
              <s.icon className={`text-3xl ${s.color} mx-auto mb-3`} />
              <p className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {inView ? <CountUp end={s.value} duration={2.5} decimals={s.decimals || 0} /> : '0'}{s.suffix}
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
