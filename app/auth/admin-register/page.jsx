"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.adminCode) {
      setError("Admin code is required")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/admin-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          adminCode: formData.adminCode,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user info in localStorage (in a real app, use secure cookies or JWT)
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            role: "admin",
          }),
        )

        // Redirect to admin dashboard
        router.push("/admin/dashboard")
      } else {
        setError(data.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Error during registration:", error)
      setError("An error occurred during registration. Please try again.")
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldAlert className="text-purple-400" size={24} />
            <CardTitle className="text-2xl font-bold text-purple-400">Admin Registration</CardTitle>
          </div>
          <CardDescription className="text-gray-400">Create an admin account for Infotech Club</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminCode" className="text-gray-300">
                Admin Code
              </Label>
              <Input
                id="adminCode"
                name="adminCode"
                type="password"
                placeholder="Enter admin code"
                value={formData.adminCode}
                onChange={handleChange}
                required
                className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500">
                Admin code is required for administrative access. Contact the club president if you don't have one.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer text-gray-300">
                I agree to the{" "}
                <Link href="#" className="text-purple-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-purple-400 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Register as Admin"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-400 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

