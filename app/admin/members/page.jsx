"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  RefreshCw,
  Instagram,
  Mail,
  Phone,
  Users,
  UserPlus,
  ChevronDown,
  ChevronUp,
  Eye,
  MoreHorizontal,
  Shield,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"

// Sample team members data
const teamMembersData = [
  {
    id: 1,
    name: "Jatin Singal",
    role: "President",
    image: "/images/president.png",
    bio: "Creative and skilled leader with knowledge in every field. Founded the Infotech Club in January 2025.",
    department: "IT Department",
    email: "jatin.singal@example.com",
    phone: "+91 98765 43210",
    joinDate: "Jan 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 2,
    name: "Jatin",
    role: "Vice President",
    image: "/images/vice-president.png",
    bio: "Very focused and punctual for his work. Helps manage club activities and events.",
    department: "IT Department",
    email: "jatin@example.com",
    phone: "+91 98765 43211",
    joinDate: "Jan 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 3,
    name: "Nitin",
    role: "Technical Head",
    image: "/images/technical-head.png",
    bio: "Has great knowledge of technical skills. Leads the technical aspects of all club events.",
    department: "IT Department",
    email: "nitin@example.com",
    phone: "+91 98765 43212",
    joinDate: "Jan 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 4,
    name: "Kavya Chhabra",
    role: "Social Head",
    image: "/images/social-head.png",
    bio: "Makes the club popular through video shooting and creating designs for the club's events and promotions.",
    department: "IT Department",
    email: "kavya@example.com",
    phone: "+91 98765 43213",
    joinDate: "Feb 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 5,
    name: "Disha Gaba",
    role: "Research & Development",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menber1-UwESbDAxVBj5rbe0hu1LgLVe7X5FzF.jpeg",
    bio: "Leads research initiatives and develops new ideas for club projects and events.",
    department: "IT Department",
    email: "disha@example.com",
    phone: "+91 98765 43214",
    joinDate: "Feb 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 6,
    name: "Anushka",
    role: "Logistics Coordinator",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member3-ApOEoo8d9YIgpTWMCpOLnn1AVovRtA.jpeg",
    bio: "Manages all logistics and coordination for club events and activities.",
    department: "IT Department",
    email: "anushka@example.com",
    phone: "+91 98765 43215",
    joinDate: "Mar 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 7,
    name: "Pankaj",
    role: "Management Head",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member7-Bx1rR4St0PQZV12RiuxqPyVej0R3Y6.jpeg",
    bio: "Oversees the management of club operations and ensures smooth functioning of all activities.",
    department: "IT Department",
    email: "pankaj@example.com",
    phone: "+91 98765 43216",
    joinDate: "Mar 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 8,
    name: "Mayank Saini",
    role: "Discipline Head",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member5-rEjYHkyjyamtBbHsPyicq5nwRqQg8f.jpeg",
    bio: "Maintains discipline and order during club events and ensures adherence to club rules.",
    department: "IT Department",
    email: "mayank@example.com",
    phone: "+91 98765 43217",
    joinDate: "Apr 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 9,
    name: "OM Prakash",
    role: "Marketing Head",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member4-LI4u8y5iovWdplJb08lr5siorXos7A.jpeg",
    bio: "Leads the marketing efforts for club events and initiatives to increase visibility and participation.",
    department: "IT Department",
    email: "om@example.com",
    phone: "+91 98765 43218",
    joinDate: "Apr 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 10,
    name: "Jahanvi",
    role: "Communication Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member2-a5J0oIO5RrnC6xZRuwzyyrCUVAtUIG.jpeg",
    bio: "Manages all communication channels and ensures effective information dissemination.",
    department: "IT Department",
    email: "jahanvi@example.com",
    phone: "+91 98765 43219",
    joinDate: "Apr 2025",
    status: "Active",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
]

export default function AdminMembers() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    department: "IT Department",
    email: "",
    phone: "",
    image: "",
    status: "Active",
    joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
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
        // Fetch members
        fetchMembers()
      }
    } else {
      // Not logged in, redirect to login
      router.push("/auth/login")
    }
  }, [router])

  useEffect(() => {
    // Filter and sort members
    let result = [...members]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.bio.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter((member) => member.role === roleFilter)
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

    setFilteredMembers(result)
  }, [members, searchQuery, roleFilter, sortConfig])

  const fetchMembers = async () => {
    setIsRefreshing(true)
    try {
      // In a real app, this would be an API call
      // For now, we'll use the sample data
      setMembers(teamMembersData)
      setFilteredMembers(teamMembersData)
    } catch (error) {
      console.error("Error fetching members:", error)
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // In a real app, this would be an API call
      if (currentMember) {
        // Update existing member
        const updatedMembers = members.map((member) =>
          member.id === currentMember.id ? { ...formData, id: member.id } : member,
        )
        setMembers(updatedMembers)
      } else {
        // Create new member
        const newMember = {
          ...formData,
          id: members.length + 1,
        }
        setMembers([...members, newMember])
      }

      // Close dialog
      setIsDialogOpen(false)
      // Reset form
      resetForm()
    } catch (error) {
      console.error("Error saving member:", error)
    }
  }

  const handleDelete = async () => {
    if (!currentMember) return

    try {
      // In a real app, this would be an API call
      const updatedMembers = members.filter((member) => member.id !== currentMember.id)
      setMembers(updatedMembers)

      // Close dialog
      setIsDeleteDialogOpen(false)
      // Reset current member
      setCurrentMember(null)
    } catch (error) {
      console.error("Error deleting member:", error)
    }
  }

  const handleEdit = (member) => {
    setCurrentMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      department: member.department,
      email: member.email,
      phone: member.phone,
      image: member.image,
      status: member.status,
      joinDate: member.joinDate,
      social: {
        instagram: member.social.instagram,
      },
    })
    setIsDialogOpen(true)
  }

  const handleView = (member) => {
    setCurrentMember(member)
    setIsViewDialogOpen(true)
  }

  const handleAdd = () => {
    resetForm()
    setCurrentMember(null)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      bio: "",
      department: "IT Department",
      email: "",
      phone: "",
      image: "",
      status: "Active",
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      social: {
        instagram: "https://www.instagram.com/info_tech_cgc",
      },
    })
  }

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const getRoleOptions = () => {
    const roles = [...new Set(members.map((member) => member.role))]
    return roles.sort()
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
            <h1 className="text-3xl font-bold text-white">Manage Members</h1>
            <p className="text-gray-400">Add, edit, and manage team members</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
              onClick={fetchMembers}
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <UserPlus size={16} />
              Add Member
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-700 bg-gray-900 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px] border-gray-700 bg-gray-900 text-gray-200">
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <SelectValue placeholder="Filter by role" />
                  </div>
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-900 text-gray-200">
                  <SelectItem value="all">All Roles</SelectItem>
                  {getRoleOptions().map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
              Showing <span className="text-white font-medium">{filteredMembers.length}</span> of{" "}
              <span className="text-white font-medium">{members.length}</span> members
            </div>
          </div>

          <TabsContent value="grid" className="mt-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <motion.div key={member.id} variants={itemVariants}>
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-600">
                      <div className="relative h-64 w-full group">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-purple-600/80 hover:bg-purple-700 text-white"
                              onClick={() => handleView(member)}
                            >
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gray-700/80 hover:bg-gray-600 text-white"
                              onClick={() => handleEdit(member)}
                            >
                              <Edit size={14} className="mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                          <div className="relative group">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <MoreHorizontal size={16} className="text-gray-400" />
                            </Button>
                            <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10 hidden group-hover:block">
                              <div className="py-1">
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center gap-2"
                                  onClick={() => handleView(member)}
                                >
                                  <Eye size={14} />
                                  View Profile
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center gap-2"
                                  onClick={() => handleEdit(member)}
                                >
                                  <Edit size={14} />
                                  Edit Member
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 flex items-center gap-2"
                                  onClick={() => {
                                    setCurrentMember(member)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  <Trash2 size={14} />
                                  Delete Member
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-purple-900/50 text-purple-400 rounded-full text-xs">
                            {member.role}
                          </span>
                          <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded-full text-xs">
                            {member.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">{member.bio}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Mail size={14} />
                          <span className="truncate">{member.email}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Users className="text-gray-500 mb-4" size={48} />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No members found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Add New Member
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
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center gap-1">
                            Name
                            {sortConfig.key === "name" &&
                              (sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                          onClick={() => handleSort("role")}
                        >
                          <div className="flex items-center gap-1">
                            Role
                            {sortConfig.key === "role" &&
                              (sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                          onClick={() => handleSort("email")}
                        >
                          <div className="flex items-center gap-1">
                            Email
                            {sortConfig.key === "email" &&
                              (sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                          onClick={() => handleSort("joinDate")}
                        >
                          <div className="flex items-center gap-1">
                            Join Date
                            {sortConfig.key === "joinDate" &&
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
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                          <tr
                            key={member.id}
                            className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                                  <Image
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-200 font-medium">{member.name}</p>
                                  <p className="text-gray-400 text-xs">{member.department}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-purple-900/50 text-purple-400 rounded-full text-xs">
                                {member.role}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{member.email}</td>
                            <td className="py-3 px-4 text-gray-300">{member.joinDate}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded-full text-xs">
                                {member.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                                  onClick={() => handleView(member)}
                                >
                                  <Eye size={14} className="mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                                  onClick={() => handleEdit(member)}
                                >
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-8 bg-red-900/50 hover:bg-red-800 text-red-200"
                                  onClick={() => {
                                    setCurrentMember(member)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  <Trash2 size={14} className="mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-12 text-center">
                            <div className="flex flex-col items-center">
                              <Users className="text-gray-500 mb-4" size={48} />
                              <h3 className="text-xl font-medium text-gray-300 mb-2">No members found</h3>
                              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                              <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white">
                                Add New Member
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

        {/* Add/Edit Member Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle>{currentMember ? "Edit Member" : "Add New Member"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {currentMember ? "Update the member details below." : "Fill in the details for the new member."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-300">
                    Role
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    placeholder="e.g., President"
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="border-gray-700 bg-gray-800 text-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g., +91 98765 43210"
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-gray-300">
                    Department
                  </Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-gray-300">
                  Profile Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="URL to profile image"
                  className="border-gray-700 bg-gray-800 text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-gray-300">
                  Instagram Profile
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.social.instagram}
                  onChange={handleSocialChange}
                  placeholder="Instagram URL"
                  className="border-gray-700 bg-gray-800 text-gray-200"
                />
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
                  {currentMember ? "Update Member" : "Add Member"}
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
                Are you sure you want to delete {currentMember?.name} from the team? This action cannot be undone.
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
                Delete Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Member Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-3xl">
            <DialogHeader>
              <DialogTitle>Member Profile</DialogTitle>
            </DialogHeader>

            {currentMember && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
                    <Image
                      src={currentMember.image || "/placeholder.svg"}
                      alt={currentMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <span className="px-2 py-1 bg-purple-900/50 text-purple-400 rounded-full text-xs">
                        {currentMember.role}
                      </span>
                      <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded-full text-xs">
                        {currentMember.status}
                      </span>
                    </div>

                    <div className="flex justify-center">
                      <a
                        href={currentMember.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        <Instagram size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{currentMember.name}</h2>
                    <p className="text-gray-400">{currentMember.department}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Bio</h3>
                    <p className="text-gray-300">{currentMember.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Contact Information</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-gray-300">
                          <Mail size={16} className="text-purple-400" />
                          <span>{currentMember.email}</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                          <Phone size={16} className="text-purple-400" />
                          <span>{currentMember.phone}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Club Information</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-gray-300">
                          <Star size={16} className="text-purple-400" />
                          <span>Joined: {currentMember.joinDate}</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                          <Shield size={16} className="text-purple-400" />
                          <span>Role: {currentMember.role}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  handleEdit(currentMember)
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Edit Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

