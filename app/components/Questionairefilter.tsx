"use client"
import React, { useState, useMemo, useEffect } from "react"
import { Card, Typography, Button, Radio, Space } from "antd"
import yaml from "js-yaml"

const { Title, Paragraph } = Typography

const QUESTIONNAIRE_ORDER = [
  "numberOfClients",
  "companyStage",
  "companyFocus",
  "functionalArea",
  "toolsCost",
  "internalExpertise",
  "toolSource",
  "interoperability",
]

const filterKeyToQuestion: Record<string, string> = {
  numberOfClients: "On average, how many transactions does your company process per day?",
  companyStage: "What stage is your company at right now ?",
  companyFocus: "Which areas does your company focus on? (Select up to 3 options)",
  functionalArea:"What do you need digital tools to help you with? (Select up to 3 options) ",
  toolsCost: "Do you only want to explore free-to-use tools?",
  internalExpertise:
  "Does your team have in-house IT or software development skills? ",
  toolSource: "Would you prefer to explore only open source tools?",
  interoperability: "Interoperabilty: Do you need tools to easily connect and integrate with each other?",
}

// Updated to include options with descriptions
const FILTER_OPTIONS: Record<string, Array<string | { value: string, description: string }>> = {
  numberOfClients: ["<5", "5-100", "101-500",">500"],
  companyStage: [
    { 
      value: "Pre-launch Startup", 
      description: "We are a very early-stage company with an idea or concept but no established customers or revenue yet"
    },
    { 
      value: "Early-Stage Startup", 
      description: "We are a small company with a product or service launched, a few customers, and some revenue"
    },
    { 
      value: "Growing Startup", 
      description: "We are a company with a constantly growing customer base and increasing revenue"
    },
    { 
      value: "Scaling SME", 
      description: "We are a mature company with a stable revenue stream, structured departments, and a growing team"
    },
    { 
      value: "Established SME", 
      description: "We are a well-established company with several years of operational track record, consistent revenue, clearly structured departments, and stable, well-staffed organization"
    },
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

interface Tool {
  name: string
  summary: string
  link: string
  metadata: {
    numberOfClients?: string | string[]
    transactionsPerDay?: string | string[]
    companyStage?: string | string[]
    companyFocus?: string | string[]
    toolsCost?: string | string[]
    toolSource?: string | string[]
    internalExpertise?: string | string[]
    businessArea?: string | string[]
    functionalArea?: string | string[]
    interoperability?: string | string[]
    offlineFunctionality?: string | string[]
    [key: string]: string | string[] | undefined
  }
}

const EnAccessToolMap: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [isQuestionnaireComplete, setIsQuestionnaireComplete] = useState(false)
  const [tools, setTools] = useState<Tool[]>([])

  // Load tools from YAML files
  useEffect(() => {
    const loadTools = async () => {
      const toolFiles = [
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
    }

    loadTools()
  }, [])

  const currentQuestion = QUESTIONNAIRE_ORDER[currentQuestionIndex]

  const handleAnswer = (values: string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: values,
    }))
  }

  const handleNext = () => {
    if (
      !answers[currentQuestion] ||
      (Array.isArray(answers[currentQuestion]) &&
        !answers[currentQuestion].length)
    ) {
      return
    }

    if (currentQuestionIndex < QUESTIONNAIRE_ORDER.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setIsQuestionnaireComplete(true)
    }
  }

  const handleSkip = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: [],
    }))

    if (currentQuestionIndex < QUESTIONNAIRE_ORDER.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setIsQuestionnaireComplete(true)
    }
  }
  
  const filteredTools = useMemo(() => {
    if (!isQuestionnaireComplete) return []

    return tools.filter((tool) => {
      return Object.entries(answers).every(([filterKey, selectedValues]) => {
        if (selectedValues.length === 0) return true

        const metadataValue = tool.metadata[filterKey]

        if (metadataValue === undefined) return false

        if (Array.isArray(metadataValue)) {
          return selectedValues.some((value) => metadataValue.includes(value))
        }

        return (
          typeof metadataValue === "string" &&
          selectedValues.includes(metadataValue)
        )
      })
    })
  }, [answers, isQuestionnaireComplete, tools])

  if (isQuestionnaireComplete) {
    return (
      <div className="p-8">
        <Title level={2}>Recommended Tools</Title>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <Card key={tool.name} className="bg-[#2D6A4F] text-white">
                <Title level={3} className="text-white">
                  {tool.name}
                </Title>
                <Paragraph className="text-gray-100">{tool.summary}</Paragraph>
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
          <Paragraph>No tools match your criteria.</Paragraph>
        )}
        <Button
          onClick={() => {
            setIsQuestionnaireComplete(false)
            setCurrentQuestionIndex(0)
            setAnswers({})
          }}
          className="mt-4"
        >
          Start Over
        </Button>
      </div>
    )
  }

  // Render radio options with descriptions if they exist
  const renderRadioOptions = () => {
    const options = FILTER_OPTIONS[currentQuestion];
    
    return (
      <Space direction="vertical" className="w-full">
        {options.map((option) => {
          // Check if option is an object with description or just a string
          if (typeof option === 'string') {
            return (
              <Radio
                key={option}
                value={option}
                className="w-full p-2 border rounded hover:bg-gray-100"
              >
                {option}
              </Radio>
            );
          } else {
            // Option with description
            return (
              <Radio
                key={option.value}
                value={option.value}
                className="w-full p-2 border rounded hover:bg-gray-100"
              >
                <div>
                  <div>{option.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                </div>
              </Radio>
            );
          }
        })}
      </Space>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Title level={2}>Tool Finder</Title>
      <Paragraph className="mb-6">
        Question {currentQuestionIndex + 1} of {QUESTIONNAIRE_ORDER.length}
      </Paragraph>

      <Title level={3} className="mb-4">
        {filterKeyToQuestion[currentQuestion]}
      </Title>

      <Radio.Group
        onChange={(e) => handleAnswer([e.target.value])}
        value={answers[currentQuestion]?.[0] || null}
        className="w-full"
      >
        {renderRadioOptions()}
      </Radio.Group>

      <div className="flex justify-between mt-6">
        <Button onClick={handleSkip} className="mr-4">
          Skip
        </Button>
        <Button
          type="primary"
          onClick={handleNext}
          disabled={!answers[currentQuestion]?.[0]}
        >
          {currentQuestionIndex === QUESTIONNAIRE_ORDER.length - 1
            ? "See Recommendations"
            : "Next"}
        </Button>
      </div>
    </div>
  )
}

export default EnAccessToolMap