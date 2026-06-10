import { Link } from 'react-router-dom'
import { FiZap, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span> Live Trading Signals Active
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Trade Smarter with</span><br />
          <span className="gradient-text">Sidou Signals</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-dark-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Get professional trading signals with 85%+ accuracy. Real-time alerts for Forex, Crypto, Stocks, and Commodities — delivered straight to you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/register" className="px-8 py-4 gradient-bg rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-opacity glow-primary flex items-center gap-2">
            <FiZap /> Start Free Trial
          </Link>
          <a href="#pricing" className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-colors flex items-center gap-2">
            View Plans <FiArrowRight />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: '10K+', label: 'Active Traders' },
            { value: '85%', label: 'Win Rate' },
            { value: '500+', label: 'Signals/Month' },
            { value: '24/7', label: 'Support' },
          ].map((s, i) => (
            <div key={i} className="glass-card rounded-xl p-4">
              <p className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</p>
              <p className="text-dark-muted text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
