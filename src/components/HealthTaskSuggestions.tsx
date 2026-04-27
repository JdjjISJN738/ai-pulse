import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Circle, ClipboardList, AlertCircle, Heart, Droplets, Thermometer, Activity, Wind, Droplet } from 'lucide-react'
import { Patient, VitalReading } from '@/lib/health-types'

interface HealthTask {
  id: string
  task: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  reason: string
}

interface HealthTaskSuggestionsProps {
  patient: Patient
}

const conditionBasedTasks: Record<string, Array<{ task: string; priority: 'high' | 'medium' | 'low'; reason: string }>> = {
  'Hypertension': [
    { task: 'Deep breathing exercise (4-7-8 method, 3 sets)', priority: 'high', reason: 'Help lower blood pressure through relaxation' },
    { task: '10-min light walking + avoid caffeine', priority: 'high', reason: 'Cardiovascular exercise can reduce BP' },
    { task: 'Reduce sodium intake this meal', priority: 'medium', reason: 'Sodium causes fluid retention and higher BP' }
  ],
  'Tachycardia': [
    { task: '10-min light walking + avoid caffeine', priority: 'high', reason: 'Reduce heart rate naturally' },
    { task: 'Practice deep breathing for 5 minutes', priority: 'high', reason: 'Activate parasympathetic nervous system' },
    { task: 'Avoid stimulants and heavy meals', priority: 'medium', reason: 'Prevents additional heart rate elevation' }
  ],
  'Bradycardia': [
    { task: 'Light aerobic activity (if approved by physician)', priority: 'medium', reason: 'May help improve heart rate naturally' },
    { task: 'Stay hydrated', priority: 'high', reason: 'Dehydration can worsen bradycardia' },
    { task: 'Avoid abrupt position changes', priority: 'low', reason: 'Prevents orthostatic hypotension' }
  ],
  'Hypoxia': [
    { task: 'Deep breathing exercise (4-7-8 method, 3 sets)', priority: 'high', reason: 'Improve oxygen saturation' },
    { task: 'Pursed lip breathing for 10 minutes', priority: 'high', reason: 'Keep airways open longer' },
    { task: 'Sit upright and avoid lying flat', priority: 'medium', reason: 'Optimize lung expansion' }
  ],
  'Hyperglycemia': [
    { task: '30-min post-meal walk + reduce carb intake', priority: 'high', reason: 'Exercise helps insulin sensitivity' },
    { task: 'Drink water to stay hydrated', priority: 'medium', reason: 'Helps flush excess glucose' },
    { task: 'Avoid sugary drinks and snacks', priority: 'high', reason: 'Prevent further glucose spikes' }
  ],
  'Hypoglycemia': [
    { task: 'Consume 15-20g fast-acting carbohydrates', priority: 'high', reason: 'Quickly raise blood sugar' },
    { task: 'Rest and avoid strenuous activity', priority: 'medium', reason: 'Prevent dangerous sugar drop' },
    { task: 'Recheck glucose in 15 minutes', priority: 'high', reason: 'Monitor recovery' }
  ],
  'Fever': [
    { task: 'Take fever-reducing medication (if prescribed)', priority: 'high', reason: 'Reduce fever and discomfort' },
    { task: 'Stay well hydrated', priority: 'high', reason: 'Fever increases fluid loss' },
    { task: 'Rest in a cool, comfortable environment', priority: 'medium', reason: 'Help body recover' }
  ],
  'Arrhythmia': [
    { task: 'Practice stress-reduction techniques', priority: 'high', reason: 'Stress can trigger arrhythmias' },
    { task: 'Avoid caffeine and alcohol', priority: 'medium', reason: 'Known arrhythmia triggers' },
    { task: 'Monitor pulse regularly', priority: 'high', reason: 'Track heart rhythm patterns' }
  ],
  'Hypotension': [
    { task: 'Rise slowly from sitting/lying positions', priority: 'high', reason: 'Prevent dangerous drops' },
    { task: 'Increase salt intake slightly (if approved)', priority: 'medium', reason: 'Help raise blood pressure' },
    { task: 'Wear compression stockings', priority: 'low', reason: 'Improve venous return' }
  ],
  'Dehydration': [
    { task: 'Drink 16-24 oz of water immediately', priority: 'high', reason: 'Rehydrate the body' },
    { task: 'Monitor for signs of severe dehydration', priority: 'high', reason: 'May require medical attention' },
    { task: 'Avoid diuretics (caffeine, alcohol)', priority: 'medium', reason: 'Prevent further fluid loss' }
  ]
}

