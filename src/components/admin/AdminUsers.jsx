import { useState } from 'react'
import { FiSearch, FiMoreVertical, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const mockUsers = [
  { id: 1, name: 'Ahmed Khalil', email: 'ahmed@email.com', role: 'premium', status: 'active', joined: '2025-01-15' },
  { id: 2, name: 'Sarah Mohammed', email: 'sarah@email.com', role: 'free', status: 'active', joined: '2025-01-14' },
  { id: 3, name: 'Omar Lahsen', email: 'omar@email.com', role: 'lifetime', status: 'active', joined: '2025-01-13' },
  { id: 4, name: 'Fatima Berrada', email: 'fatima@email.com', role: 'free', status: 'inactive', joined: '2025-01-12' },
  { id: 5, name: 'Youssef Rami', email: 'youssef@email.com', role: 'premium', status: 'active', joined: '2025-01-11' },
  { id: 6, name: 'Nadia El Idrissi', email: 'nadia@email.com', role: 'free', status: 'active', joined: '2025-01-10' },
  { id: 7, name: 'Karim Tazi', email: 'karim@email.com', role: 'admin', status: 'active', joined: '2024-12-01' },
  { id: 8, name: 'Leila Benali', email: 'leila@email.com', role: 'premium', status: 'active', joined: '2025-01-09' },
  { id: 9, name: 'Hassan Moujahid', email: 'hassan@email.com', role: 'free', status: 'inactive', joined: '2025-01-08' },
  { id: 10, name: 'Amina Fassi', email: 'amina@email.com', role: 'lifetime', status: 'active', joined: '2025-01-07' },
]

const roleColors = { admin: 'bg-purple-500', premium: 'bg-yellow-500', lifetime: 'bg-cyan-500', free: 'bg-gray-500' }

export default function AdminUsers() {
  const { darkMode } = useTheme()
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState(mockUsers)
  const [menuOpen, setMenuOpen] = useState(null)
  const card = darkMode ? 'bg-[#111827] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  const changeRole = (userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
    setMenuOpen(null)
    toast.success(`User role updated to ${newRole}`)
  }

  const deleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId))
      setMenuOpen(null)
      toast.success('User deleted')
    }
  }

  const toggleStatus = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u))
    setMenuOpen(null)
    toast.success('User status updated')
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Management</h1>
          <p className={`mt-1 ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>Manage all platform users and their roles</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{filtered.length} users</span>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
            <FiSearch className={darkMode ? 'text-dark-muted' : 'text-gray-400'} />
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
              className={`bg-transparent border-none outline-none text-sm ${darkMode ? 'text-white placeholder-dark-muted' : 'text-gray-900 placeholder-gray-400'} w-48`} />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className={`${card} rounded-2xl overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-white/5' : 'border-gray-200'}`}>
                {['User', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} className={`border-b ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">{user.name[0]}</div>
                      <div>
                        <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <select value={user.role} onChange={(e) => changeRole(user.id, e.target.value)}
                        className={`appearance-none px-3 py-1 rounded-lg text-xs font-bold text-white ${roleColors[user.role]} cursor-pointer pr-6`}>
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                        <option value="lifetime">Lifetime</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleStatus(user.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${user.status === 'active' ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-400'}`}>
                      {user.status}
                    </button>
                  </td>
                  <td className={`px-6 py-4 text-sm ${darkMode ? 'text-dark-muted' : 'text-gray-500'}`}>{user.joined}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)} className="p-1 hover:bg-white/10 rounded-lg">
                        <FiMoreVertical className={darkMode ? 'text-dark-muted' : 'text-gray-400'} />
                      </button>
                      {menuOpen === user.id && (
                        <div className={`absolute right-0 top-8 w-40 ${darkMode ? 'bg-[#1F2937] border border-white/10' : 'bg-white border border-gray-200 shadow-xl'} rounded-xl py-2 z-20`}>
                          <button onClick={() => toggleStatus(user.id)} className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-white hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                            Toggle Status
                          </button>
                          <button onClick={() => deleteUser(user.id)} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10">
                            Delete User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
