// Health monitoring types and interfaces
export interface Patient {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  room?: string
  status: 'stable' | 'warning' | 'critical' | 'offline'
  riskScore: number
  lastUpdate: Date
  doctor: string
  devices: Device[]
  vitals: VitalReading[]
  healthScoreHistory: { date: string; score: number }[]
  conditions: string[]
}

export interface Device {
  id: string
  patientId: string
  name: string
  type: 'heart_rate' | 'spo2' | 'temperature' | 'blood_pressure' | 'ecg' | 'activity' | 'blood_glucose' | 'respiratory_rate' | 'bmi' | 'hydration' | 'stress' | 'sleep' | 'calories'
  serialNumber: string
  isActive: boolean
  lastSyncedAt: Date
  batteryLevel?: number
}

export interface VitalReading {
  id: string
  patientId: string
  deviceId: string
  type: Device['type']
  value: number
  unit: string
  timestamp: Date
  isNormal: boolean
}

export interface Alert {
  id: string
  patientId: string
  patientName: string
  type: 'vital_out_of_range' | 'device_offline' | 'missed_reading' | 'critical_trend'
  severity: 'low' | 'medium' | 'high' | 'critical'
  tier: 1 | 2 | 3 // 1: Nurse, 2: Doctor, 3: Emergency
  escalationTimer?: number // timestamp when it auto-escalates
  message: string
  vitalType?: Device['type']
  currentValue?: number
  threshold?: number
  isResolved: boolean
  createdAt: Date
  resolvedAt?: Date
  resolvedBy?: string
}

export interface Thresholds {
  heartRate: { min: number; max: number }
  spo2: { min: number }
  temperature: { max: number }
  bloodPressure: { systolic: { max: number }; diastolic: { max: number } }
}

export interface RiskLevel {
  score: number
  level: 'stable' | 'observe' | 'warning' | 'critical'
  color: string
  description: string
}

// Mock data generators
export const generateMockPatient = (id: string): Patient => ({
  id,
  name: `Patient ${id}`,
  age: Math.floor(Math.random() * 80) + 20,
  gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)] as Patient['gender'],
  room: `Room ${Math.floor(Math.random() * 200) + 100}`,
  status: ['stable', 'warning', 'critical'][Math.floor(Math.random() * 3)] as Patient['status'],
  riskScore: Math.floor(Math.random() * 100),
  lastUpdate: new Date(),
  doctor: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'][Math.floor(Math.random() * 3)],
  devices: [],
  vitals: [],
  conditions: [],
  healthScoreHistory: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    score: Math.floor(Math.random() * 100)
  }))
})

export const generateMockVitalReading = (
  patientId: string,
  deviceId: string,
  type: Device['type']
): VitalReading => {
  const ranges = {
    heart_rate: { min: 60, max: 100, unit: 'bpm' },
    spo2: { min: 95, max: 100, unit: '%' },
    temperature: { min: 36.1, max: 37.2, unit: '°C' },
    blood_pressure: { min: 110, max: 140, unit: 'mmHg' },
    ecg: { min: 60, max: 100, unit: 'bpm' },
    activity: { min: 0, max: 100, unit: 'steps/min' },
    blood_glucose: { min: 70, max: 140, unit: 'mg/dL' },
    respiratory_rate: { min: 12, max: 20, unit: 'breaths/min' },
    bmi: { min: 18.5, max: 25, unit: 'kg/m²' },
    hydration: { min: 0, max: 100, unit: '%' },
    stress: { min: 0, max: 100, unit: 'index' },
    sleep: { min: 0, max: 100, unit: 'score' },
    calories: { min: 0, max: 3000, unit: 'kcal' }
  }

  const range = ranges[type] || { min: 0, max: 100, unit: 'units' }
  const value = Math.random() * (range.max - range.min) + range.min
  
  // Add some abnormal readings occasionally
  const isAbnormal = Math.random() < 0.1
  const finalValue = isAbnormal ? value * (Math.random() < 0.5 ? 0.7 : 1.3) : value

  return {
    id: `${Date.now()}-${Math.random()}`,
    patientId,
    deviceId,
    type,
    value: Math.round(finalValue * 10) / 10,
    unit: range.unit,
    timestamp: new Date(),
    isNormal: !isAbnormal
  }
}

export const generateMockAlert = (patientId: string, patientName: string): Alert => {
  const types: Alert['type'][] = ['vital_out_of_range', 'device_offline', 'missed_reading', 'critical_trend']
  const severities: Alert['severity'][] = ['low', 'medium', 'high', 'critical']
  const tiers: Alert['tier'][] = [1, 2, 3]
  
  return {
    id: `alert-${Date.now()}-${Math.random()}`,
    patientId,
    patientName,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    tier: tiers[Math.floor(Math.random() * tiers.length)],
    message: `Alert for patient ${patientName}`,
    isResolved: Math.random() < 0.3,
    createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
  }
}

// Health thresholds
export const HEALTH_THRESHOLDS: Thresholds = {
  heartRate: { min: 60, max: 100 },
  spo2: { min: 95 },
  temperature: { max: 37.5 },
  bloodPressure: { systolic: { max: 140 }, diastolic: { max: 90 } }
}

export const VITAL_CONFIGS: Record<Device['type'], { label: string; unit: string; color: string }> = {
  heart_rate: { label: 'Heart Rate', unit: 'bpm', color: '#f43f5e' },
  spo2: { label: 'SpO2', unit: '%', color: '#0ea5e9' },
  temperature: { label: 'Body Temp', unit: '°C', color: '#f59e0b' },
  blood_pressure: { label: 'Blood Pressure', unit: 'mmHg', color: '#6366f1' },
  ecg: { label: 'ECG', unit: 'bpm', color: '#ec4899' },
  activity: { label: 'Activity', unit: 'steps/min', color: '#10b981' },
  blood_glucose: { label: 'Blood Glucose', unit: 'mg/dL', color: '#f97316' },
  respiratory_rate: { label: 'Respiratory Rate', unit: 'breaths/min', color: '#8b5cf6' },
  bmi: { label: 'BMI', unit: 'kg/m²', color: '#64748b' },
  hydration: { label: 'Hydration', unit: '%', color: '#3b82f6' },
  stress: { label: 'Stress Level', unit: 'index', color: '#ef4444' },
  sleep: { label: 'Sleep Quality', unit: 'score', color: '#4338ca' },
  calories: { label: 'Caloric Burn', unit: 'kcal', color: '#f43f5e' }
}

// Risk level calculation
export const calculateRiskLevel = (patient: Patient): RiskLevel => {
  const { riskScore } = patient
  
  if (riskScore <= 25) {
    return { score: riskScore, level: 'stable', color: 'green', description: 'Patient is stable' }
  } else if (riskScore <= 50) {
    return { score: riskScore, level: 'observe', color: 'yellow', description: 'Monitor patient closely' }
  } else if (riskScore <= 75) {
    return { score: riskScore, level: 'warning', color: 'orange', description: 'Warning: Review patient status' }
  } else {
    return { score: riskScore, level: 'critical', color: 'red', description: 'Critical: Immediate attention required' }
  }
}
