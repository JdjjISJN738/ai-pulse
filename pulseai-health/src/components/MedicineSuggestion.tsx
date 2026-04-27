import { motion } from 'framer-motion'
import { Pill, AlertTriangle, Stethoscope, Info } from 'lucide-react'
import { Patient } from '@/lib/health-types'
import { MEDICINE_RECOMMENDATIONS, getMedicinesForCondition } from '@/lib/medicine-recommendations'

interface MedicineSuggestionProps {
  patient: Patient
}

const conditionClassColors: Record<string, string> = {
  'Calcium Channel Blocker': 'bg-blue-100 text-blue-700 border-blue-200',
  'ACE Inhibitor': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'ARB': 'bg-teal-100 text-teal-700 border-teal-200',
  'Beta Blocker': 'bg-purple-100 text-purple-700 border-purple-200',
  'Anticholinergic': 'bg-amber-100 text-amber-700 border-amber-200',
  'Beta Agonist': 'bg-orange-100 text-orange-700 border-orange-200',
  'Gas Therapy': 'bg-sky-100 text-sky-700 border-sky-200',
  'Biguanide': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Sulfonylurea': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Long-acting Insulin': 'bg-rose-100 text-rose-700 border-rose-200',
  'Glucose Solution': 'bg-red-100 text-red-700 border-red-200',
  'Hormone': 'bg-pink-100 text-pink-700 border-pink-200',
  'Simple Carbohydrate': 'bg-orange-100 text-orange-700 border-orange-200',
  'Antipyretic': 'bg-amber-50 text-amber-600 border-amber-200',
  'NSAID': 'bg-cyan-50 text-cyan-600 border-cyan-200',
  'Antiarrhythmic': 'bg-violet-100 text-violet-700 border-violet-200',
  'Alpha-1 Agonist': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Mineralocorticoid': 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200'
}

const conditionCategoryColors: Record<string, string> = {
  'Hypertension': 'bg-rose-50 border-rose-200',
  'Tachycardia': 'bg-orange-50 border-orange-200',
  'Bradycardia': 'bg-blue-50 border-blue-200',
  'Hypoxia': 'bg-sky-50 border-sky-200',
  'Hyperglycemia': 'bg-amber-50 border-amber-200',
  'Hypoglycemia': 'bg-yellow-50 border-yellow-200',
  'Fever': 'bg-orange-50 border-orange-200',
  'Arrhythmia': 'bg-purple-50 border-purple-200',
  'Hypotension': 'bg-cyan-50 border-cyan-200',
  'Dehydration': 'bg-blue-50 border-blue-200'
}

export default function MedicineSuggestion({ patient }: MedicineSuggestionProps) {
  const conditions = patient.conditions || []

  if (conditions.length === 0) {
    return (
      <div className="card-neat p-8">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-6">
          <div className="w-1 h-4 bg-primary rounded-full" />
          AI Medicine Suggestions
        </h3>
        <div className="text-center py-12 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
          <Pill className="h-10 w-10 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">No Conditions Detected</p>
          <p className="text-slate-400 text-[9px] font-bold mt-2">Patient vitals are within normal ranges</p>
        </div>
      </div>
    )
  }

  const allMedicines = conditions.flatMap(condition => {
    const medicines = getMedicinesForCondition(condition)
    return medicines.map(med => ({ ...med, condition }))
  })

  const uniqueMedicines = allMedicines.reduce((acc, med) => {
    if (!acc.find(m => m.name === med.name)) {
      acc.push(med)
    }
    return acc
  }, [] as Array<{ name: string; class: string; dosage: string; indication: string; condition: string }>)

  const displayMedicines = uniqueMedicines.slice(0, 6)

  return (
    <div className="card-neat p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
          <div className="w-1 h-4 bg-primary rounded-full" />
          AI Medicine Suggestions
        </h3>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
          <Info className="h-3 w-3 text-amber-600" />
          <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Based on Detected Conditions</span>
        </div>
      </div>

      <div className="space-y-4">
        {displayMedicines.map((medicine, index) => {
          const classColor = conditionClassColors[medicine.class] || 'bg-slate-100 text-slate-700 border-slate-200'
          const conditionBgColor = conditionCategoryColors[medicine.condition] || 'bg-slate-50 border-slate-200'

          return (
            <motion.div
              key={`${medicine.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-5 rounded-2xl border-2 ${conditionBgColor} hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                  <Pill className="h-5 w-5 text-slate-600 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h4 className="text-sm font-black text-slate-900 tracking-tight">{medicine.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full border ${classColor}`}>
                      {medicine.class}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 mb-3">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">Dosage:</span> {medicine.dosage}
                  </p>
                  <p className="text-[10px] font-medium text-slate-600 mb-3 leading-relaxed">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">Indication:</span> {medicine.indication}
                  </p>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                    <Stethoscope className="h-3 w-3" />
                    <span>Recommended for: {medicine.condition}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-black text-amber-800 uppercase tracking-wider mb-1">
              Important Disclaimer
            </p>
            <p className="text-[9px] font-medium text-amber-700 leading-relaxed">
              These suggestions are AI-generated recommendations based on detected conditions. Always consult your physician before making any changes to medication regimens. This information is for educational purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
