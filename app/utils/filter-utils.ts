import { Tool, FilterQuery } from "../types"

export function buildFilterQueryFromAnswers(
  answers: Record<string, string[]>
): FilterQuery {
  return {
    numberOfClients: answers.numberOfClients?.[0],
    companyStage: answers.companyStage?.[0],
    companyFocus: answers.companyFocus,
    toolsCost: answers.toolsCost?.[0],
    internalExpertise: answers.internalExpertise?.[0],
    toolSource: answers.toolSource?.[0],
  }
}

export function filterToolsByQuery(tools: Tool[], query: FilterQuery): Tool[] {
  return tools.filter((tool) => {
    // Client size check
    // if (query.numberOfClients) {
    //   if (!tool.capabilities?.clientSize) return false
    //   const [min, max] = parseClientRange(query.numberOfClients)
    //   if (
    //     tool.capabilities.clientSize.min > max ||
    //     (tool.capabilities.clientSize.max &&
    //       tool.capabilities.clientSize.max < min)
    //   ) {
    //     return false
    //   }
    // }

    // Company stage check
    // if (
    //   query.companyStage &&
    //   (!tool.capabilities?.businessStage ||
    //     tool.capabilities.businessStage !== query.companyStage)
    // ) {
    //   return false
    // }

    // // Company focus/sectors check
    // if (query.companyFocus?.length) {
    //   if (!tool.capabilities?.sectors) return false
    //   if (
    //     !query.companyFocus.some((focus) =>
    //       tool.capabilities.sectors.includes(focus)
    //     )
    //   ) {
    //     return false
    //   }
    // }

    // Cost check
    if (query.toolsCost?.includes("free-to-use")) {
      if (
        !tool.capabilities?.pricing?.isFree &&
        !tool.capabilities?.pricing?.hasFreemium
      ) {
        return false
      }
    }

    // Technical expertise check
    if (query.internalExpertise) {
      if (!tool.capabilities?.technicalRequirements?.expertiseLevel)
        return false
      const requiredLevel = mapExpertiseLevel(query.internalExpertise)
      if (
        tool.capabilities.technicalRequirements.expertiseLevel !== requiredLevel
      ) {
        return false
      }
    }

    // Source check
    if (query.toolSource?.includes("open source")) {
      if (!tool.capabilities?.technicalRequirements?.isOpenSource) return false
    }

    return true
  })
}

function parseClientRange(range: string): [number, number] {
  switch (range) {
    case "<5":
      return [0, 5]
    case "5-100":
      return [5, 100]
    case "101-500":
      return [101, 500]
    case ">500":
      return [500, Infinity]
    default:
      return [0, Infinity]
  }
}

function mapExpertiseLevel(expertise: string): "none" | "basic" | "advanced" {
  if (expertise.includes("No, not at all")) return "none"
  if (expertise.includes("some knowledge")) return "basic"
  return "advanced"
}

export function calculateFilteredToolsCount(
  tools: Tool[],
  answers: Record<string, string[]>
): number {
  if (!tools.length || !Object.keys(answers).length) {
    return 4 // Return default count if no tools or answers
  }

  const filteredTools = tools.filter((tool) => {
    // Check company focus with safety checks
    // if (answers.companyFocus?.length) {
    //   if (!tool.capabilities?.sectors) return false
    //   const matchesFocus = answers.companyFocus.some((focus) =>
    //     tool.capabilities.sectors.includes(focus)
    //   )
    //   if (!matchesFocus) return false
    // }

    // Check pricing with safety checks
    if (answers.toolsCost?.includes("free-to-use")) {
      if (!tool.capabilities?.pricing?.isFree) return false
    }

    // Add expertise level check with safety checks
    if (answers.internalExpertise?.length) {
      if (!tool.capabilities?.technicalRequirements?.expertiseLevel)
        return false
      const requiredLevel = mapExpertiseLevel(answers.internalExpertise[0])
      if (
        tool.capabilities.technicalRequirements.expertiseLevel !== requiredLevel
      ) {
        return false
      }
    }

    return true
  })

  return filteredTools.length || 4 // Return 4 if no tools are found
}
