import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, Trophy } from "lucide-react"

const events = [
  {
    id: 1,
    title: "CodeQuest",
    description:
      "Our inaugural event featuring three challenging rounds: Quiz, DSA, and Group Discussion. Participants showcase their technical knowledge and problem-solving skills.",
    image: "/images/codequest1.png",
    date: "February 2025",
    participants: "150+",
    rounds: 3,
    badge: "Technical",
  },
  {
    id: 2,
    title: "IgniteFest",
    description:
      "A technical extravaganza with five different competitions designed to test various aspects of technical knowledge and creativity.",
    image: "/images/ignitefest1.png",
    date: "February-March 2025",
    participants: "300+",
    rounds: 5,
    badge: "Technical",
  },
  {
    id: 3,
    title: "Eminence",
    description:
      "Our flagship event and the largest technical fest at CGC Landran with 17 different competitions spanning various technical domains.",
    image: "/images/eminence2.png",
    date: "March 2025",
    participants: "1500+",
    rounds: 17,
    badge: "Flagship",
  },
  {
    id: 4,
    title: "Workshops",
    description:
      "Regular workshops on cutting-edge technologies, industry practices, and skill development to keep students updated with the latest trends.",
    image: "/images/codequest2.png",
    date: "Year-round",
    participants: "Varies",
    rounds: null,
    badge: "Learning",
  },
]

export default function Events() {
  return (
    <section id="events" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Events</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We organize various technical and non-technical events throughout the year to promote learning, innovation,
            and community building.
          </p>
          <div className="w-20 h-1 bg-purple-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-800 border-gray-700"
            >
              <div className="relative h-48 w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-purple-400">{event.title}</CardTitle>
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
                    {event.badge}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2 text-gray-400">
                  <CalendarDays size={16} className="text-gray-400" />
                  {event.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{event.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{event.participants} Participants</span>
                </div>
                {event.rounds && (
                  <div className="flex items-center gap-1">
                    <Trophy size={16} />
                    <span>{event.rounds} Competitions</span>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

