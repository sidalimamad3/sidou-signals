import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { FiRadio, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (darkMode ? 'bg-[#0A0E1A]/90 backdrop-blur-xl border-b border-white/5' : 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm') : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <FiRadio className="text-2xl text-secondary" />
          <span className="text-xl font-bold gradient-text">Sidou Signals</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className={`text-sm font-medium transition-colors ${darkMode ? 'text-dark-muted hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{l.label}</a>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleTheme} className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-dark-muted hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-primary-light hover:text-primary transition-colors">Dashboard</Link>
              <button onClick={signOut} className="px-4 py-2 text-sm font-medium text-dark-muted hover:text-white transition-colors">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className={`px-4 py-2 text-sm font-medium transition-colors ${darkMode ? 'text-dark-muted hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Login</Link>
              <Link to="/register" className="px-5 py-2 gradient-bg rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
          {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${darkMode ? 'bg-[#0A0E1A] border-white/5' : 'bg-white border-gray-200'}`}>
            <div className="px-4 py-4 space-y-3">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-sm font-medium ${darkMode ? 'text-dark-muted hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{l.label}</a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button onClick={toggleTheme} className={`flex items-center gap-2 py-2 text-sm ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>
                  {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-primary-light">Dashboard</Link>
                    <button onClick={() => { signOut(); setMobileOpen(false) }} className="py-2 text-sm text-left text-dark-muted">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-dark-muted">Login</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="py-2 px-4 gradient-bg rounded-xl text-white text-sm font-semibold text-center">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
