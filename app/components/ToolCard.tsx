import { Tool } from "../types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


interface ToolCardProps {
  tool: Tool
  isRecommended?: boolean
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Card className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow bg-white p-4">
      <CardHeader className="pb-2">
        <div className="text-base font-light text-[#1E1F1E]">
          {tool.company}
        </div>
        <CardTitle className="text-lg font-bold text-[#0D261A]">
          {tool.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="font-normal text-[#1E1F1E] text-base">{tool.summary}</p>
      </CardContent>
      {tool.highlights && tool.highlights.length > 0 && (
        <CardFooter className="mt-4">
          <div className="flex flex-wrap gap-2">
            {tool.highlights.map((highlight, index) => (
              <Badge
                key={highlight}
                variant="secondary"
                className="rounded-full"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

export default ToolCard
