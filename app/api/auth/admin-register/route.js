import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { fullName, email, password, adminCode } = await request.json()

    // In a real application, you would validate the admin code against a secure value
    // This is a simplified example - in production, use environment variables for this
    const validAdminCode = "INFOTECH2025"

    if (adminCode !== validAdminCode) {
      return NextResponse.json({ success: false, message: "Invalid admin code" }, { status: 403 })
    }

    // If admin code is valid, create admin user
    if (fullName && email && password) {
      // In a real app, you would:
      // 1. Hash the password
      // 2. Store user in database with admin role
      // 3. Send confirmation email

      return NextResponse.json({
        success: true,
        message: "Admin registration successful",
        user: {
          email,
          name: fullName,
          role: "admin",
        },
      })
    }

    return NextResponse.json({ success: false, message: "Invalid registration data" }, { status: 400 })
  } catch (error) {
    console.error("Admin registration error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

