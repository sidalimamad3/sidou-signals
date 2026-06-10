import { FiRadio, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function Footer() {
  const { darkMode } = useTheme()

  return (
    <footer className={`${darkMode ? 'bg-[#070B14] border-t border-white/5' : 'bg-gray-900 text-gray-300'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FiRadio className="text-2xl text-secondary" />
              <span className="text-xl font-bold text-white">Sidou Signals</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">Professional trading signals powered by expert analysis and cutting-edge technology. Join thousands of successful traders worldwide.</p>
            <div className="flex items-center gap-3 mt-4">
              {['Twitter', 'Telegram', 'Discord'].map(s => (
                <a key={s} href="#" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-xs">{s[0]}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }, { label: 'Contact', href: '#contact' }].map(l => (
                <li key={l.label}><a href={l.href} className="text-gray-400 text-sm hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Risk Disclaimer'].map(l => (
                <li key={l}><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm"><FiMail className="text-primary" /> support@sidousignals.com</li>
              <li className="flex items-center gap-2 text-gray-400 text-sm"><FiMapPin className="text-primary" /> Global Remote Team</li>
              <li className="flex items-center gap-2 text-gray-400 text-sm"><FiPhone className="text-primary" /> 24/7 Support</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Sidou Signals. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Trading involves risk. Past performance does not guarantee future results.</p>
        </div>
      </div>
    </footer>
  )
}
