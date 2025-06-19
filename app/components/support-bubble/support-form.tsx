"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface SupportFormProps {
  onSubmitSuccess: () => void
}

export function SupportForm({ onSubmitSuccess }: SupportFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  // Add form validation check
  const checkFormValidity = (form: HTMLFormElement) => {
    const requiredFields = [
      form.company.value,
      form.email.value,
      form.country.value,
      form.application.value,
    ]
    return requiredFields.every((field) => field.trim().length > 0)
  }

  // Update form validity on input change
  const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    setIsFormValid(checkFormValidity(form))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      onSubmitSuccess()
    } catch (error) {
      console.error("Error submitting form:", error)
      // Handle error state here
    } finally {
      setIsSubmitting(false)
    }
  }

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
