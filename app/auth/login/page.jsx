"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    }
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real application, you would send this data to your backend
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // For demo purposes, we'll simulate different user roles
        // In a real app, the role would come from the backend
        const userRole = formData.email.includes("admin") ? "admin" : "user"

        // Store user info in localStorage (in a real app, use secure cookies or JWT)
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: formData.email.split("@")[0],
            email: formData.email,
            role: userRole,
          }),
        )

        // Redirect based on role
        if (userRole === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError(data.message || "Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.error("Error during login:", error)
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-1 text-purple-400">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-lg border-gray-800 bg-gray-900">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/infotech-logo.png"
              alt="Infotech Club Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-purple-400">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">Sign in to your Infotech Club account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer text-gray-300">
                  Remember me
                </Label>
              </div>

              <Link href="#" className="text-sm text-purple-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Image src="/images/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
                Google
              </Button>
              <Button type="button" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Image src="/images/github-icon.png" alt="GitHub" width={20} height={20} className="mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-purple-400 hover:underline font-medium">
              Sign up
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2">
            <ShieldAlert size={16} className="text-purple-400" />
            <Link href="/auth/admin-register" className="text-sm text-purple-400 hover:underline">
              Register as Admin
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

