"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Users,
  MessageCircle,
  AlertCircle,
  Bell,
  Video,
  UserPlus,
  TrendingUp,
  Award,
  Target,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

const mockEvents = [
  {
    id: 1,
    title: "Tech Alumni Networking",
    date: "2024-12-25",
    time: "6:00 PM",
    location: "Lagos",
    status: "registered",
  },
  {
    id: 2,
    title: "Career Development Workshop",
    date: "2024-12-30",
    time: "2:00 PM",
    location: "Virtual",
    status: "interested",
  },
]

const mockGroups = [
  {
    id: 1,
    name: "UNILAG Computer Science Alumni",
    members: 245,
    unreadMessages: 3,
  },
  {
    id: 2,
    name: "Lagos Tech Professionals",
    members: 189,
    unreadMessages: 0,
  },
]

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Profile verification approved",
      message: "Your profile has been verified successfully",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "New connection request",
      message: "John Doe wants to connect with you",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      title: "Event reminder",
      message: "Tech Alumni Networking starts in 2 days",
      time: "2 days ago",
      read: true,
    },
  ])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const profileCompletion = user.profileCompletion || 75

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Demo Mode Banner */}
          {user.isDemo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg flex items-center space-x-3"
            >
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-yellow-800 font-medium">You are in Demo Mode</p>
                <p className="text-yellow-700 text-sm">
                  Data will not be saved. Register for a real account to get started.
                </p>
              </div>
            </motion.div>
          )}

          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">Here's what's happening with your GradLink profile</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-blue-600" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <p className="text-gray-600">{user.email}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Verification Status</span>
                    <Badge variant={user.isDemo ? "secondary" : "default"} className="flex items-center space-x-1">
                      {user.isDemo ? (
                        <>
                          <Clock className="h-3 w-3" />
                          <span>Demo</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Verified</span>
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Profile Completion */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Completion</span>
                      <span>{profileCompletion}%</span>
                    </div>
                    <Progress value={profileCompletion} className="h-2" />
                    {profileCompletion < 100 && (
                      <p className="text-xs text-gray-500">Complete your profile to unlock all features</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span>{user.institution || "Institution not specified"}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <span>Software Engineer</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>Lagos, Nigeria</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Joined December 2024</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href="/profile">Edit Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">127</div>
                    <div className="text-sm text-gray-600">Connections</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-sm text-gray-600">Messages</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Events</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">2</div>
                    <div className="text-sm text-gray-600">Groups</div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                        <Link href="/chat">
                          <MessageCircle className="h-6 w-6" />
                          <span className="text-sm">Start Chat</span>
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                        <Link href="/events">
                          <Calendar className="h-6 w-6" />
                          <span className="text-sm">Browse Events</span>
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                        <Link href="/communities">
                          <Users className="h-6 w-6" />
                          <span className="text-sm">Join Groups</span>
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                        <Link href="/video">
                          <Video className="h-6 w-6" />
                          <span className="text-sm">Video Call</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Notifications */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Recent Notifications</span>
                      </CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/notifications">View All</Link>
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${notification.read ? "bg-gray-300" : "bg-blue-600"}`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* My Events */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>My Events</span>
                      </CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/events">View All</Link>
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs text-gray-600">
                              {event.date} at {event.time}
                            </p>
                            <p className="text-xs text-gray-500">{event.location}</p>
                          </div>
                          <Badge variant={event.status === "registered" ? "default" : "secondary"}>
                            {event.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* My Groups */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>My Groups</span>
                      </CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/communities">View All</Link>
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockGroups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <p className="font-medium text-sm">{group.name}</p>
                            <p className="text-xs text-gray-600">{group.members} members</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {group.unreadMessages > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {group.unreadMessages}
                              </Badge>
                            )}
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/chat?group=${group.id}`}>Chat</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Activity Feed */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>Recent Activity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <UserPlus className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm">
                            You connected with <strong>Sarah Johnson</strong>
                          </p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm">
                            You registered for <strong>Tech Alumni Networking</strong>
                          </p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm">
                            You joined <strong>UNILAG Computer Science Alumni</strong>
                          </p>
                          <p className="text-xs text-gray-500">3 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
