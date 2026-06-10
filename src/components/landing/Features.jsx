import { FiZap, FiTrendingUp, FiShield, FiGlobe, FiUsers, FiHeadphones } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const features = [
  { icon: FiZap, title: 'Real-Time Signals', desc: 'Receive instant trading signals the moment opportunities arise. Never miss a profitable trade with our lightning-fast alert system.' },
  { icon: FiTrendingUp, title: 'Expert Analysis', desc: 'Our team of professional analysts with 15+ years of experience provides deep market analysis to back every signal we share.' },
  { icon: FiShield, title: 'Risk Management', desc: 'Every signal includes precise stop-loss and take-profit levels, ensuring proper risk management on every single trade.' },
  { icon: FiGlobe, title: 'Multi-Market Coverage', desc: 'Trade across Forex, Crypto, Stocks, and Commodities. Diversified signals that cover all major global markets around the clock.' },
  { icon: FiUsers, title: 'Community Access', desc: 'Join a thriving community of 10,000+ traders. Share ideas, discuss strategies, and grow together with like-minded professionals.' },
  { icon: FiHeadphones, title: '24/7 Support', desc: 'Our dedicated support team is available around the clock. Get help whenever you need it, no matter your time zone.' },
]

export default function Features() {
  const { darkMode } = useTheme()

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-primary-light text-sm font-semibold uppercase tracking-wider">Features</span>
          <h2 className={`text-3xl sm:text-4xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Why Choose <span className="gradient-text">Sidou Signals</span>?</h2>
          <p className={`mt-4 max-w-2xl mx-auto ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Everything you need to become a successful trader, all in one platform</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${darkMode ? 'glass-card bg-[#111827]/80' : 'bg-white border border-gray-200 shadow-sm'} rounded-2xl p-6 hover:glow-primary transition-shadow duration-300`}>
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4">
                <f.icon className="text-white text-xl" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
