import { NextResponse } from "next/server"

// In a real application, this would be stored in a database
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

// GET all events
export async function GET() {
  return NextResponse.json({ events })
}

// POST a new event
export async function POST(request) {
  try {
    const newEvent = await request.json()

    // Generate a new ID
    const maxId = Math.max(...events.map((event) => event.id), 0)
    newEvent.id = maxId + 1

    // Add the new event
    events.push(newEvent)

    return NextResponse.json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ success: false, message: "Failed to create event" }, { status: 500 })
  }
}

