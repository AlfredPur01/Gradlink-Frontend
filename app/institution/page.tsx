"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Users,
  UserCheck,
  Calendar,
  MessageSquare,
  TrendingUp,
  Building,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  X,
  BarChart3,
  Megaphone,
  Mail,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"

const mockAlumni = [
  {
    id: 1,
    name: "John Doe",
    course: "Computer Science",
    graduationYear: "2020",
    status: "verified",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    course: "Engineering",
    graduationYear: "2019",
    status: "pending",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Mike Johnson",
    course: "Medicine",
    graduationYear: "2021",
    status: "verified",
    email: "mike@example.com",
  },
  { id: 4, name: "Sarah Wilson", course: "Law", graduationYear: "2018", status: "pending", email: "sarah@example.com" },
]

const mockEvents = [
  { id: 1, title: "Alumni Homecoming 2024", date: "2024-12-30", attendees: 150, status: "upcoming" },
  { id: 2, title: "Career Fair", date: "2024-12-28", attendees: 89, status: "upcoming" },
  { id: 3, title: "Graduation Ceremony", date: "2024-12-20", attendees: 300, status: "completed" },
]

export default function InstitutionDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "institution")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading institution dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "institution") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
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
              <Building className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Institution Dashboard</h1>
            </div>
            <p className="text-gray-600">Manage your alumni network and institutional events</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Alumni</p>
                    <p className="text-2xl font-bold text-gray-900">1,250</p>
                    <p className="text-xs text-green-600">+15 this month</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Verified Alumni</p>
                    <p className="text-2xl font-bold text-gray-900">1,180</p>
                    <p className="text-xs text-blue-600">94% verified</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Events</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <p className="text-xs text-purple-600">2 upcoming</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-orange-600">Needs review</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Alumni Management */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Alumni Management</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAlumni.map((alumni) => (
                    <div key={alumni.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-sm">{alumni.name}</p>
                        <p className="text-xs text-gray-600">
                          {alumni.course} • Class of {alumni.graduationYear}
                        </p>
                        <p className="text-xs text-gray-500">{alumni.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={alumni.status === "verified" ? "default" : "secondary"}>{alumni.status}</Badge>
                        {alumni.status === "pending" && (
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Event Management */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Event Management</span>
                  </CardTitle>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Event
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-gray-600">{event.date}</p>
                        <p className="text-xs text-gray-500">{event.attendees} attendees</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Communication Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Megaphone className="h-5 w-5" />
                    <span>Communication Tools</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Announcement to All Alumni
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Create Alumni Newsletter
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Message Specific Groups
                  </Button>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Recent Announcements</p>
                    <div className="space-y-2">
                      <div className="p-2 bg-gray-50 rounded text-xs">
                        <p className="font-medium">Welcome New Alumni!</p>
                        <p className="text-gray-600">Sent 2 days ago • 1,180 recipients</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded text-xs">
                        <p className="font-medium">Homecoming Event Reminder</p>
                        <p className="text-gray-600">Sent 1 week ago • 1,250 recipients</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Alumni Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">85%</p>
                      <p className="text-sm text-gray-600">Active Rate</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">92%</p>
                      <p className="text-sm text-gray-600">Event Attendance</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Computer Science</span>
                      <span>320 alumni</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "32%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Engineering</span>
                      <span>280 alumni</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Medicine</span>
                      <span>250 alumni</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
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
                    <UserCheck className="h-6 w-6" />
                    <span className="text-sm">Approve Alumni</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Create Event</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Mail className="h-6 w-6" />
                    <span className="text-sm">Send Announcement</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">View Reports</span>
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
