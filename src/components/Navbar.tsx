

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, 
  X, 
  Heart, 
  Activity, 
  Shield, 
  Brain, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Zap, 
  Lock, 
  BarChart3, 
  Smartphone, 
  AlertCircle, 
  Clock, 
  UserCheck, 
  ChevronRight, 
  LogOut,
  ChevronDown,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Headphones,
  Home
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import PulseAILogo from './PulseAILogo'
import ProfileDropdown from './ProfileDropdown'

interface NavbarProps {
  children?: React.ReactNode
  isAuthenticated?: boolean
}

export default function Navbar({ children }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/features', label: 'Features', icon: Star },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/patients', label: 'Patients', icon: Users },
    { href: '/alerts', label: 'Alerts', icon: AlertCircle },
    { href: '/practices', label: 'Practices', icon: BookOpen },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-16">
        <div className="flex items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <PulseAILogo size="sm" showTagline={false} />
          </Link>

          <div className="hidden lg:flex items-center justify-end flex-1 space-x-1 ml-8">
            {isAuthenticated && (
              <>
                {navItems.map((item) => (
                  <Link key={item.href}
                    to={item.href}
                    className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-xl flex items-center gap-2 ${
                      isActive(item.href)
                        ? 'text-primary bg-primary-light/10'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.icon && <item.icon className="h-3.5 w-3.5" />}
                    {item.label}
                  </Link>
                ))}

                {/* Support Dropdown */}
                <div className="relative">
                  <button
                    onMouseEnter={() => setIsSupportOpen(true)}
                    onClick={() => setIsSupportOpen(!isSupportOpen)}
                    className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-xl flex items-center gap-2 ${
                      pathname.startsWith('/support')
                        ? 'text-primary bg-primary-light/10'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Headphones className="h-3.5 w-3.5" />
                    Support
                    <ChevronDown className={`h-3 w-3 transition-transform ${isSupportOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isSupportOpen && (
                      <>
                        <div className="fixed inset-0 z-[-1]" onMouseEnter={() => setIsSupportOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          onMouseLeave={() => setIsSupportOpen(false)}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
                        >
                          <Link
                            to="/pricing"
                            onClick={() => setIsSupportOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all uppercase tracking-widest border-b border-slate-50"
                          >
                            <Zap className="h-4 w-4" />
                            Pricing Plans
                          </Link>
                          <Link
                            to="/support#faq"
                            onClick={() => setIsSupportOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all uppercase tracking-widest"
                          >
                            <HelpCircle className="h-4 w-4" />
                            FAQ Center
                          </Link>
                          <Link
                            to="/support#contact"
                            onClick={() => setIsSupportOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all uppercase tracking-widest"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Contact Us
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
            
            {isAuthenticated && <div className="h-6 w-px bg-slate-200 mx-4" />}

            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors">
                  Login
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
                  >
                    Create Account
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          <button 
            className="lg:hidden p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)] custom-scrollbar"
          >
            {isAuthenticated && (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                      isActive(item.href)
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                ))}
                
                <Link
                  to="/pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                    isActive('/pricing')
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  Pricing Plans
                </Link>

                <Link
                  to="/support"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                    isActive('/support')
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Headphones className="h-4 w-4" />
                  Support (FAQ & Contact)
                </Link>
              </>
            )}

            {!isAuthenticated && (
              <div className="pt-4 grid grid-cols-2 gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-100 rounded-2xl hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-4 text-xs font-bold text-white uppercase tracking-widest bg-primary rounded-2xl shadow-lg shadow-primary/20"
                >
                  Create Account
                </Link>
              </div>
            )}
            {isAuthenticated && (
              <div className="pt-4 border-t border-slate-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 py-4 text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 rounded-2xl"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}


