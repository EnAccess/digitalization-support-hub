export const categoryMap = {
  preparation: [
    "Market Analysis",
    "Company Set Up",
    "Bookkeeping & Accounting",
    "Product Procurement",
    "Fundraising",
  ],
  distribution: [
    "Stock Management",
    "Personal Training",
    "Marketing",
    "Customer Vetting",
    "Product Logistics & Procurement",
    "Sales & Contract Management",
  ],
  operations: [
    "Payment Collections",
    "Service Calls",
    "Tech Response",
    "Upselling",
    "Customer Finance Management",
    "CRM",
    "HR Management",
  ],
} as const

export function mapAnswersToCategories(
  answers: Record<string, string[]>
): string[] {
  const categories = new Set<string>()

  // Map company focus to relevant categories
  if (answers.companyFocus) {
    answers.companyFocus.forEach((focus) => {
      if (focus.includes("SHS")) {
        // Map to relevant subcategories from categoryMap
        categories.add("Market Analysis")
        categories.add("Stock Management")
      }
      if (focus.includes("Mini-Grids")) {
        categories.add("Service Calls")
        categories.add("Tech Response")
      }
      if (focus.includes("Clean Cooking")) {
        categories.add("Product Procurement")
        categories.add("Sales & Contract Management")
      }
    })
  }

  // Map company stage to relevant categories
  if (answers.companyStage?.[0]) {
    switch (answers.companyStage[0]) {
      case "Pre-launch Startup":
        categories.add("Market Analysis")
        categories.add("Company Set Up")
        break
      case "Early-Stage Startup":
        categories.add("Marketing")
        categories.add("Customer Vetting")
        break
      case "Growing Startup":
        categories.add("Payment Collections")
        categories.add("CRM")
        break
      case "Scaling SME":
        categories.add("Portfolio Analysis & Management")
        categories.add("Impact Measurements & Performance")
        break
      case "Established SME":
        categories.add("API Integration & connection")
        categories.add("Remote Team Management")
        break
    }
  }

  // Map technical expertise to relevant categories
  if (answers.internalExpertise?.[0]) {
    if (answers.internalExpertise[0].includes("No, not at all")) {
      categories.add("Personal Training")
    }
    if (answers.internalExpertise[0].includes("full IT")) {
      categories.add("API Integration & connection")
    }
  }

  return Array.from(categories)
}
