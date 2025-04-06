// Simple utility to handle authentication checks safely
export function checkAuth() {
  if (typeof window === "undefined") {
    return null // Return null on server-side
  }

  try {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("Auth check failed:", error)
    return null
  }
}

// Safe logout function
export function logout(router) {
  try {
    localStorage.removeItem("user")
  } catch (error) {
    console.error("Logout failed:", error)
  }

  // Always redirect regardless of localStorage success
  if (router) {
    router.push("/")
  }
}

