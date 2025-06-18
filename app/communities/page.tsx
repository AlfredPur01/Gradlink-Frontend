"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Plus, Search, Hash, Crown, MessageCircle, Settings, UserPlus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const mockCommunities = [
  {
    id: 1,
    name: "UNILAG Computer Science Alumni",
    description: "Connect with fellow Computer Science graduates from University of Lagos",
    members: 245,
    category: "Academic",
    isJoined: true,
    isAdmin: false,
    lastActivity: "2 hours ago",
    avatar: "/placeholder.svg",
    recentPosts: 12,
  },
  {
    id: 2,
    name: "Lagos Tech Professionals",
    description: "Networking group for tech professionals in Lagos",
    members: 189,
    category: "Professional",
    isJoined: true,
    isAdmin: true,
    lastActivity: "30 minutes ago",
    avatar: "/placeholder.svg",
    recentPosts: 8,
  },
  {
    id: 3,
    name: "Class of 2020 Reunion",
    description: "Planning committee for the 2020 graduation class reunion",
    members: 67,
    category: "Social",
    isJoined: false,
    isAdmin: false,
    lastActivity: "1 day ago",
    avatar: "/placeholder.svg",
    recentPosts: 5,
  },
  {
    id: 4,
    name: "Engineering Alumni Network",
    description: "Professional network for engineering graduates",
    members: 156,
    category: "Professional",
    isJoined: false,
    isAdmin: false,
    lastActivity: "3 hours ago",
    avatar: "/placeholder.svg",
    recentPosts: 15,
  },
  {
    id: 5,
    name: "Medical School Alumni",
    description: "Connect with medical professionals and share opportunities",
    members: 98,
    category: "Academic",
    isJoined: true,
    isAdmin: false,
    lastActivity: "5 hours ago",
    avatar: "/placeholder.svg",
    recentPosts: 7,
  },
]

const categories = ["All", "Academic", "Professional", "Social", "Regional"]

export default function CommunitiesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState<"discover" | "my-groups">("discover")

  const filteredCommunities = mockCommunities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || community.category === selectedCategory
    const matchesTab = activeTab === "discover" || (activeTab === "my-groups" && community.isJoined)

    return matchesSearch && matchesCategory && matchesTab
  })

  const handleJoinGroup = (groupId: number) => {
    // In a real app, this would make an API call
    console.log(`Joining group ${groupId}`)
  }

  const handleLeaveGroup = (groupId: number) => {
    // In a real app, this would make an API call
    console.log(`Leaving group ${groupId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Communities</h1>
                <p className="text-gray-600">Connect with alumni groups and professional networks</p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Community
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
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search communities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex mt-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("discover")}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "discover"
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Discover
                  </button>
                  <button
                    onClick={() => setActiveTab("my-groups")}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "my-groups"
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    My Groups ({mockCommunities.filter((c) => c.isJoined).length})
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Communities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCommunities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={community.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            <Hash className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{community.category}</Badge>
                            {community.isAdmin && (
                              <Badge variant="default" className="bg-yellow-500">
                                <Crown className="h-3 w-3 mr-1" />
                                Admin
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{community.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{community.members}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{community.recentPosts}</span>
                        </div>
                      </div>
                      <span>Active {community.lastActivity}</span>
                    </div>

                    <div className="flex space-x-2">
                      {community.isJoined ? (
                        <>
                          <Button asChild className="flex-1">
                            <Link href={`/chat?group=${community.id}`}>
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Chat
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {community.isAdmin && (
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <Button className="flex-1" onClick={() => handleJoinGroup(community.id)}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Join Group
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredCommunities.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No communities found</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === "my-groups"
                  ? "You haven't joined any communities yet."
                  : "Try adjusting your search or filters."}
              </p>
              {activeTab === "my-groups" && (
                <Button onClick={() => setActiveTab("discover")}>Discover Communities</Button>
              )}
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
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{mockCommunities.length}</div>
                    <div className="text-sm text-gray-600">Total Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockCommunities.filter((c) => c.isJoined).length}
                    </div>
                    <div className="text-sm text-gray-600">Joined Groups</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mockCommunities.reduce((sum, c) => sum + c.members, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {mockCommunities.filter((c) => c.isAdmin).length}
                    </div>
                    <div className="text-sm text-gray-600">Admin Roles</div>
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
