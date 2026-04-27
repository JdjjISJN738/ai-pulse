

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useAuth } from '@/lib/auth-context'

interface LayoutProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export default function Layout({ children, requireAuth = false }: LayoutProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useNavigate()

  useEffect(() => {
    if (!authLoading && requireAuth && !isAuthenticated) {
      router('/login')
    }
  }, [requireAuth, isAuthenticated, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Establishing Uplink</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Verifying Clinical Credentials</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-20 flex-grow"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}


