import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Gallery from "@/components/gallery"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="pt-20">
        <Gallery />
      </div>
      <Footer />
    </main>
  )
}

