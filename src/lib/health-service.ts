'use client'

import { useState, useEffect, useCallback } from 'react'
import { Patient, Alert, VitalReading, Device, generateMockVitalReading, generateMockAlert, HEALTH_THRESHOLDS } from './health-types'

// Mock data store
class MockHealthService {
  private patients: Patient[] = []
  private alerts: Alert[] = []
  private devices: Device[] = []
  private vitalReadings: VitalReading[] = []
  private listeners: (() => void)[] = []

  constructor() {
    this.initializeMockData()
    this.startSimulation()
  }

  private initializeMockData() {
    // Create mock patients
    for (let i = 1; i <= 10; i++) {
      const patient: Patient = {
        id: `patient-${i}`,
        name: `Patient ${i}`,
        age: Math.floor(Math.random() * 60) + 25,
        gender: ['male', 'female'][Math.floor(Math.random() * 2)] as 'male' | 'female',
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
      }
      this.patients.push(patient)
    }

    // Create mock devices and seed initial readings
    this.patients.forEach(patient => {
      const deviceTypes: Device['type'][] = [
        'heart_rate', 'spo2', 'temperature', 'blood_pressure', 'ecg', 
        'blood_glucose', 'respiratory_rate', 'bmi', 'hydration', 'stress', 'sleep', 'calories'
      ]
      deviceTypes.forEach(type => {
        const device: Device = {
          id: `device-${patient.id}-${type}`,
          patientId: patient.id,
          name: `${type.replace('_', ' ')} monitor`,
          type,
          serialNumber: `SN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          isActive: true, // Start with all devices active for better demo
          lastSyncedAt: new Date(Date.now() - Math.random() * 60000),
          batteryLevel: Math.floor(Math.random() * 100)
        }
        this.devices.push(device)

        // Seed 5-10 initial readings for EACH parameter
        const numReadings = Math.floor(Math.random() * 5) + 5
        for (let j = 0; j < numReadings; j++) {
          const reading = generateMockVitalReading(patient.id, device.id, type)
          // Set cumulative timestamps in the past
          reading.timestamp = new Date(Date.now() - (j * 5 * 60 * 1000))
          this.vitalReadings.push(reading)
        }
      })
    })

    // Create initial alerts
    for (let i = 0; i < 5; i++) {
      const patient = this.patients[Math.floor(Math.random() * this.patients.length)]
      const alert = generateMockAlert(patient.id, patient.name)
      this.alerts.push(alert)
    }
  }

  private startSimulation() {
    // Simulate vital readings every 3-5 seconds
    setInterval(() => {
      this.generateRandomVitalReading()
    }, 3000 + Math.random() * 2000)

    // Simulate alerts occasionally
    setInterval(() => {
      if (Math.random() < 0.3) {
        this.generateRandomAlert()
      }
    }, 10000)

    // Update device status occasionally
    setInterval(() => {
      this.updateDeviceStatus()
    }, 15000)

    // Update patient risk scores
    setInterval(() => {
      this.updatePatientRiskScores()
    }, 20000)
  }

  private generateRandomVitalReading() {
    const patient = this.patients[Math.floor(Math.random() * this.patients.length)]
    const deviceTypes: Device['type'][] = [
      'heart_rate', 'spo2', 'temperature', 'blood_pressure', 'ecg',
      'blood_glucose', 'respiratory_rate', 'bmi', 'hydration', 'stress', 'sleep', 'calories'
    ]
    const type = deviceTypes[Math.floor(Math.random() * deviceTypes.length)]
    const device = this.devices.find(d => d.patientId === patient.id && d.type === type && d.isActive)
    
    if (device) {
      const reading = generateMockVitalReading(patient.id, device.id, type)
      this.vitalReadings.unshift(reading)
      
      // Keep only last 100 readings per patient
      this.vitalReadings = this.vitalReadings.filter(r => 
        r.patientId !== patient.id || this.vitalReadings.filter(v => v.patientId === patient.id).indexOf(r) < 100
      )

      // Check for alerts
      this.checkVitalThresholds(patient, reading)
      
      // Update patient last update
      patient.lastUpdate = new Date()
      patient.vitals = [reading, ...patient.vitals.slice(0, 9)] // Keep last 10 readings
      
      this.notifyListeners()
    }
  }

  private checkVitalThresholds(patient: Patient, reading: VitalReading) {
    let shouldAlert = false
    let message = ''
    let tier: 1 | 2 | 3 = 1

    switch (reading.type) {
      case 'heart_rate':
        if (reading.value < HEALTH_THRESHOLDS.heartRate.min || reading.value > HEALTH_THRESHOLDS.heartRate.max) {
          shouldAlert = true
          message = `Heart rate ${reading.value} ${reading.unit} is out of normal range`
          tier = reading.value > 140 || reading.value < 40 ? 3 : (reading.value > 120 || reading.value < 50 ? 2 : 1)
        }
        break
      case 'spo2':
        if (reading.value < HEALTH_THRESHOLDS.spo2.min) {
          shouldAlert = true
          message = `SpO2 ${reading.value} ${reading.unit} is below threshold`
          tier = reading.value < 85 ? 3 : (reading.value < 90 ? 2 : 1)
        }
        break
      case 'blood_glucose':
        if (reading.value > 200 || reading.value < 60) {
          shouldAlert = true
          message = `Blood glucose ${reading.value} ${reading.unit} is critical`
          tier = reading.value > 300 || reading.value < 50 ? 3 : 2
        }
        break
    }

    if (shouldAlert && Math.random() < 0.7) {
      const alert: Alert = {
        id: `alert-${Date.now()}`,
        patientId: patient.id,
        patientName: patient.name,
        type: 'vital_out_of_range',
        severity: tier === 3 ? 'critical' : (tier === 2 ? 'high' : 'medium'),
        tier,
        escalationTimer: Date.now() + (5 * 60 * 1000), // Escalate in 5 mins
        message,
        vitalType: reading.type,
        currentValue: reading.value,
        threshold: HEALTH_THRESHOLDS[reading.type as keyof typeof HEALTH_THRESHOLDS] as any,
        isResolved: false,
        createdAt: new Date()
      }
      this.alerts.unshift(alert)
      this.updatePatientConditions(patient)
    }
  }

  private updatePatientConditions(patient: Patient) {
    const conditions = new Set<string>()
    const recentVitals = patient.vitals.slice(0, 5)
    
    recentVitals.forEach(v => {
      if (v.type === 'heart_rate' && v.value > 100) conditions.add('Tachycardia')
      if (v.type === 'heart_rate' && v.value < 60) conditions.add('Bradycardia')
      if (v.type === 'spo2' && v.value < 94) conditions.add('Hypoxia')
      if (v.type === 'blood_glucose' && v.value > 140) conditions.add('Hyperglycemia')
      if (v.type === 'blood_glucose' && v.value < 70) conditions.add('Hypoglycemia')
      if (v.type === 'temperature' && v.value > 38) conditions.add('Fever')
    })

    patient.conditions = Array.from(conditions)
  }

  private calculateAlertSeverity(reading: VitalReading): Alert['severity'] {
    const deviation = Math.abs(reading.value - (reading.isNormal ? 75 : 50)) // Rough baseline
    if (deviation > 30) return 'critical'
    if (deviation > 20) return 'high'
    if (deviation > 10) return 'medium'
    return 'low'
  }

  private generateRandomAlert() {
    const patient = this.patients[Math.floor(Math.random() * this.patients.length)]
    const alert = generateMockAlert(patient.id, patient.name)
    this.alerts.unshift(alert)
    this.notifyListeners()
  }

  private updateDeviceStatus() {
    this.devices.forEach(device => {
      if (Math.random() < 0.1) { // 10% chance to change status
        device.isActive = !device.isActive
        if (!device.isActive) {
          // Create device offline alert
          const alert: Alert = {
            id: `alert-device-${device.id}-${Date.now()}`,
            patientId: device.patientId,
            patientName: this.patients.find(p => p.id === device.patientId)?.name || 'Unknown',
            type: 'device_offline',
            severity: 'medium',
            tier: 1,
            message: `${device.name} is offline`,
            isResolved: false,
            createdAt: new Date()
          }
          this.alerts.unshift(alert)
        }
      }
      if (device.batteryLevel !== undefined) {
        device.batteryLevel = Math.max(0, device.batteryLevel - Math.random() * 5)
      }
    })
    this.notifyListeners()
  }

  private updatePatientRiskScores() {
    this.patients.forEach(patient => {
      const recentAlerts = this.alerts.filter(a => 
        a.patientId === patient.id && 
        a.createdAt > new Date(Date.now() - 60 * 60 * 1000) // Last hour
      )
      
      const abnormalReadings = patient.vitals.filter(v => !v.isNormal).length
      const riskIncrease = (recentAlerts.length * 10) + (abnormalReadings * 5)
      patient.riskScore = Math.min(100, patient.riskScore + riskIncrease + (Math.random() * 10 - 5))
      
      // Update status based on risk score
      if (patient.riskScore > 75) {
        patient.status = 'critical'
      } else if (patient.riskScore > 50) {
        patient.status = 'warning'
      } else {
        patient.status = 'stable'
      }
    })
    this.notifyListeners()
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener())
  }

  // Public API
  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  getPatients(): Patient[] {
    return this.patients
  }

  getPatient(id: string): Patient | undefined {
    return this.patients.find(p => p.id === id)
  }

  getAlerts(): Alert[] {
    return this.alerts
  }

  getUnresolvedAlerts(): Alert[] {
    return this.alerts.filter(a => !a.isResolved)
  }

  resolveAlert(alertId: string, resolvedBy: string) {
    const alert = this.alerts.find(a => a.id === alertId)
    if (alert) {
      alert.isResolved = true
      alert.resolvedAt = new Date()
      alert.resolvedBy = resolvedBy
      this.notifyListeners()
    }
  }

  getVitalReadings(patientId: string, limit = 50): VitalReading[] {
    return this.vitalReadings
      .filter(r => r.patientId === patientId)
      .slice(0, limit)
  }

  getPatientDevices(patientId: string): Device[] {
    return this.devices.filter(d => d.patientId === patientId)
  }

  addPatient(patient: Omit<Patient, 'id' | 'devices' | 'vitals' | 'lastUpdate'>, initialVitals?: { type: Device['type']; value: number }[]) {
    const newPatientID = `patient-${Date.now()}`
    const newPatient: Patient = {
      ...patient,
      id: newPatientID,
      lastUpdate: new Date(),
      devices: [],
      vitals: [],
      healthScoreHistory: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: Math.floor(Math.random() * 20) + (patient.riskScore || 50) - 10
      }))
    }

    // Auto-create devices for the new patient and add initial vitals if provided
    const deviceTypes: Device['type'][] = [
      'heart_rate', 'spo2', 'temperature', 'blood_pressure', 'ecg'
    ]

    deviceTypes.forEach(type => {
      const device: Device = {
        id: `device-${newPatientID}-${type}`,
        patientId: newPatientID,
        name: `${type.replace('_', ' ')} monitor`,
        type,
        serialNumber: `SN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        isActive: true,
        lastSyncedAt: new Date(),
        batteryLevel: 100
      }
      this.devices.push(device)

      // Add initial reading if provided, otherwise generate a normal-ish one
      const initial = initialVitals?.find(v => v.type === type)
      if (initial) {
        const reading: VitalReading = {
          id: `reading-${Date.now()}-${type}`,
          patientId: newPatientID,
          deviceId: device.id,
          type: type,
          value: initial.value,
          unit: type === 'heart_rate' ? 'bpm' : type === 'spo2' ? '%' : type === 'temperature' ? '°C' : 'mmHg',
          timestamp: new Date(),
          isNormal: true // Simplified for now
        }
        newPatient.vitals.push(reading)
        this.vitalReadings.push(reading)
      }
    })

    this.patients.unshift(newPatient)
    this.notifyListeners()
    return newPatient
  }

  dischargePatient(patientId: string) {
    this.patients = this.patients.filter(p => p.id !== patientId)
    // Also remove alerts and readings
    this.alerts = this.alerts.filter(a => a.patientId !== patientId)
    this.vitalReadings = this.vitalReadings.filter(r => r.patientId !== patientId)
    this.devices = this.devices.filter(d => d.patientId !== patientId)
    this.notifyListeners()
  }

  informDoctor(patientId: string, message: string) {
    const patient = this.getPatient(patientId)
    if (patient) {
      const alert: Alert = {
        id: `alert-doctor-notified-${Date.now()}`,
        patientId,
        patientName: patient.name,
        type: 'critical_trend',
        severity: 'critical',
        tier: 2,
        message: `DOCTOR NOTIFIED: ${message}`,
        isResolved: false,
        createdAt: new Date()
      }
      this.alerts.unshift(alert)
      this.notifyListeners()
    }
  }
}

// Singleton instance
export const healthService = new MockHealthService()

// React hook for using the service
export function useHealthService() {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const unsubscribe = healthService.subscribe(() => {
      forceUpdate({})
    })
    return unsubscribe
  }, [])

  return {
    patients: healthService.getPatients(),
    alerts: healthService.getAlerts(),
    unresolvedAlerts: healthService.getUnresolvedAlerts(),
    getPatient: healthService.getPatient.bind(healthService),
    resolveAlert: healthService.resolveAlert.bind(healthService),
    getVitalReadings: healthService.getVitalReadings.bind(healthService),
    getPatientDevices: healthService.getPatientDevices.bind(healthService),
    addPatient: healthService.addPatient.bind(healthService),
    dischargePatient: healthService.dischargePatient.bind(healthService),
    informDoctor: healthService.informDoctor.bind(healthService)
  }
}
