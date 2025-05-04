export interface Tool {
  id?: number
  name: string
  company: string
  summary: string
  categories: string[]
  highlights?: string[]
  logo: string
  link?: string
  capabilities?: {
    sectors: string[]
    pricing: {
      isFree: boolean
      hasFreemium: boolean
    }
    technicalRequirements: {
      expertiseLevel: "none" | "basic" | "advanced"
      isOpenSource: boolean
    }
  }
}

export interface FilterQuery {
  numberOfClients?: string
  companyStage?: string
  companyFocus?: string[]
  toolsCost?: string
  internalExpertise?: string
  toolSource?: string
}

export interface QuestionnaireAnswers {
  numberOfClients?: string[]
  companyStage?: string[]
  companyFocus?: string[]
  toolsCost?: string[]
  internalExpertise?: string[]
  toolSource?: string[]
}
