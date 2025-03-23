"use client"
import React, { useState, useMemo, useEffect } from "react"
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
import { ToolDetailModal } from "../components/ToolDetailModel"
interface EnAccessToolMapProps {
  setIsModalOpen: (value: boolean) => void
}

interface CategoryMapItem {
  name: string
  subcategories: string[]
}

interface CategoryMap {
  [key: string]: CategoryMapItem
}

interface Tool {
  id?: number
  name: string
  summary: string
  logo: string
  link?: string
  categories?: string[]
  company: string
  isFree?: boolean
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
    name: "Distribution/Sales",
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
    name: "After Sales/Operations",
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
  { id: "preparation", name: "Preparation & Setup", count: null },
  { id: "distribution", name: "Distribution/Sales", count: null },
  { id: "operations", name: "After Sales/Operations", count: null },
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
    <div className=" border-b border-gray-200 ">
      <div className="flex overflow-x-auto pb-2 gap-4  ">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={cn(
              "flex items-center gap-1 whitespace-nowrap px-2 py-1 h-auto rounded-none border-b-2 ",
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

const EnAccessToolMap = ({}: EnAccessToolMapProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [tools, setTools] = useState<Tool[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isToolModalOpen, setIsToolModalOpen] = useState<boolean>(false)
  const [selectedTool, setSelectedTool] = useState<Tool | null>(
    null as Tool | null
  )

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
          "/tools/sendy.yaml",
          "/tools/challenges.yaml",
          "/tools/carbon-clear.yaml",
          "/tools/cavex.yaml",
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

    loadTools()
  }, [])

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
    if (selectedCategories.includes(subcategory)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== subcategory)
      )
    } else {
      setSelectedCategories([...selectedCategories, subcategory])
    }
  }

  const filteredTools = useMemo(() => {
    if (selectedCategories.length === 0) {
      return []
    }

    return tools.filter((tool) => {
      const matchesCategories =
        selectedCategories.length === 0 ||
        (tool.categories &&
          selectedCategories.some((category) =>
            tool.categories!.includes(category)
          ))

      return matchesCategories
    })
  }, [selectedCategories, tools])

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
            {selectedCategories.length > 0
              ? `0${selectedCategories.length} categories`
              : "Select categories"}
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryMap[activeCategory].subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={
                  selectedCategories.includes(subcategory)
                    ? "default"
                    : "outline"
                }
                size="default"
                className={cn(
                  "rounded-lg flex items-center gap-1",
                  selectedCategories.includes(subcategory)
                    ? "bg-white text-[#0D261A] border border-[#0D261A] hover:bg-gray-100 hover:text-[#0D261A] text-base"
                    : "border-gray-300 hover:bg-gray-50"
                )}
                onClick={() => toggleSubcategory(subcategory)}
              >
                {subcategory}
                {selectedCategories.includes(subcategory) && (
                  <X size={14} className="ml-1" />
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Tools count */}
      {filteredTools.length > 0 && (
        <div className="my-4 text-sm text-[#0D261A] ">
          {filteredTools.length} items
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
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
              {tool.categories && tool.categories.length > 0 && (
                <CardFooter className="flex gap-2">
                  {tool.categories.map((category, index) => {
                    // Rotate through different colors for category badges
                    const colors = ["bg-[#43BC80] ", "bg-[#8BDC7F] "]
                    const colorClass = colors[index % colors.length]

                    return (
                      <Badge
                        key={category}
                        className={`${colorClass} rounded-full  text-[#161D1A] font-bold text-sm`}
                      >
                        {category}
                      </Badge>
                    )
                  })}
                </CardFooter>
              )}
            </Card>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-10">
            {/* <Empty
              description={
                <span className="text-gray-600">
                  {selectedCategories.length === 0 
                    ? "Select a category to view tools"
                    : "No tools found for the selected filters"}
                </span>
              }
            /> */}
          </div>
        )}
      </div>
      {selectedTool && (
        <ToolDetailModal
          // @ts-ignore
          tool={selectedTool as any}
          isOpen={isToolModalOpen}
          onClose={() => setIsToolModalOpen(false)}
        />
      )}
    </div>
  )
}

export default EnAccessToolMap
