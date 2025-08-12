"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { FilterState } from "../types"

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: FilterDrawerProps) {
  const [tempFilters, setTempFilters] = useState<FilterState>(filters)

  useEffect(() => {
    setTempFilters(filters)
  }, [filters])

  const togglePricing = (value: string) => {
    const newPricing = tempFilters.pricing.includes(value)
      ? tempFilters.pricing.filter((p) => p !== value)
      : [...tempFilters.pricing, value]
    setTempFilters({ ...tempFilters, pricing: newPricing })
  }

  const toggleBusinessType = (value: string) => {
    const newTypes = tempFilters.businessTypes.includes(value)
      ? tempFilters.businessTypes.filter((t) => t !== value)
      : [...tempFilters.businessTypes, value]
    setTempFilters({ ...tempFilters, businessTypes: newTypes })
  }

  const toggleLicensing = (value: string) => {
    const newLicensing = tempFilters.licensing.includes(value)
      ? tempFilters.licensing.filter((l) => l !== value)
      : [...tempFilters.licensing, value]
    setTempFilters({ ...tempFilters, licensing: newLicensing })
  }

  const clearAllFilters = () => {
    const emptyFilters = {
      pricing: [],
      businessTypes: [],
      licensing: [],
      DataExport: false,
      unidirectionalAPI: false,
      bidirectionalAPI: false,
      automatedDataExchange: false,
    }
    setTempFilters(emptyFilters)
    onFiltersChange(emptyFilters)
    onClose()
  }

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
        </SheetHeader>

        {/* Business Types */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Business Type</h4>
          <div className="space-y-2 space-x-2">
            {["Mini Grids", "SHS", "Clean Cooking"].map((type) => (
              <Button
                key={type}
                variant={
                  tempFilters.businessTypes.includes(type)
                    ? "default"
                    : "outline"
                }
                size="sm"
                className={cn(
                  "rounded-md text-sm font-normal justify-start h-auto px-3 py-2",
                  tempFilters.businessTypes.includes(type)
                    ? "bg-[#17412C] text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => toggleBusinessType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Pricing</h4>
          <div className="space-y-2 space-x-2">
            {["Free version", "Free demo"].map((price) => (
              <Button
                key={price}
                variant={
                  tempFilters.pricing.includes(price) ? "default" : "outline"
                }
                size="sm"
                className={cn(
                  "rounded-md text-sm font-normal justify-start h-auto px-3 py-2",
                  tempFilters.pricing.includes(price)
                    ? "bg-[#17412C] text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => togglePricing(price)}
              >
                {price}
              </Button>
            ))}
          </div>
        </div>

        {/* Licensing */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Licensing</h4>
          <div className="space-y-2">
            {["Fully Open Source", "Partially Open Source"].map((license) => (
              <Button
                key={license}
                variant={
                  tempFilters.licensing.includes(license)
                    ? "default"
                    : "outline"
                }
                size="sm"
                className={cn(
                  "rounded-md text-sm font-normal justify-start h-auto px-3 py-2",
                  tempFilters.licensing.includes(license)
                    ? "bg-[#17412C] text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => toggleLicensing(license)}
              >
                {license}
              </Button>
            ))}
          </div>
        </div>

        {/* Interoperability */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Interoperability</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm">Data Export available</label>
              <Switch
                checked={tempFilters.DataExport}
                onCheckedChange={(checked) =>
                  setTempFilters({ ...tempFilters, DataExport: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">
                Unidirectional data exchange via API
              </label>
              <Switch
                checked={tempFilters.unidirectionalAPI}
                onCheckedChange={(checked) =>
                  setTempFilters({ ...tempFilters, unidirectionalAPI: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">
                Bidirectional data exchange via API
              </label>
              <Switch
                checked={tempFilters.bidirectionalAPI}
                onCheckedChange={(checked) =>
                  setTempFilters({ ...tempFilters, bidirectionalAPI: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">
                Automated data exchange with selected tools
              </label>
              <Switch
                checked={tempFilters.automatedDataExchange}
                onCheckedChange={(checked) =>
                  setTempFilters({
                    ...tempFilters,
                    automatedDataExchange: checked,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white"
              onClick={handleApplyFilters}
            >
              Apply filters
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
