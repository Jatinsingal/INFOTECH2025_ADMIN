"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Hero() {
  // Add a simple animation state for the title
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay the animation slightly for a more natural feel
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative pt-20 overflow-hidden min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950 z-0"></div>

      {/* Animated Circles - these create a nice background effect */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-900/30 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-indigo-900/30 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-56 h-56 bg-pink-900/30 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div
          className={`md:w-1/2 mb-10 md:mb-0 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Welcome to <span className="text-purple-400 font-extrabold">Infotech Club</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-lg">
            The biggest tech club of IT Department at CGC Landran. We organize technical events, workshops, and foster
            innovation among students.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/events">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                Explore Events
              </Button>
            </Link>
          </div>
        </div>
        <div
          className={`md:w-1/2 flex justify-center transition-all duration-700 delay-150 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="relative w-80 h-80">
            <Image src="/images/infotech-logo.png" alt="Infotech Club Logo" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </section>
  )
}

