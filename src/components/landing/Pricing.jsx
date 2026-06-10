import { Link } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    desc: 'Perfect for beginners exploring trading signals',
    features: ['3 Signals per week', 'Basic Market Analysis', 'Community Access', 'Email Support', 'Market Overview'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$49',
    period: '/month',
    desc: 'For serious traders who want unlimited access',
    features: ['Unlimited Signals', 'Advanced Analysis', 'Priority Support', 'Risk Management Tools', 'Multi-Market Access', 'Private Channel Access', 'Daily Market Recap'],
    cta: 'Start Premium',
    popular: true,
  },
  {
    name: 'Lifetime',
    price: '$499',
    period: ' one-time',
    desc: 'One payment, lifetime access to everything',
    features: ['Everything in Premium', 'Lifetime Access', '1-on-1 Mentoring', 'Custom Strategy Session', 'VIP Support Channel', 'Early Access to Features', 'Exclusive Webinars'],
    cta: 'Get Lifetime Access',
    popular: false,
  },
]

export default function Pricing() {
  const { darkMode } = useTheme()

  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-primary-light text-sm font-semibold uppercase tracking-wider">Pricing</span>
          <h2 className={`text-3xl sm:text-4xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Choose Your <span className="gradient-text">Trading Plan</span></h2>
          <p className={`mt-4 max-w-2xl mx-auto ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Start free, upgrade when you're ready. All plans include a 7-day money-back guarantee.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-6 lg:p-8 ${plan.popular
                ? 'bg-gradient-to-b from-primary/20 to-secondary/10 border-2 border-primary/50 scale-[1.02] lg:scale-105'
                : darkMode ? 'glass-card bg-[#111827]/80' : 'bg-white border border-gray-200 shadow-sm'
              }`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-bg rounded-full text-white text-xs font-bold">Most Popular</span>
              )}
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{plan.desc}</p>
              <div className="mt-4 mb-6">
                <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                <span className={`text-sm ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <FiCheck className="text-success shrink-0" />
                    <span className={darkMode ? 'text-dark-text' : 'text-gray-700'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className={`block w-full py-3 rounded-xl text-center font-semibold transition-all ${plan.popular
                ? 'gradient-bg text-white hover:opacity-90 glow-primary'
                : darkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>{plan.cta}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
