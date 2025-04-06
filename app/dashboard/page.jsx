"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Award, Bell, LogOut } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      fetchEvents()
    } else {
      router.push("/auth/login")
    }

    setIsLoading(false)
  }, [router])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      setEvents(data.events)
    } catch (error) {
      console.error("Error fetching events:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, <span className="text-purple-400">{user.name}</span>!
              </h1>
              <p className="text-gray-400">Here's what's happening with Infotech Club</p>
            </div>

            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                <Calendar className="text-purple-400" size={20} />
                Upcoming Events
              </CardTitle>
              <CardDescription className="text-gray-400">Events you might be interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">3</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                <Bell className="text-purple-400" size={20} />
                Notifications
              </CardTitle>
              <CardDescription className="text-gray-400">Your recent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">5</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                <Award className="text-purple-400" size={20} />
                Your Participation
              </CardTitle>
              <CardDescription className="text-gray-400">Events you've participated in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">2</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Upcoming Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {events.slice(0, 3).map((event) => (
            <Card key={event.id} className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                <CardDescription className="text-gray-400 flex items-center gap-2">
                  <Calendar size={14} />
                  {event.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{event.description}</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Register Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Club Announcements</h2>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">Latest Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-purple-400">New Team Members</h3>
                <p className="text-gray-300 mb-2">
                  We're excited to welcome new members to our team! Check out their profiles in the Team section.
                </p>
                <p className="text-gray-500 text-sm">Posted 2 days ago</p>
              </li>
              <li className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-purple-400">Workshop Registration Open</h3>
                <p className="text-gray-300 mb-2">
                  Registration for our upcoming Web Development workshop is now open. Limited seats available!
                </p>
                <p className="text-gray-500 text-sm">Posted 5 days ago</p>
              </li>
              <li>
                <h3 className="text-lg font-medium text-purple-400">CodeQuest Results</h3>
                <p className="text-gray-300 mb-2">
                  The results for CodeQuest 2025 are out! Congratulations to all winners and participants.
                </p>
                <p className="text-gray-500 text-sm">Posted 1 week ago</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/events">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">View All Events</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

