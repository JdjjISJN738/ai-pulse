

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    // Redirect to thank you page
    window.location.href = '/thank-you'
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:text-primary font-bold text-xs transition-all rounded-xl border border-transparent hover:bg-primary-light/10 hover:border-primary-light/20"
      >
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <span className="hidden sm:inline">My Account</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-slate-50 mb-2">
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                  Signed in as
                </p>
                <p className="text-sm font-bold text-slate-900 tracking-tight">
                  {user?.name || 'Authorized User'}
                </p>
                <p className="text-xs text-slate-500 font-medium tracking-tight mt-0.5">
                  {user?.email || 'ops@pulseai.com'}
                </p>
              </div>
              
              <div className="px-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-3 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


