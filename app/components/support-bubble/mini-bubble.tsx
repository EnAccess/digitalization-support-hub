"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function MiniBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating bubble button */}
      <div className="fixed bottom-24 left-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#004d2c] text-white shadow-lg hover:bg-[#00613a] transition-all"
          aria-label="Open support bubble"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-help-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </button>
      </div>

      {/* Inline modal below results */}
      {isOpen && (
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
              We offer free technical support to eligible businesses—just fill
              out a quick form to request help!
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
      )}
    </>
  )
}
