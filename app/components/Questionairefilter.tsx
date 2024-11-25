"use client"
import React, { useState, useMemo } from "react"
import { Input, Card, Typography, Collapse, Checkbox } from "antd"
import WelcomeMessage from "./WelcomeMessage"

const { Title, Paragraph } = Typography
const { Panel } = Collapse

const filterKeyToQuestion: Record<string, string> = {
  numberOfClients: " What Size is your company?",
  companyStage: "At what phase/stage is your company?",
  companyFocus: " What is the focus area for your company?",
  toolsCost: "Are you only looking for free-to-use tools?",
  toolSource: "are you only interested in open-source tools?",
  internalExpertise:
    "Do you have any in-house IT/software R&D expertise and ressources?",
  interoperability: "are you interested in Inter-operability of the tools?",
  businessArea: "What is your main business area?",
  functionalArea: "What is your main functional area?",
  transactionsPerDay: "How many transactions per day?",
  offlineFunctionality: "Do you need offline functionality?",
}
const FILTER_OPTIONS: Record<string, string[]> = {
  numberOfClients: ["<100", "101-500", "501-1000", ">1000", ">5000"],
  transactionsPerDay: ["<5", "5-100", "101-500", ">501"],
  companyStage: [
    "Pre-launch startup",
    "Early-stage startup",
    "Growing startup",
    "Scaling SME",
    "Established SME",
  ],
  companyFocus: ["SHS", "Mini-Grid", "Clean Cooking"],
  toolsCost: [
    "Free-to-use or freemium versions only",
    "All tools (free and paid)",
  ],
  toolSource: [
    "Open-source only",
    "Strictly closed source",
    "Both (open and closed source)",
  ],
  internalExpertise: [
    "No expertise at all",
    "Some knowledge and capabilities",
    "Full IT and software R&D team in place",
  ],
  businessArea: [
    "Preparation and Setup",
    "Distribution/Sales",
    "After Sales/Operation",
    "Assess & Optimize",
    "End of Life",
  ],
  functionalArea: [
    "Market Analysis",
    "Company Set-up",
    "Book-keeping and Accounting",
    "Product Procurement",
    "Fundraising",
    "Stock Management",
    "Personnel Training",
    "Marketing",
    "Customer Vetting",
    "Product Logistics and Procurement",
    "Sales and Contract Management",
    "Payment Collections",
    "Service Calls",
    "Technical Response",
    "Upselling",
    "CRM",
    "Portfolio Analysis and Management",
    "Impact Measurements and Performance",
    "Remote Team Management",
    "API Integration and Connection",
    "Data Download",
    "Repossession and Reverse Logistics",
    "E-waste Management",
  ],
  interoperability: [
    "External Custom API Integration",
    "Integration with Pay-Go Apps",
    "Workflow Integration with Commercial Software",
    "No Interoperability",
  ],
  offlineFunctionality: [
    "Full Offline Functionality",
    "Offline Functionality to a Limited Extent",
    "No Offline Functionality",
  ],
}

