"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, Users, Hash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mockContacts = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "2:30 PM",
    unread: 2,
    online: true,
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Thanks for the help!",
    time: "1:15 PM",
    unread: 0,
    online: false,
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    lastMessage: "See you at the event",
    time: "12:45 PM",
    unread: 1,
    online: true,
    avatar: "/placeholder.svg",
  },
]

const mockGroups = [
  {
    id: 1,
    name: "UNILAG CS Alumni",
    lastMessage: "Sarah: Great networking event!",
    time: "3:00 PM",
    unread: 5,
    members: 245,
  },
  {
    id: 2,
    name: "Lagos Tech Professionals",
    lastMessage: "Mike: Job opening at my company",
    time: "11:30 AM",
    unread: 0,
    members: 189,
  },
  {
    id: 3,
    name: "Class of 2020",
    lastMessage: "John: Reunion planning meeting",
    time: "Yesterday",
    unread: 3,
    members: 67,
  },
]

const mockMessages = [
  { id: 1, sender: "John Doe", message: "Hey! How have you been?", time: "2:25 PM", isOwn: false },
  {
    id: 2,
    sender: "You",
    message: "I've been great! Just busy with work. How about you?",
    time: "2:27 PM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "John Doe",
    message: "Same here! Are you going to the alumni meetup next week?",
    time: "2:28 PM",
    isOwn: false,
  },
  { id: 4, sender: "You", message: "Yes, definitely! Looking forward to it.", time: "2:30 PM", isOwn: true },
  {
    id: 5,
    sender: "John Doe",
    message: "Awesome! It'll be great to catch up with everyone.",
    time: "2:32 PM",
    isOwn: false,
  },
]

export default function ChatPage() {
  const { user } = useAuth()
  const [selectedChat, setSelectedChat] = useState<any>(mockContacts[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"contacts" | "groups">("contacts")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate typing indicator and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const response = {
          id: messages.length + 2,
          sender: selectedChat.name,
          message: "Thanks for your message! I'll get back to you soon.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOwn: false,
        }
        setMessages((prev) => [...prev, response])
      }, 2000)
    }
  }

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredGroups = mockGroups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="pt-16 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === "contacts"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users className="inline-block w-4 h-4 mr-2" />
              Contacts
            </button>
            <button
              onClick={() => setActiveTab("groups")}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === "groups"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Hash className="inline-block w-4 h-4 mr-2" />
              Groups
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "contacts" ? (
              <div className="space-y-1 p-2">
                {filteredContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChat(contact)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChat?.id === contact.id ? "bg-blue-100 border border-blue-200" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                          <p className="text-xs text-gray-500">{contact.time}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                          {contact.unread > 0 && (
                            <Badge className="ml-2 bg-blue-600 text-white text-xs">{contact.unread}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredGroups.map((group) => (
                  <motion.div
                    key={group.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChat(group)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChat?.id === group.id ? "bg-blue-100 border border-blue-200" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Hash className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{group.name}</p>
                          <p className="text-xs text-gray-500">{group.time}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{group.lastMessage}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{group.members}</span>
                            {group.unread > 0 && (
                              <Badge className="bg-blue-600 text-white text-xs">{group.unread}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Add Contact/Group Button */}
          <div className="p-4 border-t border-gray-200">
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              {activeTab === "contacts" ? "Add Contact" : "Create Group"}
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedChat.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedChat.members
                        ? `${selectedChat.members} members`
                        : selectedChat.online
                          ? "Online"
                          : "Last seen recently"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.isOwn ? "bg-blue-600 text-white" : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-500"}`}>{msg.time}</p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-10"
                    />
                    <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a contact or group to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
