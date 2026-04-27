
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: string
  email: string
  name: string
  organization?: string
  role: 'doctor' | 'nurse' | 'admin' | 'staff'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginWithOAuth: (token: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  organization: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('user')
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    
    if (isLoggedIn && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user data:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('isLoggedIn')
      }
    }
    
    setIsLoading(false)
  }, [])

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Password strength validation
      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
      }
      
      const hasUpper = /[A-Z]/.test(userData.password)
      const hasLower = /[a-z]/.test(userData.password)
      const hasNumber = /[0-9]/.test(userData.password)
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(userData.password)
      
      if (!(hasUpper && hasLower && hasNumber && hasSpecial)) {
        throw new Error('Password must contain uppercase, lowercase, number, and special character')
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      if (existingUsers.some((u: any) => u.email === userData.email)) {
        throw new Error('User with this email already exists')
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newUserRecord = {
        email: userData.email,
        password: userData.password, // In real app, this would be hashed
        name: `${userData.firstName} ${userData.lastName}`,
        organization: userData.organization
      }
      
      existingUsers.push(newUserRecord)
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))

      const newUser: User = {
        id: 'user_' + Date.now(),
        email: userData.email,
        name: newUserRecord.name,
        organization: userData.organization,
        role: 'doctor'
      }
      
      setUser(newUser)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('userEmail', userData.email)
      
      return true
    } catch (error: any) {
      console.error('Signup failed:', error.message)
      throw error // Re-throw to handle in UI
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const userRecord = registeredUsers.find((u: any) => u.email === email && u.password === password)
      
      if (userRecord) {
        const userData: User = {
          id: 'user_' + Date.now(),
          email: userRecord.email,
          name: userRecord.name,
          organization: userRecord.organization,
          role: 'doctor'
        }
        
        setUser(userData)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('userEmail', email)
        
        return true
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (error: any) {
      console.error('Login failed:', error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithOAuth = async (token: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Decode the Google ID token to get user info
      const decoded: any = jwtDecode(token)
      
      const userData: User = {
        id: `user_google_${decoded.sub}`,
        email: decoded.email,
        name: decoded.name,
        organization: 'Google Authenticated User',
        role: 'doctor'
      }
      
      setUser(userData)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('userEmail', userData.email)
      localStorage.setItem('userName', userData.name)
      
      return true
    } catch (error) {
      console.error('Real OAuth login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    localStorage.removeItem('userOrganization')
  }

  const value: AuthContextType = {
    user,
    login,
    loginWithOAuth,
    signup,
    logout,
    isLoading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
