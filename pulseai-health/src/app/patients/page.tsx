

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Users, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Eye, 
  MoreVertical, 
  History, 
  Edit2, 
  UserPlus, 
  ArrowRightLeft, 
  UserMinus,
  Plus,
  X,
  User,
  MapPin,
  Stethoscope,
  Clock,
  Heart,
  Droplets,
  Thermometer,
  Zap
} from 'lucide-react'
import Layout from '@/components/Layout'
import { useHealthService } from '@/lib/health-service'
import { Patient, calculateRiskLevel } from '@/lib/health-types'
import { Link } from 'react-router-dom'
import ConditionBadge from '@/components/ConditionBadge'

function PatientCard({ patient }: { patient: Patient }) {
  const riskLevel = calculateRiskLevel(patient)
  const [showActions, setShowActions] = useState(false)
  const { dischargePatient } = useHealthService()

  const handleDischarge = () => {
    if (window.confirm(`Are you sure you want to discharge ${patient.name}?`)) {
      dischargePatient(patient.id)
    }
  }

  const actions = [
    { label: 'View History', icon: History, color: 'blue' },
    { label: 'Edit Profile', icon: Edit2, color: 'gray' },
    { label: 'Assign Doctor', icon: UserPlus, color: 'green' },
    { label: 'Transfer Patient', icon: ArrowRightLeft, color: 'purple' },
    { label: 'Discharge', icon: UserMinus, color: 'rose', onClick: handleDischarge }
  ]
  
  return (    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card-neat p-6 relative group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <Link to={`/patients/${patient.id}`} className="block">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors tracking-tight">{patient.name}</h3>
            <p className="text-xs font-bold text-slate-400">{patient.age}Y • {patient.gender}</p>
            <div className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 w-fit">
              <MapPin className="h-3 w-3 text-primary" />
              {patient.room}
            </div>
          </div>
        </Link>
        <div className="flex flex-col items-end gap-3">
          <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border-2 ${
            patient.status === 'critical' ? 'bg-rose-50 border-rose-200 text-rose-700' :
            patient.status === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700' :
            'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            {patient.status}
          </span>
          <div className="relative">
            <button 
              onClick={(e) => {
                e.preventDefault()
                setShowActions(!showActions)
              }}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200 group/btn"
            >
              <MoreVertical className="h-4 w-4 text-slate-400 group-hover/btn:text-slate-900" />
            </button>
            
            <AnimatePresence>
              {showActions && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowActions(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-20 overflow-hidden"
                  >
                    {actions.map((action) => (
                      <button
                        key={action.label}
                        onClick={(e) => {
                          e.preventDefault()
                          action.onClick?.()
                          setShowActions(false)
                        }}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-xs font-bold transition-colors ${
                          action.color === 'rose' ? 'text-rose-600 hover:bg-rose-50' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <action.icon className="h-4 w-4" />
                        {action.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <Link to={`/patients/${patient.id}`} className="block flex-1">
        <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors duration-300">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Risk Index</p>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{Math.round(riskLevel.score * 10) / 10}</div>
              <div className={`w-3 h-3 rounded-full ${
                riskLevel.level === 'critical' ? 'bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.4)]' :
                riskLevel.level === 'warning' ? 'bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.4)]' :
                'bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]'
              }`} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Clinician</p>
            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{patient.doctor}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Last Telemetry</span>
            </div>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">
              {new Date(patient.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-400">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Risk Trend</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${
              riskLevel.level === 'critical' ? 'text-rose-600' :
              riskLevel.level === 'warning' ? 'text-amber-600' :
              riskLevel.level === 'observe' ? 'text-blue-600' :
              'text-emerald-600'
            }`}>
              {riskLevel.description}
            </span>
          </div>
        </div>

        {patient.conditions && patient.conditions.length > 0 && (
          <div className="mt-auto pt-4 border-t border-slate-100">
            <ConditionBadge conditions={patient.conditions} size="sm" />
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-slate-100">
          <span className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] transition-all group-hover:gap-3">
            Open Patient Interface
            <ArrowRightLeft className="h-3 w-3" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function PatientsPage() {
  const { patients, alerts, addPatient } = useHealthService()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'risk' | 'lastUpdate'>('lastUpdate')
  
  // Add Patient Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newPatient, setNewPatient] = useState<{
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    room: string;
    doctor: string;
    status: 'stable' | 'warning' | 'critical';
    riskScore: number;
    heartRate: number;
    spo2: number;
    temperature: number;
    conditions: string;
  }>({
    name: '',
    age: 30,
    gender: 'male',
    room: '',
    doctor: '',
    status: 'stable',
    riskScore: 0,
    heartRate: 75,
    spo2: 98,
    temperature: 36.6,
    conditions: ''
  })

  // Calculate live risk preview
  const riskPreview = useMemo(() => {
    let score = 20 // baseline
    if (newPatient.heartRate > 100 || newPatient.heartRate < 60) score += 20
    if (newPatient.heartRate > 120 || newPatient.heartRate < 50) score += 20
    if (newPatient.spo2 < 95) score += 25
    if (newPatient.spo2 < 90) score += 25
    if (newPatient.temperature > 38 || newPatient.temperature < 36) score += 15
    if (newPatient.status === 'warning') score += 15
    if (newPatient.status === 'critical') score += 30
    
    const finalScore = Math.min(100, score)
    let level: 'stable' | 'observe' | 'warning' | 'critical' = 'stable'
    if (finalScore > 75) level = 'critical'
    else if (finalScore > 50) level = 'warning'
    else if (finalScore > 25) level = 'observe'
    
    return { score: finalScore, level }
  }, [newPatient.heartRate, newPatient.spo2, newPatient.temperature, newPatient.status])

  // Filter and sort patients
  const filteredPatients = useMemo(() => {
    let filtered = patients

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.room && p.room.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.doctor && p.doctor.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter)
    }

    // Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'risk') {
        const riskA = calculateRiskLevel(a).score
        const riskB = calculateRiskLevel(b).score
        return riskB - riskA
      }
      return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
    })
  }, [patients, searchTerm, statusFilter, sortBy])

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault()
    addPatient({
      ...newPatient,
      conditions: newPatient.conditions ? newPatient.conditions.split(',').map(s => s.trim()) : [],
      riskScore: riskPreview.score,
      healthScoreHistory: []
    }, [
      { type: 'heart_rate', value: newPatient.heartRate },
      { type: 'spo2', value: newPatient.spo2 },
      { type: 'temperature', value: newPatient.temperature }
    ])
    setIsAddModalOpen(false)
    setNewPatient({
      name: '',
      age: 30,
      gender: 'male',
      room: '',
      doctor: '',
      status: 'stable',
      riskScore: 0,
      heartRate: 75,
      spo2: 98,
      temperature: 36.6,
      conditions: ''
    })
  }

  return (
    <Layout requireAuth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Patient Registry</h1>
            <p className="text-slate-500 mt-2 font-medium">Manage and monitor all admitted patients</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
            >
              <UserPlus className="h-4 w-4" />
              Admit Patient
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, room, or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-2">
             {['all', 'critical', 'warning', 'stable'].map((status) => (
               <button
                 key={status}
                 onClick={() => setStatusFilter(status as any)}
                 className={`px-5 py-3 rounded-xl text-xs font-bold capitalize transition-all border-2 ${
                   statusFilter === status
                     ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                     : 'bg-white border-slate-100 text-slate-500 hover:border-primary-light hover:text-primary'
                 }`}
               >
                 {status}
               </button>
             ))}
           </div>
        </div>

        {/* Patients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </AnimatePresence>
        </div>

        {filteredPatients.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 card-neat bg-white"
          >
            <div className="w-20 h-20 bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Zero Matches Found</h3>
            <p className="text-slate-500 font-bold text-sm">Adjust your search parameters or filter criteria.</p>
          </motion.div>
        )}

        {/* Add Patient Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Admit Patient</h2>
                  <p className="text-slate-500 text-sm mt-1 font-medium">Create a new patient profile</p>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all group"
                >
                  <X className="h-6 w-6 text-slate-400 group-hover:text-slate-900" />
                </button>
              </div>

              <form onSubmit={handleAddPatient} className="flex flex-col overflow-hidden">
                <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <User className="h-3 w-3" />
                       Patient Details
                    </h3>
                 <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Room Number</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
                        value={newPatient.room}
                        onChange={(e) => setNewPatient({ ...newPatient, room: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Age</label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Gender</label>
                    <select
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium appearance-none"
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value as any })}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</label>
                    <select
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium appearance-none"
                      value={newPatient.status}
                      onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value as any })}
                    >
                      <option value="stable">Stable</option>
                      <option value="warning">Warning</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Primary Doctor</label>
                  <div className="relative">
                    <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
                      value={newPatient.doctor}
                      onChange={(e) => setNewPatient({ ...newPatient, doctor: e.target.value })}
                    />
                  </div>
                </div>



                <div className="p-6 bg-slate-900 rounded-2xl space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                       <Zap className="h-3.5 w-3.5 text-blue-400" />
                       Clinical Vitals & Admission Triage
                    </h3>
                    <div className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-colors ${
                      riskPreview.level === 'critical' ? 'bg-rose-500 border-rose-400 text-white' :
                      riskPreview.level === 'warning' ? 'bg-amber-500 border-amber-400 text-white' :
                      riskPreview.level === 'observe' ? 'bg-blue-500 border-blue-400 text-white' :
                      'bg-emerald-500 border-emerald-400 text-white'
                    }`}>
                      {riskPreview.level} Index
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Heart className="h-3 w-3 text-rose-500" />
                        Heart Rate
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none text-white text-sm font-bold transition-all"
                          value={newPatient.heartRate}
                          onChange={(e) => setNewPatient({ ...newPatient, heartRate: parseInt(e.target.value) || 0 })}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-slate-500">BPM</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Droplets className="h-3 w-3 text-blue-400" />
                        SPO2 LEVEL
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none text-white text-sm font-bold transition-all"
                          value={newPatient.spo2}
                          onChange={(e) => setNewPatient({ ...newPatient, spo2: parseInt(e.target.value) || 0 })}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-slate-500">%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Thermometer className="h-3 w-3 text-amber-500" />
                        TEMP
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none text-white text-sm font-bold transition-all"
                          value={newPatient.temperature}
                          onChange={(e) => setNewPatient({ ...newPatient, temperature: parseFloat(e.target.value) || 0 })}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-slate-500">°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Medical Conditions (Comma Separated)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none text-white text-sm font-medium transition-all"
                      placeholder="e.g. Hypertension, Type 2 Diabetes"
                      value={newPatient.conditions}
                      onChange={(e) => setNewPatient({ ...newPatient, conditions: e.target.value })}
                    />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Baseline Risk Preview</span>
                      <span className="text-[10px] font-black text-white">{riskPreview.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${riskPreview.score}%` }}
                        className={`h-full rounded-full ${
                          riskPreview.level === 'critical' ? 'bg-rose-500' :
                          riskPreview.level === 'warning' ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                  </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 px-6 py-4 border-2 border-slate-200 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
                  >
                    Confirm Admission
                  </button>
                </div>
              </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}


