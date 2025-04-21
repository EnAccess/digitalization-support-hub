"use client"
import { useState, useMemo, useEffect } from "react"
import yaml from "js-yaml"
import { X, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const QUESTIONNAIRE_ORDER = [
  "numberOfClients",
  "companyStage",
  "companyFocus",
  "toolsCost",
  "internalExpertise",
  "toolSource",
]

const filterKeyToQuestion: Record<string, string> = {
  numberOfClients:
    "On average, how many transactions does your company process per day?",
  companyStage: "What stage is your company at right now?",
  companyFocus:
    "Which areas does your company focus on? (Select up to 3 options)",
  toolsCost: "Do you only want to explore free-to-use tools?",
  internalExpertise:
    "Does your team have in-house IT or software development skills?",
  toolSource: "Would you prefer to explore only open source tools?",
}

// Options for filtering that will be displayed in the UI
const FILTER_OPTIONS: Record<
  string,
  Array<string | { value: string; description: string }>
> = {
  numberOfClients: ["<5", "5-100", "101-500", ">500"],
  companyStage: [
    {
      value: "Pre-launch Startup",
      description:
        "We are a very early-stage company with an idea or concept but no established customers or revenue yet. We have very little or no staff except us, the funders. We currently focus on product development, initial market research, and company setup.",
    },
    {
      value: "Early-Stage Startup",
      description:
        "We are a small company with a product or service launched, a few customers, and some revenue. We have a small team, and the focus is on customer acquisition and refining the product and/or services.",
    },
    {
      value: "Growing Startup",
      description:
        "We are a company with a constantly growing customer base and increasing revenue, and we are starting to establish and grow our team. Our current focus is on scaling our operations, improving product-market fit, and expanding into new markets.",
    },
    {
      value: "Scaling SME",
      description:
        "We are a mature company with a stable revenue stream, structured departments, and a growing team. We currently focus on scaling operations, optimizing processes, and expanding our market presence.",
    },
    {
      value: "Established SME",
      description:
        "We are a well-established company with several years of operational track record, consistent revenue, clearly structured departments, and a stable, well-staffed organization. Our current focus is on maintaining growth, optimizing efficiency, and potentially exploring new business opportunities.",
    },
  ],
  companyFocus: [
    "Solar Home Systems(SHS)",
    "Mini-Grids(MGs)",
    "Clean Cooking",
    "Other",
  ],
  toolsCost: [
    "Yes, I am only interested in free-to-use tools or tools with freemium versions.",
    "No, all tools are good. Free and non-free tools are fine.",
  ],
  toolSource: [
    {
      value: "Yes please, we love open source",
      description:
        "Choose this if you prefer tools that are free and customisable.",
    },
    {
      value: "It may be interesting, but it's not a must",
      description:
        "Choose this if you require proprietary solutions with dedicated support and features",
    },
  ],
  internalExpertise: [
    "No, not at all",
    "Yes, we have some knowledge and capabilities",
    "We have a full IT and Software R&D team (or good access to reliable third-party providers)",
  ],
  businessArea: [
    "Preparation and Setup",
    "Distribution/Sales",
    "After Sales/Operation",
    "Assess & Optimize",
    "End of Life",
  ],
}

const VALUE_MAPPING: Record<string, Record<string, string>> = {
  toolSource: {
    "Yes please, we love open source": "Open-source only",
    "It may be interesting, but it's not a must":
      "Both (open and closed source)",
  },
  companyStage: {
    "Pre-launch Startup": "Pre-launch Startup",
    "Early-Stage Startup": "Early-Stage Startup",
    "Growing Startup": "Growing Startup",
    "Scaling SME": "Scaling SME",
    "Established SME": "Established SME",
  },
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

const TOOL_CATEGORIES = [
  "Bookkeeping & Accounting",
  "Company set up",
  "Fundraising",
  "Market Analysis",
  "Product procurement",
  "Stock Management",
]

// Stepper component
interface StepperProps {
  steps: number
  currentStep: number
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      <div className="flex items-center w-full max-w-3xl">
        {Array.from({ length: steps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center z-10 text-sm font-medium",
                  index <= currentStep
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {index + 1}
              </div>
              <div className="absolute -bottom-6 whitespace-nowrap text-xs text-gray-500">
                Step {index + 1}
              </div>
            </div>
            {index < steps - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1",
                  index < currentStep ? "bg-emerald-500" : "bg-gray-200"
                )}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const QuestionaireFilter = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [isQuestionnaireComplete, setIsQuestionnaireComplete] = useState(false)
  const [tools, setTools] = useState<Tool[]>([])
  const [isModalOpen, setIsModalOpen] = useState(true)

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

  const handleRadioAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: [value],
    }))
  }

  const handleCheckboxAnswer = (value: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentAnswers = prev[currentQuestion] || []

      if (checked) {
        // Limit to 3 selections
        if (currentQuestion === "companyFocus" && currentAnswers.length >= 3) {
          return prev
        }
        return {
          ...prev,
          [currentQuestion]: [...currentAnswers, value],
        }
      } else {
        return {
          ...prev,
          [currentQuestion]: currentAnswers.filter((item) => item !== value),
        }
      }
    })
  }

  const toggleCheckboxAnswer = (value: string) => {
    const isCurrentlyChecked =
      answers[currentQuestion]?.includes(value) || false
    handleCheckboxAnswer(value, !isCurrentlyChecked)
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

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
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

  // Map UI values to metadata values for filtering
  const mapUIValueToMetadataValue = (
    filterKey: string,
    uiValue: string
  ): string => {
    if (VALUE_MAPPING[filterKey] && VALUE_MAPPING[filterKey][uiValue]) {
      return VALUE_MAPPING[filterKey][uiValue]
    }
    return uiValue
  }

  const filteredTools = useMemo(() => {
    if (!isQuestionnaireComplete) return []

    return tools.filter((tool) => {
      return Object.entries(answers).every(([filterKey, selectedValues]) => {
        if (selectedValues.length === 0) return true

        const metadataValue = tool.metadata[filterKey]
        if (metadataValue === undefined) return false

        // Map the UI values to actual metadata values for comparison
        const mappedSelectedValues = selectedValues.map((val) =>
          mapUIValueToMetadataValue(filterKey, val)
        )

        if (Array.isArray(metadataValue)) {
          return mappedSelectedValues.some((value) =>
            metadataValue.includes(value)
          )
        }

        return (
          typeof metadataValue === "string" &&
          mappedSelectedValues.includes(metadataValue)
        )
      })
    })
  }, [answers, isQuestionnaireComplete, tools])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const resetQuestionnaire = () => {
    setIsQuestionnaireComplete(false)
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  if (!isModalOpen) return null

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-semibold">Tool Finder</h2>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!isQuestionnaireComplete ? (
          <div className="p-6">
            {/* Progress stepper */}
            <div className="mb-12 pt-6">
              <Stepper steps={6} currentStep={currentQuestionIndex} />
            </div>

            <div className="mb-8 text-center">
              <div className="text-sm text-gray-500 mb-2">
                {currentQuestionIndex + 1}/{QUESTIONNAIRE_ORDER.length}
              </div>
              <h3 className="text-xl font-bold">
                {filterKeyToQuestion[currentQuestion]}
              </h3>
            </div>

            {/* Options - Using checkboxes for companyFocus question */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {currentQuestion === "companyFocus" ? (
                // Checkbox options for "select up to 3"
                <div className="space-y-4">
                  {FILTER_OPTIONS[currentQuestion].map((option, index) => {
                    const optionValue =
                      typeof option === "string" ? option : option.value
                    const isChecked =
                      answers[currentQuestion]?.includes(optionValue) || false

                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 cursor-pointer ${
                          isChecked
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => toggleCheckboxAnswer(optionValue)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <Checkbox
                              id={`checkbox-${index}`}
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                handleCheckboxAnswer(
                                  optionValue,
                                  checked === true
                                )
                              }
                              className="pointer-events-none data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                            />
                          </div>
                          <Label
                            htmlFor={`checkbox-${index}`}
                            className="font-medium cursor-pointer"
                          >
                            {optionValue}
                          </Label>
                        </div>
                      </div>
                    )
                  })}
                  <div className="text-sm text-gray-500 mt-2">
                    Selected: {answers[currentQuestion]?.length || 0}/3
                  </div>
                </div>
              ) : (
                // Radio options for other questions
                <RadioGroup
                  value={answers[currentQuestion]?.[0] || ""}
                  onValueChange={handleRadioAnswer}
                  className="space-y-4"
                >
                  {FILTER_OPTIONS[currentQuestion].map((option, index) => {
                    const optionValue =
                      typeof option === "string" ? option : option.value
                    const optionDescription =
                      typeof option === "string" ? null : option.description
                    const isSelected =
                      answers[currentQuestion]?.[0] === optionValue

                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 cursor-pointer ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => handleRadioAnswer(optionValue)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <RadioGroupItem
                              value={optionValue}
                              id={`radio-${index}`}
                              className="pointer-events-none data-[state=checked]:border-emerald-500 data-[state=checked]:text-emerald-500"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`radio-${index}`}
                              className="font-medium cursor-pointer"
                            >
                              {optionValue}
                            </Label>
                            {optionDescription && (
                              <p className="text-sm text-gray-500 mt-1">
                                {optionDescription}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </RadioGroup>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Results */}
            {filteredTools.length > 0 ? (
              <div>
                <div className="bg-emerald-50 rounded-lg p-6 mb-8">
                  <div className="text-emerald-700 font-medium mb-2">
                    Finished!
                  </div>
                  <h3 className="text-xl font-medium mb-4">
                    Based on your answers, we've selected {filteredTools.length}{" "}
                    tools that could be a great fit for you.
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {TOOL_CATEGORIES.map((category, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 bg-white rounded-full text-sm border"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {filteredTools.length} items
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTools.map((tool, index) => (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="text-sm text-gray-500 mb-1">
                          Company name
                        </div>
                        <h4 className="font-semibold text-lg mb-2">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-gray-700 mb-4">
                          {tool.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            100% free
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Free demo
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button variant="ghost">View more</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-4">
                  No tools match your criteria.
                </h3>
                <Button onClick={resetQuestionnaire} variant="default">
                  Start Over
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isQuestionnaireComplete && (
        <div className="p-6 border-t flex justify-between">
          {currentQuestionIndex > 0 ? (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <Button onClick={handleSkip} variant="ghost">
              Skip
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={
              currentQuestion === "companyFocus"
                ? !(answers[currentQuestion]?.length > 0)
                : !answers[currentQuestion]?.[0]
            }
            className="flex items-center"
          >
            {currentQuestionIndex === QUESTIONNAIRE_ORDER.length - 1
              ? "See Recommendations"
              : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuestionaireFilter
