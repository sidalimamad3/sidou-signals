import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const faqs = [
  { q: 'What is Sidou Signals?', a: 'Sidou Signals is a professional trading signals platform that provides real-time alerts for Forex, Crypto, Stocks, and Commodities markets. Our team of expert analysts monitors global markets 24/7 and delivers high-probability trading opportunities directly to you, complete with entry points, take-profit levels, and stop-loss recommendations.' },
  { q: 'How do trading signals work?', a: 'When our analysts identify a trading opportunity, a signal is immediately sent to all subscribers. Each signal includes the trading pair, direction (BUY/SELL), entry price, take-profit target, and stop-loss level. You simply copy the trade into your preferred broker platform. Our signals typically achieve an 85%+ win rate.' },
  { q: 'What markets do you cover?', a: 'We cover all major financial markets including Forex (major and minor pairs), Cryptocurrencies (BTC, ETH, SOL, and more), Stocks (US and international markets), and Commodities (Gold, Silver, Oil). Our multi-market approach ensures diverse trading opportunities around the clock.' },
  { q: 'How accurate are your signals?', a: 'Our signals maintain an average win rate of 85%+, backed by transparent performance tracking. Each signal includes detailed analysis and proper risk management parameters. We publish our full track record so you can verify our performance before committing to a paid plan.' },
  { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel your Premium subscription at any time with no questions asked. You will continue to have access until the end of your current billing period. We also offer a 7-day money-back guarantee for new subscribers. Lifetime plan holders enjoy permanent access.' },
  { q: 'How do I get started?', a: 'Getting started is simple: create a free account to receive 3 signals per week, or upgrade to Premium for unlimited access. Once registered, you will receive signals through our platform and optional Telegram channel. No special software or broker account is required — just use your preferred trading platform.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const { darkMode } = useTheme()

  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary-light text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className={`text-3xl sm:text-4xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked <span className="gradient-text">Questions</span></h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`${darkMode ? 'glass-card bg-[#111827]/80' : 'bg-white border border-gray-200'} rounded-xl overflow-hidden`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between p-5 text-left ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-colors`}>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{faq.q}</span>
                <FiChevronDown className={`shrink-0 ml-3 transition-transform duration-300 ${open === i ? 'rotate-180' : ''} ${darkMode ? 'text-dark-muted' : 'text-gray-400'}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className={`px-5 pb-5 border-l-2 border-primary/30 ml-5 ${darkMode ? 'text-dark-muted' : 'text-gray-600'} text-sm leading-relaxed`}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
