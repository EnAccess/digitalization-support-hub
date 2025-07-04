"use client"
import { useState, useMemo, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import yaml from "js-yaml"
import CategoryDisplay from "./CategoryDisplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { FilterDrawer } from "./FilterDrawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ToolDetailModal,
  type ToolDetailModalProps,
} from "../components/ToolDetailModel"
import { SuggestionBanner } from "./suggestion-banner"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Tool } from "../types"
interface FilterState {
  pricing: string[]
  businessTypes: string[]
  licensing: string[]
  DataExport: boolean
  unidirectionalAPI: boolean
  bidirectionalAPI: boolean
  automatedDataExchange: boolean
}
const displayNames: Record<string, string> = {
  DataExport: "Data Export available",
  unidirectionalAPI: "Unidirectional data exchange via API",
  bidirectionalAPI: "Bidirectional data exchange via API",
  automatedDataExchange: "Automated data exchange with selected tools",
}

interface HomeProps {
  setIsModalOpen: (isOpen: boolean) => void
  selectedCategories: string[]
  onToolsLoaded: (tools: Tool[]) => void
  filters: FilterState
  setFilters: (filters: FilterState) => void
}

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
      "customer finance Management",
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
  { id: "preparation", name: "Preparation & Setup", count: null },
  { id: "distribution", name: "Distribution & Sales", count: null },
  { id: "operations", name: "After Sales & Operations", count: null },
  { id: "optimize", name: "Assess & Optimize", count: null },
  { id: "endoflife", name: "Product End-of-Life", count: null },
]

