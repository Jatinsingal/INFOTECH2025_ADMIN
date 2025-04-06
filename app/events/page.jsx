import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Events from "@/components/events"

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="pt-20">
        <Events />
      </div>
      <Footer />
    </main>
  )
}

