"use client"
import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { mapAnswersToCategories } from "../utils/questionnaire-utils"
import yaml from "js-yaml"
import { FilterState, Tool } from "../types"
import { toolMatchesFilters } from "../utils/filterTools"

// const getToolCountForCategories = async (
//   categories: string[]
// ): Promise<number> => {
//   try {
//     // Assuming tools data is stored in YAML files in a public directory
//     const toolFiles = [
//       "/tools/paygee.yaml",
//       "/tools/odoo.yaml",
//       "/tools/quickbooks.yaml",
//       "/tools/upya.yaml",
//       "/tools/xero.yaml",
//       "/tools/odyssey.yaml",
//       "/tools/unleashed.yaml",
//       "/tools/3cx.yaml",
//       "/tools/d-rec.yaml",
//       "/tools/ixo.yaml",
//       "/tools/p-rec.yaml",
//       "/tools/challenges.yaml",
//       "/tools/carbon-clear.yaml",
//       "/tools/cavex.yaml",
//       "/tools/bridgin.yaml",
//       "/tools/d-rec-financing-programmes.yaml",
//       "/tools/fieldPro.yaml",
//       "/tools/Learn.ink.yaml",
//       "/tools/micropowerManager.yaml",
//       "/tools/nithio.yaml",
//       "/tools/odyssey-fern.yaml",
//       "/tools/paygops.yaml",
//       "/tools/vida.yaml",
//       "/tools/angaza.yaml",
//       "/tools/prospect.yaml",
//       "/tools/universus.yaml",
//       "/tools/market-Map.yaml",
//       "/tools/qgis.yaml",
//       "/tools/development-maps.yaml",
//       "/tools/energy-access-explorer.yaml",
//       "/tools/wps.yaml",
//       "/tools/zoho.yaml",
//     ]

//     // Load all tool data
//     const loadedTools = await Promise.all(
//       toolFiles.map(async (file) => {
//         const response = await fetch(file)
//         const text = await response.text()
//         return yaml.load(text) as Tool
//       })
//     )

//     // Filter tools based on categories
//     const matchingTools = loadedTools.filter(
//       (tool) =>
//         Array.isArray(tool.categories) &&
//         tool.categories.some((category) => categories.includes(category))
//     )

//     return matchingTools.length
//   } catch (error) {
//     console.error("Error loading tool data:", error)
//     return 0
//   }
// }

const getToolCountForFilters = async (
  categories: string[],
  filters: FilterState
): Promise<number> => {
  try {
    // Assuming tools data is stored in YAML files in a public directory
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
      "/tools/market-Map.yaml",
      "/tools/qgis.yaml",
      "/tools/development-maps.yaml",
      "/tools/energy-access-explorer.yaml",
      "/tools/wps.yaml",
      "/tools/zoho.yaml",
    ]

    // Load all tool data
    const loadedTools = await Promise.all(
      toolFiles.map(async (file) => {
        const response = await fetch(file)
        const text = await response.text()
        return yaml.load(text) as Tool
      })
    )

    // Filter tools by categories and filters
    const matchingTools = loadedTools.filter((tool) =>
      toolMatchesFilters(tool, categories, filters)
    )

    return matchingTools.length
  } catch (error) {
    console.error("Error loading tool data:", error)
    return 0
  }
}

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
    "Solar Home Systems (SHS)",
    "Mini-Grids (MGs)",
    "Clean Cooking",
    "Other",
  ],
  toolsCost: [
    "Yes, I am only interested in free-to-use tools or tools with freemium versions.",
    "No, all tools are good.",
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
    "Distribution & Sales",
    "After Sales & Operation",
    "Assess & Optimize",
    "End of Life",
  ],
}

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

interface QuestionaireFilterProps {
  onComplete: (
    result: { categories: string[]; filters: FilterState },
    answers: Record<string, string[]>
  ) => void
  onClose: () => void
  toolCount?: number
}