const tools = [
  {
    name: "3CX",
    metadata: {
      numberOfClients: ["<100"],
      transactionsPerDay: ["<5"],
      companyStage: "Pre-launch startup",
      companyFocus: ["SHS"],
      toolsCost: "Free-to-use or freemium versions only",
      toolSource: "Open-source only",
      internalExpertise: "No expertise at all",
      businessArea: ["Preparation and Setup"],
      functionalArea: ["Market Analysis"],
      interoperability: "No Interoperability",
      offlineFunctionality: "Full Offline Functionality",
    },
    summary: "Communication and management tool",
    logo: "/path/to/3cx-logo.png",
    link: "https://3cx.com",
  },
  {
    name: "D-REC",
    metadata: {
      numberOfClients: ["<100", "101-500", "501-1000", ">1000", ">5000"],
      transactionsPerDay: ["<5", "5-100", "101-500", ">501"],
      companyStage: "Pre-launch startup",
      companyFocus: ["SHS"],
      toolsCost: "Free-to-use or freemium versions only",
      toolSource: "Open-source only",
      internalExpertise: "No expertise at all",
      businessArea: ["Preparation and Setup"],
      functionalArea: ["Market Analysis"],
      interoperability: "No Interoperability",
      offlineFunctionality: "Full Offline Functionality",
    },
    summary: "Communication and management tool",
    logo: "/path/to/d-rec-logo.png",
    link: "https://d-rec.com",
  },
  {
    name: "IXO",
    metadata: {
      numberOfClients: ["<100", "101-500", "501-1000", ">1000", ">5000"],
      transactionsPerDay: ["<5", "5-100", "101-500", ">501"],
      companyStage: "Pre-launch startup",
      companyFocus: ["SHS"],
      toolsCost: "Free-to-use or freemium versions only",
      toolSource: "Open-source only",
      internalExpertise: "No expertise at all",
      businessArea: ["Preparation and Setup"],
      functionalArea: ["Market Analysis"],
      interoperability: "No Interoperability",
      offlineFunctionality: "Full Offline Functionality",
    },
    summary: "Communication and management tool",
    logo: "/path/to/ixo-logo.png",
    link: "https://ixo.com",
  },
  {
    name: "P-REC",
    metadata: {
      numberOfClients: ["<100", "101-500", "501-1000", ">1000", ">5000"],
      transactionsPerDay: ["<5", "5-100", "101-500", ">501"],
      companyStage: "Pre-launch startup",
      companyFocus: ["SHS", "Clean Cooking"],
      toolsCost: "Free-to-use or freemium versions only",
      toolSource: "Open-source only",
      internalExpertise: "No expertise at all",
      businessArea: ["Preparation and Setup"],
      functionalArea: ["Market Analysis"],
      interoperability: "No Interoperability",
      offlineFunctionality: "Full Offline Functionality",
    },
    summary: "Communication and management tool",
    logo: "/path/to/prec-logo.png",
    link: "https://p-rec.com",
  },
  {
    name: "Sendy",
    metadata: {
      numberOfClients: ["<100", "101-500"],
      transactionsPerDay: ["<5", "5-100", "101-500", ">501"],
      companyStage: "Early-stage startup",
      companyFocus: ["SHS", "Clean Cooking"],
      toolsCost: "Free-to-use or freemium versions only",
      toolSource: "Open-source only",
      internalExpertise: "No expertise at all",
      businessArea: ["Preparation and Setup"],
      functionalArea: ["Market Analysis"],
      interoperability: "No Interoperability",
      offlineFunctionality: "Full Offline Functionality",
    },
    summary: "Communication and management tool",
    logo: "/path/to/sendy-logo.png",
    link: "https://sendy.com",
  },
  {
    name: "Challenges",
    metadata: {
      numberOfClients: ["<100", "101-500", "501-1000", ">1000", ">5000"],
      transactionsPerDay: ["<5", "5-100", "101-500", ">501"],
      companyStage: "Pre-launch startup",
      companyFocus: ["SHS"],
      toolsCost: "Free-to-use or freemium versions only",
      toolSource: "Open-source only",
      internalExpertise: "No expertise at all",
      businessArea: ["Preparation and Setup"],
      functionalArea: ["Market Analysis"],
      interoperability: "No Interoperability",
      offlineFunctionality: "Full Offline Functionality",
    },
    summary: "Communication and management tool",
    logo: "/path/to/challenges-logo.png",
    link: "https://challenges.com",
  },
  {
    name: "carbon clear",
    metadata: {
      numberOfClients: ["<100"],
      transactionsPerDay: ["<5"],
      companyStage: "Pre-launch startup",
      companyFocus: ["SHS"],
      toolsCost: "Free-to-use or freemium versions only",
      toolSource: "Open-source only",
      internalExpertise: "No expertise at all",
      businessArea: ["Preparation and Setup"],
      functionalArea: ["Company Set-up"],
      interoperability: "No Interoperability",
      offlineFunctionality: "Full Offline Functionality",
    },
    summary: "Communication and management tool",
    logo: "/path/to/carboclear-logo.png",
    link: "https://carbon-clear.com",
  },
  {
    name: "cavex",
    metadata: {
      numberOfClients: ["<100"],
      transactionsPerDay: ["<5"],
      companyStage: "Pre-launch startup",
      companyFocus: ["SHS"],
      toolsCost: "Free-to-use or freemium versions only",
      toolSource: "Open-source only",
      internalExpertise: "No expertise at all",
      businessArea: ["Preparation and Setup"],
      functionalArea: ["Market Analysis"],
      interoperability: "No Interoperability",
      offlineFunctionality: "Full Offline Functionality",
    },
    summary: "Communication and management tool",
    logo: "/path/to/cavex-logo.png",
    link: "https://cavex.com",
  },
]

