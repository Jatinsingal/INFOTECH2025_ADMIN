"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Award, BarChart2, ArrowUp, Mail, Eye, RefreshCw } from "lucide-react"
import { checkAuth, logout } from "@/utils/auth-check"

// Admin dashboard with simplified functionality for better reliability
export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const refreshTimeoutRef = useRef(null)

  // Track if component is mounted to prevent state updates after unmount
  const isMounted = useRef(true)

  useEffect(() => {
    // Check if user is logged in and is an admin
    const authCheck = () => {
      const userData = checkAuth()

      if (userData) {
        if (isMounted.current) {
          setUser(userData)

          // If not admin, redirect to home
          if (userData.role !== "admin") {
            router.push("/")
          }
        }
      } else {
        // Not logged in, redirect to login
        router.push("/auth/login")
      }

      if (isMounted.current) {
        setIsLoading(false)
      }
    }

    authCheck()

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted.current = false
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
    }
  }, [router])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    refreshTimeoutRef.current = setTimeout(() => {
      if (isMounted.current) {
        setIsRefreshing(false)
      }
    }, 1200)
  }

  const handleLogout = () => {
    logout(router)
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

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user.name}. Here's what's happening with your club.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                  <Calendar className="text-purple-400" size={20} />
                  Events
                </CardTitle>
                <CardDescription className="text-gray-400">Total events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-purple-400">12</p>
                  <div className="flex items-center text-green-400 text-sm">
                    <ArrowUp size={14} className="mr-1" />
                    <span>+25%</span>
                  </div>
                </div>
                <div className="w-full h-1 bg-gray-700 mt-4">
                  <div className="h-full bg-purple-500" style={{ width: "75%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                  <Users className="text-purple-400" size={20} />
                  Members
                </CardTitle>
                <CardDescription className="text-gray-400">Active members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-purple-400">48</p>
                  <div className="flex items-center text-green-400 text-sm">
                    <ArrowUp size={14} className="mr-1" />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="w-full h-1 bg-gray-700 mt-4">
                  <div className="h-full bg-purple-500" style={{ width: "60%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                  <Award className="text-purple-400" size={20} />
                  Achievements
                </CardTitle>
                <CardDescription className="text-gray-400">Club achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-purple-400">15</p>
                  <div className="flex items-center text-green-400 text-sm">
                    <ArrowUp size={14} className="mr-1" />
                    <span>+8%</span>
                  </div>
                </div>
                <div className="w-full h-1 bg-gray-700 mt-4">
                  <div className="h-full bg-purple-500" style={{ width: "45%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                  <BarChart2 className="text-purple-400" size={20} />
                  Registrations
                </CardTitle>
                <CardDescription className="text-gray-400">New registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-purple-400">86</p>
                  <div className="flex items-center text-green-400 text-sm">
                    <ArrowUp size={14} className="mr-1" />
                    <span>+5%</span>
                  </div>
                </div>
                <div className="w-full h-1 bg-gray-700 mt-4">
                  <div className="h-full bg-purple-500" style={{ width: "35%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl text-white">Recent Activities</CardTitle>
                <CardDescription className="text-gray-400">Latest club activities</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 hover:bg-gray-700/30 p-3 rounded-lg transition-colors">
                  <div className="bg-purple-900/30 p-2 rounded-full">
                    <Calendar size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium">New event created</p>
                    <p className="text-gray-400 text-sm">CodeQuest 2025 has been scheduled</p>
                    <p className="text-gray-500 text-xs mt-1">2 days ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 hover:bg-gray-700/30 p-3 rounded-lg transition-colors">
                  <div className="bg-purple-900/30 p-2 rounded-full">
                    <Users size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium">New member joined</p>
                    <p className="text-gray-400 text-sm">Anushka has joined as Logistics Coordinator</p>
                    <p className="text-gray-500 text-xs mt-1">3 days ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 hover:bg-gray-700/30 p-3 rounded-lg transition-colors">
                  <div className="bg-purple-900/30 p-2 rounded-full">
                    <Award size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium">Achievement unlocked</p>
                    <p className="text-gray-400 text-sm">Club won Best Technical Club award</p>
                    <p className="text-gray-500 text-xs mt-1">1 week ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 hover:bg-gray-700/30 p-3 rounded-lg transition-colors">
                  <div className="bg-purple-900/30 p-2 rounded-full">
                    <Mail size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium">New contact message</p>
                    <p className="text-gray-400 text-sm">Received inquiry about upcoming workshops</p>
                    <p className="text-gray-500 text-xs mt-1">1 week ago</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Manage club resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => router.push("/admin/events")}
                  className="p-4 h-auto bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1"
                >
                  <Calendar size={24} className="text-purple-400" />
                  <span className="text-gray-200 text-sm font-medium">Events</span>
                </Button>

                <Button
                  onClick={() => router.push("/admin/members")}
                  className="p-4 h-auto bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1"
                >
                  <Users size={24} className="text-purple-400" />
                  <span className="text-gray-200 text-sm font-medium">Members</span>
                </Button>

                <Button
                  onClick={() => router.push("/admin/gallery")}
                  className="p-4 h-auto bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1"
                >
                  <Eye size={24} className="text-purple-400" />
                  <span className="text-gray-200 text-sm font-medium">Gallery</span>
                </Button>

                <Button
                  onClick={() => router.push("/")}
                  className="p-4 h-auto bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1"
                >
                  <BarChart2 size={24} className="text-purple-400" />
                  <span className="text-gray-200 text-sm font-medium">Website</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

