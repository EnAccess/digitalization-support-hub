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
  // if (answers.companyFocus) {
  //   answers.companyFocus.forEach((focus) => {
  //     if (focus.includes("SHS")) {
  //       categories.add("Stock Management")
  //       categories.add("Payment Collections")
  //       categories.add("Sales & Contract Management")
  //     }
  //     if (focus.includes("Mini-Grids")) {
  //       categories.add("Service Calls")
  //       categories.add("Tech Response")
  //       categories.add("Impact Measurements & Performance")
  //     }
  //     if (focus.includes("Clean Cooking")) {
  //       categories.add("Product Logistics & Procurement")
  //       categories.add("Marketing")
  //       categories.add("Customer Finance Management")
  //     }
  //   })
  // }

  // Q4: Internal Expertise mapping
  // if (answers.internalExpertise?.[0]) {
  //   if (answers.internalExpertise[0].includes("No, not at all")) {
  //     categories.add("Personal Training")
  //     categories.add("Tech Response")
  //   }
  //   if (answers.internalExpertise[0].includes("some knowledge")) {
  //     categories.add("Service Calls")
  //     categories.add("CRM")
  //   }
  //   if (answers.internalExpertise[0].includes("full IT")) {
  //     categories.add("Tech Response")
  //     categories.add("Impact Measurements & Performance")
  //   }
  // }

  // Q5: Tools Cost mapping
  // if (answers.toolsCost?.[0]) {
  //   if (answers.toolsCost[0].includes("free-to-use")) {
  //     categories.add("Market Analysis")
  //     categories.add("Personal Training")
  //   }
  // }

  // Q6: Tool Source mapping (Open Source preference)
  // if (answers.toolSource?.[0]) {
  //   if (answers.toolSource[0].includes("Yes please")) {
  //     categories.add("Tech Response")
  //     categories.add("Impact Measurements & Performance")
  //   }
  // }

  return Array.from(categories)
}
