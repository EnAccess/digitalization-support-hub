"use client"

import { useState, useEffect, useMemo } from "react"
import { ChevronRight, ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet"
import CategoryDisplay from "./CategoryDisplay"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ToolDetailModal, type ToolDetailModalProps } from "./ToolDetailModel"
import { Tool } from "../types"
import yaml from "js-yaml"
import { Checkbox } from "@/components/ui/checkbox"
import { FilterDrawer } from "./FilterDrawer"
import { FilterState } from "../types"
import { SuggestionBanner } from "./suggestion-banner"

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
      "Customer Finance Management",
      "CRM",
      "HR Management",
    ],
  },
  optimize: {
    name: "Assess & Optimize",
    subcategories: [
      "Portfolio Analysis & Management",
      "Impact Measurements & Performance",
      "Remote Team Management",
      "API Integration & connection",
      "Data Download",
    ],
  },
  endoflife: {
    name: "Product End-of-Life",
    subcategories: [
      "Repossession & Reverse logistics",
      "E-Waste Management",
      "Repair, Refurbishment Facilitation",
    ],
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
  selectedCategories: string[]
  questionnaireAnswers?: Record<string, string[]> // Add this
}

export function ToolCategoriesDrawer({
  open,
  onOpenChange,
  onCategorySelect,
  selectedCategories = [],
}: ToolCategoriesDrawerProps) {
  // Add localSelectedCategories state
  const [localSelectedCategories, setLocalSelectedCategories] =
    useState<string[]>(selectedCategories)
  const [tools, setTools] = useState<Tool[]>([])
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
  // Add to component state
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    pricing: [],
    businessTypes: [],
    licensing: [],
    DataExport: false,
    unidirectionalAPI: false,
    bidirectionalAPI: false,
    automatedDataExchange: false,
  })

  // Add the displayNames mapping
  const displayNames: Record<string, string> = {
    DataExport: "Data Export available",
    unidirectionalAPI: "Unidirectional data exchange via API",
    bidirectionalAPI: "Bidirectional data exchange via API",
    automatedDataExchange: "Automated data exchange with selected tools",
    Free: "Free",
    "Free Version or Free Demo": "Free Demo",
  }

  // Load tools from YAML files
  const loadTools = async () => {
    try {
      const toolFiles = [
        "/tools/paygee.yaml",
        "/tools/odoo.yaml",
        "/tools/quickbooks.yaml",
        "/tools/upya.yaml",
        "/tools/xero.yaml",
        "/tools/odyssey.yaml",
        "/tools/unleashed.yaml",
        "/tools/3cx.yaml",
        "/tools/d-rec.yaml",
        "/tools/ixo.yaml",
        "/tools/p-rec.yaml",
        "/tools/challenges.yaml",
        "/tools/carbon-clear.yaml",
        "/tools/cavex.yaml",
        "/tools/bridgin.yaml",
        "/tools/d-rec-financing-programmes.yaml",
        "/tools/fieldPro.yaml",
        "/tools/Learn.ink.yaml",
        "/tools/micropowerManager.yaml",
        "/tools/nithio.yaml",
        "/tools/odyssey-fern.yaml",
        "/tools/paygops.yaml",
        "/tools/vida.yaml",
        "/tools/angaza.yaml",
        "/tools/prospect.yaml",
        "/tools/universus.yaml",
        "/tools/market-Map.yaml",
        "/tools/qgis.yaml",
        "/tools/development-maps.yaml",
        "/tools/energy-access-explorer.yaml",
        "/tools/wps.yaml",
        "/tools/zoho.yaml",
        "/tools/Federated Core.yaml",
      ]

      const loadedTools = await Promise.all(
        toolFiles.map(async (file) => {
          const response = await fetch(file)
          const text = await response.text()
          return yaml.load(text) as Tool
        })
      )

      setTools(loadedTools)
    } catch (error) {
      console.error("Error loading YAML files:", error)
    }
  }

  useEffect(() => {
    if (open) {
      loadTools()
    }
  }, [open])

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

  const hasCategorySelections = (categoryId: string) => {
    const subcategories = categoryMap[categoryId].subcategories
    return localSelectedCategories.some((selected) =>
      subcategories.includes(selected)
    )
  }

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId)
    // Pre-select any existing subcategories for this category
    const existingSelectionsForCategory = localSelectedCategories.filter(
      (subcat) => categoryMap[categoryId].subcategories.includes(subcat)
    )
    setSelectedSubcategories(existingSelectionsForCategory)
  }
  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories((prev) => {
      const isSelected = prev.includes(subcategory)
      if (isSelected) {
        // Remove the subcategory
        return prev.filter((item) => item !== subcategory)
      } else {
        // Add the subcategory while keeping other selections
        return [...prev, subcategory]
      }
    })
  }

  const handleApplyFilter = () => {
    if (selectedSubcategories.length > 0) {
      // Get existing subcategories from other categories
      const otherCategoriesSelections = localSelectedCategories.filter(
        (subcat) => !categoryMap[activeCategory!].subcategories.includes(subcat)
      )

      // Combine existing selections with new ones
      const updatedSelections = [
        ...otherCategoriesSelections,
        ...selectedSubcategories,
      ]

      // Update local state
      setLocalSelectedCategories(updatedSelections)
      // Notify parent component
      onCategorySelect(updatedSelections)
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
    setShowResults(false) // Hide results view
    setSelectedSubcategories(
      localSelectedCategories.filter((subcat) =>
        categoryMap[categoryId].subcategories.includes(subcat)
      )
    ) // Pre-select existing subcategories for this category
  }

  // First, update the main filtering function for categories (OR logic)
  const filteredTools = useMemo(() => {
    // First filter by categories (OR logic)
    const categoryFiltered = tools.filter(
      (tool) =>
        localSelectedCategories.length === 0 ||
        (tool.categories &&
          localSelectedCategories.some((category) =>
            tool.categories.includes(category)
          ))
    )

    // Then apply other filters (AND logic)
    return categoryFiltered.filter((tool) => {
      const matchesBusinessType =
        filters.businessTypes.length === 0 ||
        filters.businessTypes.every((type) =>
          tool.business_type?.includes(type)
        )

      const matchesLicense =
        filters.licensing.length === 0 ||
        filters.licensing.every((license) => {
          if (Array.isArray(tool.license)) {
            return tool.license.includes(license)
          }
          return tool.license === license
        })

      const matchesPricing =
        filters.pricing.length === 0 ||
        (filters.pricing.includes("Free version") && tool.is_free) ||
        (filters.pricing.includes("Free demo") && tool.free_demo_available)

      const matchesInteroperability =
        (!filters.DataExport ||
          tool.interoperatibility?.includes(
            "Data export is possible via file download (CSV/XLSX/...)"
          )) &&
        (!filters.unidirectionalAPI ||
          tool.interoperatibility?.includes(
            "We provide uni-directional data export via API"
          )) &&
        (!filters.bidirectionalAPI ||
          tool.interoperatibility?.includes(
            "We provide bi-directional data exchange via API. It is possible to export data via API and import data via API"
          )) &&
        (!filters.automatedDataExchange ||
          tool.interoperatibility?.includes(
            "Our tool offers automatic data exchange with selected tools"
          ))

      return (
        matchesBusinessType &&
        matchesLicense &&
        matchesPricing &&
        matchesInteroperability
      )
    })
  }, [tools, localSelectedCategories, filters])

  // Results view
  if (showResults) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="left"
          className="w-full sm:max-w-md p-0 flex flex-col"
        >
          <div className="p-4 flex justify-start gap-2 mt-2 items-center border-b">
            <Button
              variant="ghost"
              className="p-0 h-auto"
              onClick={handleBackToSubcategories}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-medium">Tool Catalogue</h2>
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
                    hasCategorySelections(category.id) ? "default" : "outline"
                  }
                  size="sm"
                  className={cn(
                    "rounded-full text-xs whitespace-nowrap",
                    hasCategorySelections(category.id)
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
            <div className="p-4">
              <div>
                <Button
                  variant="outline"
                  className="border-[#17412C] text-[#0D261A] font-bold rounded-full"
                  onClick={() => {
                    setIsFilterDrawerOpen(true)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="4em"
                    height="4em"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="1.5"
                      d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"
                    ></path>
                  </svg>
                  All Filters
                </Button>
              </div>

              {/* Add the filter chips here */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    if (Array.isArray(value) && value.length > 0) {
                      return value.map((item) => (
                        <Badge
                          key={`${key}-${item}`}
                          className="inline-flex items-center gap-2 bg-white text-[#17412C] font-bold text-sm rounded-md px-3 py-1.5 border border-[#17412C]"
                        >
                          {displayNames[item] || item}
                          <X
                            size={14}
                            className="cursor-pointer hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              setFilters({
                                ...filters,
                                [key]: value.filter((v) => v !== item),
                              })
                            }}
                          />
                        </Badge>
                      ))
                    } else if (typeof value === "boolean" && value) {
                      return (
                        <Badge
                          key={key}
                          className="inline-flex items-center gap-2 bg-white text-[#17412C] font-bold text-sm rounded-md px-3 py-1.5 border border-[#17412C]"
                        >
                          {displayNames[key] || key}
                          <X
                            size={14}
                            className="cursor-pointer hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              setFilters({
                                ...filters,
                                [key]: false,
                              })
                            }}
                          />
                        </Badge>
                      )
                    }
                    return null
                  })}
                </div>
              </div>

              <p className="p-4 text-sm text-[#0D261A]">
                {filteredTools.length} items
              </p>
            </div>

            <div
              className={`grid ${
                isMobile ? "grid-cols-1" : "sm:grid-cols-2"
              } gap-4 px-4 pb-4`}
            >
              {filteredTools.length > 0 ? (
                [...filteredTools]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((tool) => (
                    <Card
                      key={tool.name}
                      className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow bg-white p-4"
                      onClick={() => handleToolClick(tool)}
                    >
                      <CardHeader className="pb-2">
                        {/* Business type and license badges */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {/* First evaluate the condition, THEN render JSX */}
                          {((tool.business_type &&
                            tool.business_type.length > 0) ||
                            tool.license ||
                            tool.is_free ||
                            tool.free_demo_available) && (
                            <div className="flex flex-wrap gap-2 w-full">
                              {[
                                ...(tool.business_type || []),
                                ...(Array.isArray(tool.license)
                                  ? tool.license
                                  : tool.license
                                    ? [`${tool.license}`]
                                    : []),
                              ].map((category, index) => {
                                // Map specific categories to their assigned colors
                                const getCategoryColor = (cat: string) => {
                                  const colorMap: Record<string, string> = {
                                    SHS: "#3DA386",
                                    "Mini-Grids": "#8BDC7F",
                                    "Mini Grids": "#8BDC7F",
                                    "Clean Cooking": "#9FDBCA",
                                    "Free demo": "#FFD17A",
                                    "Free version": "#FFD17A",
                                    "Fully Open Source": "#EA7B5C",
                                    "Partially Open Source": "#FADED6",
                                  }
                                  return colorMap[cat] || "#43BC80" // fallback color
                                }

                                const categoryColor = getCategoryColor(category)
                                const colorClass = `bg-[${categoryColor}]`
                                return (
                                  <Badge
                                    key={`${category}-${index}`}
                                    className={`${colorClass} rounded-full text-[#161D1A] font-bold text-sm`}
                                    style={{
                                      minWidth: "auto",
                                      display: "inline-flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      backgroundColor: categoryColor,
                                    }}
                                  >
                                    {category}
                                  </Badge>
                                )
                              })}
                              {tool.is_free && (
                                <Badge
                                  className="bg-[#FFD17A] rounded-full text-[#161D1A] font-bold text-sm"
                                  style={{
                                    minWidth: "auto",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#FFD17A",
                                  }}
                                >
                                  Free
                                </Badge>
                              )}
                              {tool.free_demo_available && (
                                <Badge
                                  className="bg-[#FFF8EB] rounded-full text-[#161D1A] font-bold text-sm"
                                  style={{
                                    minWidth: "auto",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#FFF8EB",
                                  }}
                                >
                                  Free demo
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="text-base font-light text-[#1E1F1E]">
                          {tool.company}
                        </div>
                        <CardTitle className="text-lg font-bold text-[#0D261A]">
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="font-normal text-[#1E1F1E] text-base">
                          {tool.summary}
                        </p>
                        <div className="p-4">
                          <hr />
                        </div>
                        <div className="pb-4">
                          <p className="text-[#1E1F1E] pb-2 text-sm">
                            Categories
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <CategoryDisplay categories={tool.categories} />
                          </div>
                        </div>
                      </CardContent>
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
          {localSelectedCategories.length > 0 && <SuggestionBanner />}

          <FilterDrawer
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            filters={filters}
            onFiltersChange={(newFilters) => {
              setFilters(newFilters)
            }}
          />
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
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => setActiveCategory(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="font-medium">
                {categoryMap[activeCategory].name}
              </h2>
            </div>

            {/* Add filter button */}
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <div className="space-y-2">
                {categoryMap[activeCategory].subcategories.map(
                  (subcategory) => (
                    <div
                      key={subcategory}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={subcategory}
                        checked={selectedSubcategories.includes(subcategory)}
                        onCheckedChange={() =>
                          handleSubcategoryToggle(subcategory)
                        }
                        className="border-[#2D6A4F] text-[#2D6A4F]"
                      />
                      <label
                        htmlFor={subcategory}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {subcategory}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Update the footer with two buttons */}
          <div className="p-4 border-t">
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-[#2D6A4F] hover:bg-[#1B4332] text-white"
                onClick={handleApplyFilter}
                disabled={selectedSubcategories.length === 0}
              >
                Apply
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedSubcategories([])
                  setLocalSelectedCategories([])
                  // close the drawer
                }}
              >
                Clear all
              </Button>
            </div>
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

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFiltersChange={(newFilters) => {
          setFilters(newFilters)
        }}
      />
    </Sheet>
  )
}
