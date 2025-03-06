"use client"
import React, { useState, useMemo, useEffect } from "react"
import yaml from "js-yaml"
import { Input, Card, Typography, Menu, Collapse, Empty, Button } from "antd"
import ToolMapButton from "./Button"

const { Title, Paragraph } = Typography
const { Panel } = Collapse

const categories = {
  "Preparation & Set Up": [
    "Market Analysis",
    "Company Set Up",
    "Bookkeeping & Accounting",
    "Product Procurement",
    "Fundraising",
  ],
  "Distribution/Sales": [
    "Stock Management",
    "Personal Training",
    "Marketing",
    "Customer Vetting",
    "Product Logistics & Procurement",
    "Sales & Contract Management",
  ],
  "After Sales/Operations": [
    "Payment Collections",
    "Service Calls",
    "Tech Response",
    "Upselling",
  ],
  "Assess & Optimize": [
    "Portfolio Analysis & Management",
    "Impact Measurements & Performance",
  ],
  "End Of Life": ["Repossession & Reverse logistics", "E-Waste Management"],
}

interface EnAccessToolMapProps {
  setIsModalOpen: (value: boolean) => void
}

interface Tool {
  name: string
  summary: string
  logo: string
  link: string
  categories?: string[] // Make categories optional
}

const EnAccessToolMap = ({ setIsModalOpen }: EnAccessToolMapProps) => {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [tools, setTools] = useState<Tool[]>([])

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
    setActiveTool(activeTool === toolName ? null : toolName)
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    // Check if the category is already selected
    if (selectedCategories.includes(key)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== key))
    } else {
      setSelectedCategories([...selectedCategories, key])
    }
  }

  const filteredTools = useMemo(() => {
    if (selectedCategories.length === 0 && !searchTerm) {
      return []
    }

    return tools.filter((tool) => {
      const matchesSearch = tool.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesCategories =
        selectedCategories.length === 0 ||
        (tool.categories &&
          selectedCategories.some((category) =>
            tool.categories!.includes(category)
          ))

      return matchesSearch && matchesCategories
    })
  }, [searchTerm, selectedCategories, tools])

  return (
    <div className="bg-white text-gray-800">
      <div className="flex justify-center my-5 gap-4">
        <Input
          placeholder="Search bar"
          style={{ width: 300 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ToolMapButton onClick={() => setIsModalOpen(true)} />
      </div>

      <div className="flex justify-center space-x-4 my-5">
        <Menu
          mode="horizontal"
          className="bg-transparent border-0"
          selectedKeys={selectedCategories}
          onClick={handleMenuClick}
        >
          {Object.entries(categories).map(([category, items]) => (
            <Menu.SubMenu
              key={category}
              title={
                <Button className="bg-[#95D5B2] hover:bg-[#2D6A4F]">
                  {category}
                </Button>
              }
              className={` hover:bg-[#2D6A4F] hover:text-white custom-popup`}
            >
              {items.map((item) => (
                <Menu.Item
                  key={item}
                  className={`
                    ${
                      selectedCategories.includes(item)
                        ? "bg-[#2D6A4F] text-white"
                        : ""
                    }
                    hover:bg-[#2D6A4F] hover:text-white
                  `}
                >
                  {item}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu>
      </div>

      <div className="flex justify-center mb-4">
        {selectedCategories.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-center">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="bg-[#2D6A4F] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {category}
                <button
                  onClick={() => handleMenuClick({ key: category })}
                  className="hover:text-red-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <Card
              key={tool.name}
              className={`bg-[#2D6A4F] text-white ${
                activeTool === tool.name ? "border-4 border-yellow-300" : ""
              }`}
              onClick={() => handleToolClick(tool.name)}
            >
              <Title level={3}>{tool.name}</Title>
              <Paragraph>{tool.summary}</Paragraph>
              <Collapse>
                <Panel header="" key={tool.name} showArrow={true}>
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="mb-2"
                  />
                  <Paragraph>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400"
                    >
                      {tool.link}
                    </a>
                  </Paragraph>
                  <Paragraph>{tool.summary}</Paragraph>
                  {tool.categories && (
                    <div className="mt-2">
                      <strong>Categories:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {tool.categories.map((category) => (
                          <span
                            key={category}
                            className="bg-[#95D5B2] text-black px-2 py-1 rounded-full text-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Panel>
              </Collapse>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-10">
            <Empty
              description={
                <span className="text-gray-600">
                  {selectedCategories.length === 0 && !searchTerm
                    ? "Select a category or search to view tools"
                    : "No tools found for the selected filters"}
                </span>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EnAccessToolMap
