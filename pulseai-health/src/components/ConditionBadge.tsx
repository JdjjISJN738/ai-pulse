import { motion } from 'framer-motion'
import { Heart, Droplets, Thermometer, Activity, Zap, Wind, Brain, AlertCircle, Flame, Moon } from 'lucide-react'

export interface ConditionBadgeProps {
  conditions: string[]
  size?: 'sm' | 'md'
  showIcon?: boolean
}

const conditionConfig: Record<string, { color: string; bgColor: string; borderColor: string; icon?: typeof Heart }> = {
  'Hypertension': { 
    color: 'text-rose-700', 
    bgColor: 'bg-rose-50', 
    borderColor: 'border-rose-200',
    icon: Heart
  },
  'Tachycardia': { 
    color: 'text-orange-700', 
    bgColor: 'bg-orange-50', 
    borderColor: 'border-orange-200',
    icon: Activity
  },
  'Bradycardia': { 
    color: 'text-blue-700', 
    bgColor: 'bg-blue-50', 
    borderColor: 'border-blue-200',
    icon: Heart
  },
  'Hypoxia': { 
    color: 'text-sky-700', 
    bgColor: 'bg-sky-50', 
    borderColor: 'border-sky-200',
    icon: Wind
  },
  'Hyperglycemia': { 
    color: 'text-amber-700', 
    bgColor: 'bg-amber-50', 
    borderColor: 'border-amber-200',
    icon: Droplets
  },
  'Hypoglycemia': { 
    color: 'text-yellow-700', 
    bgColor: 'bg-yellow-50', 
    borderColor: 'border-yellow-200',
    icon: AlertCircle
  },
  'Fever': { 
    color: 'text-orange-700', 
    bgColor: 'bg-orange-50', 
    borderColor: 'border-orange-200',
    icon: Thermometer
  },
  'Arrhythmia': { 
    color: 'text-purple-700', 
    bgColor: 'bg-purple-50', 
    borderColor: 'border-purple-200',
    icon: Zap
  },
  'Hypotension': { 
    color: 'text-cyan-700', 
    bgColor: 'bg-cyan-50', 
    borderColor: 'border-cyan-200',
    icon: Activity
  },
  'Dehydration': { 
    color: 'text-blue-700', 
    bgColor: 'bg-blue-50', 
    borderColor: 'border-blue-200',
    icon: Droplets
  },
  'Stress': { 
    color: 'text-red-700', 
    bgColor: 'bg-red-50', 
    borderColor: 'border-red-200',
    icon: Brain
  },
  'Sleep Issues': { 
    color: 'text-indigo-700', 
    bgColor: 'bg-indigo-50', 
    borderColor: 'border-indigo-200',
    icon: Moon
  },
  'Obesity': { 
    color: 'text-slate-700', 
    bgColor: 'bg-slate-50', 
    borderColor: 'border-slate-200',
    icon: Flame
  }
}

export default function ConditionBadge({ conditions, size = 'md', showIcon = true }: ConditionBadgeProps) {
  if (!conditions || conditions.length === 0) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-[9px] font-black text-emerald-700 uppercase tracking-wider">Stable</span>
      </div>
    )
  }

  const sizeClasses = size === 'sm' 
    ? { 
        container: 'px-2 py-1 gap-1.5', 
        text: 'text-[8px]', 
        icon: 'h-2.5 w-2.5',
        dot: 'w-1 h-1'
      }
    : { 
        container: 'px-3 py-1.5 gap-2', 
        text: 'text-[9px]', 
        icon: 'h-3 w-3',
        dot: 'w-1.5 h-1.5'
      }

  return (
    <div className="flex flex-wrap gap-2">
      {conditions.map((condition, index) => {
        const config = conditionConfig[condition] || { 
          color: 'text-slate-700', 
          bgColor: 'bg-slate-50', 
          borderColor: 'border-slate-200' 
        }
        const Icon = config.icon

        return (
          <motion.div
            key={condition}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`inline-flex items-center ${sizeClasses.container} rounded-full border ${config.bgColor} ${config.borderColor} ${config.color}`}
          >
            {showIcon && Icon && (
              <Icon className={sizeClasses.icon} />
            )}
            {!showIcon && (
              <div className={`${sizeClasses.dot} rounded-full ${config.color.replace('text-', 'bg-')}`} />
            )}
            <span className={`font-black uppercase tracking-wider ${sizeClasses.text}`}>
              {condition}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
