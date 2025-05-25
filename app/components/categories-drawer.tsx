"use client"

import { useState, useEffect } from "react"
import { X, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ToolDetailModal, type ToolDetailModalProps } from "./ToolDetailModel"
import { Tool } from "../types"

interface CategoryMapItem {
  name: string
  subcategories: string[]
}

interface CategoryMap {
  [key: string]: CategoryMapItem
}

const categoryMap: CategoryMap = {
  preparation: {
    name: "Preparation & Setup",
    subcategories: [
      "Market Analysis",
      "Company Set Up",
      "Bookkeeping & Accounting",
      "Product Procurement",
      "Fundraising",
    ],
  },
  distribution: {
    name: "Distribution & Sales",
    subcategories: [
      "Stock Management",
      "Personal Training",
      "Marketing",
      "Customer Vetting",
      "Product Logistics & Procurement",
      "Sales & Contract Management",
    ],
  },
  operations: {
    name: "After Sales & Operations",
    subcategories: [
      "Payment Collections",
      "Service Calls",
      "Tech Response",
      "Upselling",
    ],
  },
  optimize: {
    name: "Assess & Optimize",
    subcategories: [
      "Portfolio Analysis & Management",
      "Impact Measurements & Performance",
    ],
  },
  endoflife: {
    name: "Product End-of-Life",
    subcategories: ["Repossession & Reverse logistics", "E-Waste Management"],
  },
}

const categories = [
  { id: "preparation", name: "Preparation & Set up", count: null },
  { id: "distribution", name: "Distribution & Sales", count: null },
  { id: "operations", name: "After Sales & Operations", count: null },
  { id: "optimize", name: "Assess & Optimize", count: null },
  { id: "endoflife", name: "Product End-of-Life", count: null },
]

interface ToolCategoriesDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCategorySelect: (categories: string[]) => void
  tools: Tool[]
  selectedCategories: string[] // Add this prop to receive selected categories from parent
}

