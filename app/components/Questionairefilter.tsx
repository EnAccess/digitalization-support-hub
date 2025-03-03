"use client"
import React, { useState, useMemo, useEffect } from "react"
import { Card, Typography, Button, Radio, Space } from "antd"
import yaml from "js-yaml"

const { Title, Paragraph } = Typography

const QUESTIONNAIRE_ORDER = [
  "numberOfClients",
  "transactionsPerDay",
  "companyStage",
  "companyFocus",
  "toolsCost",
  "toolSource",
  "internalExpertise",
  "businessArea",
  "functionalArea",
  "interoperability",
  "offlineFunctionality",
]

const filterKeyToQuestion: Record<string, string> = {
  numberOfClients: "What Size is your company?",
  companyStage: "At what phase/stage is your company?",
  companyFocus: "What is the focus area for your company?",
  toolsCost: "Are you only looking for free-to-use tools?",
  toolSource: "Are you only interested in open-source tools?",
  internalExpertise:
    "Do you have any in-house IT/software R&D expertise and resources?",
  interoperability: "Are you interested in Inter-operability of the tools?",
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

const EnAccessToolMap: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [isQuestionnaireComplete, setIsQuestionnaireComplete] = useState(false)
  const [tools, setTools] = useState<any[]>([])

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
          return yaml.load(text)
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

        if (Array.isArray(metadataValue)) {
          return selectedValues.some((value) => metadataValue.includes(value))
        }

        return selectedValues.includes(metadataValue)
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
        <Space direction="vertical" className="w-full">
          {FILTER_OPTIONS[currentQuestion].map((option) => (
            <Radio
              key={option}
              value={option}
              className="w-full p-2 border rounded hover:bg-gray-100"
            >
              {option}
            </Radio>
          ))}
        </Space>
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
