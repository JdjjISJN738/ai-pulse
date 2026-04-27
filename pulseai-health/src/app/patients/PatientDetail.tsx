
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  ArrowLeft, 
  Heart, 
  Thermometer, 
  Droplets, 
  AlertCircle, 
  Clock, 
  Shield, 
  Smartphone, 
  User, 
  History,
  TrendingUp,
  MoreVertical,
  CheckCircle,
  UserMinus,
  Bell,
  Send,
  MapPin,
  Stethoscope,
  ClipboardList
} from 'lucide-react'
import Layout from '@/components/Layout'
import { useHealthService } from '@/lib/health-service'
import { calculateRiskLevel } from '@/lib/health-types'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import MultiParameterMonitoring from '@/components/MultiParameterMonitoring'
import HealthTaskSuggestions from '@/components/HealthTaskSuggestions'
import MedicineSuggestion from '@/components/MedicineSuggestion'
import HealthScoreTimeline from '@/components/HealthScoreTimeline'
import ConditionBadge from '@/components/ConditionBadge'

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showActions, setShowActions] = useState(false)
  const [isInforming, setIsInforming] = useState(false)
  const { getPatient, getVitalReadings, getPatientDevices, alerts, dischargePatient, informDoctor } = useHealthService()
  
  const patient = getPatient(id || '')
  const vitals = getVitalReadings(id || '', 20)
  const devices = getPatientDevices(id || '')
  const patientAlerts = alerts.filter(a => a.patientId === id)

  if (!patient) {
    return (
      <Layout requireAuth>
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
          <div className="w-20 h-20 bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-6">
            <AlertCircle className="h-10 w-10 text-slate-200" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Patient Not Found</h2>
          <p className="text-slate-500 font-bold text-sm mb-8 text-center max-w-sm">The patient identification record you are attempting to access does not exist in the registry.</p>
          <Link to="/patients">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200"
            >
              RETURN TO REGISTRY
            </motion.button>
          </Link>
        </div>
      </Layout>
    )
  }

  const riskLevel = calculateRiskLevel(patient)

  const handleDischarge = () => {
    if (window.confirm(`Are you sure you want to discharge ${patient.name}? This will remove all their records.`)) {
      dischargePatient(patient.id)
      navigate('/patients')
    }
  }

  const handleInformDoctor = () => {
    informDoctor(patient.id, `Urgent attention required for ${patient.name} due to critical vitals.`)
    setIsInforming(true)
    setTimeout(() => setIsInforming(false), 3000)
  }

  // Format data for chart
  const chartData = vitals.map(v => ({
    time: new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: v.value,
    type: v.type
  })).reverse()

  const heartRateData = chartData.filter(d => d.type === 'heart_rate')
  const spo2Data = chartData.filter(d => d.type === 'spo2')

  return (
    <Layout requireAuth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Link to="/patients" className="p-3 hover:bg-slate-100 rounded-2xl transition-all border border-transparent hover:border-slate-200 group">
              <ArrowLeft className="h-5 w-5 text-slate-400 group-hover:text-slate-900" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{patient.name}</h1>
              <div className="flex items-center gap-3 mt-2 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-slate-400" />
                  {patient.age}Y • {patient.gender}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {patient.room}
                </span>
              </div>
              {patient.conditions && patient.conditions.length > 0 && (
                <div className="mt-3">
                  <ConditionBadge conditions={patient.conditions} size="sm" />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border-2 shadow-sm ${
              patient.status === 'critical' ? 'bg-rose-50 border-rose-200 text-rose-700' :
              patient.status === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700' :
              'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full ${
                riskLevel.level === 'critical' ? 'bg-rose-600 animate-pulse' :
                riskLevel.level === 'warning' ? 'bg-amber-600' :
                'bg-emerald-600'
              }`} />
              <span className="font-bold text-xs uppercase tracking-wider">{patient.status} Priority</span>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowActions(!showActions)}
                className="p-3.5 hover:bg-slate-100 rounded-2xl transition-all border border-slate-200 shadow-sm active:scale-95 group"
              >
                <MoreVertical className="h-5 w-5 text-slate-400 group-hover:text-slate-900" />
              </button>
              
              <AnimatePresence>
                {showActions && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-20 overflow-hidden"
                      >
                        <button
                          onClick={handleDischarge}
                          className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <UserMinus className="h-4 w-4" />
                          Discharge Patient
                        </button>
                      </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Vitals Summary & Devices */}
          <div className="space-y-8">
            {/* Quick Stats Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-neat p-8"
            >
              <h3 className="text-xs font-bold text-slate-900 mb-8 uppercase tracking-widest flex items-center gap-3">
                <div className="w-1 h-4 bg-primary rounded-full" />
                Current Health Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Heart Rate', value: patient.vitals.find(v => v.type === 'heart_rate')?.value || '--', unit: 'bpm', icon: Heart, color: 'rose' },
                  { label: 'SpO2', value: patient.vitals.find(v => v.type === 'spo2')?.value || '--', unit: '%', icon: Droplets, color: 'blue' },
                  { label: 'Core Temp', value: patient.vitals.find(v => v.type === 'temperature')?.value || '--', unit: '°C', icon: Thermometer, color: 'amber' },
                  { label: 'Risk Index', value: Math.round(patient.riskScore * 10) / 10, unit: '/100', icon: AlertCircle, color: riskLevel.color === 'red' ? 'rose' : riskLevel.color }
                ].map((stat) => (
                  <div key={stat.label} className="p-5 rounded-2xl bg-slate-50 border border-slate-100/50 group hover:bg-white transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <stat.icon className={`h-3.5 w-3.5 ${
                        stat.color === 'rose' ? 'text-rose-600' :
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'amber' ? 'text-amber-600' :
                        'text-emerald-600'
                      }`} />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Connected Devices */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card-neat p-8"
            >
              <h3 className="text-[10px] font-black text-slate-900 mb-8 uppercase tracking-widest flex items-center gap-3">
                <div className="w-1 h-4 bg-emerald-600 rounded-full" />
                Active Hardware Uplink
              </h3>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-colors ${
                        device.isActive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}>
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 capitalize group-hover:text-blue-600 transition-colors tracking-tight">{device.name.replace('_', ' ')}</p>
                        <p className="text-[9px] font-black text-slate-400 tracking-[0.1em] uppercase mt-1">S/N: {device.serialNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-[8px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest border ${
                        device.isActive ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-slate-200 border-slate-300 text-slate-600'
                      }`}>
                        {device.isActive ? 'Online' : 'Offline'}
                      </div>
                      {device.batteryLevel !== undefined && (
                        <div className="flex items-center gap-1.5 justify-end mt-2">
                          <div className="w-8 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${device.batteryLevel}%` }} />
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase">{Math.round(device.batteryLevel)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center & Right Column: Charts & History */}
          <div className="lg:col-span-2 space-y-8">
            {/* Realtime Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-neat p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  Health Trends
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-rose-600 transition-colors">Heart Rate</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(75,155,110,0.4)]" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary transition-colors">Oxygen Sat.</span>
                  </div>
                </div>
              </div>
              <div className="h-[360px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSpo2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4B9B6E" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4B9B6E" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #F1F5F9',
                          borderRadius: '12px',
                          color: '#1e293b',
                          fontSize: '11px',
                          fontWeight: '700',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#f43f5e" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorHeart)" 
                      data={heartRateData}
                      animationDuration={2000}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#4B9B6E" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorSpo2)" 
                      data={spo2Data}
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Multi-Parameter Monitoring */}
            <MultiParameterMonitoring patientId={patient.id} />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Recent Alerts */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-neat p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                    <div className="w-1 h-4 bg-rose-600 rounded-full" />
                    Patient Incident Feed
                  </h3>
                  <span className="text-[8px] font-black text-blue-600 hover:text-blue-700 tracking-[0.2em] uppercase cursor-pointer transition-all border-b border-transparent hover:border-blue-600">Full Audit</span>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {patientAlerts.length > 0 ? (
                    patientAlerts.slice(0, 4).map((alert) => (
                      <div key={alert.id} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all duration-300">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          alert.severity === 'critical' ? 'bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white' :
                          alert.severity === 'high' ? 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white' :
                          'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                        }`}>
                          <AlertCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight">{alert.message}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-black tracking-widest uppercase">
                              <Clock className="h-3 w-3" />
                              {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest border ${
                              alert.isResolved ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700 animate-pulse'
                            }`}>
                              {alert.isResolved ? 'Resolved' : 'Active'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
                      <CheckCircle className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">No Active Incidents</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Patient Info & Team */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-neat p-8 bg-slate-900 text-white"
              >
                <h3 className="text-[10px] font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1 h-4 bg-blue-500 rounded-full" />
                  Assigned Clinical Unit
                </h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Lead Physician</p>
                    <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 mb-6 group hover:bg-white/10 transition-colors">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-900/40 group-hover:scale-105 transition-transform">
                        {patient.doctor.split(' ').pop()?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-black text-white tracking-tight">{patient.doctor} <span className="text-[10px] text-blue-400 ml-1">M.D.</span></p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">Lead Cardiologist</p>
                      </div>
                    </div>
                    <button
                      onClick={handleInformDoctor}
                      disabled={isInforming}
                      className={`w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all mb-8 shadow-2xl ${
                        isInforming 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-900/20 active:scale-95'
                      }`}
                    >
                      {isInforming ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Transmission Sent
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          Uplink to Physician
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Clinical Metadata</p>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">ID Protocol</p>
                        <p className="text-xs font-black text-white tracking-widest">#{patient.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Onboarded</p>
                        <p className="text-xs font-black text-white tracking-widest">APR 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Health Score Timeline */}
            <HealthScoreTimeline patient={patient} />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Health Task Suggestions */}
              <HealthTaskSuggestions patient={patient} />
              
              {/* Medicine Suggestion */}
              <MedicineSuggestion patient={patient} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
