import { motion } from 'framer-motion'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react'
import { Patient } from '@/lib/health-types'

interface HealthScoreTimelineProps {
  patient: Patient
}

const getScoreColor = (score: number): string => {
  if (score <= 25) return '#10b981'
  if (score <= 50) return '#f59e0b'
  if (score <= 75) return '#f97316'
  return '#ef4444'
}

const getScoreGradient = (score: number): { id: string; color: string } => {
  if (score <= 25) return { id: 'colorStable', color: '#10b981' }
  if (score <= 50) return { id: 'colorObserve', color: '#f59e0b' }
  if (score <= 75) return { id: 'colorWarning', color: '#f97316' }
  return { id: 'colorCritical', color: '#ef4444' }
}

const getRiskLevel = (score: number): { label: string; color: string; bgColor: string } => {
  if (score <= 25) return { label: 'Stable', color: '#10b981', bgColor: 'bg-emerald-50 border-emerald-200' }
  if (score <= 50) return { label: 'Observe', color: '#f59e0b', bgColor: 'bg-amber-50 border-amber-200' }
  if (score <= 75) return { label: 'Warning', color: '#f97316', bgColor: 'bg-orange-50 border-orange-200' }
  return { label: 'Critical', color: '#ef4444', bgColor: 'bg-rose-50 border-rose-200' }
}

const HealthScoreSkeleton = () => (
  <div className="animate-pulse card-neat p-8">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-200" />
        <div>
          <div className="h-3 w-32 bg-slate-200 rounded mb-2" />
          <div className="h-2 w-20 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="h-8 w-24 bg-slate-200 rounded-full" />
    </div>
    <div className="h-[200px] bg-slate-100 rounded-xl" />
  </div>
)

export default function HealthScoreTimeline({ patient }: HealthScoreTimelineProps) {
  const history = patient.healthScoreHistory || []

  if (history.length === 0) {
    return (
      <div className="card-neat p-8">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-8">
          <div className="w-1 h-4 bg-primary rounded-full" />
          7-Day Risk Score Trend
        </h3>
        <div className="text-center py-16 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
          <TrendingUp className="h-10 w-10 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">No Historical Data</p>
          <p className="text-slate-400 text-[9px] font-bold mt-2">Risk score tracking will appear here</p>
        </div>
      </div>
    )
  }

  const chartData = history.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    score: Math.round(item.score),
    fullDate: item.date
  }))

  const latestScore = chartData[chartData.length - 1]?.score || 0
  const averageScore = Math.round(chartData.reduce((sum, item) => sum + item.score, 0) / chartData.length)
  const scoreTrend = latestScore - (chartData[chartData.length - 2]?.score || latestScore)
  const riskLevel = getRiskLevel(latestScore)
  const gradient = getScoreGradient(latestScore)

  return (
    <div className="card-neat p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${gradient.color}15`, color: gradient.color }}
          >
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">
              7-Day Risk Score Trend
            </h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Last 7 days performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Score</p>
            <p className="text-2xl font-black" style={{ color: gradient.color }}>
              {latestScore}
              <span className="text-xs font-bold text-slate-400">/100</span>
            </p>
          </div>
          <div className={`px-4 py-2 rounded-full border-2 ${riskLevel.bgColor}`}>
            <span className="text-[10px] font-black uppercase" style={{ color: riskLevel.color }}>
              {riskLevel.label}
            </span>
          </div>
        </div>
      </div>

      <div className="h-[200px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradient.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradient.color} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={gradient.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} 
              dy={10}
            />
            <YAxis 
              domain={[0, 100]} 
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
              formatter={(value) => [Number(value), 'Risk Score']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke={gradient.color} 
              strokeWidth={3}
              fillOpacity={1} 
              fill={`url(#${gradient.id})`}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
        <div className="text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Average</p>
          <p className="text-lg font-black text-slate-900">{averageScore}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Trend</p>
          <p className={`text-lg font-black flex items-center justify-center gap-1 ${
            scoreTrend > 0 ? 'text-rose-600' : scoreTrend < 0 ? 'text-emerald-600' : 'text-slate-600'
          }`}>
            {scoreTrend > 0 ? '↑' : scoreTrend < 0 ? '↓' : '→'} {Math.abs(scoreTrend)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Status</p>
          <p className="text-lg font-black" style={{ color: riskLevel.color }}>{riskLevel.label}</p>
        </div>
      </div>
    </div>
  )
}
