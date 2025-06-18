"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Plus, Search, Video, CheckCircle, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

const mockEvents = [
  {
    id: 1,
    title: "Tech Alumni Networking Night",
    description: "Join fellow tech alumni for an evening of networking, sharing experiences, and building connections.",
    date: "2024-12-25",
    time: "6:00 PM",
    location: "Lagos Continental Hotel",
    type: "in-person",
    category: "Networking",
    organizer: "UNILAG CS Alumni",
    attendees: 89,
    maxAttendees: 150,
    price: "Free",
    status: "upcoming",
    isRegistered: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Career Development Workshop",
    description: "Learn essential skills for career advancement in the modern workplace.",
    date: "2024-12-30",
    time: "2:00 PM",
    location: "Virtual Event",
    type: "virtual",
    category: "Professional Development",
    organizer: "Lagos Tech Professionals",
    attendees: 156,
    maxAttendees: 200,
    price: "₦5,000",
    status: "upcoming",
    isRegistered: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Alumni Homecoming 2024",
    description: "Annual homecoming celebration with activities, awards, and reconnections.",
    date: "2025-01-15",
    time: "10:00 AM",
    location: "University of Lagos",
    type: "in-person",
    category: "Social",
    organizer: "University of Lagos",
    attendees: 245,
    maxAttendees: 500,
    price: "₦10,000",
    status: "upcoming",
    isRegistered: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Entrepreneurship Masterclass",
    description: "Learn from successful alumni entrepreneurs about starting and scaling businesses.",
    date: "2024-12-20",
    time: "4:00 PM",
    location: "Virtual Event",
    type: "virtual",
    category: "Business",
    organizer: "Business Alumni Network",
    attendees: 78,
    maxAttendees: 100,
    price: "₦15,000",
    status: "completed",
    isRegistered: true,
    image: "/placeholder.svg?height=200&width=400",
  },
]

const categories = ["All", "Networking", "Professional Development", "Social", "Business", "Academic"]
const eventTypes = ["All", "In-Person", "Virtual", "Hybrid"]

export default function EventsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [activeTab, setActiveTab] = useState<"all" | "registered" | "past">("all")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesType =
      selectedType === "All" ||
      (selectedType === "In-Person" && event.type === "in-person") ||
      (selectedType === "Virtual" && event.type === "virtual") ||
      (selectedType === "Hybrid" && event.type === "hybrid")

    let matchesTab = true
    if (activeTab === "registered") {
      matchesTab = event.isRegistered
    } else if (activeTab === "past") {
      matchesTab = event.status === "completed"
    }

    return matchesSearch && matchesCategory && matchesType && matchesTab
  })

  const handleRegister = (eventId: number) => {
    console.log(`Registering for event ${eventId}`)
  }

  const handleUnregister = (eventId: number) => {
    console.log(`Unregistering from event ${eventId}`)
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
                <p className="text-gray-600">
                  Discover and join alumni events, workshops, and networking opportunities
                </p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "all"
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    All Events
                  </button>
                  <button
                    onClick={() => setActiveTab("registered")}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "registered"
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    My Events ({mockEvents.filter((e) => e.isRegistered).length})
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "past"
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Past Events
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={event.type === "virtual" ? "secondary" : "default"}>
                        {event.type === "virtual" ? (
                          <>
                            <Video className="h-3 w-3 mr-1" />
                            Virtual
                          </>
                        ) : (
                          <>
                            <MapPin className="h-3 w-3 mr-1" />
                            In-Person
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white">
                        {event.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                        <p className="text-gray-600 text-sm mb-3">{event.description}</p>

                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>
                              {event.attendees}/{event.maxAttendees} attendees
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">By {event.organizer}</span>
                      </div>
                      <div className="text-lg font-semibold text-green-600">{event.price}</div>
                    </div>

                    <div className="flex space-x-2">
                      {event.status === "completed" ? (
                        <Button variant="outline" className="flex-1" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </Button>
                      ) : event.isRegistered ? (
                        <>
                          <Button variant="outline" className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Registered
                          </Button>
                          {event.type === "virtual" && (
                            <Button asChild>
                              <Link href={`/video?event=${event.id}`}>
                                <Video className="h-4 w-4 mr-2" />
                                Join
                              </Link>
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button className="flex-1" onClick={() => handleRegister(event.id)}>
                          Register Now
                        </Button>
                      )}

                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Progress bar for attendance */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Attendance</span>
                        <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters to find events.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSelectedType("All")
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mockEvents.filter((e) => e.status === "upcoming").length}
                    </div>
                    <div className="text-sm text-gray-600">Upcoming Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockEvents.filter((e) => e.isRegistered).length}
                    </div>
                    <div className="text-sm text-gray-600">Registered Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {mockEvents.reduce((sum, e) => sum + e.attendees, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Attendees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {mockEvents.filter((e) => e.type === "virtual").length}
                    </div>
                    <div className="text-sm text-gray-600">Virtual Events</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