interface ToolCategoriesProps {
  activeCategory: string | null
  onCategoryChange: (category: string) => void
  localSelectedCategories: string[]
  setLocalSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

function ToolCategories({
  activeCategory,
  localSelectedCategories,
  setLocalSelectedCategories,
}: ToolCategoriesProps) {
  // Get count of selected subcategories for each category
  const getCategoryCount = (categoryId: string) => {
    return categoryMap[categoryId].subcategories.filter((subcategory) =>
      localSelectedCategories.includes(subcategory)
    ).length
  }

  const toggleSubcategory = (subcategory: string) => {
    if (localSelectedCategories.includes(subcategory)) {
      setLocalSelectedCategories(
        localSelectedCategories.filter((cat) => cat !== subcategory)
      )
    } else {
      setLocalSelectedCategories([...localSelectedCategories, subcategory])
    }
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-4">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger
              className={cn(
                "px-4 py-2 rounded-full",
                activeCategory === category.id
                  ? "bg-[#2D6A4F] text-white"
                  : "bg-[#DCE5E0] text-[#0D261A] font-bold border "
              )}
            >
              {category.name}
              {getCategoryCount(category.id) > 0 && (
                <span className="ml-2 text-xs rounded-full bg-gray-100 px-2 py-0.5">
                  {getCategoryCount(category.id)}
                </span>
              )}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg min-w-[400px]">
              <div className="grid grid-cols-2 gap-4">
                {categoryMap[category.id].subcategories.map((subcategory) => (
                  <div
                    key={subcategory}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={subcategory}
                      checked={localSelectedCategories.includes(subcategory)}
                      onCheckedChange={() => toggleSubcategory(subcategory)}
                      className="border-[#2D6A4F] text-[#2D6A4F]"
                    />
                    <label
                      htmlFor={subcategory}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {subcategory}
                    </label>
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}) {
  // Add a new state for temporary filters
  const [tempFilters, setTempFilters] = useState<FilterState>({
    pricing: [],
    businessTypes: [],
    licensing: [],
    DataExport: false,
    unidirectionalAPI: false,
    bidirectionalAPI: false,
    automatedDataExchange: false,
  })

  // Initialize temporary filters when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTempFilters(filters)
    }
  }, [isOpen, filters])

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

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-[100dvh] w-full sm:w-[380px] bg-white z-50 flex flex-col">
        <div className="sticky top-0 p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <h3 className="text-lg font-semibold">Filter</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-[80px]">
          {/* Existing filter sections ... */}
          <div className="space-y-6">
            {/* Pricing Section */}
            <div>
              <h4 className="font-medium mb-3">Pricing</h4>
              <div className="space-y-2">
                <Button
                  variant={
                    tempFilters.pricing.includes("Free Version or Free Demo")
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className={cn(
                    "rounded-md text-sm font-normal justify-start h-auto px-3 py-2",
                    tempFilters.pricing.includes("Free Version or Free Demo")
                      ? "bg-[#17412C] text-white "
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => togglePricing("Free Version or Free Demo")}
                >
                  Free Version or Free Demo
                </Button>
                <Button
                  variant={
                    tempFilters.pricing.includes("100% Free")
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className={cn(
                    "rounded-md text-sm font-normal justify-start h-auto px-3 py-2",
                    tempFilters.pricing.includes("100% Free")
                      ? "bg-[#17412C] text-white "
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => togglePricing("100% Free")}
                >
                  Free
                </Button>
              </div>
            </div>

            {/* Business Types Section */}
            <div>
              <h4 className="font-medium mb-3">Business Types</h4>
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
                        ? "bg-[#17412C] text-white "
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => toggleBusinessType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Licensing Section */}
            <div>
              <h4 className="font-medium mb-3">Licensing</h4>
              <div className="space-y-2">
                {["Fully Open Source", "Partially Open Source"].map(
                  (license) => (
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
                          ? "bg-[#17412C] text-white "
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      )}
                      onClick={() => toggleLicensing(license)}
                    >
                      {license}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Interoperability Section */}
            <div>
              <h4 className="font-medium mb-3">
                Interoperability & Data Exchange
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="data-export"
                    checked={tempFilters.DataExport}
                    onCheckedChange={(checked) =>
                      setTempFilters({
                        ...tempFilters,
                        DataExport: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="data-export" className="text-sm">
                    Data Export Available
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unidirectional-api"
                    checked={tempFilters.unidirectionalAPI}
                    onCheckedChange={(checked) =>
                      setTempFilters({
                        ...tempFilters,
                        unidirectionalAPI: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="unidirectional-api" className="text-sm">
                    Unidirectional data exchange via API
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bidirectional-api"
                    checked={tempFilters.bidirectionalAPI}
                    onCheckedChange={(checked) =>
                      setTempFilters({
                        ...tempFilters,
                        bidirectionalAPI: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="bidirectional-api" className="text-sm">
                    Bidirectional data exchange via API
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="automatic-exchange"
                    checked={tempFilters.automatedDataExchange}
                    onCheckedChange={(checked) =>
                      setTempFilters({
                        ...tempFilters,
                        automatedDataExchange: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="automatic-exchange" className="text-sm">
                    Has automatic data exchange with selected tools
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="sticky bottom-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white rounded-full"
              onClick={handleApplyFilters}
              disabled={
                tempFilters.pricing.length === 0 &&
                tempFilters.businessTypes.length === 0 &&
                tempFilters.licensing.length === 0 &&
                !tempFilters.DataExport &&
                !tempFilters.unidirectionalAPI &&
                !tempFilters.bidirectionalAPI &&
                !tempFilters.automatedDataExchange
              }
            >
              Apply filters
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-full"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default function Home({
  setIsModalOpen, // Add this prop
  selectedCategories,
  onToolsLoaded,
  filters,
  setFilters,
}: HomeProps) {
  const [localSelectedCategories, setLocalSelectedCategories] = useState<
    string[]
  >([])
  const [tools, setTools] = useState<Tool[]>([])
  const [, setFilteredTools] = useState<Tool[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isToolModalOpen, setIsToolModalOpen] = useState<boolean>(false)
  const [selectedTool, setSelectedTool] = useState<Tool | null>(
    null as Tool | null
  )
  const [questionnaireAnswers] = useState<Record<string, string[]> | null>(null)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  // Update local categories when prop changes
  useEffect(() => {
    if (selectedCategories.length > 0) {
      setLocalSelectedCategories(selectedCategories)

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
    // Load all YAML files
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
        ]

        const loadedTools = await Promise.all(
          toolFiles.map(async (file) => {
            const response = await fetch(file)
            const text = await response.text()
            return yaml.load(text) as Tool
          })
        )

        setTools(loadedTools)

        // Share loaded tools with parent component
        if (onToolsLoaded) {
          onToolsLoaded(loadedTools)
        }
      } catch (error) {
        console.error("Error loading YAML files:", error)
      }
    }

    loadTools()
  }, [onToolsLoaded])

  // Filter tools based on both categories and questionnaire answers
  useEffect(() => {
    if (!tools.length) return

    let filtered = tools

    // Apply category filters with safety check
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        (tool) =>
          // Add safety check for categories
          Array.isArray(tool.categories) &&
          tool.categories.some((category) =>
            selectedCategories.includes(category)
          )
      )
    }

    // Apply questionnaire filters if they exist

    setFilteredTools(filtered)
  }, [tools, selectedCategories, questionnaireAnswers])

  const handleToolClick = (toolName: string) => {
    const tool = tools.find((t) => t.name === toolName)
    if (tool) {
      setSelectedTool(tool)
      setIsToolModalOpen(true)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId)
  }

  // Add toggleSubcategory function

  // Update the filtered tools logic
  const filteredToolsMemo = useMemo(() => {
    if (localSelectedCategories.length === 0) {
      return []
    }

    return tools.filter((tool) => {
      // Category filter - ANY match (OR condition)
      const matchesCategory = tool.categories?.some((category) =>
        localSelectedCategories.includes(category)
      )

      if (!matchesCategory) return false

      // Filters - ALL must match (AND condition)
      const matchesPricing =
        filters.pricing.length === 0 ||
        (filters.pricing.includes("100% Free") && tool.is_free) ||
        (filters.pricing.includes("Free Version or Free Demo") &&
          tool.free_demo_available)

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

      // Interoperability filters - ALL must match
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

      // All filters must match (AND condition)
      return (
        matchesPricing &&
        matchesBusinessType &&
        matchesLicense &&
        matchesInteroperability
      )
    })
  }, [tools, localSelectedCategories, filters])
  //export this componet
  return (
    <div className="bg-[#F9FBFA] text-gray-800 ml-8">
      {/* Main heading */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-16">
          <h2 className="text-2xl font-bold mb-6 text-[#0D261A]">
            Tool Categories
          </h2>
        </div>

        {localSelectedCategories.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-[#17412C] text-[#0D261A] font-bold rounded-full w-auto text-md flex items-center"
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
        )}
      </div>

      {/* Category navigation */}
      <ToolCategories
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        localSelectedCategories={localSelectedCategories}
        setLocalSelectedCategories={setLocalSelectedCategories}
      />

      {/* Update the filter badges section */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(filters).map(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            return value.map((item) => (
              <Badge
                key={`${key}-${item}`}
                className="inline-flex items-center gap-2 bg-white text-[#17412C] font-bold text-sm rounded-md px-3 py-1.5 border border-[#17412C] hover:bg-white "
              >
                {item}
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
                className="inline-flex items-center gap-2 bg-white hover:bg-white text-[#17412C] font-bold text-sm rounded-md px-3 py-1.5 border border-[#17412C]"
              >
                {displayNames[key] ||
                  key
                    .replace(/([A-Z])|API/g, (match, letter) =>
                      letter ? ` ${letter}` : "API"
                    )
                    .trim()}
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

      {/* Tools count */}

      {localSelectedCategories.length > 0 && filteredToolsMemo.length > 0 && (
        <>
          <div className="mt-2">
            <Button
              variant="outline"
              className="border-[#17412C] text-[#0D261A] font-bold rounded-full w-auto text-md"
              onClick={() => {
                setLocalSelectedCategories([])
                setActiveCategory(null)
                // setFilters({
                //   pricing: [],
                //   businessTypes: [],
                //   licensing: [],
                //   data export available: false,
                //   unidirectional data exchange via API: false,
                //   bidirectionalAPI: false,
                //   automaticDataExchange: false,
                // })
              }}
            >
              Reset Categories
            </Button>
          </div>

          <div className=" flex flex-col ">
            <p className="my-4 text-sm">{filteredToolsMemo.length} items</p>
          </div>
        </>
      )}

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {localSelectedCategories.length > 0 &&
          filteredToolsMemo.map((tool) => (
            <Card
              key={tool.name}
              className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow bg-white p-4"
              onClick={() => handleToolClick(tool.name)}
            >
              <CardHeader className="pb-2">
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
                      {tool.is_free && (
                        <Badge
                          className="bg-[#43BC80] rounded-full text-[#161D1A] font-bold text-sm"
                          style={{
                            minWidth: "auto",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#43BC80",
                          }}
                        >
                          Free
                        </Badge>
                      )}
                      {tool.free_demo_available && (
                        <Badge
                          className="bg-[#8BDC7F] rounded-full text-[#161D1A] font-bold text-sm"
                          style={{
                            minWidth: "auto",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#8BDC7F",
                          }}
                        >
                          Free Demo
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
                  <p className="text-[#1E1F1E] pb-2 text-sm">Categories</p>
                  <CategoryDisplay categories={tool.categories} />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      {selectedTool && (
        <ToolDetailModal
          tool={
            selectedTool as unknown as NonNullable<ToolDetailModalProps["tool"]>
          }
          isOpen={isToolModalOpen}
          onClose={() => setIsToolModalOpen(false)}
        />
      )}

      {localSelectedCategories.length > 0 && <SuggestionBanner />}

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFiltersChange={(newFilters) => {
          setFilters(newFilters)
        }}
      />
      {filteredToolsMemo.length > 0 && (
        <div className="flex justify-center items-center my-4">
          <div className="text-sm text-[#0D261A]"></div>
          <div className="text-sm text-[#0D261A]">
            {Math.min(12, filteredToolsMemo.length)} of{" "}
            {filteredToolsMemo.length} tools
          </div>
        </div>
      )}
      {localSelectedCategories.length > 0 && filteredToolsMemo.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-2">
            We don&apos;t currently have any tools matching these filters.
          </h3>
          <p className="text-gray-600 mb-8">
            Try changing your filters or check out the Tool Finder for tailored
            suggestions.
          </p>
          <div className="flex flex-col items-center gap-8"></div>
          <Button
            className="bg-[#2D6A4F] text-white rounded-full px-6 py-2 font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            Open Tool Finder Wizard
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="bg-white pt-6  text-center">
            <p className="font-bold mb-2">
              If you know of any digital tools that belong in this category, let
              us know!
            </p>
            <p className="text-gray-600">
              Just drop us a message at support@dsh.org—we&apos;d love to check
              them out and see if they&apos;re a good fit for our database.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
