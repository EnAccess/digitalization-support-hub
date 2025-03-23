"use client"

import { Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

interface ToolDetailModalProps {
  isOpen: boolean
  onClose: () => void
  tool: {
    id?: number
    company: string
    name: string
    summary: string
    categories: string[]
    isFree?: boolean
    link?: string
    features?: string[]
    integrations?: string[]
    pricing?: {
      model: string
      description: string
    }
    userTypes?: {
      label: string
      description: string
    }[]
    documentation?: {
      title: string
      description: string
    }[]
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
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="text-sm text-gray-500">{tool.company}</div>
            <DialogTitle className="text-2xl font-bold">
              {tool.name}
            </DialogTitle>
          </div>
          <DialogClose className="h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100">
            {/* <X className="h-4 w-4" />
            <span className="sr-only">Close</span> */}
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mt-2">
          {tool.isFree && (
            <Badge className="bg-[#8BDC7F] hover:bg-[#43A047]">100% free</Badge>
          )}
          {tool.categories?.map((feature, index) => (
            <Badge key={index} className="bg-[#4CAF50] hover:bg-[#43A047]">
              {feature}
            </Badge>
          )) || (
            <>
              <Badge className="bg-[#4CAF50] hover:bg-[#43A047]">
                Open Source
              </Badge>
              <Badge className="bg-[#4CAF50] hover:bg-[#43A047]">
                Some open source features
              </Badge>
              <Badge className="bg-[#4CAF50] hover:bg-[#43A047]">
                Free demo
              </Badge>
            </>
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
                {tool.integrations?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || (
                  <>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
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
                    {tool.pricing?.model || "By time based license"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tool.pricing?.description ||
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
                    {tool.userTypes?.[0]?.label || "Label"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tool.userTypes?.[0]?.description || "Secondary text"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Documentation & Guides
              </h3>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {tool.documentation?.[0]?.title || "User Guides"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tool.documentation?.[0]?.description || "Secondary text"}
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
