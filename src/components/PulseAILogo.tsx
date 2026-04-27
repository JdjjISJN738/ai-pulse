

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function PulseAILogo({ size = 'md', showTagline = true }: { size?: 'sm' | 'md' | 'lg', showTagline?: boolean }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-20 h-20'
  }

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-5xl'
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10'
  }

  return (
    <div className={`flex items-center gap-3 ${size === 'lg' ? 'flex-col' : ''}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`flex items-center justify-center ${sizeClasses[size]} bg-slate-900 rounded-2xl shadow-xl shadow-slate-200 border-2 border-slate-800`}
      >
        <div className="relative">
          <Heart className={`${iconSizes[size]} text-rose-500`} fill="currentColor" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`absolute inset-0 bg-rose-500 rounded-full blur-md`}
          />
        </div>
      </motion.div>
      <div className={`flex flex-col ${size === 'lg' ? 'items-center mt-2' : ''}`}>
        <div className="flex items-center">
          <span className={`${textSizes[size]} font-black text-slate-900 tracking-tighter uppercase`}>
            Puls
          </span>
          <span className={`${textSizes[size]} font-black text-blue-600 tracking-tighter uppercase`}>
            eAI
          </span>
        </div>
        {showTagline && (
          <p className={`text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ${size === 'lg' ? 'mt-2' : '-mt-1'}`}>
            Clinical Intelligence
          </p>
        )}
      </div>
    </div>
  )
}


