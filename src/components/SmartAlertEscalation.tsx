import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertCircle, 
  Bell, 
  BellRing, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowUp,
  User,
  UserCheck,
  Phone,
  Siren
} from 'lucide-react'
import { Alert } from '@/lib/health-types'

interface SmartAlertEscalationProps {
  alerts: Alert[]
  onResolve: (alertId: string, resolvedBy: string) => void
}

const tierConfig: Record<number, { 
  label: string; 
  color: string; 
  bgColor: string; 
  borderColor: string; 
  icon: typeof User;
  escalationTime: string;
  notify: string;
}> = {
  1: { 
    label: 'Tier 1', 
    color: 'text-blue-700', 
    bgColor: 'bg-blue-50', 
    borderColor: 'border-blue-200',
    icon: Bell,
    escalationTime: '5 min',
    notify: 'Nurse'
  },
  2: { 
    label: 'Tier 2', 
    color: 'text-amber-700', 
    bgColor: 'bg-amber-50', 
    borderColor: 'border-amber-200',
    icon: BellRing,
    escalationTime: '10 min',
    notify: 'Doctor'
  },
  3: { 
    label: 'Tier 3', 
    color: 'text-rose-700', 
    bgColor: 'bg-rose-50', 
    borderColor: 'border-rose-200',
    icon: Siren,
    escalationTime: 'Immediate',
    notify: 'Emergency'
  }
}

const severityConfig: Record<string, { 
  color: string; 
  bgColor: string; 
  borderColor: string 
}> = {
  low: { color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  medium: { color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  high: { color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  critical: { color: 'text-rose-700', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' }
}

interface EscalationTimerProps {
  alert: Alert
  onEscalate: () => void
}

function EscalationTimer({ alert, onEscalate }: EscalationTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [hasEscalated, setHasEscalated] = useState(false)

  useEffect(() => {
    if (!alert.escalationTimer || alert.isResolved || hasEscalated) return

    const updateTimer = () => {
      const now = Date.now()
      const remaining = alert.escalationTimer! - now
      setTimeLeft(remaining > 0 ? remaining : 0)

      if (remaining <= 0 && !hasEscalated) {
        setHasEscalated(true)
        onEscalate()
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [alert.escalationTimer, alert.isResolved, hasEscalated, onEscalate])

  if (!alert.escalationTimer || alert.isResolved) return null

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (hasEscalated || timeLeft === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 border border-rose-200"
      >
        <ArrowUp className="h-3 w-3 text-rose-600 animate-pulse" />
        <span className="text-[9px] font-black text-rose-700 uppercase">Escalated</span>
      </motion.div>
    )
  }

  const progress = alert.escalationTimer 
    ? Math.max(0, (alert.escalationTimer - Date.now()) / (5 * 60 * 1000)) * 100 
    : 100

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-3 w-3 text-slate-400" />
      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-amber-500 rounded-full"
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <span className="text-[9px] font-bold text-slate-500">
        {timeLeft !== null ? formatTime(timeLeft) : '--:--'}
      </span>
    </div>
  )
}

export default function SmartAlertEscalation({ alerts, onResolve }: SmartAlertEscalationProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [escalatedAlerts, setEscalatedAlerts] = useState<Set<string>>(new Set())

  const unresolvedAlerts = alerts.filter(a => !a.isResolved)
  const criticalCount = unresolvedAlerts.filter(a => a.severity === 'critical').length
  const tier1Count = unresolvedAlerts.filter(a => a.tier === 1).length
  const tier2Count = unresolvedAlerts.filter(a => a.tier === 2).length
  const tier3Count = unresolvedAlerts.filter(a => a.tier === 3).length

  const handleEscalate = (alertId: string) => {
    setEscalatedAlerts(prev => new Set([...prev, alertId]))
  }

  if (unresolvedAlerts.length === 0) {
    return (
      <div className="card-neat p-8">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-6">
          <div className="w-1 h-4 bg-primary rounded-full" />
          Smart Alert Escalation
        </h3>
        <div className="text-center py-12 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
          <CheckCircle className="h-10 w-10 text-emerald-300 mx-auto mb-4" />
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">All Clear</p>
          <p className="text-slate-400 text-[9px] font-bold mt-2">No active alerts requiring attention</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-neat p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
            <div className="w-1 h-4 bg-primary rounded-full" />
            Smart Alert Escalation
          </h3>
          {criticalCount > 0 && (
            <span className="px-2 py-1 rounded-full bg-rose-100 border border-rose-200 text-[9px] font-black text-rose-700 uppercase animate-pulse">
              {criticalCount} Critical
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
          <Bell className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-lg font-black text-blue-700">{tier1Count}</p>
            <p className="text-[9px] font-bold text-blue-500 uppercase">Tier 1 - Nurse</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <BellRing className="h-5 w-5 text-amber-600" />
          <div>
            <p className="text-lg font-black text-amber-700">{tier2Count}</p>
            <p className="text-[9px] font-bold text-amber-500 uppercase">Tier 2 - Doctor</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200">
          <Siren className="h-5 w-5 text-rose-600" />
          <div>
            <p className="text-lg font-black text-rose-700">{tier3Count}</p>
            <p className="text-[9px] font-bold text-rose-500 uppercase">Tier 3 - Emergency</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {unresolvedAlerts.map((alert, index) => {
              const tier = tierConfig[alert.tier] || tierConfig[1]
              const severity = severityConfig[alert.severity] || severityConfig.medium
              const TierIcon = tier.icon
              const isEscalated = escalatedAlerts.has(alert.id)

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-5 rounded-2xl border-2 ${tier.bgColor} ${tier.borderColor} ${
                    isEscalated ? 'ring-2 ring-rose-300 ring-offset-2' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tier.bgColor} ${tier.color}`}>
                      <TierIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full border ${tier.bgColor} ${tier.borderColor} ${tier.color}`}>
                            {tier.label}
                          </span>
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full border ${severity.bgColor} ${severity.borderColor} ${severity.color}`}>
                            {alert.severity}
                          </span>
                          {isEscalated && (
                            <span className="text-[9px] font-black uppercase px-2 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 animate-pulse">
                              ESCALATED
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onResolve(alert.id, 'Current User')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-[9px] font-black uppercase hover:bg-emerald-200 transition-colors"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Resolve
                        </button>
                      </div>
                      <p className="text-sm font-black text-slate-900 mb-3 leading-tight uppercase tracking-tight">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                            <User className="h-3 w-3" />
                            {alert.patientName}
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                            <Clock className="h-3 w-3" />
                            {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <EscalationTimer 
                          alert={alert} 
                          onEscalate={() => handleEscalate(alert.id)} 
                        />
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200/50 flex items-center gap-2">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-500">
                          {tier.escalationTime} escalation → Notify {tier.notify}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
