"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Users, ImageIcon, LogOut, Menu, X, ChevronDown } from "lucide-react"
import { checkAuth, logout } from "@/utils/auth-check"

// Simple admin layout with only essential features
export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const authCheck = () => {
      const userData = checkAuth()
      if (userData) {
        setUser(userData)
      } else {
        router.push("/auth/login")
      }
    }

    authCheck()

    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [router, pathname])

  const handleLogout = () => {
    logout(router)
  }

  const isActive = (path) => pathname === path

  // Add some keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsUserMenuOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-gray-900 border-b border-gray-800 py-3 px-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 shadow-md">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 mr-2 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex text-gray-400 mr-2 hover:text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/infotech-logo.png"
              alt="Infotech Club Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl text-white hidden sm:inline">
              Infotech <span className="text-purple-400">Admin</span>
            </span>
          </Link>
        </div>

        {/* User Menu */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline">{user.name}</span>
              <ChevronDown
                size={16}
                className={isUserMenuOpen ? "rotate-180 transition-transform" : "transition-transform"}
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                <div className="p-3 border-b border-gray-700">
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <div className="mt-2 flex items-center">
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">
                      Administrator
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <Link href="/">
                    <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md text-sm flex items-center gap-2 transition-colors">
                      <LayoutDashboard size={14} />
                      View Website
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 rounded-md text-sm flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar - Desktop */}
        <aside
          className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 ease-in-out hidden md:block fixed h-[calc(100vh-57px)] z-40 ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className="p-4 h-full flex flex-col">
            <nav className="space-y-1 flex-1">
              <Link href="/admin/dashboard">
                <div
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/dashboard")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors hover:translate-x-1 duration-200`}
                >
                  <LayoutDashboard size={20} />
                  {isSidebarOpen && <span>Dashboard</span>}
                </div>
              </Link>

              <Link href="/admin/events">
                <div
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/events")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors hover:translate-x-1 duration-200`}
                >
                  <Calendar size={20} />
                  {isSidebarOpen && <span>Events</span>}
                </div>
              </Link>

              <Link href="/admin/members">
                <div
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/members")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors hover:translate-x-1 duration-200`}
                >
                  <Users size={20} />
                  {isSidebarOpen && <span>Members</span>}
                </div>
              </Link>

              <Link href="/admin/gallery">
                <div
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/gallery")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors hover:translate-x-1 duration-200`}
                >
                  <ImageIcon size={20} />
                  {isSidebarOpen && <span>Gallery</span>}
                </div>
              </Link>
            </nav>

            <div className="mt-auto">
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                {isSidebarOpen && "Logout"}
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-[57px] bottom-0 w-64 bg-gray-900 border-r border-gray-800 z-50 md:hidden animate-in slide-in-from-left duration-300">
              <div className="p-4 h-full flex flex-col">
                <nav className="space-y-1 flex-1">
                  <Link href="/admin/dashboard">
                    <div
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                        isActive("/admin/dashboard")
                          ? "bg-purple-900/50 text-purple-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      } transition-colors`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard size={20} />
                      <span>Dashboard</span>
                    </div>
                  </Link>

                  <Link href="/admin/events">
                    <div
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                        isActive("/admin/events")
                          ? "bg-purple-900/50 text-purple-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      } transition-colors`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Calendar size={20} />
                      <span>Events</span>
                    </div>
                  </Link>

                  <Link href="/admin/members">
                    <div
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                        isActive("/admin/members")
                          ? "bg-purple-900/50 text-purple-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      } transition-colors`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Users size={20} />
                      <span>Members</span>
                    </div>
                  </Link>

                  <Link href="/admin/gallery">
                    <div
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                        isActive("/admin/gallery")
                          ? "bg-purple-900/50 text-purple-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      } transition-colors`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ImageIcon size={20} />
                      <span>Gallery</span>
                    </div>
                  </Link>
                </nav>

                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="animate-in fade-in duration-500">{children}</div>
        </main>
      </div>
    </div>
  )
}

