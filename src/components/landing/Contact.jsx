import { useState } from 'react'
import { FiMail, FiMapPin, FiSend, FiClock } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function Contact() {
  const { darkMode } = useTheme()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill in required fields'); return }
    setLoading(true)
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500))
    toast.success('Message sent successfully! We will get back to you soon.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  const inputCls = `w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-white/5 border border-white/10 text-white placeholder-dark-muted focus:border-primary' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary'} outline-none transition-colors`

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary-light text-sm font-semibold uppercase tracking-wider">Contact</span>
          <h2 className={`text-3xl sm:text-4xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Get In <span className="gradient-text">Touch</span></h2>
          <p className={`mt-4 max-w-2xl mx-auto ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Have questions? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-4">
            {[
              { icon: FiMail, label: 'Email', value: 'support@sidousignals.com' },
              { icon: FiMapPin, label: 'Location', value: 'Global Remote Team' },
              { icon: FiClock, label: 'Support Hours', value: '24/7 Available' },
            ].map((item, i) => (
              <div key={i} className={`${darkMode ? 'glass-card bg-[#111827]/80' : 'bg-white border border-gray-200 shadow-sm'} rounded-xl p-5 flex items-center gap-4`}>
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="text-white" />
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{item.label}</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                </div>
              </div>
            ))}
            <div className={`${darkMode ? 'glass-card bg-[#111827]/80' : 'bg-white border border-gray-200 shadow-sm'} rounded-xl p-5`}>
              <p className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Join Our Community</p>
              <div className="flex gap-3">
                {['Telegram', 'Discord', 'Twitter'].map(s => (
                  <a key={s} href="#" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-white/5 text-dark-muted hover:text-white hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}>{s}</a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className={`lg:col-span-3 ${darkMode ? 'glass-card bg-[#111827]/80' : 'bg-white border border-gray-200 shadow-sm'} rounded-2xl p-6`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                <input type="email" placeholder="Your Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
              <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} />
              <textarea placeholder="Your Message *" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`}></textarea>
              <button type="submit" disabled={loading}
                className="w-full py-3 gradient-bg rounded-xl text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                <FiSend /> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
