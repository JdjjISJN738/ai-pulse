import { motion } from 'framer-motion'
import { ResponsiveContainer, LineChart, Line, YAxis, AreaChart, Area, BarChart, Bar } from 'recharts'
import { Heart, Droplets, Thermometer, Activity, Zap, Wind, Scale, Coffee, Brain, Moon, Flame } from 'lucide-react'
import { VitalReading, VITAL_CONFIGS } from '@/lib/health-types'
import { useHealthService } from '@/lib/health-service'

interface VitalPanelProps {
  patientId: string
}

interface SparklineData {
  value: number
}

const vitalIcons: Record<string, typeof Heart> = {
  heart_rate: Heart,
  spo2: Droplets,
  temperature: Thermometer,
  blood_pressure: Activity,
  ecg: Zap,
  activity: Activity,
  blood_glucose: Droplets,
  respiratory_rate: Wind,
  bmi: Scale,
  hydration: Coffee,
  stress: Brain,
  sleep: Moon,
  calories: Flame
}

const vitalThresholds: Record<string, { warning: { min?: number; max?: number }; critical: { min?: number; max?: number } }> = {
  heart_rate: { warning: { min: 60, max: 100 }, critical: { min: 40, max: 140 } },
  spo2: { warning: { min: 94 }, critical: { min: 90 } },
  temperature: { warning: { max: 37.5 }, critical: { max: 38.5 } },
  blood_pressure: { warning: { max: 140 }, critical: { max: 160 } },
  blood_glucose: { warning: { min: 70, max: 140 }, critical: { min: 60, max: 200 } },
  respiratory_rate: { warning: { min: 12, max: 20 }, critical: { min: 8, max: 30 } },
  stress: { warning: { max: 60 }, critical: { max: 80 } },
  hydration: { warning: { min: 50 }, critical: { min: 30 } },
  sleep: { warning: { min: 60 }, critical: { min: 40 } }
}

const getSeverityColor = (type: string, value: number): string => {
  const thresholds = vitalThresholds[type]
  if (!thresholds) return '#10b981'

  const { warning, critical } = thresholds

  if (critical.min !== undefined && value < critical.min) return '#ef4444'
  if (critical.max !== undefined && value > critical.max) return '#ef4444'
  if (warning.min !== undefined && value < warning.min) return '#f59e0b'
  if (warning.max !== undefined && value > warning.max) return '#f59e0b'

  return '#10b981'
}

const VitalPanelSkeleton = () => (
  <div className="animate-pulse p-5 rounded-2xl bg-slate-50 border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-200" />
        <div>
          <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
          <div className="h-2 w-12 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="h-8 w-16 bg-slate-200 rounded" />
    </div>
    <div className="h-16 bg-slate-100 rounded-xl" />
  </div>
)

export default function MultiParameterMonitoring({ patientId }: VitalPanelProps) {
  const { getVitalReadings } = useHealthService()
  const vitalReadings = getVitalReadings(patientId, 20)

  const vitalTypes: Array<{
    type: VitalReading['type']
    label: string
    value: number | null
    unit: string
    sparklineData: SparklineData[]
    color: string
    chartType: 'line' | 'area' | 'bar'
  }> = [
    { type: 'heart_rate', label: 'Heart Rate', value: null, unit: 'bpm', sparklineData: [], color: '#f43f5e', chartType: 'area' },
    { type: 'spo2', label: 'SpO2', value: null, unit: '%', sparklineData: [], color: '#0ea5e9', chartType: 'area' },
    { type: 'temperature', label: 'Body Temp', value: null, unit: '°C', sparklineData: [], color: '#f59e0b', chartType: 'line' },
    { type: 'blood_glucose', label: 'Blood Glucose', value: null, unit: 'mg/dL', sparklineData: [], color: '#f97316', chartType: 'line' },
    { type: 'respiratory_rate', label: 'Resp. Rate', value: null, unit: 'breaths/min', sparklineData: [], color: '#8b5cf6', chartType: 'area' },
    { type: 'bmi', label: 'BMI', value: null, unit: 'kg/m²', sparklineData: [], color: '#64748b', chartType: 'bar' },
    { type: 'hydration', label: 'Hydration', value: null, unit: '%', sparklineData: [], color: '#3b82f6', chartType: 'bar' },
    { type: 'stress', label: 'Stress Level', value: null, unit: 'index', sparklineData: [], color: '#ef4444', chartType: 'area' },
    { type: 'sleep', label: 'Sleep Quality', value: null, unit: 'score', sparklineData: [], color: '#4338ca', chartType: 'bar' },
    { type: 'calories', label: 'Caloric Burn', value: null, unit: 'kcal', sparklineData: [], color: '#f43f5e', chartType: 'bar' }
  ]

  vitalTypes.forEach(vt => {
    const readings = vitalReadings.filter(r => r.type === vt.type)
    if (readings.length > 0) {
      vt.value = readings[0].value
      vt.sparklineData = readings.slice(0, 10).reverse().map(r => ({ value: r.value }))
    }
  })

  if (vitalReadings.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-3">
          <div className="w-1 h-4 bg-primary rounded-full" />
          Multi-Parameter Monitoring
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {vitalTypes.map(vt => (
            <VitalPanelSkeleton key={vt.type} />
          ))}
        </div>
      </div>
    )
  }

  const renderChart = (vt: typeof vitalTypes[0], color: string) => {
    switch (vt.chartType) {
      case 'area':
        return (
          <AreaChart data={vt.sparklineData}>
            <defs>
              <linearGradient id={`gradient-${vt.type}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fillOpacity={1}
              fill={`url(#gradient-${vt.type})`}
              strokeWidth={2}
              isAnimationActive={true}
            />
          </AreaChart>
        )
      case 'bar':
        return (
          <BarChart data={vt.sparklineData}>
            <YAxis domain={[0, 'dataMax + 10']} hide />
            <Bar
              dataKey="value"
              fill={color}
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        )
      default:
        return (
          <LineChart data={vt.sparklineData}>
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        )
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-3">
        <div className="w-1 h-4 bg-primary rounded-full" />
        Multi-Parameter Monitoring
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {vitalTypes.map((vt, index) => {
          const Icon = vitalIcons[vt.type] || Activity
          const severityColor = vt.value !== null ? getSeverityColor(vt.type, vt.value) : '#10b981'
          const isLoading = vt.value === null

          return (
            <motion.div
              key={vt.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${severityColor}15`, color: severityColor }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{vt.label}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{vt.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  {isLoading ? (
                    <div className="h-7 w-16 bg-slate-100 rounded animate-pulse" />
                  ) : (
                    <p 
                      className="text-xl font-black tracking-tighter"
                      style={{ color: severityColor }}
                    >
                      {vt.value}
                    </p>
                  )}
                </div>
              </div>

              <div className="h-16 w-full">
                {isLoading ? (
                  <div className="h-full bg-slate-50 rounded-xl animate-pulse" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart(vt, severityColor)}
                  </ResponsiveContainer>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span 
                  className="text-[8px] font-black uppercase px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${severityColor}15`, color: severityColor }}
                >
                  {vt.value === null ? 'No Data' : 
                    severityColor === '#ef4444' ? 'Critical' :
                    severityColor === '#f59e0b' ? 'Warning' : 'Normal'}
                </span>
                <span className="text-[9px] font-bold text-slate-400">
                  {vt.sparklineData.length > 1 ? `${vt.sparklineData.length} readings` : '1 reading'}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
