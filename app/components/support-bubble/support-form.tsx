"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface SupportFormProps {
  onSubmitSuccess: () => void
}

export function SupportForm({ onSubmitSuccess }: SupportFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setError(null) // Clear any previous errors
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    // Get the selected radio button values
    const companySize = formData.get("companySize") as string
    const transactions = formData.get("transactions") as string

    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      companySize,
      revenue: formData.get("revenue") as string,
      transactions,
      country: formData.get("country") as string,
      application: formData.get("application") as string,
    }

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit form")
      }

      const result = await response.json()
      console.log("Form submitted successfully:", result)
      onSubmitSuccess()
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2">
      {/* Left side - Form header */}
      <div className="p-6 md:p-10">
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4 text-gray-500 uppercase">
            APPLY FOR TECHNICAL SUPPORT
          </h2>
          <h3 className="text-2xl font-medium mb-4">
            We offer technical assistance to support eligible businesses in
            digitalizing their operations..
          </h3>
          <p className="text-gray-600">
            Please fill out the form with details about your company and submit
            a short application. Make sure to highlight your specific needs and
            why we should support you (compared to others). Our team will review
            your request and get back to you with the next steps if your company
            qualifies.
          </p>
        </div>
      </div>

      {/* Right side - Form fields */}
      <div className="bg-white p-6 md:p-10">
        <h2 className="text-xl font-medium mb-6 md:hidden">Need more help?</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          onChange={handleFormChange}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="name" className="text-sm">
              Name <span className="text-gray-400">(optional)</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              className="mt-1"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-sm">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              placeholder="Enter your company name"
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@domain.com"
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label className="text-sm">Size of company</Label>
            <RadioGroup
              defaultValue="<5"
              name="companySize"
              className="mt-1"
              disabled={isSubmitting}
            >
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="<5" id="r1" disabled={isSubmitting} />
                <Label htmlFor="r1" className="flex-grow cursor-pointer">
                  &lt;5 employees
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="5-10" id="r2" disabled={isSubmitting} />
                <Label htmlFor="r2" className="flex-grow cursor-pointer">
                  5-10 employees
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="11-20" id="r3" disabled={isSubmitting} />
                <Label htmlFor="r3" className="flex-grow cursor-pointer">
                  11-20 employees
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value=">20" id="r4" disabled={isSubmitting} />
                <Label htmlFor="r4" className="flex-grow cursor-pointer">
                  &gt;20 employees
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="revenue" className="text-sm">
              Average yearly revenue / total revenue last year{" "}
              <span className="text-gray-400">(optional)</span>
            </Label>
            <Input
              id="revenue"
              name="revenue"
              placeholder="Enter the amount"
              className="mt-1"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label className="text-sm">Number of transactions per week</Label>
            <RadioGroup
              defaultValue="<15"
              name="transactions"
              className="mt-1"
              disabled={isSubmitting}
            >
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="<15" id="t1" disabled={isSubmitting} />
                <Label htmlFor="t1" className="flex-grow cursor-pointer">
                  &lt;15
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="15-75" id="t2" disabled={isSubmitting} />
                <Label htmlFor="t2" className="flex-grow cursor-pointer">
                  15-75
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem
                  value="75-500"
                  id="t3"
                  disabled={isSubmitting}
                />
                <Label htmlFor="t3" className="flex-grow cursor-pointer">
                  75-500
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value=">500" id="t4" disabled={isSubmitting} />
                <Label htmlFor="t4" className="flex-grow cursor-pointer">
                  &gt;500
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="country" className="text-sm">
              Country/countries of operation
            </Label>
            <Input
              id="country"
              name="country"
              placeholder="e.g. Nigeria..."
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="application" className="text-sm">
              Short application
            </Label>
            <Textarea
              id="application"
              name="application"
              placeholder="Tell us why you need support..."
              className="min-h-[100px] mt-1"
              required
              maxLength={250}
              disabled={isSubmitting}
            />
            <p className="text-xs text-right mt-1 text-gray-500">
              Max. 250 characters
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={cn(
                "rounded-full px-6 py-2",
                isFormValid
                  ? "bg-[#004d2c] hover:bg-[#003d23] text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              )}
              variant={isFormValid ? "default" : "secondary"}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
