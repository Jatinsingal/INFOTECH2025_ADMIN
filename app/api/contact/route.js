import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    // In a real application, you would:
    // 1. Validate input data
    // 2. Send email using a service like Nodemailer, SendGrid, etc.
    // 3. Store contact message in database if needed

    // For this example, we'll simulate a successful contact form submission
    if (name && email && subject && message) {
      // Log the contact form data (in a real app, you would send an email)
      console.log(`Contact form submission to: jatinsingal456@gmail.com`)
      console.log(`From: ${name} (${email})`)
      console.log(`Subject: ${subject}`)
      console.log(`Message: ${message}`)

      return NextResponse.json({
        success: true,
        message: "Message sent successfully",
      })
    }

    // Return error for invalid data
    return NextResponse.json({ success: false, message: "Please fill all required fields" }, { status: 400 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

