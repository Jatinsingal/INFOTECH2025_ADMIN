"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  ImagePlus,
  Eye,
  Copy,
  MoreHorizontal,
  ImageIcon,
  CheckCircle,
  Upload,
  Star,
  StarOff,
} from "lucide-react"
import { motion } from "framer-motion"

// Sample gallery images data
const galleryImagesData = [
  {
    id: 1,
    src: "/images/codequest1.png",
    alt: "CodeQuest Event",
    category: "CodeQuest",
    uploadDate: "Apr 15, 2025",
    featured: true,
  },
  {
    id: 2,
    src: "/images/codequest2.png",
    alt: "Team working together",
    category: "Workshop",
    uploadDate: "Apr 10, 2025",
    featured: false,
  },
  {
    id: 3,
    src: "/images/ignitefest1.png",
    alt: "IgniteFest Team",
    category: "IgniteFest",
    uploadDate: "Mar 25, 2025",
    featured: true,
  },
  {
    id: 4,
    src: "/images/ignitefest2.png",
    alt: "Award Ceremony",
    category: "IgniteFest",
    uploadDate: "Mar 25, 2025",
    featured: false,
  },
  {
    id: 5,
    src: "/images/eminence1.png",
    alt: "Eminence Group Photo",
    category: "Eminence",
    uploadDate: "Mar 15, 2025",
    featured: true,
  },
  {
    id: 6,
    src: "/images/eminence2.png",
    alt: "Eminence Award Ceremony",
    category: "Eminence",
    uploadDate: "Mar 15, 2025",
    featured: false,
  },
  {
    id: 7,
    src: "/images/infotech-family.png",
    alt: "Infotech Club Family",
    category: "Team",
    uploadDate: "Feb 20, 2025",
    featured: true,
  },
]

