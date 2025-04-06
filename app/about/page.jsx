import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import About from "@/components/about"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </main>
  )
}

