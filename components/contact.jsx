"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Mail, Phone, Instagram } from "lucide-react"

export default function Contact() {
  // Track visibility for scroll animations
  const [isVisible, setIsVisible] = useState({
    title: false,
    info: false,
    map: false,
  })

  const titleRef = useRef(null)
  const infoRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    // Simple intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              setIsVisible((prev) => ({ ...prev, title: true }))
            } else if (entry.target === infoRef.current) {
              setIsVisible((prev) => ({ ...prev, info: true }))
            } else if (entry.target === mapRef.current) {
              setIsVisible((prev) => ({ ...prev, map: true }))
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (infoRef.current) observer.observe(infoRef.current)
    if (mapRef.current) observer.observe(mapRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (infoRef.current) observer.unobserve(infoRef.current)
      if (mapRef.current) observer.unobserve(mapRef.current)
    }
  }, [])

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${isVisible.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Have questions or want to join our club? Reach out to us!</p>
          <div className="w-20 h-1 bg-purple-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            ref={infoRef}
            className={`transition-all duration-700 delay-100 ${isVisible.info ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h3 className="text-2xl font-semibold text-purple-400 mb-6">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <MapPin className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Location</h4>
                  <p className="text-gray-300">Chandigarh Engineering College, CGC Landran, Mohali, Punjab</p>
                  <a
                    href="https://maps.app.goo.gl/LKVhbk7geE5NYerR9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline text-sm"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <Mail className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Email</h4>
                  <a href="mailto:jatinsingal456@gmail.com" className="text-gray-300 hover:text-purple-400">
                    jatinsingal456@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <Phone className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Phone</h4>
                  <a href="tel:+919694620296" className="text-gray-300 hover:text-purple-400">
                    +91 9694620296
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <Instagram className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Instagram</h4>
                  <a
                    href="https://www.instagram.com/info_tech_cgc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-purple-400"
                  >
                    @info_tech_cgc
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={mapRef}
            className={`h-[400px] bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-200 ${isVisible.map ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Updated with the correct college location map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2508461724256!2d76.57791937559!3d30.6868582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef1e5c7e3d0d%3A0xd9b1c6e7b5c7c9e!2sChandigarh%20Group%20of%20Colleges%20-%20Landran%2C%20Mohali!5e0!3m2!1sen!2sin!4v1712399854831!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CGC Landran Map"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

