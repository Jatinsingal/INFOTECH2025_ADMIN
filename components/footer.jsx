import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/infotech-logo.png"
                alt="Infotech Club Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="font-bold text-xl text-white">Infotech Club</span>
            </div>
            <p className="text-gray-400 mb-4">
              The biggest tech club of IT Department at CGC Landran. Founded in January 2025.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/info_tech_cgc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                <Instagram size={20} />
              </a>
              <a href="mailto:jatinsingal456@gmail.com" className="text-gray-400 hover:text-purple-400 transition">
                <Mail size={20} />
              </a>
              <a href="tel:+919694620296" className="text-gray-400 hover:text-purple-400 transition">
                <Phone size={20} />
              </a>
              <a
                href="https://maps.app.goo.gl/8zheqikA9gBgsnva8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                <MapPin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-purple-400 transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-400 hover:text-purple-400 transition">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-purple-400 transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Events</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-400 hover:text-purple-400 transition">
                  CodeQuest
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-purple-400 transition">
                  IgniteFest
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-purple-400 transition">
                  Eminence
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-purple-400 transition">
                  Workshops
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">Chandigarh Engineering College</p>
              <p className="mb-2">CGC Landran, Mohali</p>
              <p className="mb-2">Punjab, India</p>
              <p className="mb-2">
                <a href="tel:+919694620296" className="hover:text-purple-400 transition">
                  +91 9694620296
                </a>
              </p>
              <p className="mb-2">
                <a href="mailto:jatinsingal456@gmail.com" className="hover:text-purple-400 transition">
                  jatinsingal456@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} Infotech Club - CGC Landran. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

