import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const getRole = (u) => {
    if (!u) return 'free'
    return u.user_metadata?.role || 'free'
  }

  const buildProfile = (u) => {
    if (!u) return null
    return {
      id: u.id,
      full_name: u.user_metadata?.full_name || '',
      role: getRole(u),
      avatar_url: u.user_metadata?.avatar_url || null,
      created_at: u.created_at,
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setProfile(buildProfile(session?.user))
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setProfile(buildProfile(session?.user))
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'free',
        },
      },
    })
    if (error) throw error
    return data
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setProfile(null)
  }

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${window.location.pathname}#/reset-password`,
    })
    if (error) throw error
    return data
  }

  const updatePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (error) throw error
    return data
  }

  const updateRole = async (newRole) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { role: newRole },
    })
    if (error) throw error
    setProfile(prev => prev ? { ...prev, role: newRole } : null)
    return data
  }

  const isAdmin = profile?.role === 'admin'
  const isPremium = profile?.role === 'premium' || profile?.role === 'lifetime' || profile?.role === 'admin'
  const isLifetime = profile?.role === 'lifetime'

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateRole,
    isAdmin,
    isPremium,
    isLifetime,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
