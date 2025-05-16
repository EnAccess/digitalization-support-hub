"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SupportPromptProps {
  onClose: () => void
  onApplySupport: () => void
}

export function SupportPrompt({ onClose, onApplySupport }: SupportPromptProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-xl relative">
      <button
        onClick={onClose}
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
        <Button
          onClick={onApplySupport}
          className="rounded-full px-6 py-2 bg-white border border-[#004d2c] text-[#004d2c] hover:bg-gray-50"
          variant="outline"
        >
          Apply for technical support
        </Button>
      </div>
    </div>
  )
}
