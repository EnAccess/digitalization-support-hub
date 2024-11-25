import React from "react"
import { Typography, Empty } from "antd"
import { Search } from "lucide-react"

const { Title, Paragraph } = Typography

interface WelcomeMessageProps {
  hasFilters: boolean
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ hasFilters }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg shadow-sm">
    <Search className="w-16 h-16 text-gray-400 mb-4" />
    <Title level={2} className="mb-4">
      Welcome to the Tool Finder
    </Title>
    <Paragraph className="text-lg text-gray-600 max-w-2xl">
      {hasFilters ? (
        <div className="col-span-full flex justify-center items-center">
          <Empty description="No tools match your filters" />
        </div>
      ) : (
        "Start by answering a few questions about your needs using the filters on the left. We'll help you find the perfect tools for your business."
      )}
    </Paragraph>
  </div>
)

export default WelcomeMessage