export default function AdminGallery() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedImages, setSelectedImages] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [formData, setFormData] = useState({
    src: "",
    alt: "",
    category: "",
    featured: false,
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
        // Fetch images
        fetchImages()
      }
    } else {
      // Not logged in, redirect to login
      router.push("/auth/login")
    }
  }, [router])

  useEffect(() => {
    // Filter images
    let result = [...images]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (image) =>
          image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          image.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((image) => image.category === categoryFilter)
    }

    setFilteredImages(result)
  }, [images, searchQuery, categoryFilter])

  const fetchImages = async () => {
    setIsRefreshing(true)
    try {
      // In a real app, this would be an API call
      // For now, we'll use the sample data
      setImages(galleryImagesData)
      setFilteredImages(galleryImagesData)
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // In a real app, this would be an API call
      const newImage = {
        ...formData,
        id: currentImage ? currentImage.id : images.length + 1,
        uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }

      if (currentImage) {
        // Update existing image
        const updatedImages = images.map((image) => (image.id === currentImage.id ? newImage : image))
        setImages(updatedImages)
      } else {
        // Create new image
        setImages([...images, newImage])
      }

      // Close dialog
      setIsDialogOpen(false)
      // Reset form
      resetForm()
    } catch (error) {
      console.error("Error saving image:", error)
    }
  }

  const handleDelete = async () => {
    if (!currentImage) return

    try {
      // In a real app, this would be an API call
      const updatedImages = images.filter((image) => image.id !== currentImage.id)
      setImages(updatedImages)

      // Close dialog
      setIsDeleteDialogOpen(false)
      // Reset current image
      setCurrentImage(null)
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedImages.length === 0) return

    try {
      // In a real app, this would be an API call
      const updatedImages = images.filter((image) => !selectedImages.includes(image.id))
      setImages(updatedImages)

      // Reset selected images
      setSelectedImages([])
    } catch (error) {
      console.error("Error deleting selected images:", error)
    }
  }

  const handleEdit = (image) => {
    setCurrentImage(image)
    setFormData({
      src: image.src,
      alt: image.alt,
      category: image.category,
      featured: image.featured,
    })
    setIsDialogOpen(true)
  }

  const handleView = (image) => {
    setCurrentImage(image)
    setIsViewDialogOpen(true)
  }

  const handleAdd = () => {
    resetForm()
    setCurrentImage(null)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      src: "",
      alt: "",
      category: "",
      featured: false,
    })
  }

  const toggleImageSelection = (id) => {
    setSelectedImages((prev) => (prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]))
  }

  const toggleFeatured = (id) => {
    setImages((prev) => prev.map((image) => (image.id === id ? { ...image, featured: !image.featured } : image)))
  }

  const selectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((image) => image.id))
    }
  }

  const getCategoryOptions = () => {
    const categories = [...new Set(images.map((image) => image.category))]
    return categories.sort()
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
            <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
            <p className="text-gray-400">Manage images for your club's gallery</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
              onClick={fetchImages}
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <ImagePlus size={16} />
              Add Image
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-700 bg-gray-900 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] border-gray-700 bg-gray-900 text-gray-200">
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <SelectValue placeholder="Filter by category" />
                  </div>
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-900 text-gray-200">
                  <SelectItem value="all">All Categories</SelectItem>
                  {getCategoryOptions().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
                value="list"
                className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-400"
              >
                List View
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              {selectedImages.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-red-900/50 hover:bg-red-800 text-red-200"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 size={14} className="mr-1" />
                  Delete Selected ({selectedImages.length})
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={selectAll}
              >
                {selectedImages.length === filteredImages.length ? "Deselect All" : "Select All"}
              </Button>

              <div className="text-gray-400 text-sm">
                Showing <span className="text-white font-medium">{filteredImages.length}</span> of{" "}
                <span className="text-white font-medium">{images.length}</span> images
              </div>
            </div>
          </div>

          <TabsContent value="grid" className="mt-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                  <motion.div key={image.id} variants={itemVariants}>
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-600">
                      <div className="relative h-48 w-full group">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute top-2 left-2 z-10">
                          <div
                            className={`w-5 h-5 rounded-md border ${
                              selectedImages.includes(image.id)
                                ? "bg-purple-600 border-purple-600"
                                : "bg-gray-800/70 border-gray-600 hover:border-purple-500"
                            } cursor-pointer transition-colors`}
                            onClick={() => toggleImageSelection(image.id)}
                          >
                            {selectedImages.includes(image.id) && <CheckCircle size={20} className="text-white" />}
                          </div>
                        </div>

                        <div className="absolute top-2 right-2 z-10">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full bg-gray-800/70 hover:bg-gray-700/90 text-gray-300"
                            onClick={() => toggleFeatured(image.id)}
                          >
                            {image.featured ? <Star size={16} className="text-yellow-400" /> : <StarOff size={16} />}
                          </Button>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-purple-600/80 hover:bg-purple-700 text-white"
                              onClick={() => handleView(image)}
                            >
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gray-700/80 hover:bg-gray-600 text-white"
                              onClick={() => handleEdit(image)}
                            >
                              <Edit size={14} className="mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white truncate">{image.alt}</h3>
                          <div className="relative group">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <MoreHorizontal size={16} className="text-gray-400" />
                            </Button>
                            <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10 hidden group-hover:block">
                              <div className="py-1">
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center gap-2"
                                  onClick={() => handleView(image)}
                                >
                                  <Eye size={14} />
                                  View Image
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center gap-2"
                                  onClick={() => handleEdit(image)}
                                >
                                  <Edit size={14} />
                                  Edit Details
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center gap-2"
                                  onClick={() => toggleFeatured(image.id)}
                                >
                                  {image.featured ? (
                                    <>
                                      <StarOff size={14} />
                                      Remove from Featured
                                    </>
                                  ) : (
                                    <>
                                      <Star size={14} />
                                      Mark as Featured
                                    </>
                                  )}
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 flex items-center gap-2"
                                  onClick={() => {
                                    setCurrentImage(image)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  <Trash2 size={14} />
                                  Delete Image
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-purple-900/50 text-purple-400 rounded-full text-xs">
                            {image.category}
                          </span>
                          {image.featured && (
                            <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs flex items-center gap-1">
                              <Star size={10} />
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs">Uploaded: {image.uploadDate}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <ImageIcon className="text-gray-500 mb-4" size={48} />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No images found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Add New Image
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-gray-400 font-medium">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-5 h-5 rounded-md border ${
                                selectedImages.length === filteredImages.length && filteredImages.length > 0
                                  ? "bg-purple-600 border-purple-600"
                                  : "bg-gray-800 border-gray-600 hover:border-purple-500"
                              } cursor-pointer transition-colors`}
                              onClick={selectAll}
                            >
                              {selectedImages.length === filteredImages.length && filteredImages.length > 0 && (
                                <CheckCircle size={20} className="text-white" />
                              )}
                            </div>
                            <span>Image</span>
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Description</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Upload Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredImages.length > 0 ? (
                        filteredImages.map((image) => (
                          <tr
                            key={image.id}
                            className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded-md border ${
                                    selectedImages.includes(image.id)
                                      ? "bg-purple-600 border-purple-600"
                                      : "bg-gray-800 border-gray-600 hover:border-purple-500"
                                  } cursor-pointer transition-colors`}
                                  onClick={() => toggleImageSelection(image.id)}
                                >
                                  {selectedImages.includes(image.id) && (
                                    <CheckCircle size={20} className="text-white" />
                                  )}
                                </div>
                                <div className="w-12 h-12 rounded-md overflow-hidden relative flex-shrink-0">
                                  <Image
                                    src={image.src || "/placeholder.svg"}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{image.alt}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-purple-900/50 text-purple-400 rounded-full text-xs">
                                {image.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{image.uploadDate}</td>
                            <td className="py-3 px-4">
                              {image.featured ? (
                                <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs flex items-center gap-1">
                                  <Star size={10} />
                                  Featured
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                                  Standard
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                                  onClick={() => handleView(image)}
                                >
                                  <Eye size={14} className="mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                                  onClick={() => handleEdit(image)}
                                >
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-8 bg-red-900/50 hover:bg-red-800 text-red-200"
                                  onClick={() => {
                                    setCurrentImage(image)
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
                              <ImageIcon className="text-gray-500 mb-4" size={48} />
                              <h3 className="text-xl font-medium text-gray-300 mb-2">No images found</h3>
                              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                              <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white">
                                Add New Image
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

        {/* Add/Edit Image Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle>{currentImage ? "Edit Image" : "Add New Image"}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {currentImage ? "Update the image details below." : "Fill in the details for the new image."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="src" className="text-gray-300">
                  Image URL
                </Label>
                <Input
                  id="src"
                  name="src"
                  value={formData.src}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="border-gray-700 bg-gray-800 text-gray-200"
                />
                <p className="text-xs text-gray-400">Enter a URL for the image or upload a file</p>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alt" className="text-gray-300">
                    Image Description
                  </Label>
                  <Input
                    id="alt"
                    name="alt"
                    value={formData.alt}
                    onChange={handleChange}
                    required
                    placeholder="Describe the image"
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Event, Team, Workshop"
                    className="border-gray-700 bg-gray-800 text-gray-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-600"
                />
                <Label htmlFor="featured" className="text-gray-300">
                  Feature this image on the homepage
                </Label>
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
                  {currentImage ? "Update Image" : "Add Image"}
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
                Are you sure you want to delete this image? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            {currentImage && (
              <div className="flex items-center gap-4 my-4">
                <div className="w-16 h-16 rounded-md overflow-hidden relative flex-shrink-0">
                  <Image
                    src={currentImage.src || "/placeholder.svg"}
                    alt={currentImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-200 font-medium">{currentImage.alt}</p>
                  <p className="text-gray-400 text-sm">{currentImage.category}</p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} className="bg-red-700 hover:bg-red-800 text-white">
                Delete Image
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Image Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-3xl">
            <DialogHeader>
              <DialogTitle>Image Preview</DialogTitle>
            </DialogHeader>

            {currentImage && (
              <div className="space-y-4">
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                  <Image
                    src={currentImage.src || "/placeholder.svg"}
                    alt={currentImage.alt}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Image Details</h3>
                    <ul className="space-y-2">
                      <li className="flex flex-col">
                        <span className="text-gray-400 text-sm">Description</span>
                        <span className="text-gray-200">{currentImage.alt}</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-gray-400 text-sm">Category</span>
                        <span className="text-gray-200">{currentImage.category}</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-gray-400 text-sm">Upload Date</span>
                        <span className="text-gray-200">{currentImage.uploadDate}</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-gray-400 text-sm">Status</span>
                        <div className="flex items-center gap-2 mt-1">
                          {currentImage.featured ? (
                            <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs flex items-center gap-1">
                              <Star size={10} />
                              Featured
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">Standard</span>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Image URL</h3>
                    <div className="bg-gray-800 p-3 rounded-md">
                      <p className="text-gray-300 text-sm break-all">{currentImage.src}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-700"
                        onClick={() => {
                          navigator.clipboard.writeText(currentImage.src)
                        }}
                      >
                        <Copy size={14} className="mr-1" />
                        Copy URL
                      </Button>
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
                  handleEdit(currentImage)
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Edit Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

