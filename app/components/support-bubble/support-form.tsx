"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface SupportFormProps {
  onSubmitSuccess: () => void
}

export function SupportForm({ onSubmitSuccess }: SupportFormProps) {
  const [showBanner, setShowBanner] = useState(true)

  // Update form validity on input change

  return (
    <div className="">
      {/* Left side - Form header */}
      <div className="p-6 md:p-10">
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4 text-gray-500 uppercase">
            APPLY FOR TECHNICAL SUPPORT
          </h2>
          {showBanner && (
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    The Apply for Technical Support form will be available in
                    June. Thank you for your patience and we look forward to
                    assisting you soon!{" "}
                  </span>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="hover:bg-purple-800 rounded p-1 transition-colors flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          <h3 className="text-2xl font-medium mb-4">
            We offer technical assistance to support eligible businesses in
            digitalizing their operations.
          </h3>
        </div>
      </div>

      {/* Right side - Form fields */}
      <div className="bg-white p-6 md:p-10">
        <h2 className="text-xl font-medium mb-6 md:hidden">Need more help?</h2>
      </div>
    </div>
  )
}
