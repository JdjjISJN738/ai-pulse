export type DifficultyLevel = 'Easy' | 'Moderate' | 'Intense'
export type PracticeCategory = 'Cardiovascular' | 'Respiratory' | 'Metabolic' | 'Sleep' | 'Mental Health'

export interface HealthPractice {
  id: string
  title: string
  description: string
  duration: string
  difficulty: DifficultyLevel
  category: PracticeCategory
  recommendedFor: string[]
}

export const HEALTH_PRACTICES: HealthPractice[] = [
  {
    id: 'cardio-1',
    title: 'Deep Breathing Exercise (4-7-8 Method)',
    description: 'A relaxation technique that involves breathing in for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds. Helps reduce stress and lower blood pressure.',
    duration: '10 minutes',
    difficulty: 'Easy',
    category: 'Cardiovascular',
    recommendedFor: ['Hypertension', 'Tachycardia', 'Stress', 'Anxiety']
  },
  {
    id: 'cardio-2',
    title: 'Light Walking',
    description: 'Gentle walking at a comfortable pace to promote circulation and cardiovascular health without straining the body.',
    duration: '15-30 minutes',
    difficulty: 'Easy',
    category: 'Cardiovascular',
    recommendedFor: ['Hypertension', 'Hypotension', 'Obesity', 'Sedentary Lifestyle']
  },
  {
    id: 'cardio-3',
    title: 'Progressive Muscle Relaxation',
    description: 'Systematically tensing and relaxing different muscle groups to reduce physical tension and promote calmness.',
    duration: '15-20 minutes',
    difficulty: 'Easy',
    category: 'Cardiovascular',
    recommendedFor: ['Hypertension', 'Stress', 'Anxiety', 'Sleep Issues']
  },
  {
    id: 'cardio-4',
    title: 'Tai Chi for Heart Health',
    description: 'Ancient Chinese practice combining slow, deliberate movements with deep breathing to improve cardiovascular fitness and reduce stress.',
    duration: '20-30 minutes',
    difficulty: 'Moderate',
    category: 'Cardiovascular',
    recommendedFor: ['Hypertension', 'Arrhythmia', 'Balance Issues', 'Stress']
  },
  {
    id: 'cardio-5',
    title: 'Post-Meal Walking',
    description: 'Light walking after meals to aid digestion and help regulate blood glucose levels.',
    duration: '15-30 minutes',
    difficulty: 'Easy',
    category: 'Cardiovascular',
    recommendedFor: ['Hyperglycemia', 'Obesity', 'Digestive Issues']
  },
  {
    id: 'resp-1',
    title: 'Diaphragmatic Breathing',
    description: 'Deep breathing that engages the diaphragm to strengthen respiratory muscles and improve oxygen intake.',
    duration: '10-15 minutes',
    difficulty: 'Easy',
    category: 'Respiratory',
    recommendedFor: ['Hypoxia', 'Asthma', 'COPD', 'Anxiety']
  },
  {
    id: 'resp-2',
    title: 'Pursed Lip Breathing',
    description: 'Inhale through nose and exhale slowly through pursed lips to help keep airways open longer and improve oxygen exchange.',
    duration: '5-10 minutes',
    difficulty: 'Easy',
    category: 'Respiratory',
    recommendedFor: ['Hypoxia', 'COPD', 'Asthma', 'Breathlessness']
  },
  {
    id: 'resp-3',
    title: 'Incentive Spirometry Exercise',
    description: 'Using a device to encourage slow, deep breathing to prevent lung complications and improve lung capacity.',
    duration: '10 minutes',
    difficulty: 'Easy',
    category: 'Respiratory',
    recommendedFor: ['Hypoxia', 'Post-Surgery Recovery', 'Respiratory Infection']
  },
  {
    id: 'resp-4',
    title: 'Chest Expansion Exercises',
    description: 'Gentle stretching and expansion exercises to improve chest mobility and respiratory function.',
    duration: '15 minutes',
    difficulty: 'Moderate',
    category: 'Respiratory',
    recommendedFor: ['Hypoxia', 'Asthma', 'Sedentary Lifestyle']
  },
  {
    id: 'metabolic-1',
    title: 'Glycemic Index Diet Planning',
    description: 'Learning to choose low GI foods to maintain stable blood sugar levels throughout the day.',
    duration: 'Ongoing',
    difficulty: 'Moderate',
    category: 'Metabolic',
    recommendedFor: ['Hyperglycemia', 'Hypoglycemia', 'Obesity', 'Diabetes Risk']
  },
  {
    id: 'metabolic-2',
    title: 'Carb Counting and Portion Control',
    description: 'Understanding carbohydrate content in foods and appropriate portion sizes for blood sugar management.',
    duration: 'Ongoing',
    difficulty: 'Moderate',
    category: 'Metabolic',
    recommendedFor: ['Hyperglycemia', 'Diabetes Risk', 'Weight Management']
  },
  {
    id: 'metabolic-3',
    title: 'Hydration Monitoring',
    description: 'Tracking daily water intake to maintain optimal hydration levels for metabolic function.',
    duration: 'Ongoing',
    difficulty: 'Easy',
    category: 'Metabolic',
    recommendedFor: ['Dehydration', 'Headaches', 'Fatigue', 'Digestive Issues']
  },
  {
    id: 'metabolic-4',
    title: 'High-Intensity Interval Training (HIIT)',
    description: 'Short bursts of intense exercise followed by rest periods to improve insulin sensitivity and metabolic rate.',
    duration: '20-30 minutes',
    difficulty: 'Intense',
    category: 'Metabolic',
    recommendedFor: ['Obesity', 'Hyperglycemia', 'Low Fitness Level']
  },
  {
    id: 'sleep-1',
    title: 'Sleep Hygiene Routine',
    description: 'Establishing consistent sleep and wake times, limiting screen exposure before bed, and creating an optimal sleep environment.',
    duration: 'Ongoing',
    difficulty: 'Easy',
    category: 'Sleep',
    recommendedFor: ['Insomnia', 'Poor Sleep Quality', 'Irregular Sleep Patterns']
  },
  {
    id: 'sleep-2',
    title: 'Relaxation Techniques Before Bed',
    description: 'Light stretching, meditation, or reading to prepare the body and mind for restful sleep.',
    duration: '20-30 minutes',
    difficulty: 'Easy',
    category: 'Sleep',
    recommendedFor: ['Insomnia', 'Stress', 'Sleep Issues', 'Anxiety']
  },
  {
    id: 'sleep-3',
    title: 'CPAP Therapy Compliance',
    description: 'Proper use of CPAP equipment for sleep apnea treatment, including mask fitting and machine settings.',
    duration: 'Nightly use',
    difficulty: 'Moderate',
    category: 'Sleep',
    recommendedFor: ['Sleep Apnea', 'Hypoxia', 'Snoring', 'Poor Sleep Quality']
  },
  {
    id: 'sleep-4',
    title: 'Melatonin Regulation',
    description: 'Strategies to naturally support melatonin production through light exposure timing and dietary choices.',
    duration: 'Ongoing',
    difficulty: 'Easy',
    category: 'Sleep',
    recommendedFor: ['Insomnia', 'Jet Lag', 'Irregular Sleep Schedule']
  },
  {
    id: 'mental-1',
    title: 'Mindfulness Meditation',
    description: 'Practicing present-moment awareness through focused attention to reduce stress and improve mental clarity.',
    duration: '10-30 minutes',
    difficulty: 'Easy',
    category: 'Mental Health',
    recommendedFor: ['Stress', 'Anxiety', 'Depression', 'High Blood Pressure']
  },
  {
    id: 'mental-2',
    title: 'Cognitive Behavioral Therapy (CBT) Techniques',
    description: 'Identifying and changing negative thought patterns to improve emotional well-being and stress management.',
    duration: 'Varies',
    difficulty: 'Moderate',
    category: 'Mental Health',
    recommendedFor: ['Anxiety', 'Depression', 'Stress', 'Insomnia']
  },
  {
    id: 'mental-3',
    title: 'Journaling and Gratitude Practice',
    description: 'Daily writing exercises to process emotions, identify triggers, and cultivate positive outlook.',
    duration: '10-15 minutes',
    difficulty: 'Easy',
    category: 'Mental Health',
    recommendedFor: ['Stress', 'Anxiety', 'Depression', 'Emotional Regulation']
  },
  {
    id: 'mental-4',
    title: 'Yoga Nidra',
    description: 'Guided meditation that promotes deep relaxation and restful sleep while maintaining awareness.',
    duration: '30-45 minutes',
    difficulty: 'Easy',
    category: 'Mental Health',
    recommendedFor: ['Stress', 'Insomnia', 'Anxiety', 'Chronic Pain']
  },
  {
    id: 'mental-5',
    title: 'Stress Management Through HRV',
    description: 'Biofeedback training to increase heart rate variability, improving stress resilience and emotional regulation.',
    duration: '15-20 minutes',
    difficulty: 'Moderate',
    category: 'Mental Health',
    recommendedFor: ['Stress', 'Anxiety', 'High Blood Pressure', 'Tachycardia']
  }
]

export const getPracticesByCategory = (category: PracticeCategory): HealthPractice[] => {
  return HEALTH_PRACTICES.filter(practice => practice.category === category)
}

export const getPracticesForCondition = (condition: string): HealthPractice[] => {
  return HEALTH_PRACTICES.filter(practice => 
    practice.recommendedFor.some(rec => rec.toLowerCase().includes(condition.toLowerCase()))
  )
}

export const getCategories = (): PracticeCategory[] => {
  return ['Cardiovascular', 'Respiratory', 'Metabolic', 'Sleep', 'Mental Health']
}
