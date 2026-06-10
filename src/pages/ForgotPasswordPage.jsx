import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiArrowLeft, FiRadio, FiCheck } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { PublicRoute } from '../components/auth/ProtectedRoute'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { toast.error('Please enter your email'); return }
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
      toast.success('Reset link sent!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-3xl text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Email Sent</h2>
          <p className="text-dark-muted mb-6">Check your inbox at <span className="text-white font-semibold">{email}</span> for the password reset link.</p>
          <Link to="/login" className="inline-block w-full py-3 gradient-bg rounded-xl text-white font-semibold">Back to Login</Link>
        </motion.div>
      </div>
    )
  }

  return (
    <PublicRoute>
      <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] relative overflow-hidden px-4">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-8 w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4"><FiRadio className="text-3xl text-secondary" /><span className="text-2xl font-bold gradient-text">Sidou Signals</span></Link>
            <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
            <p className="text-dark-muted mt-2">Enter your email to receive a reset link</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 gradient-bg gradient-bg-hover rounded-xl text-white font-semibold disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <Link to="/login" className="flex items-center justify-center gap-2 text-dark-muted hover:text-white mt-6 transition-colors">
            <FiArrowLeft /> Back to Login
          </Link>
        </motion.div>
      </div>
    </PublicRoute>
  )
}
