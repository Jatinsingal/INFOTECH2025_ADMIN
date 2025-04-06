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

// GET a specific event
export async function GET(request, { params }) {
  const id = Number.parseInt(params.id)
  const event = events.find((e) => e.id === id)

  if (!event) {
    return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
  }

  return NextResponse.json({ event })
}

// PUT (update) a specific event
export async function PUT(request, { params }) {
  try {
    const id = Number.parseInt(params.id)
    const updatedEvent = await request.json()

    const index = events.findIndex((e) => e.id === id)

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
    }

    // Preserve the ID
    updatedEvent.id = id

    // Update the event
    events[index] = updatedEvent

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    })
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json({ success: false, message: "Failed to update event" }, { status: 500 })
  }
}

// DELETE a specific event
export async function DELETE(request, { params }) {
  const id = Number.parseInt(params.id)
  const index = events.findIndex((e) => e.id === id)

  if (index === -1) {
    return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
  }

  // Remove the event
  events.splice(index, 1)

  return NextResponse.json({
    success: true,
    message: "Event deleted successfully",
  })
}

