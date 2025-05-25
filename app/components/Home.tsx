"use client"
import { useState, useMemo, useEffect } from "react"
import yaml from "js-yaml"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ToolDetailModal,
  type ToolDetailModalProps,
} from "../components/ToolDetailModel"

import { Tool } from "../types"

interface HomeProps {
  setIsModalOpen: (isOpen: boolean) => void
  selectedCategories: string[]
  onToolsLoaded: (tools: Tool[]) => void
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
}

function ToolCategories({
  activeCategory,
  onCategoryChange,
}: ToolCategoriesProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex overflow-x-auto pb-2 gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={cn(
              "flex items-center gap-1 whitespace-nowrap px-2 py-1 h-auto rounded-none border-b-2",
              activeCategory === category.id
                ? "border-[#2D6A4F] text-[#2D6A4F]"
                : "border-transparent hover:border-gray-300"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
            {category.count !== null && (
              <span className="ml-1 text-xs rounded-full bg-gray-100 px-2 py-0.5">
                {category.count}
              </span>
            )}
            <ChevronDown size={16} />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default function Home({ selectedCategories, onToolsLoaded }: HomeProps) {
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

  const toggleSubcategory = (subcategory: string) => {
    if (localSelectedCategories.includes(subcategory)) {
      setLocalSelectedCategories(
        localSelectedCategories.filter((cat) => cat !== subcategory)
      )
    } else {
      setLocalSelectedCategories([...localSelectedCategories, subcategory])
    }
  }

  const filteredToolsMemo = useMemo(() => {
    if (localSelectedCategories.length === 0) {
      return []
    }

    return tools.filter((tool) => {
      // Add safety check for categories
      return (
        Array.isArray(tool.categories) &&
        tool.categories.some((category) =>
          localSelectedCategories.includes(category)
        )
      )
    })
  }, [localSelectedCategories, tools])

  // Handle questionnaire completion
  // const handleQuestionnaireComplete = (answers: Record<string, string[]>) => {
  //   const categories = mapAnswersToCategories(answers)
  //   setLocalSelectedCategories(categories)

  //   // Find and set active category based on first matching category
  //   const firstCategory = Object.keys(categoryMap).find((key) =>
  //     categoryMap[key].some((cat) => categories.includes(cat))
  //   )

  //   if (firstCategory) {
  //     setActiveCategory(firstCategory)
  //   }
  //   setIsModalOpen(false)
  // }

  return (
    <div className="bg-[#F9FBFA] text-gray-800">
      {/* Main heading */}
      <h2 className="text-2xl font-bold mb-6 text-[#0D261A]">
        Tool Categories
      </h2>

      {/* Category navigation */}
      <ToolCategories
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Subcategory options when a category is selected */}
      {activeCategory && (
        <div className="my-6">
          <div className="text-lg text-[#0D261A] font-bold mb-4">
            {localSelectedCategories.length > 0
              ? `0${localSelectedCategories.length} categories`
              : "Select categories"}
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryMap[activeCategory].subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={
                  localSelectedCategories.includes(subcategory)
                    ? "default"
                    : "outline"
                }
                size="default"
                className={cn(
                  "rounded-lg flex items-center gap-1",
                  localSelectedCategories.includes(subcategory)
                    ? "bg-white text-[#0D261A] border border-[#0D261A] hover:bg-gray-100 hover:text-[#0D261A] text-base"
                    : "border-gray-300 hover:bg-gray-50"
                )}
                onClick={() => toggleSubcategory(subcategory)}
              >
                {subcategory}
                {localSelectedCategories.includes(subcategory) && (
                  <X size={14} className="ml-1" />
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Tools count */}
      {filteredToolsMemo.length > 0 && (
        <div className="my-4 text-sm text-[#0D261A] ">
          {filteredToolsMemo.length} items
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredToolsMemo.length > 0 &&
          filteredToolsMemo.map((tool) => (
            <Card
              key={tool.name}
              className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow bg-white p-4"
              onClick={() => handleToolClick(tool.name)}
            >
              <CardHeader className="pb-2">
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
              </CardContent>

              {/* Tool categories as badges */}
              {((tool.business_type?.length ?? 0) > 0 || tool.license) && (
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
                        100% Free
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
                        Free demo
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              )}
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
    </div>
  )
}
