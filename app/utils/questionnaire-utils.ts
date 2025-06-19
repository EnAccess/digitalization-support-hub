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

// First add an interface for the return type
interface QuestionnaireResult {
  categories: string[]
  filters: {
    pricing: string[]
    businessTypes: string[]
    licensing: string[]
    DataExport: boolean
    unidirectionalAPI: boolean
    bidirectionalAPI: boolean
    automatedDataExchange: boolean
  }
}

// Update the function to return both categories and filters
export function mapAnswersToCategories(
  answers: Record<string, string[]>
): QuestionnaireResult {
  const categories = new Set<string>()
  const filters = {
    pricing: [] as string[],
    businessTypes: [] as string[],
    licensing: [] as string[],
    DataExport: false,
    unidirectionalAPI: false,
    bidirectionalAPI: false,
    automatedDataExchange: false,
  }

  // Q3: Number of Clients mapping (moved first as per QUESTIONNAIRE_ORDER)
  if (answers.numberOfClients?.[0]) {
    switch (answers.numberOfClients[0]) {
      case "<5":
        categories.add("Company Set Up")
        categories.add("Fundraising")
        categories.add("Market Analysis")
        break
      case "5-100":
        categories.add("Company Set Up")
        categories.add("CRM")
        categories.add("Fundraising")
        categories.add("Market Analysis")
        categories.add("Payment Collections")
        break
      case "101-500":
        categories.add("Bookkeeping & Accounting")
        categories.add("CRM")
        categories.add("Fundraising")
        categories.add("Impact Measurements & Performance")
        categories.add("Marketing")
        categories.add("Payment Collections")
        categories.add("Personal Training")
        categories.add("Product Logistics & Procurement")
        categories.add("Sales & Contract Management")
        categories.add("Service Calls")
        categories.add("Tech Response")
        break
      case ">500":
        categories.add("Bookkeeping & Accounting")
        categories.add("Customer Finance Management")
        categories.add("Customer Vetting")
        categories.add("CRM")
        categories.add("Fundraising")
        categories.add("HR Management")
        categories.add("Impact Measurements & Performance")
        categories.add("Marketing")
        categories.add("Payment Collections")
        categories.add("Personal Training")
        categories.add("Portfolio Analysis & Management")
        categories.add("Product Logistics & Procurement")
        categories.add("Sales & Contract Management")
        categories.add("Service Calls")
        categories.add("Stock Management")
        categories.add("Tech Response")
        categories.add("Upselling")
        break
    }
  }

  // Q1: Company Stage mapping
  if (answers.companyStage?.[0]) {
    switch (answers.companyStage[0]) {
      case "Pre-launch Startup":
        categories.add("Bookkeeping & Accounting")
        categories.add("Company Set Up")
        categories.add("CRM")
        categories.add("Fundraising")
        categories.add("Market Analysis")
        categories.add("Payment Collections")
        break
      case "Early-Stage Startup":
        categories.add("Bookkeeping & Accounting")
        categories.add("Company Set Up")
        categories.add("CRM")
        categories.add("Fundraising")
        categories.add("Market Analysis")
        categories.add("Payment Collections")
        categories.add("Product Logistics & Procurement")
        break
      case "Growing Startup":
        categories.add("Customer Finance Management")
        categories.add("CRM")
        categories.add("HR Management")
        categories.add("Impact Measurements & Performance")
        categories.add("Market Analysis")
        categories.add("Marketing")
        categories.add("Payment Collections")
        categories.add("Personal Training")
        categories.add("Product Logistics & Procurement")
        categories.add("Sales & Contract Management")
        categories.add("Service Calls")
        categories.add("Tech Response")
        break
      case "Scaling SME":
        categories.add("Customer Finance Management")
        categories.add("Customer Vetting")
        categories.add("CRM")
        categories.add("Fundraising")
        categories.add("HR Management")
        categories.add("Impact Measurements & Performance")
        categories.add("Marketing")
        categories.add("Payment Collections")
        categories.add("Personal Training")
        categories.add("Portfolio Analysis & Management")
        categories.add("Product Logistics & Procurement")
        categories.add("Sales & Contract Management")
        categories.add("Service Calls")
        categories.add("Stock Management")
        categories.add("Tech Response")
        categories.add("Upselling")
        break
      case "Established SME":
        categories.add("Customer Finance Management")
        categories.add("Customer Vetting")
        categories.add("CRM")
        categories.add("Fundraising")
        categories.add("HR Management")
        categories.add("Impact Measurements & Performance")
        categories.add("Marketing")
        categories.add("Payment Collections")
        categories.add("Personal Training")
        categories.add("Portfolio Analysis & Management")
        categories.add("Product Logistics & Procurement")
        categories.add("Sales & Contract Management")
        categories.add("Service Calls")
        categories.add("Stock Management")
        categories.add("Tech Response")
        categories.add("Upselling")
        break
    }
  }

  // Q2: Company Focus mapping
  if (answers.companyFocus) {
    answers.companyFocus.forEach((focus) => {
      if (focus.includes("SHS")) {
        categories.add("Stock Management")
        categories.add("Payment Collections")
        categories.add("Sales & Contract Management")
        filters.businessTypes.push("SHS")
      }
      if (focus.includes("Mini-Grids")) {
        categories.add("Service Calls")
        categories.add("Tech Response")
        categories.add("Impact Measurements & Performance")
        filters.businessTypes.push("Mini Grids")
      }
      if (focus.includes("Clean Cooking")) {
        categories.add("Product Logistics & Procurement")
        categories.add("Marketing")
        categories.add("Customer Finance Management")
        filters.businessTypes.push("Clean Cooking")
      }
    })
  }

  // Q5: Tools Cost mapping
  if (answers.toolsCost?.[0]) {
    if (answers.toolsCost[0].includes("free-to-use")) {
      categories.add("Market Analysis")
      categories.add("Personal Training")
      filters.pricing.push("Free")
      filters.pricing.push("Free Demo")
    }
  }

  // Q6: Tool Source mapping (Open Source preference)
  if (answers.toolSource?.[0]) {
    if (answers.toolSource[0].includes("Yes please")) {
      categories.add("Tech Response")
      categories.add("Impact Measurements & Performance")
      filters.licensing.push("Fully Open Source")
      filters.licensing.push("Partially Open Source")
    }
  }

  return {
    categories: Array.from(categories),
    filters,
  }
}
