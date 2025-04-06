"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"

export default function About() {
  // Simple intersection observer for scroll animations
  const [isVisible, setIsVisible] = useState({
    title: false,
    image: false,
    content: false,
  })

  const titleRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // This is a simple way to handle scroll animations without a library
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              setIsVisible((prev) => ({ ...prev, title: true }))
            } else if (entry.target === imageRef.current) {
              setIsVisible((prev) => ({ ...prev, image: true }))
            } else if (entry.target === contentRef.current) {
              setIsVisible((prev) => ({ ...prev, content: true }))
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (imageRef.current) observer.observe(imageRef.current)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (imageRef.current) observer.unobserve(imageRef.current)
      if (contentRef.current) observer.unobserve(contentRef.current)
    }
  }, [])

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${isVisible.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Our Club</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div
            ref={imageRef}
            className={`md:w-1/2 transition-all duration-700 delay-100 ${isVisible.image ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Added white background as requested */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Image src="/images/college-logo.png" alt="CGC Landran" width={500} height={300} className="rounded-lg" />
            </div>
          </div>

          <div
            ref={contentRef}
            className={`md:w-1/2 transition-all duration-700 delay-200 ${isVisible.content ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Our Story</h3>
            <p className="text-gray-300 mb-6">
              Infotech Club was founded in January 2025 by three passionate students: Jatin Singal, Jatin, and Nitin.
              What started as a small initiative has now grown to become the biggest club in the IT Department at
              Chandigarh Engineering College, Landran.
            </p>

            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Our Vision</h3>
            <p className="text-gray-300 mb-6">
              To create an innovative, creative, and hardworking community within the IT department that organizes
              impactful events and fosters technical growth among students.
            </p>

            <h3 className="text-2xl font-semibold text-purple-400 mb-4">What We Do</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Organize technical competitions and hackathons</li>
              <li>Conduct workshops on emerging technologies</li>
              <li>Host cultural and non-technical events</li>
              <li>Provide a platform for students to showcase their talents</li>
              <li>Build a community of tech enthusiasts</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

