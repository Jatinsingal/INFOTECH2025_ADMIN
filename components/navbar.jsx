"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => {
    return pathname === path
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/infotech-logo.png"
            alt="Infotech Club Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="font-bold text-xl text-purple-400">Infotech Club</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`${isActive("/") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${isActive("/about") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
          >
            About
          </Link>
          <Link
            href="/events"
            className={`${isActive("/events") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
          >
            Events
          </Link>
          <Link
            href="/team"
            className={`${isActive("/team") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
          >
            Team
          </Link>
          <Link
            href="/gallery"
            className={`${isActive("/gallery") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className={`${isActive("/contact") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
          >
            Contact
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
                <ChevronDown size={16} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <Link href="/dashboard">
                      <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md text-sm flex items-center gap-2">
                        <User size={14} />
                        Dashboard
                      </button>
                    </Link>
                    {user.role === "admin" && (
                      <Link href="/admin/dashboard">
                        <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md text-sm flex items-center gap-2">
                          <User size={14} />
                          Admin Panel
                        </button>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 rounded-md text-sm flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Register</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg py-4 px-6 absolute top-full left-0 right-0">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className={`${isActive("/") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${isActive("/about") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/events"
              className={`${isActive("/events") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/team"
              className={`${isActive("/team") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <Link
              href="/gallery"
              className={`${isActive("/gallery") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className={`${isActive("/contact") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <div className="border-t border-gray-800 pt-4 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href="/dashboard" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Dashboard
                    </Button>
                  </Link>

                  {user.role === "admin" && (
                    <Link href="/admin/dashboard" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="destructive"
                    className="w-full bg-red-900/50 hover:bg-red-800 text-white justify-start"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mt-2">
                <Link href="/auth/login" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" className="flex-1">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

