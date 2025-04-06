import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Team from "@/components/team"

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="pt-20">
        <Team />
      </div>
      <Footer />
    </main>
  )
}

