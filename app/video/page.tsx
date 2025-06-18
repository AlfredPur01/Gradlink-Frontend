"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Users,
  Share2,
  MessageCircle,
  Hand,
  MoreVertical,
  Monitor,
  Grid3X3,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mockParticipants = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg", isMuted: false, isVideoOn: true, isHost: true },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg", isMuted: true, isVideoOn: true, isHost: false },
  { id: 3, name: "Mike Johnson", avatar: "/placeholder.svg", isMuted: false, isVideoOn: false, isHost: false },
  { id: 4, name: "Sarah Wilson", avatar: "/placeholder.svg", isMuted: true, isVideoOn: true, isHost: false },
  { id: 5, name: "David Brown", avatar: "/placeholder.svg", isMuted: false, isVideoOn: true, isHost: false },
]

const mockChatMessages = [
  { id: 1, sender: "John Doe", message: "Welcome everyone to the alumni networking session!", time: "2:30 PM" },
  { id: 2, sender: "Jane Smith", message: "Thanks for organizing this!", time: "2:31 PM" },
  { id: 3, sender: "Mike Johnson", message: "Great to see familiar faces", time: "2:32 PM" },
]

export default function VideoConferencePage() {
  const { user } = useAuth()
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [viewMode, setViewMode] = useState<"gallery" | "speaker" | "grid">("gallery")
  const [isHandRaised, setIsHandRaised] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simulate getting user media
    if (videoRef.current && isVideoOn) {
      // In a real app, you would use getUserMedia here
      videoRef.current.src = "/placeholder.svg"
    }
  }, [isVideoOn])

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: user?.name || "You",
        message: chatMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  const handleLeaveCall = () => {
    // In a real app, this would disconnect from the video call
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">Tech Alumni Networking</h1>
              <Badge variant="secondary" className="bg-red-600 text-white">
                LIVE
              </Badge>
              <span className="text-sm text-gray-300">{mockParticipants.length} participants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === "gallery" ? "grid" : "gallery")}
                className="text-white hover:bg-gray-700"
              >
                {viewMode === "gallery" ? <Grid3X3 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowParticipants(!showParticipants)}
                className="text-white hover:bg-gray-700"
              >
                <Users className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(!showChat)}
                className="text-white hover:bg-gray-700"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Video Grid */}
          <div className="flex-1 p-4 bg-gray-900">
            {viewMode === "gallery" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                {mockParticipants.map((participant) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-gray-800 rounded-lg overflow-hidden"
                  >
                    {participant.isVideoOn ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                    )}

                    {/* Participant Info */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black bg-opacity-50 rounded px-2 py-1 flex items-center justify-between">
                        <span className="text-white text-sm font-medium">
                          {participant.name}
                          {participant.isHost && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Host
                            </Badge>
                          )}
                        </span>
                        <div className="flex items-center space-x-1">
                          {!participant.isMuted ? (
                            <Mic className="h-3 w-3 text-green-400" />
                          ) : (
                            <MicOff className="h-3 w-3 text-red-400" />
                          )}
                          {!participant.isVideoOn && <VideoOff className="h-3 w-3 text-red-400" />}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col">
                {/* Main Speaker */}
                <div className="flex-1 bg-gray-800 rounded-lg mb-4 relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-lg">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={mockParticipants[0].avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">{mockParticipants[0].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-black bg-opacity-50 rounded px-3 py-2">
                      <span className="text-white font-medium">{mockParticipants[0].name}</span>
                    </div>
                  </div>
                </div>

                {/* Participant Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto">
                  {mockParticipants.slice(1).map((participant) => (
                    <div key={participant.id} className="flex-shrink-0 w-24 h-16 bg-gray-800 rounded relative">
                      <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center rounded">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-gray-800 p-4 flex items-center justify-center space-x-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-full w-12 h-12"
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="lg"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className="rounded-full w-12 h-12"
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="lg"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className="rounded-full w-12 h-12"
            >
              <Monitor className="h-5 w-5" />
            </Button>

            <Button
              variant={isHandRaised ? "default" : "secondary"}
              size="lg"
              onClick={() => setIsHandRaised(!isHandRaised)}
              className="rounded-full w-12 h-12"
            >
              <Hand className="h-5 w-5" />
            </Button>

            <Button variant="secondary" size="lg" className="rounded-full w-12 h-12">
              <Share2 className="h-5 w-5" />
            </Button>

            <Button variant="secondary" size="lg" className="rounded-full w-12 h-12">
              <MoreVertical className="h-5 w-5" />
            </Button>

            <Button variant="destructive" size="lg" onClick={handleLeaveCall} className="rounded-full w-12 h-12">
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        {(showChat || showParticipants) && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-80 bg-white border-l border-gray-200 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant={showParticipants ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setShowParticipants(true)
                    setShowChat(false)
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Participants
                </Button>
                <Button
                  variant={showChat ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setShowChat(true)
                    setShowParticipants(false)
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowChat(false)
                  setShowParticipants(false)
                }}
              >
                ×
              </Button>
            </div>

            {/* Participants List */}
            {showParticipants && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {mockParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <Avatar>
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{participant.name}</span>
                          {participant.isHost && (
                            <Badge variant="secondary" className="text-xs">
                              Host
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          {!participant.isMuted ? (
                            <Mic className="h-3 w-3 text-green-500" />
                          ) : (
                            <MicOff className="h-3 w-3 text-red-500" />
                          )}
                          {!participant.isVideoOn && <VideoOff className="h-3 w-3 text-red-500" />}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat */}
            {showChat && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
