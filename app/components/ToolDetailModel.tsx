"use client"

import { Users, DollarSign, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import Link from "next/link"

export interface ToolDetailModalProps {
  isOpen: boolean
  onClose: () => void
  tool: {
    id?: number
    company: string
    name: string
    summary: string
    categories: string[]
    logo: string
    link: string
    license: string
    user_type: string[]
    pricing: string
    free_demo_available: boolean
    interoperatibility: string[]
    interoperability_pricing: string
    documentation: string
    offline_functionality: string
    business_type: string[]
  } | null
}

export function ToolDetailModal({
  isOpen,
  onClose,
  tool,
}: ToolDetailModalProps) {
  if (!tool) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-col items-start space-y-2">
          <div className="w-full flex items-center text-sm text-gray-500 mb-1 sm:block lg:hidden">
            <Link href="#" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="#" className="hover:underline">
              Suggested Tools
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-600">{tool.name}</span>
          </div>

          <DialogClose className="ml-auto h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100"></DialogClose>

          <div>
            <div className="text-sm text-gray-500">{tool.company}</div>
            <DialogTitle className="text-2xl font-bold">
              {tool.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mt-2">
          {/* First evaluate the condition, THEN render JSX */}
          {((tool.business_type && tool.business_type.length > 0) ||
            tool.license) && (
            <div className="flex flex-wrap gap-2 w-full">
              {[
                ...(tool.business_type || []),
                ...(Array.isArray(tool.license)
                  ? tool.license
                  : tool.license
                    ? [`${tool.license}`]
                    : []),
              ].map((category, index) => {
                const colors = [
                  "bg-[#43BC80]",
                  "bg-[#8BDC7F]",
                  "bg-[#5AC9C5]",
                  "bg-[#67C6AB]",
                ]
                const colorIndex = index % colors.length
                const colorClass = colors[colorIndex]
                return (
                  <Badge
                    key={`${category}-${index}`}
                    className={`${colorClass} rounded-full text-[#161D1A] font-bold text-sm`}
                    style={{
                      minWidth: "auto",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: colorClass
                        .replace("bg-[", "")
                        .replace("]", ""),
                    }}
                  >
                    {category}
                  </Badge>
                )
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-6">
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-700">
                {tool.summary ||
                  "A open source digital platform for managing off-grid energy projects. It allows to manage customers, revenues, energy assets, like meters, PayGo and other deferred payment-based appliance sales with this all-in one platform with payment provider and meter integrations."}
              </p>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                Interoperability, Data Exchange & Integrations
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {tool?.interoperatibility ? (
                  Array.isArray(tool.interoperatibility) ? (
                    tool.interoperatibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <li>{tool.interoperatibility}</li>
                  )
                ) : (
                  <>
                    <li>No interoperability information available</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Pricing</h3>
              <div className="flex items-start gap-3">
                <DollarSign className="h-6 w-6 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {tool?.pricing || "By time based license"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tool.pricing ||
                      "The tool is 100% free for 2025, with pricing for subsequent years yet to be determined."}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">User Types</h3>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {tool?.user_type ? "Suitable for" : "General Users"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {Array.isArray(tool?.user_type)
                      ? tool.user_type.join(", ")
                      : tool?.user_type || "Basic digital literacy required"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Documentation & Guides
              </h3>
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {tool?.documentation
                      ? "Documentation Available"
                      : "Documentation"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {typeof tool?.documentation === "string"
                      ? tool.documentation
                      : Array.isArray(tool?.documentation)
                        ? tool.documentation
                        : "Please contact the vendor for documentation and guides."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            className="bg-[#17412C] hover:bg-[#143728]"
            onClick={() => window.open(tool.link || "#", "_blank")}
          >
            Visit website
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
