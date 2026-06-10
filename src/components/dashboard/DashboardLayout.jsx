import { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { FiRadio, FiHome, FiWifi, FiUser, FiBarChart2, FiShield, FiMenu, FiX, FiLogOut, FiSun, FiMoon, FiSettings, FiBell } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard', roles: ['free', 'premium', 'lifetime', 'admin'] },
  { path: '/dashboard/signals', icon: FiWifi, label: 'Signals', roles: ['free', 'premium', 'lifetime', 'admin'] },
  { path: '/dashboard/analytics', icon: FiBarChart2, label: 'Analytics', roles: ['premium', 'lifetime', 'admin'] },
  { path: '/dashboard/profile', icon: FiUser, label: 'Profile', roles: ['free', 'premium', 'lifetime', 'admin'] },
  { path: '/admin', icon: FiShield, label: 'Admin Panel', roles: ['admin'] },
]

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const role = profile?.role || 'free'
  const filteredNav = navItems.filter(item => item.roles.includes(role))

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Logged out successfully')
      navigate('/')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  const roleColors = { admin: 'bg-purple-500', premium: 'bg-yellow-500', lifetime: 'bg-cyan-500', free: 'bg-gray-500' }
  const roleLabels = { admin: 'Admin', premium: 'Premium', lifetime: 'Lifetime', free: 'Free' }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0A0E1A] text-dark-text' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 ${darkMode ? 'bg-[#111827] border-r border-white/5' : 'bg-white border-r border-gray-200'} z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <FiRadio className="text-2xl text-secondary" />
            <span className="text-xl font-bold gradient-text">Sidou Signals</span>
          </Link>

          {/* User Info */}
          <div className={`p-3 rounded-xl mb-6 ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm">
                {(user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user?.user_metadata?.full_name || 'User'}
                </p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${roleColors[role]}`}>
                  {roleLabels[role]}
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {filteredNav.map(item => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'gradient-bg text-white glow-primary' : darkMode ? 'text-dark-muted hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                  <item.icon className="text-lg" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button onClick={handleSignOut}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all ${darkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-500 hover:bg-red-50'}`}>
            <FiLogOut className="text-lg" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className={`sticky top-0 z-30 px-4 sm:px-6 py-4 flex items-center justify-between ${darkMode ? 'bg-[#0A0E1A]/80 backdrop-blur-xl border-b border-white/5' : 'bg-white/80 backdrop-blur-xl border-b border-gray-200'}`}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-xl">
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button onClick={toggleTheme} className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-dark-muted hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <button className={`p-2 rounded-xl relative transition-colors ${darkMode ? 'text-dark-muted hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
              <FiBell />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
