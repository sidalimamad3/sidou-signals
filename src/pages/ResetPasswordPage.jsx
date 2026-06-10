import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLock, FiRadio, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || !confirmPassword) { toast.error('Please fill in all fields'); return }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return }
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      await updatePassword(password)
      toast.success('Password updated successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] relative overflow-hidden px-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <FiRadio className="text-3xl text-secondary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Set New Password</h1>
          <p className="text-dark-muted mt-2">Enter your new password below</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
            <input type={showPassword ? 'text' : 'password'} placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary transition-colors" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
            <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary transition-colors" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 gradient-bg gradient-bg-hover rounded-xl text-white font-semibold disabled:opacity-50">
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
