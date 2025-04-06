"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  Trophy,
  Search,
  Filter,
  SlidersHorizontal,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Copy,
  RefreshCw,
  MapPin,
} from "lucide-react"
import { motion } from "framer-motion"

export default function AdminEvents() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    participants: "",
    rounds: "",
    badge: "Technical",
    image: "/images/codequest1.png",
    status: "Draft",
    location: "",
    organizer: "",
  })

  useEffect(() => {
    // Check if user is logged in and is an admin
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)

      // If not admin, redirect to home
      if (parsedUser.role !== "admin") {
        router.push("/")
      } else {
        // Fetch events
        fetchEvents()
      }
    } else {
      // Not logged in, redirect to login
      router.push("/auth/login")
    }
  }, [router])

  useEffect(() => {
    // Filter and sort events
    let result = [...events]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((event) => event.status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })

    setFilteredEvents(result)
  }, [events, searchQuery, statusFilter, sortConfig])

  const fetchEvents = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("/api/events")
      const data = await response.json()

      // Add status and other fields to events
      const enhancedEvents = data.events.map((event) => ({
        ...event,
        status: event.status || getRandomStatus(),
        location: event.location || "CGC Landran, IT Department",
        organizer: event.organizer || "Infotech Club",
      }))

      setEvents(enhancedEvents)
      setFilteredEvents(enhancedEvents)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  const getRandomStatus = () => {
    const statuses = ["Draft", "Planning", "Confirmed", "Completed", "Cancelled"]
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let response

      if (currentEvent) {
        // Update existing event
        response = await fetch(`/api/events/${currentEvent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      } else {
        // Create new event
        response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      }

      if (response.ok) {
        // Refresh events list
        fetchEvents()
        // Close dialog
        setIsDialogOpen(false)
        // Reset form
        resetForm()
      } else {
        console.error("Failed to save event")
      }
    } catch (error) {
      console.error("Error saving event:", error)
    }
  }

  const handleDelete = async () => {
    if (!currentEvent) return

    try {
      const response = await fetch(`/api/events/${currentEvent.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Refresh events list
        fetchEvents()
        // Close dialog
        setIsDeleteDialogOpen(false)
        // Reset current event
        setCurrentEvent(null)
      } else {
        console.error("Failed to delete event")
      }
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const handleEdit = (event) => {
    setCurrentEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      participants: event.participants,
      rounds: event.rounds || "",
      badge: event.badge,
      image: event.image,
      status: event.status || "Draft",
      location: event.location || "CGC Landran, IT Department",
      organizer: event.organizer || "Infotech Club",
    })
    setIsDialogOpen(true)
  }

  const handlePreview = (event) => {
    setCurrentEvent(event)
    setIsPreviewDialogOpen(true)
  }

  const handleDuplicate = (event) => {
    const newEvent = {
      ...event,
      title: `${event.title} (Copy)`,
      id: null,
    }
    setCurrentEvent(null)
    setFormData({
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      participants: newEvent.participants,
      rounds: newEvent.rounds || "",
      badge: newEvent.badge,
      image: newEvent.image,
      status: "Draft",
      location: newEvent.location || "CGC Landran, IT Department",
      organizer: newEvent.organizer || "Infotech Club",
    })
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    resetForm()
    setCurrentEvent(null)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      participants: "",
      rounds: "",
      badge: "Technical",
      image: "/images/codequest1.png",
      status: "Draft",
      location: "CGC Landran, IT Department",
      organizer: "Infotech Club",
    })
  }

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Draft":
        return "bg-purple-900/50 text-purple-400"
      case "Planning":
        return "bg-yellow-900/50 text-yellow-400"
      case "Confirmed":
        return "bg-green-900/50 text-green-400"
      case "Completed":
        return "bg-blue-900/50 text-blue-400"
      case "Cancelled":
        return "bg-red-900/50 text-red-400"
      default:
        return "bg-gray-900/50 text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Draft":
        return <Clock size={14} />
      case "Planning":
        return <Clock size={14} />
      case "Confirmed":
        return <CheckCircle size={14} />
      case "Completed":
        return <CheckCircle size={14} />
      case "Cancelled":
        return <AlertCircle size={14} />
      default:
        return <Clock size={14} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Events</h1>
            <p className="text-gray-400">Create, edit, and manage all club events</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
              onClick={fetchEvents}
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <Plus size={16} />
              Add New Event
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-700 bg-gray-900 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] border-gray-700 bg-gray-900 text-gray-200">
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-900 text-gray-200">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <SlidersHorizontal size={16} />
              </Button>

              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Download size={16} />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="grid" className="mb-6">
          <div className="flex justify-between items-center">
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger
                value="grid"
                className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-400"
              >
                Grid View
              </TabsTrigger>
              <TabsTrigger
                value="table"
                className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-400"
              >
                Table View
              </TabsTrigger>
            </TabsList>

            <div className="text-gray-400 text-sm">
              Showing <span className="text-white font-medium">{filteredEvents.length}</span> of{" "}
              <span className="text-white font-medium">{events.length}</span> events
            </div>
          </div>

          <TabsContent value="grid" className="mt-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <motion.div key={event.id} variants={itemVariants}>
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-600">
                      <div className="relative h-48 w-full group">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(event.status)}`}
                          >
                            {getStatusIcon(event.status)}
                            {event.status}
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-white flex items-center justify-between">
                          <span className="truncate">{event.title}</span>
                          <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">{event.badge}</span>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar size={14} />
                          <span>{event.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{event.description}</p>

                        <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{event.participants} Participants</span>
                          </div>
                          {event.rounds && (
                            <div className="flex items-center gap-1">
                              <Trophy size={14} />
                              <span>{event.rounds} Competitions</span>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            onClick={() => handlePreview(event)}
                          >
                            <Eye size={14} className="mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            onClick={() => handleEdit(event)}
                          >
                            <Edit size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="bg-red-900/50 hover:bg-red-800 text-red-200"
                            onClick={() => {
                              setCurrentEvent(event)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 size={14} className="mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="text-gray-500 mb-4" size={48} />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No events found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Add New Event
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="table" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th
                          className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                          onClick={() => handleSort("title")}
                        >
                          <div className="flex items-center gap-1">
                            Event Name
                            {sortConfig.key === "title" &&
                              (sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                          onClick={() => handleSort("date")}
                        >
                          <div className="flex items-center gap-1">
                            Date
                            {sortConfig.key === "date" &&
                              (sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                          onClick={() => handleSort("status")}
                        >
                          <div className="flex items-center gap-1">
                            Status
                            {sortConfig.key === "status" &&
                              (sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                          onClick={() => handleSort("participants")}
                        >
                          <div className="flex items-center gap-1">
                            Participants
                            {sortConfig.key === "participants" &&
                              (sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                          <tr
                            key={event.id}
                            className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md overflow-hidden relative flex-shrink-0">
                                  <Image
                                    src={event.image || "/placeholder.svg"}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-200 font-medium">{event.title}</p>
                                  <p className="text-gray-400 text-xs">{event.badge}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{event.date}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 inline-flex ${getStatusColor(event.status)}`}
                              >
                                {getStatusIcon(event.status)}
                                {event.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{event.participants}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                                  onClick={() => handlePreview(event)}
                                >
                                  <Eye size={14} className="mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                                  onClick={() => handleEdit(event)}
                                >
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                                  onClick={() => handleDuplicate(event)}
                                >
                                  <Copy size={14} className="mr-1" />
                                  Copy
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-12 text-center">
                            <div className="flex flex-col items-center">
                              <Calendar className="text-gray-500 mb-4" size={48} />
                              <h3 className="text-xl font-medium text-gray-300 mb-2">No events found</h3>
                              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                              <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white">
                                Add New Event
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Event Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle>{currentEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {currentEvent ? "Update the event details below." : "Fill in the details for the new event."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-300">
                    Event Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-300">
                    Event Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    placeholder="e.g., February 2025"
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="border-gray-700 bg-gray-800 text-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="participants" className="text-gray-300">
                    Participants
                  </Label>
                  <Input
                    id="participants"
                    name="participants"
                    value={formData.participants}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 150+"
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rounds" className="text-gray-300">
                    Rounds/Competitions
                  </Label>
                  <Input
                    id="rounds"
                    name="rounds"
                    value={formData.rounds}
                    onChange={handleChange}
                    placeholder="e.g., 3 (optional)"
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badge" className="text-gray-300">
                    Badge Type
                  </Label>
                  <Select value={formData.badge} onValueChange={(value) => handleSelectChange("badge", value)}>
                    <SelectTrigger className="border-gray-700 bg-gray-800 text-gray-200">
                      <SelectValue placeholder="Select badge type" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-700 bg-gray-800 text-gray-200">
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Flagship">Flagship</SelectItem>
                      <SelectItem value="Learning">Learning</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-300">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Event location"
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-gray-300">
                    Status
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger className="border-gray-700 bg-gray-800 text-gray-200">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-700 bg-gray-800 text-gray-200">
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-gray-300">
                  Image Path
                </Label>
                <Select value={formData.image} onValueChange={(value) => handleSelectChange("image", value)}>
                  <SelectTrigger className="border-gray-700 bg-gray-800 text-gray-200">
                    <SelectValue placeholder="Select image" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-gray-200">
                    <SelectItem value="/images/codequest1.png">CodeQuest 1</SelectItem>
                    <SelectItem value="/images/codequest2.png">CodeQuest 2</SelectItem>
                    <SelectItem value="/images/ignitefest1.png">IgniteFest 1</SelectItem>
                    <SelectItem value="/images/ignitefest2.png">IgniteFest 2</SelectItem>
                    <SelectItem value="/images/eminence1.png">Eminence 1</SelectItem>
                    <SelectItem value="/images/eminence2.png">Eminence 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                  {currentEvent ? "Update Event" : "Add Event"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-gray-900 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to delete the event "{currentEvent?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} className="bg-red-700 hover:bg-red-800 text-white">
                Delete Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Preview Dialog */}
        <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
          <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-3xl">
            <DialogHeader>
              <DialogTitle>Event Preview</DialogTitle>
              <DialogDescription className="text-gray-400">
                Preview how the event will appear on the website
              </DialogDescription>
            </DialogHeader>

            {currentEvent && (
              <div className="space-y-6">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src={currentEvent.image || "/placeholder.svg"}
                    alt={currentEvent.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(currentEvent.status)}`}
                        >
                          {getStatusIcon(currentEvent.status)}
                          {currentEvent.status}
                        </span>
                        <span className="px-2 py-1 bg-gray-800/80 text-gray-200 rounded-full text-xs">
                          {currentEvent.badge}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">{currentEvent.title}</h2>
                      <div className="flex items-center gap-4 mt-2 text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{currentEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          <span>{currentEvent.participants} Participants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Description</h3>
                    <p className="text-gray-300">{currentEvent.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Details</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-900/30 p-1 rounded-full mt-0.5">
                            <Calendar size={14} className="text-purple-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Date</p>
                            <p className="text-gray-200">{currentEvent.date}</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-900/30 p-1 rounded-full mt-0.5">
                            <MapPin size={14} className="text-purple-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Location</p>
                            <p className="text-gray-200">{currentEvent.location || "CGC Landran, IT Department"}</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-900/30 p-1 rounded-full mt-0.5">
                            <Users size={14} className="text-purple-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Organizer</p>
                            <p className="text-gray-200">{currentEvent.organizer || "Infotech Club"}</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Statistics</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-900/30 p-1 rounded-full mt-0.5">
                            <Users size={14} className="text-purple-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Expected Participants</p>
                            <p className="text-gray-200">{currentEvent.participants}</p>
                          </div>
                        </li>
                        {currentEvent.rounds && (
                          <li className="flex items-start gap-2">
                            <div className="bg-purple-900/30 p-1 rounded-full mt-0.5">
                              <Trophy size={14} className="text-purple-400" />
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Competitions/Rounds</p>
                              <p className="text-gray-200">{currentEvent.rounds}</p>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewDialogOpen(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setIsPreviewDialogOpen(false)
                      handleEdit(currentEvent)
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Edit Event
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

