import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiRadio, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { PublicRoute } from '../components/auth/ProtectedRoute'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: '', color: '' }
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    const levels = [
      { level: 1, text: 'Weak', color: 'bg-red-500' },
      { level: 2, text: 'Fair', color: 'bg-yellow-500' },
      { level: 3, text: 'Good', color: 'bg-blue-500' },
      { level: 4, text: 'Strong', color: 'bg-green-500' },
    ]
    return levels[strength - 1] || { level: 0, text: '', color: '' }
  }

  const strength = getPasswordStrength()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    if (!agreeTerms) {
      toast.error('Please agree to the Terms & Conditions')
      return
    }
    setLoading(true)
    try {
      await signUp(email, password, fullName)
      setEmailSent(true)
      toast.success('Account created! Check your email.')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-3xl text-success" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
          <p className="text-dark-muted mb-6">We've sent a confirmation link to <span className="text-white font-semibold">{email}</span></p>
          <Link to="/login" className="inline-block w-full py-3 gradient-bg rounded-xl text-white font-semibold">
            Go to Login
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <PublicRoute>
      <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] relative overflow-hidden px-4 py-8">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-card rounded-2xl p-8 w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <FiRadio className="text-3xl text-secondary" />
              <span className="text-2xl font-bold gradient-text">Sidou Signals</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-dark-muted mt-2">Start receiving professional trading signals</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength.level ? strength.color : 'bg-white/10'}`}></div>
                  ))}
                </div>
                <p className="text-xs text-dark-muted">{strength.text}</p>
              </div>
            )}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-primary transition-colors" />
            </div>
            <label className="flex items-start gap-2 text-dark-muted cursor-pointer text-sm">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="accent-primary mt-0.5" />
              I agree to the <span className="text-primary-light">Terms of Service</span> and <span className="text-primary-light">Privacy Policy</span>
            </label>
            <button type="submit" disabled={loading}
              className="w-full py-3 gradient-bg gradient-bg-hover rounded-xl text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-primary">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-dark-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-light hover:text-primary font-semibold">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </PublicRoute>
  )
}
