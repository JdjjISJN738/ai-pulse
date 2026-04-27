

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertTriangle, Users, Smartphone, Clock, TrendingUp, TrendingDown, Heart, Brain, Zap, CheckCircle } from 'lucide-react'
import Layout from '@/components/Layout'
import { useHealthService } from '@/lib/health-service'
import { Patient, Alert, calculateRiskLevel } from '@/lib/health-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

function VitalCard({ title, value, unit, trend, icon: Icon, color, isNormal }: {
  title: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  icon: any
  color: string
  isNormal: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card-neat p-6 relative overflow-hidden group"
    >
      <div className={`absolute top-0 left-0 w-1 h-full bg-primary transition-all duration-300 group-hover:w-2`} />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg bg-primary/10 text-primary`}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-slate-500 text-xs">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          {trend === 'up' && <TrendingUp className="h-4 w-4 text-emerald-600" />}
          {trend === 'down' && <TrendingDown className="h-4 w-4 text-rose-600" />}
          <span className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-400'}`}>
            {trend === 'stable' ? '→' : trend === 'up' ? '↑' : '↓'}
          </span>
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-4xl font-bold ${isNormal ? 'text-slate-900' : 'text-rose-600'}`}>
          {value}
        </span>
        <span className="text-sm font-medium text-slate-400">{unit}</span>
      </div>
      <div className={`text-xs font-bold ${isNormal ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isNormal ? 'Normal Range' : 'Abnormal Reading'}
      </div>
    </motion.div>
  )
}

function AlertCard({ alert, onResolve }: { alert: Alert; onResolve: (id: string, resolvedBy: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-5 rounded-2xl border-2 mb-4 group transition-all hover:shadow-lg ${
        alert.severity === 'critical' ? 'bg-rose-50 border-rose-100' :
        alert.severity === 'high' ? 'bg-orange-50 border-orange-100' :
        alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-100' :
        'bg-blue-50 border-blue-100'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              alert.severity === 'critical' ? 'bg-rose-600 text-white' :
              alert.severity === 'high' ? 'bg-orange-600 text-white' :
              alert.severity === 'medium' ? 'bg-yellow-600 text-white' :
              'bg-blue-600 text-white'
            }`}>
              <AlertTriangle className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-900 text-sm">{alert.patientName}</span>
            <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
              alert.severity === 'critical' ? 'bg-rose-600 text-white' :
              alert.severity === 'high' ? 'bg-orange-600 text-white' :
              alert.severity === 'medium' ? 'bg-yellow-500 text-white' :
              'bg-blue-600 text-white'
            }`}>
              {alert.severity}
            </span>
          </div>
          <p className="text-slate-600 text-sm font-medium leading-relaxed mb-3">{alert.message}</p>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">
              {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        {!alert.isResolved && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onResolve(alert.id, 'Current User')}
            className="ml-4 px-4 py-2 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 shadow-md transition-all"
          >
            RESOLVE
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const { patients, alerts, unresolvedAlerts, resolveAlert } = useHealthService()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [vitalData, setVitalData] = useState<any[]>([])

  // Generate mock chart data
  useEffect(() => {
    const data = []
    const now = Date.now()
    for (let i = 23; i >= 0; i--) {
      data.push({
        time: new Date(now - i * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        heartRate: 65 + Math.random() * 20,
        spo2: 95 + Math.random() * 5,
        temperature: 36.5 + Math.random() * 1.5,
        bloodPressure: 110 + Math.random() * 30
      })
    }
    setVitalData(data)
  }, [])

  const stats = [
    {
      title: 'Active Patients',
      value: patients.length,
      change: '+12 INFLOW',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'System Alerts',
      value: unresolvedAlerts.length,
      change: unresolvedAlerts.filter(a => a.severity === 'critical').length + ' CRITICAL',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Uplink Status',
      value: '99.9%',
      change: 'STABLE',
      icon: Smartphone,
      color: 'green'
    },
    {
      title: 'Mean Response',
      value: '2.3m',
      change: '-30s OPTIMIZED',
      icon: Clock,
      color: 'purple'
    }
  ]

  const latestVitals = selectedPatient?.vitals[0]

  return (
    <Layout requireAuth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">System Overview</h1>
            <p className="text-slate-500 mt-2 font-medium">Real-time health metrics and active incident feed</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-bold text-primary">All Systems Active</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Vitals Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <VitalCard
                title="Heart Rate"
                value={latestVitals?.value || 0}
                unit="BPM"
                trend="stable"
                icon={Heart}
                color="rose"
                isNormal={latestVitals?.isNormal || true}
              />
              <VitalCard
                title="SPO2"
                value={98}
                unit="%"
                trend="stable"
                icon={Zap}
                color="amber"
                isNormal={true}
              />
              <VitalCard
                title="Blood Pressure"
                value={120}
                unit="mmHg"
                trend="stable"
                icon={Activity}
                color="indigo"
                isNormal={true}
              />
              <VitalCard
                title="Body Temp"
                value={98.6}
                unit="°F"
                trend="stable"
                icon={Activity}
                color="blue"
                isNormal={true}
              />
            </div>
          </div>

          {/* Alerts Sidebar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-neat p-8 bg-white"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                  Active Incidents
                </h2>
                <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full border border-rose-100">
                  {unresolvedAlerts.length} Active
                </span>
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {unresolvedAlerts.slice(0, 5).map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onResolve={resolveAlert}
                  />
                ))}
                {unresolvedAlerts.length === 0 && (
                  <div className="text-center py-16 text-slate-400">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <CheckCircle className="h-8 w-8 text-emerald-500/30" />
                    </div>
                    <p className="text-xs font-bold text-slate-400">No Active Incidents</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card-neat p-8 bg-primary-dark text-white"
            >
              <h2 className="text-sm font-bold mb-8 flex items-center gap-2">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full px-5 py-3.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-hover transition-all flex items-center gap-3 shadow-lg shadow-primary/20">
                  <Brain className="h-4 w-4" />
                  Analyze Health Data
                </button>
                <button className="w-full px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-xs transition-all border border-white/10 flex items-center gap-3">
                  <Users className="h-4 w-4" />
                  Patient List
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


