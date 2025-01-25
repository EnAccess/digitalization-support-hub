"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function Participation() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Submitted email:", email)
    setEmail("")
  }

  return (
    <section className="w-full bg-[#1B75BA]  text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Get Involved</h2>
        <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
          Do you have ideas, feedback, or want to actively contribute? Join us
          in shaping the future of digitalization for SMEs.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-full focus:outline-none text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-r-full hover:bg-yellow-300 transition duration-300"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
