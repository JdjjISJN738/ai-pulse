
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight, Shield, Clock, Users, LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PulseAILogo from '@/components/PulseAILogo'

export default function ThankYouPage() {
  const router = useNavigate()

  useEffect(() => {
    // Clear any remaining auth data
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8 font-sans">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <PulseAILogo size="lg" showTagline={true} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-neat p-12 md:p-16 bg-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-primary/10 border-2 border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm"
          >
            <LogOut className="h-10 w-10 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Signed Out Successfully
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-600 mb-12 leading-relaxed font-medium"
          >
            You have been safely logged out. Your account and data remain secure. Thank you for using PulseAI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <Clock className="h-6 w-6 text-primary mx-auto mb-4" />
              <h3 className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-widest">Support</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase">24/7 Assistance</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <Heart className="h-6 w-6 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-widest">Patient Care</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Priority First</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <Shield className="h-6 w-6 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-widest">Security</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Secure Data</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Back to Home
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
              >
                Sign In Again
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} PulseAI Health Monitoring
        </p>
      </div>
    </div>
  )
}
