export interface Tool {
  id?: number
  name: string
  company: string
  summary: string
  logo: string
  link?: string
  categories: string[]
  license?: string[]
  user_type?: string[]
  pricing?: string
  free_demo_available?: boolean
  interoperability?: string[]
  interoperability_pricing?: string
  documentation?: string
  offline_functionality?: string
  business_type?: string[]
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
