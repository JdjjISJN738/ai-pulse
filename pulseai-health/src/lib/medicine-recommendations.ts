export interface MedicineRecommendation {
  name: string
  class: string
  dosage: string
  indication: string
}

export interface ConditionMedicines {
  [condition: string]: MedicineRecommendation[]
}

export const MEDICINE_RECOMMENDATIONS: ConditionMedicines = {
  'Hypertension': [
    {
      name: 'Amlodipine',
      class: 'Calcium Channel Blocker',
      dosage: '5-10 mg once daily',
      indication: 'Treatment of hypertension and angina'
    },
    {
      name: 'Lisinopril',
      class: 'ACE Inhibitor',
      dosage: '10-40 mg once daily',
      indication: 'Management of high blood pressure and heart failure'
    },
    {
      name: 'Losartan',
      class: 'ARB',
      dosage: '50-100 mg once daily',
      indication: 'Control of hypertension and protection of kidney function'
    }
  ],
  'Tachycardia': [
    {
      name: 'Metoprolol',
      class: 'Beta Blocker',
      dosage: '25-100 mg twice daily',
      indication: 'Control of heart rate in tachycardia and hypertension'
    },
    {
      name: 'Atenolol',
      class: 'Beta Blocker',
      dosage: '50-100 mg once daily',
      indication: 'Treatment of angina and tachycardia'
    },
    {
      name: 'Verapamil',
      class: 'Calcium Channel Blocker',
      dosage: '120-480 mg daily (extended release)',
      indication: 'Management of supraventricular arrhythmias'
    }
  ],
  'Bradycardia': [
    {
      name: 'Atropine',
      class: 'Anticholinergic',
      dosage: '0.5-1 mg IV (as needed)',
      indication: 'Emergency treatment of symptomatic bradycardia'
    },
    {
      name: 'Isoproterenol',
      class: 'Beta Agonist',
      dosage: '2-10 mcg/min IV infusion',
      indication: 'Temporary rate support in bradycardia'
    }
  ],
  'Hypoxia': [
    {
      name: 'Oxygen Therapy',
      class: 'Gas Therapy',
      dosage: '2-4 L/min via nasal cannula',
      indication: 'Correction of hypoxemia and improvement of oxygen saturation'
    },
    {
      name: 'Albuterol',
      class: 'Beta Agonist',
      dosage: '2.5 mg via nebulizer every 4-6 hours',
      indication: 'Bronchodilation to improve oxygenation'
    }
  ],
  'Hyperglycemia': [
    {
      name: 'Metformin',
      class: 'Biguanide',
      dosage: '500-2000 mg daily (divided doses)',
      indication: 'First-line treatment for type 2 diabetes and hyperglycemia'
    },
    {
      name: 'Glipizide',
      class: 'Sulfonylurea',
      dosage: '5-20 mg once daily (before meals)',
      indication: 'Stimulation of insulin secretion to lower blood glucose'
    },
    {
      name: 'Insulin Glargine',
      class: 'Long-acting Insulin',
      dosage: '10-40 units once daily at bedtime',
      indication: 'Basal glucose control in diabetes mellitus'
    }
  ],
  'Hypoglycemia': [
    {
      name: 'Dextrose 50%',
      class: 'Glucose Solution',
      dosage: '25-50 mL IV (emergency)',
      indication: 'Rapid correction of severe hypoglycemia'
    },
    {
      name: 'Glucagon',
      class: 'Hormone',
      dosage: '1 mg SC/IM (emergency)',
      indication: 'Emergency treatment of severe hypoglycemic episodes'
    },
    {
      name: 'Oral Glucose',
      class: 'Simple Carbohydrate',
      dosage: '15-20 g intake',
      indication: 'Correction of mild to moderate hypoglycemia'
    }
  ],
  'Fever': [
    {
      name: 'Acetaminophen',
      class: 'Antipyretic',
      dosage: '500-1000 mg every 4-6 hours (max 4g/day)',
      indication: 'Reduction of fever and mild to moderate pain'
    },
    {
      name: 'Ibuprofen',
      class: 'NSAID',
      dosage: '200-400 mg every 4-6 hours',
      indication: 'Fever reduction and anti-inflammatory action'
    },
    {
      name: 'Aspirin',
      class: 'NSAID',
      dosage: '325-650 mg every 4 hours',
      indication: 'Fever reduction and pain relief (avoid in children)'
    }
  ],
  'Arrhythmia': [
    {
      name: 'Amiodarone',
      class: 'Antiarrhythmic',
      dosage: '200-400 mg daily (maintenance)',
      indication: 'Treatment of life-threatening ventricular arrhythmias'
    },
    {
      name: 'Sotalol',
      class: 'Antiarrhythmic',
      dosage: '80-160 mg twice daily',
      indication: 'Management of atrial and ventricular arrhythmias'
    },
    {
      name: 'Diltiazem',
      class: 'Calcium Channel Blocker',
      dosage: '120-360 mg daily (extended release)',
      indication: 'Rate control in atrial fibrillation and supraventricular tachycardia'
    }
  ],
  'Hypotension': [
    {
      name: 'Midodrine',
      class: 'Alpha-1 Agonist',
      dosage: '10 mg three times daily',
      indication: 'Treatment of orthostatic hypotension'
    },
    {
      name: 'Fludrocortisone',
      class: 'Mineralocorticoid',
      dosage: '0.1-0.2 mg once daily',
      indication: 'Salt retention to increase blood pressure'
    }
  ]
}

export const getMedicinesForCondition = (condition: string): MedicineRecommendation[] => {
  return MEDICINE_RECOMMENDATIONS[condition] || []
}

export const getAllConditionNames = (): string[] => {
  return Object.keys(MEDICINE_RECOMMENDATIONS)
}
