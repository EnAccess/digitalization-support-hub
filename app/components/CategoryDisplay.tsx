import React, { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
const CategoryDisplay = ({ categories = [] }: { categories?: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  // Add null check with default empty array
  const displayCategories = isExpanded
    ? categories
    : categories?.slice(0, 3) || []
  const hasMore = (categories?.length || 0) > 3

  return (
    <div className="flex flex-wrap gap-2 w-full  ">
      {displayCategories.map((category, index) => {
        const colors = ["bg-[#fff]"]
        const colorIndex = index % colors.length
        const colorClass = colors[colorIndex]

        return (
          <div key={`${category}-${index}`} className="">
            <Badge
              className={`${colorClass} rounded-full border-[#526F61] text-[#526F61] font-bold text-sm`}
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
          </div>
        )
      })}
      {hasMore && (
        <div>
          <p className="text-sm text-[#1E1F1ECC]">
            {isExpanded ? "View less" : "..."}{" "}
            {`+${categories?.length - 3} more categories`}
          </p>
        </div>
      )}
    </div>
  )
}
export default CategoryDisplay
