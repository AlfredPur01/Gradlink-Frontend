"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Users,
  Building,
  Calendar,
  MessageCircle,
  TrendingUp,
  Shield,
  AlertTriangle,
  BarChart3,
  UserCheck,
  UserX,
  Flag,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    institution: "University of Lagos",
    status: "active",
    joinDate: "2024-12-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    institution: "University of Ibadan",
    status: "pending",
    joinDate: "2024-12-15",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    institution: "Obafemi Awolowo University",
    status: "suspended",
    joinDate: "2024-11-20",
  },
]

const mockInstitutions = [
  { id: 1, name: "University of Lagos", alumni: 1250, status: "verified", admin: "admin@unilag.edu.ng" },
  { id: 2, name: "University of Ibadan", alumni: 980, status: "pending", admin: "admin@ui.edu.ng" },
  { id: 3, name: "Obafemi Awolowo University", alumni: 750, status: "verified", admin: "admin@oauife.edu.ng" },
]

const mockReports = [
  {
    id: 1,
    type: "spam",
    reporter: "John Doe",
    reported: "Spam User",
    reason: "Sending spam messages",
    status: "pending",
  },
  {
    id: 2,
    type: "harassment",
    reporter: "Jane Smith",
    reported: "Bad Actor",
    reason: "Inappropriate behavior",
    status: "resolved",
  },
  {
    id: 3,
    type: "fake_profile",
    reporter: "Mike Johnson",
    reported: "Fake Account",
    reason: "Using fake credentials",
    status: "investigating",
  },
]

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
            </div>
            <p className="text-gray-600">Manage users, institutions, and platform-wide settings</p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">15,420</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Institutions</p>
                    <p className="text-2xl font-bold text-gray-900">250</p>
                    <p className="text-xs text-green-600">+5% from last month</p>
                  </div>
                  <Building className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Events</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                    <p className="text-xs text-blue-600">+8% from last month</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-red-600">Needs attention</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Management */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Recent Users</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Manage All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.institution}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            user.status === "active"
                              ? "default"
                              : user.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {user.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <UserCheck className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <UserX className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Institution Management */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Institutions</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Manage All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockInstitutions.map((institution) => (
                    <div key={institution.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-sm">{institution.name}</p>
                        <p className="text-xs text-gray-600">{institution.alumni} alumni</p>
                        <p className="text-xs text-gray-500">{institution.admin}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={institution.status === "verified" ? "default" : "secondary"}>
                          {institution.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Reports & Moderation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Flag className="h-5 w-5" />
                    <span>Reports & Moderation</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-sm capitalize">{report.type.replace("_", " ")}</p>
                        <p className="text-xs text-gray-600">Reporter: {report.reporter}</p>
                        <p className="text-xs text-gray-500">{report.reason}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            report.status === "resolved"
                              ? "default"
                              : report.status === "pending"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {report.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Platform Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Platform Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">89%</p>
                      <p className="text-sm text-gray-600">User Engagement</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">1.2M</p>
                      <p className="text-sm text-gray-600">Messages Sent</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">456</p>
                      <p className="text-sm text-gray-600">Events Created</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">78%</p>
                      <p className="text-sm text-gray-600">Profile Completion</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Building className="h-6 w-6" />
                    <span className="text-sm">Add Institution</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-sm">Moderate Chats</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Settings className="h-6 w-6" />
                    <span className="text-sm">Platform Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