const vitalBasedTasks: Array<{
  condition: (v: VitalReading) => boolean
  tasks: Array<{ task: string; priority: 'high' | 'medium' | 'low'; reason: string }>
}> = [
  {
    condition: (v) => v.type === 'spo2' && v.value < 94,
    tasks: [
      { task: 'Deep breathing exercises (4-7-8 method, 3 sets)', priority: 'high', reason: 'SpO2 is below 94%, improve oxygenation' },
      { task: 'Practice pursed lip breathing for 10 minutes', priority: 'high', reason: 'Helps keep airways open and improve gas exchange' }
    ]
  },
  {
    condition: (v) => v.type === 'heart_rate' && v.value > 100,
    tasks: [
      { task: '10-min light walking + avoid caffeine', priority: 'high', reason: 'Heart rate elevated above 100 bpm at rest' },
      { task: 'Practice relaxation techniques for 5 minutes', priority: 'medium', reason: 'Reduce stress-induced tachycardia' }
    ]
  },
  {
    condition: (v) => v.type === 'heart_rate' && v.value < 60,
    tasks: [
      { task: 'Stay well hydrated', priority: 'medium', reason: 'Dehydration can worsen bradycardia' },
      { task: 'Avoid rapid position changes', priority: 'low', reason: 'Prevent syncope risk' }
    ]
  },
  {
    condition: (v) => v.type === 'blood_glucose' && v.value > 140,
    tasks: [
      { task: '30-min post-meal walk + reduce carb intake', priority: 'high', reason: 'Blood glucose > 140 mg/dL, improve insulin sensitivity' },
      { task: 'Choose low glycemic index foods', priority: 'medium', reason: 'Prevent further glucose spikes' }
    ]
  },
  {
    condition: (v) => v.type === 'blood_glucose' && v.value < 70,
    tasks: [
      { task: 'Consume 15-20g fast-acting carbohydrates', priority: 'high', reason: 'Blood glucose < 70 mg/dL, urgent correction needed' },
      { task: 'Recheck glucose in 15 minutes', priority: 'high', reason: 'Monitor response to treatment' }
    ]
  },
  {
    condition: (v) => v.type === 'temperature' && v.value > 38,
    tasks: [
      { task: 'Take fever-reducing medication (if prescribed)', priority: 'high', reason: 'Temperature elevated above 38°C' },
      { task: 'Stay well hydrated', priority: 'high', reason: 'Fever increases fluid requirements' }
    ]
  },
  {
    condition: (v) => v.type === 'stress' && v.value > 60,
    tasks: [
      { task: 'Practice mindfulness meditation for 10 minutes', priority: 'high', reason: 'Stress level is elevated' },
      { task: 'Take a break and practice deep breathing', priority: 'medium', reason: 'Activate parasympathetic response' }
    ]
  },
  {
    condition: (v) => v.type === 'hydration' && v.value < 50,
    tasks: [
      { task: 'Drink 16-24 oz of water now', priority: 'high', reason: 'Hydration below 50%' },
      { task: 'Monitor urine color (aim for pale yellow)', priority: 'medium', reason: 'Track hydration status' }
    ]
  },
  {
    condition: (v) => v.type === 'respiratory_rate' && v.value > 20,
    tasks: [
      { task: 'Practice pursed lip breathing', priority: 'high', reason: 'Respiratory rate elevated' },
      { task: 'Avoid strenuous activity temporarily', priority: 'medium', reason: 'Reduce respiratory demand' }
    ]
  }
]

export default function HealthTaskSuggestions({ patient }: HealthTaskSuggestionsProps) {
  const [tasks, setTasks] = useState<HealthTask[]>(() => {
    const generatedTasks: HealthTask[] = []

    patient.conditions.forEach(condition => {
      const conditionTasks = conditionBasedTasks[condition]
      if (conditionTasks) {
        conditionTasks.forEach((t, i) => {
          generatedTasks.push({
            id: `${condition}-${i}`,
            task: t.task,
            completed: false,
            priority: t.priority,
            reason: t.reason
          })
        })
      }
    })

    patient.vitals.forEach(vital => {
      const vitalTaskConfig = vitalBasedTasks.find(config => config.condition(vital))
      if (vitalTaskConfig) {
        vitalTaskConfig.tasks.forEach((t, i) => {
          const existingTask = generatedTasks.find(gt => gt.task === t.task)
          if (!existingTask) {
            generatedTasks.push({
              id: `${vital.type}-${i}`,
              task: t.task,
              completed: false,
              priority: t.priority,
              reason: t.reason
            })
          }
        })
      }
    })

    const uniqueTasks = generatedTasks.reduce((acc, task) => {
      if (!acc.find(t => t.task === task.task)) {
        acc.push(task)
      }
      return acc
    }, [] as HealthTask[])

    return uniqueTasks.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  })

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ))
  }

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', dot: 'bg-rose-500' }
      case 'medium': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' }
      default: return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' }
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="card-neat p-8">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-6">
          <div className="w-1 h-4 bg-emerald-600 rounded-full" />
          Daily Health Tasks
        </h3>
        <div className="text-center py-12 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
          <CheckCircle className="h-10 w-10 text-emerald-300 mx-auto mb-4" />
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">All Tasks Complete</p>
          <p className="text-slate-400 text-[9px] font-bold mt-2">Patient vitals are within normal ranges</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-neat p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
          <div className="w-1 h-4 bg-emerald-600 rounded-full" />
          Daily Health Tasks
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-500">
            {completedCount}/{totalCount} completed
          </span>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {tasks.map((task, index) => {
            const colors = getPriorityColor(task.priority)
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                  task.completed 
                    ? 'bg-emerald-50/50 border-emerald-100 opacity-60' 
                    : colors.bg + ' ' + colors.border
                } hover:shadow-md`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 shrink-0 transition-colors ${task.completed ? 'text-emerald-500' : colors.text}`}>
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-black mb-2 leading-tight transition-all ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}>
                      {task.task}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full border ${colors.text} ${colors.bg}`}>
                        {task.priority}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 leading-relaxed">
                        {task.reason}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {completedCount === totalCount && totalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center"
        >
          <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
          <p className="text-sm font-black text-emerald-700">All Tasks Completed!</p>
          <p className="text-[10px] font-bold text-emerald-600 mt-1">Great job following the health plan</p>
        </motion.div>
      )}
    </div>
  )
}