export function ToolCategoriesDrawer({
  open,
  onOpenChange,
  onCategorySelect,
  tools,
  selectedCategories = [], // Default to empty array
}: ToolCategoriesDrawerProps) {
  // Use the selectedCategories prop as initial state
  const [localSelectedCategories, setLocalSelectedCategories] =
    useState<string[]>(selectedCategories)
  const [showResults, setShowResults] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  )
  const [isToolModalOpen, setIsToolModalOpen] = useState<boolean>(false)
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [categorySelectionCounts, setCategorySelectionCounts] = useState<
    Record<string, number>
  >({})

  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedCategories(selectedCategories)

    // If we have selected categories, show results view
    if (selectedCategories.length > 0) {
      setShowResults(true)

      // Find the category that matches the selected subcategory
      const categoryId = Object.keys(categoryMap).find((key) =>
        categoryMap[key].subcategories.some((sub) =>
          selectedCategories.includes(sub)
        )
      )

      if (categoryId) {
        setActiveCategory(categoryId)
      }
    }
  }, [selectedCategories])

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // Update category counts when subcategories change
  useEffect(() => {
    // Count selected subcategories per category
    const counts: Record<string, number> = {}

    Object.keys(categoryMap).forEach((categoryId) => {
      const subcategories = categoryMap[categoryId].subcategories
      const count = localSelectedCategories.filter((subcat) =>
        subcategories.includes(subcat)
      ).length

      if (count > 0) {
        counts[categoryId] = count
      }
    })

    setCategorySelectionCounts(counts)
  }, [localSelectedCategories])

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId)
    // Clear previously selected subcategories when changing categories
    setSelectedSubcategories([])
  }

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    )
  }

  const handleApplyFilter = () => {
    if (selectedSubcategories.length > 0) {
      // Update local state
      setLocalSelectedCategories(selectedSubcategories)
      // Notify parent component
      onCategorySelect(selectedSubcategories)
      setShowResults(true)
    }
  }

  const handleBackToSubcategories = () => {
    setShowResults(false)
  }

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool)
    setIsToolModalOpen(true)
  }

  const handleCategoryChipClick = (categoryId: string) => {
    setActiveCategory(categoryId)

    // Get all subcategories for this category
    const subcategories = categoryMap[categoryId].subcategories

    // Select the first subcategory by default
    if (subcategories.length > 0) {
      setSelectedSubcategories([subcategories[0]])
    }
  }

  // Filter tools based on selected categories
  const filteredTools = tools.filter((tool) => {
    return (
      localSelectedCategories.length === 0 ||
      (tool.categories &&
        localSelectedCategories.some((category) =>
          tool.categories!.includes(category)
        ))
    )
  })

  // Results view
  if (showResults) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="left"
          className="w-full sm:max-w-md p-0 flex flex-col"
        >
          <div className="p-4 flex items-center gap-2 border-b">
            <Button
              variant="ghost"
              className="p-0 h-auto"
              onClick={handleBackToSubcategories}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-medium">Tool categories</h2>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <Link href="#" className="text-sm flex items-center">
                All categories <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex gap-2 overflow-x-auto py-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  className={cn(
                    "rounded-full text-xs whitespace-nowrap",
                    activeCategory === category.id
                      ? "bg-[#2D6A4F] text-white border-[#2D6A4F] hover:bg-[#1B4332]"
                      : "border-gray-300"
                  )}
                  onClick={() => handleCategoryChipClick(category.id)}
                >
                  {category.name}{" "}
                  {categorySelectionCounts[category.id] &&
                    `(${categorySelectionCounts[category.id]})`}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-0 overflow-auto bg-[#F9FBFA]">
            <div className="p-4 text-sm text-[#0D261A]">
              {filteredTools.length} items
            </div>

            <div
              className={`grid ${
                isMobile ? "grid-cols-1" : "sm:grid-cols-2"
              } gap-4 px-4 pb-4`}
            >
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <Card
                    key={tool.name}
                    className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow bg-white p-4"
                    onClick={() => handleToolClick(tool)}
                  >
                    <CardHeader className="pb-2 px-0 pt-0">
                      <div className="text-base font-light text-[#1E1F1E]">
                        {tool.company}
                      </div>
                      <CardTitle className="text-lg font-bold text-[#0D261A]">
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 px-0">
                      <p className="font-normal text-[#1E1F1E] text-base">
                        {tool.summary}
                      </p>
                    </CardContent>

                    {((tool.business_type?.length ?? 0) > 0 ||
                      tool.license) && (
                      <CardFooter className="mt-4">
                        <div className="flex flex-wrap gap-2 w-full">
                          {/* Convert license to array if it's a string */}
                          {[
                            ...(tool.business_type || []),
                            ...(Array.isArray(tool.license)
                              ? tool.license
                              : tool.license
                                ? [tool.license]
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
                      </CardFooter>
                    )}
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center py-4">
                  <span className="text-gray-600">
                    No tools found for the selected filters
                  </span>
                </div>
              )}
            </div>

            {filteredTools.length > 8 && (
              <div className="p-4 flex justify-center">
                <Button variant="outline" className="text-sm">
                  View more
                </Button>
              </div>
            )}
          </div>
        </SheetContent>

        {selectedTool && (
          <ToolDetailModal
            tool={
              selectedTool as unknown as NonNullable<
                ToolDetailModalProps["tool"]
              >
            }
            isOpen={isToolModalOpen}
            onClose={() => setIsToolModalOpen(false)}
          />
        )}
      </Sheet>
    )
  }

  // Subcategory selection view
  if (activeCategory) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="left"
          className="w-full sm:max-w-md p-0 flex flex-col"
        >
          <div className="p-4 flex items-center gap-2 border-b">
            <Button
              variant="ghost"
              className="p-0 h-auto"
              onClick={() => setActiveCategory(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-medium">{categoryMap[activeCategory].name}</h2>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <div className="space-y-2">
                {categoryMap[activeCategory].subcategories.map(
                  (subcategory) => (
                    <div key={subcategory} className="flex items-center">
                      <input
                        type="checkbox"
                        id={subcategory}
                        checked={selectedSubcategories.includes(subcategory)}
                        onChange={() => handleSubcategoryToggle(subcategory)}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor={subcategory} className="text-sm">
                        {subcategory}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <Button
              className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white"
              onClick={handleApplyFilter}
              disabled={selectedSubcategories.length === 0}
            >
              Apply filter
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  // Initial categories view
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-md p-0 flex flex-col"
      >
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#0D261A]">
              Tool categories
            </h2>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-auto">
          <div className="p-4 space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="border-b pb-4 last:border-b-0">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 font-medium text-[#0D261A]"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
