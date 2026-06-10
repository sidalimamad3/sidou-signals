import { useState } from 'react'
import { FiUser, FiMail, FiShield, FiCalendar, FiLock, FiTrash2, FiSave, FiStar } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function Profile() {
  const { user, profile, updatePassword, isPremium } = useAuth()
  const { darkMode } = useTheme()
  const card = darkMode ? 'bg-[#111827] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'
  const role = profile?.role || 'free'
  const roleColors = { admin: 'bg-purple-500', premium: 'bg-yellow-500', lifetime: 'bg-cyan-500', free: 'bg-gray-500' }
  const roleLabels = { admin: 'Admin', premium: 'Premium', lifetime: 'Lifetime', free: 'Free' }

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [notifSignals, setNotifSignals] = useState(true)
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifMarket, setNotifMarket] = useState(false)

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (!newPassword || !confirmNewPassword) { toast.error('Please fill in all fields'); return }
    if (newPassword !== confirmNewPassword) { toast.error('Passwords do not match'); return }
    if (newPassword.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      await updatePassword(newPassword)
      toast.success('Password updated successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Profile Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} rounded-2xl p-6`}>
        <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account Information</h2>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center text-white text-3xl font-bold shrink-0">
            {(user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase()}
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <FiUser className={darkMode ? 'text-dark-muted' : 'text-gray-400'} />
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.user_metadata?.full_name || 'User'}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className={darkMode ? 'text-dark-muted' : 'text-gray-400'} />
              <span className={darkMode ? 'text-dark-muted' : 'text-gray-600'}>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiShield className={darkMode ? 'text-dark-muted' : 'text-gray-400'} />
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${roleColors[role]}`}>{roleLabels[role]}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCalendar className={darkMode ? 'text-dark-muted' : 'text-gray-400'} />
              <span className={darkMode ? 'text-dark-muted' : 'text-gray-600'}>Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Card */}
      {!isPremium && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="gradient-bg rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FiStar className="text-white text-2xl" />
            <div>
              <h3 className="text-white font-bold text-lg">Upgrade Your Account</h3>
              <p className="text-white/70 mt-1">Unlock premium signals, advanced analytics, and more</p>
            </div>
          </div>
          <Link to="/#pricing" className="px-6 py-2.5 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap">
            View Plans
          </Link>
        </motion.div>
      )}

      {/* Change Password */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${card} rounded-2xl p-6`}>
        <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary" />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
            <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary" />
          </div>
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-3 gradient-bg rounded-xl text-white font-semibold disabled:opacity-50">
            <FiSave /> {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`${card} rounded-2xl p-6`}>
        <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h2>
        <div className="space-y-4">
          {[
            { label: 'Trading Signals', desc: 'Get notified when new signals are posted', value: notifSignals, set: setNotifSignals },
            { label: 'Email Updates', desc: 'Receive weekly market summaries via email', value: notifEmail, set: setNotifEmail },
            { label: 'Market Alerts', desc: 'Alerts for major market movements', value: notifMarket, set: setNotifMarket },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{n.label}</p>
                <p className={`text-sm ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{n.desc}</p>
              </div>
              <button onClick={() => n.set(!n.value)}
                className={`w-12 h-6 rounded-full transition-colors relative ${n.value ? 'bg-primary' : darkMode ? 'bg-white/10' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${n.value ? 'translate-x-6' : 'translate-x-0.5'}`}></span>
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className={`${card} rounded-2xl p-6 border-red-500/20`}>
        <h2 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h2>
        <p className={`text-sm mb-4 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Once you delete your account, there is no going back.</p>
        <button onClick={() => toast.error('Account deletion requires admin approval. Please contact support.')}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors text-sm font-medium">
          <FiTrash2 /> Delete Account
        </button>
      </motion.div>
    </div>
  )
}