const QuestionaireFilter = ({
  onComplete,
  onClose,
}: QuestionaireFilterProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [isQuestionnaireComplete, setIsQuestionnaireComplete] = useState(false)
  const [, setFilteredToolsCount] = useState(0)
  const [matchingToolCount, setMatchingToolCount] = useState(0)

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

    // Check if we're on question 5 (internalExpertise) and "No, not at all" is selected
    if (
      currentQuestion === "internalExpertise" &&
      answers[currentQuestion]?.[0] === "No, not at all"
    ) {
      // Skip question 6 (toolSource) and go directly to completion
      setIsQuestionnaireComplete(true)
      return
    }

    if (currentQuestionIndex < QUESTIONNAIRE_ORDER.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setIsQuestionnaireComplete(true)
    }
  }

  const handleBack = () => {
    if (isQuestionnaireComplete) {
      setIsQuestionnaireComplete(false)
      // Check if we skipped question 6, if so go back to question 5
      if (answers["internalExpertise"]?.[0] === "No, not at all") {
        setCurrentQuestionIndex(4) // Index 4 is question 5 (internalExpertise)
      } else {
        setCurrentQuestionIndex(QUESTIONNAIRE_ORDER.length - 1)
      }
    } else if (currentQuestionIndex > 0) {
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

  const handleComplete = () => {
    const result = mapAnswersToCategories(answers)
    onComplete(result, answers) // Pass both the result (categories + filters) and raw answers
    onClose()
  }

  // Update useEffect to use the new result structure
  useEffect(() => {
    const result = mapAnswersToCategories(answers)
    if (result.categories.length > 0) {
      getToolCountForFilters(result.categories, result.filters).then(
        (count) => {
          setMatchingToolCount(count)
        }
      )
    }
  }, [answers])

  useEffect(() => {
    if (isQuestionnaireComplete) {
      // Calculate the filter query based on answers
      // const filterQuery = buildFilterQueryFromAnswers(answers)
      // This would normally filter actual tools data
      // For now, we'll set a calculated value based on the number of answers
      const answerCount = Object.values(answers).flat().length
      setFilteredToolsCount(Math.max(5, Math.min(20, answerCount * 3)))
    }
  }, [isQuestionnaireComplete, answers])

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
            <div className="max-w-2xl mx-auto">
              {/* Progress indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-emerald-500"
                    />
                  ))}
                </div>
              </div>

              {/* Finished heading */}
              <div className="text-center mb-8">
                <div className="text-sm text-emerald-600 font-medium mb-2">
                  Finished!
                </div>
                   <h3 className="text-xl font-medium">
                  {matchingToolCount > 0 
                    ? `Based on your answers, we've found ${matchingToolCount} tools that could be a great fit for you.`
                    : "We were unable to find tools that fit all your criteria, but we have other tools that might still be helpful for your needs."
                  }
                </h3>
              </div>

              {/* Summary section */}
              <div className="bg-white rounded-lg border p-6 mb-8">
                <h4 className="text-base font-medium mb-4">Your Summary</h4>
                <div className="space-y-4">
                  {QUESTIONNAIRE_ORDER.map((question, index) => (
                    <div
                      key={question}
                      className="flex items-start gap-3 pb-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center"></div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setIsQuestionnaireComplete(false)
                            setCurrentQuestionIndex(index)
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-gray-500 hover:text-emerald-700"
                          >
                            <path
                              d="M11.5931 1.33594C11.9837 0.945312 12.6134 0.945312 13.004 1.33594L14.6681 3C15.0587 3.39062 15.0587 4.02031 14.6681 4.41094L12.7368 6.34219L9.66181 3.26719L11.5931 1.33594ZM3.99994 8.92969L9.14369 3.78594L12.2181 6.86094L7.07447 12.0047C6.97447 12.1047 6.84994 12.175 6.71181 12.2094L3.83744 12.9594C3.54682 13.0344 3.27447 12.9594 3.08119 12.7656C2.88791 12.5719 2.81244 12.3 2.88791 12.0094L3.63791 9.13437C3.67213 8.99687 3.74213 8.87188 3.84213 8.77188L3.99994 8.92969Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {filterKeyToQuestion[question]}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {answers[question]?.join(", ") || "Skipped"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6">
               <Button
                  onClick={handleComplete}
                  className="w-full bg-emerald-700 text-white hover:bg-emerald-800"
                >
                  {matchingToolCount > 0 
                    ? `View ${matchingToolCount} suggestions`
                    : "Explore other tools"
                  }
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {!isQuestionnaireComplete && (
        <div className="p-6 border-t">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex items-center"
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleSkip} variant="ghost">
                Skip
              </Button>
            </div>
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
        </div>
      )}
    </div>
  )
}

export default QuestionaireFilter