interface Filters {
  numberOfClients: string[]
  transactionsPerDay: string[]
  companyStage: string[]
  companyFocus: string[]
  toolsCost: string[]
  toolSource: string[]
  internalExpertise: string[]
  businessArea: string[]
  functionalArea: string[]
  interoperability: string[]
  offlineFunctionality: string[]
}

const EnAccessToolMap: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    numberOfClients: [],
    transactionsPerDay: [],
    companyStage: [],
    companyFocus: [],
    toolsCost: [],
    toolSource: [],
    internalExpertise: [],
    businessArea: [],
    functionalArea: [],
    interoperability: [],
    offlineFunctionality: [],
  })

  const [searchTerm, setSearchTerm] = useState<string>("")

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter.length > 0
  )

  const filteredTools = useMemo(() => {
    if (!hasActiveFilters) return []

    return tools.filter((tool) => {
      return (
        Object.entries(filters).every(([filterKey, selectedValues]) => {
          if (selectedValues.length === 0) return true

          const metadataValue =
            tool.metadata[filterKey as keyof typeof tool.metadata]

          if (Array.isArray(metadataValue)) {
            return selectedValues.some((value: string) =>
              metadataValue.includes(value)
            )
          }

          return selectedValues.includes(metadataValue)
        }) && tool.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [filters, searchTerm, hasActiveFilters])

  const renderFilterSection = (filterKey: keyof Filters) => {
    return (
      <Panel
        header={
          filterKeyToQuestion[filterKey] ||
          filterKey.replace(/([A-Z])/g, " $1").toUpperCase()
        }
        key={filterKey}
      >
        <Checkbox.Group
          options={FILTER_OPTIONS[filterKey]}
          value={filters[filterKey]}
          onChange={(checkedValues: string[]) => {
            setFilters((prev) => ({
              ...prev,
              [filterKey]: checkedValues,
            }))
          }}
        />
      </Panel>
    )
  }

  return (
    <div className="bg-white text-gray-800">
      <div className="flex justify-center my-5">
        <Input
          placeholder="Search tools"
          className="w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex">
        <div className="w-1/4 p-4">
          <Collapse>
            {Object.keys(FILTER_OPTIONS).map((filterKey) =>
              renderFilterSection(filterKey as keyof Filters)
            )}
          </Collapse>
        </div>

        <div className="w-3/4 p-5">
          {!hasActiveFilters ? (
            <WelcomeMessage hasFilters={false} />
          ) : filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <Card key={tool.name} className="bg-[#2D6A4F] text-white">
                  <Title level={3} className="text-white">
                    {tool.name}
                  </Title>
                  <Paragraph className="text-gray-100">
                    {tool.summary}
                  </Paragraph>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-blue-100"
                  >
                    Visit Website
                  </a>
                </Card>
              ))}
            </div>
          ) : (
            <WelcomeMessage hasFilters={true} />
          )}
        </div>
      </div>
    </div>
  )
}

export default EnAccessToolMap
