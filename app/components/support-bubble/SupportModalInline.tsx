import { useState } from "react"
import { X } from "lucide-react"

export function SupportModalInline() {
  const [isOpen, setIsOpen] = useState(true)
  if (!isOpen) return null

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <div className="rounded-lg bg-white p-6 shadow-xl relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <h3 className="text-xl font-medium mb-2">Need support?</h3>
        <p className="text-base text-gray-700 mb-6">
          We offer free technical support to eligible businesses—just fill out a
          quick form to request help!
        </p>
        <div className="flex justify-center">
          <a
            href="https://enaccess.typeform.com/tech-assist"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-6 py-2 bg-white border border-[#004d2c] text-[#004d2c] hover:bg-gray-50"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            Apply for technical support
          </a>
        </div>
      </div>
    </div>
  )
}
