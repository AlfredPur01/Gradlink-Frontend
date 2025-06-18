"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  institution?: string
  profilePicture?: string
  isDemo?: boolean
  role: "user" | "institution" | "admin"
  profileCompletion?: number
  isOnline?: boolean
  lastSeen?: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginDemo: () => void
  logout: () => void
  register: (userData: any) => Promise<boolean>
  isLoading: boolean
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("gradlink_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "demo@gradlink.ng" && password === "password123") {
      const demoUser = {
        id: "demo-user",
        name: "Demo User",
        email: "demo@gradlink.ng",
        institution: "University of Lagos",
        isDemo: true,
        role: "user" as const,
        profileCompletion: 75,
        isOnline: true,
        lastSeen: new Date(),
      }
      setUser(demoUser)
      localStorage.setItem("gradlink_user", JSON.stringify(demoUser))
      setIsLoading(false)
      return true
    }

    // Admin demo login
    if (email === "admin@gradlink.ng" && password === "admin123") {
      const adminUser = {
        id: "admin-user",
        name: "Admin User",
        email: "admin@gradlink.ng",
        role: "admin" as const,
        profileCompletion: 100,
        isOnline: true,
        lastSeen: new Date(),
      }
      setUser(adminUser)
      localStorage.setItem("gradlink_user", JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    }

    // Institution demo login
    if (email === "institution@gradlink.ng" && password === "inst123") {
      const instUser = {
        id: "inst-user",
        name: "University of Lagos",
        email: "institution@gradlink.ng",
        institution: "University of Lagos",
        role: "institution" as const,
        profileCompletion: 90,
        isOnline: true,
        lastSeen: new Date(),
      }
      setUser(instUser)
      localStorage.setItem("gradlink_user", JSON.stringify(instUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const loginDemo = () => {
    const demoUser = {
      id: "demo-user",
      name: "Demo User",
      email: "demo@gradlink.ng",
      institution: "University of Lagos",
      isDemo: true,
      role: "user" as const,
      profileCompletion: 75,
      isOnline: true,
      lastSeen: new Date(),
    }
    setUser(demoUser)
    localStorage.setItem("gradlink_user", JSON.stringify(demoUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("gradlink_user")
  }

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newUser = {
      id: Date.now().toString(),
      name: userData.fullName,
      email: userData.email,
      institution: userData.institution,
      profilePicture: userData.profilePicture,
      role: "user" as const,
      profileCompletion: 60,
      isOnline: true,
      lastSeen: new Date(),
    }

    setUser(newUser)
    localStorage.setItem("gradlink_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("gradlink_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginDemo,
        logout,
        register,
        isLoading,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
