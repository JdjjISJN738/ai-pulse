

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, AlertTriangle, CheckCircle, Clock, User, Activity, TrendingUp, Calendar, MessageSquare, Shield } from 'lucide-react'
import Layout from '@/components/Layout'
import { useHealthService } from '@/lib/health-service'
import { Alert } from '@/lib/health-types'
import SmartAlertEscalation from '@/components/SmartAlertEscalation'

function AlertCard({ alert, onResolve }: { alert: Alert; onResolve: (id: string, resolvedBy: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="card-neat p-6 relative group"
    >
      <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl ${
        alert.severity === 'critical' ? 'bg-rose-600' :
        alert.severity === 'high' ? 'bg-orange-600' :
        alert.severity === 'medium' ? 'bg-yellow-500' :
        'bg-primary'
      }`} />
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl shadow-sm ${
            alert.severity === 'critical' ? 'bg-rose-50 text-rose-600' :
            alert.severity === 'high' ? 'bg-orange-50 text-orange-600' :
            alert.severity === 'medium' ? 'bg-yellow-50 text-yellow-600' :
            'bg-emerald-50 text-emerald-600'
          }`}>
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight">{alert.patientName}</h3>
            <p className="text-xs font-bold text-slate-400 mt-1">ID: {alert.patientId}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            alert.severity === 'critical' ? 'bg-rose-50 border border-rose-200 text-rose-700' :
            alert.severity === 'high' ? 'bg-orange-50 border border-orange-200 text-orange-700' :
            alert.severity === 'medium' ? 'bg-yellow-50 border border-yellow-200 text-yellow-700' :
            'bg-emerald-50 border border-emerald-200 text-emerald-700'
          }`}>
            {alert.severity}
          </span>
          {alert.isResolved && (
            <div className="flex items-center gap-1 text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Resolved</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
        <p className="text-slate-900 font-bold leading-relaxed mb-3">{alert.message}</p>
        {alert.vitalType && alert.currentValue && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
              <Activity className="h-3.5 w-3.5 text-primary" />
              {alert.vitalType.replace('_', ' ')}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
              <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
              Value: <span className="text-slate-900">{alert.currentValue}</span>
              {alert.threshold && <span className="opacity-60">(Limit: {alert.threshold})</span>}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(alert.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Clock className="h-3.5 w-3.5" />
            {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        {!alert.isResolved && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onResolve(alert.id, 'Dr. Current User')}
            className="px-6 py-2.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
          >
            Resolve Alert
          </motion.button>
        )}
      </div>

      {alert.resolvedAt && (
        <div className="mt-4 pt-4 border-t border-dashed border-slate-100">
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
            <CheckCircle className="h-3.5 w-3.5" />
            Resolved by {alert.resolvedBy} at {new Date(alert.resolvedAt).toLocaleString()}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function AlertsPage() {
  const { alerts, resolveAlert } = useHealthService()
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = !searchTerm || 
      alert.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'resolved' ? alert.isResolved : !alert.isResolved)

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
    unresolved: alerts.filter(a => !a.isResolved).length,
    resolved: alerts.filter(a => a.isResolved).length
  }

  return (
    <Layout requireAuth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Alert History</h1>
            <p className="text-slate-500 mt-2 font-medium">Review and manage active patient health alerts</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-rose-700">{stats.unresolved} Active Alerts</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search alerts by patient or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
              <button
                key={severity}
                onClick={() => setSeverityFilter(severity)}
                className={`px-5 py-3 rounded-xl text-xs font-bold capitalize transition-all border-2 ${
                  severityFilter === severity
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white border-slate-100 text-slate-500 hover:border-primary-light hover:text-primary'
                }`}
              >
                {severity}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Alerts', value: stats.total, icon: AlertTriangle, color: 'primary' },
            { label: 'Active', value: stats.unresolved, icon: Activity, color: 'rose' },
            { label: 'Resolved Today', value: stats.resolved, icon: CheckCircle, color: 'emerald' },
            { label: 'Avg. Resolution', value: '1.2m', icon: Clock, color: 'indigo' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-neat p-6 flex items-center gap-6"
            >
              <div className={`p-4 rounded-2xl bg-${stat.color === 'primary' ? 'primary' : stat.color}-50 text-${stat.color === 'primary' ? 'primary' : stat.color}-600`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-neat p-6"
            >
              <h3 className="section-title mb-6">
                <Filter className="h-5 w-5 text-blue-600" />
                Filter Feed
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Patient or Message..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Severity</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['all', 'critical', 'high', 'medium', 'low'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSeverityFilter(s)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-left transition-all ${
                          severityFilter === s 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                  <div className="flex bg-slate-50 p-1 rounded-xl">
                    {['all', 'unresolved', 'resolved'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                          statusFilter === s 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Severity Stats Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card-neat p-6"
            >
              <h3 className="section-title mb-6">Severity Matrix</h3>
              <div className="space-y-4">
                {[
                  { label: 'Critical', count: stats.critical, color: 'red' },
                  { label: 'High Risk', count: stats.high, color: 'orange' },
                  { label: 'Elevated', count: stats.medium, color: 'yellow' },
                  { label: 'Standard', count: stats.low, color: 'blue' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight group-hover:text-slate-900 transition-colors">{item.label}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg bg-${item.color}-50 text-${item.color}-700 text-[10px] font-black`}>
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Alert Feed */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-4 px-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Feed: <span className="text-slate-900">{filteredAlerts.length} Active Notifications</span>
              </p>
            </div>

            <div className="space-y-4">
              {filteredAlerts.map((alert, index) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onResolve={resolveAlert}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredAlerts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 card-neat"
              >
                <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-slate-200" />
                <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Clear Clinical Feed</h3>
                <p className="text-slate-500 font-medium max-w-xs mx-auto">
                  {searchTerm || severityFilter !== 'all' || statusFilter !== 'all' 
                    ? 'No alerts match your current filters. Try resetting them.' 
                    : 'Great job! There are currently no active alerts in the system.'}
                </p>
                {(searchTerm || severityFilter !== 'all' || statusFilter !== 'all') && (
                  <button 
                    onClick={() => {
                      setSearchTerm('')
                      setSeverityFilter('all')
                      setStatusFilter('all')
                    }}
                    className="mt-8 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-700"
                  >
                    Reset All Filters
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Smart Alert Escalation Component */}
          <SmartAlertEscalation 
            alerts={alerts.filter(a => !a.isResolved)} 
            onResolve={resolveAlert} 
          />
        </div>
      </div>
    </Layout>
  )
}


