import { Tool, FilterState } from "../types"

export function toolMatchesFilters(
  tool: Tool,
  categories: string[],
  filters: FilterState
): boolean {
  // Category match (at least one)
  const matchesCategory =
    categories.length === 0 ||
    (Array.isArray(tool.categories) &&
      tool.categories.some((category) => categories.includes(category)))
  if (!matchesCategory) return false

  // Pricing match (same as Home)
  const matchesPricing =
    filters.pricing.length === 0 ||
    (filters.pricing.includes("Free version") && tool.is_free) ||
    (filters.pricing.includes("Free demo") && tool.free_demo_available)

  // Business Types match (same as Home)
  const matchesBusinessType =
    filters.businessTypes.length === 0 ||
    filters.businessTypes.some((type) => tool.business_type?.includes(type))

  // Licensing match (same as Home)
  const matchesLicense =
    filters.licensing.length === 0 ||
    filters.licensing.some((license) =>
      typeof tool.license === "string"
        ? tool.license === license
        : tool.license?.includes?.(license)
    )

  // Interoperability match (same as Home)
  const matchesInteroperability =
    (!filters.DataExport ||
      tool.interoperatibility?.includes(
        "Data export is possible via file download (CSV/XLSX/...)"
      )) &&
    (!filters.unidirectionalAPI ||
      tool.interoperatibility?.includes(
        "We provide uni-directional data export via API"
      )) &&
    (!filters.bidirectionalAPI ||
      tool.interoperatibility?.includes(
        "We provide bi-directional data exchange via API. It is possible to export data via API and import data via API"
      )) &&
    (!filters.automatedDataExchange ||
      tool.interoperatibility?.includes(
        "Our tool offers automatic data exchange with selected tools"
      ))

  return (
    !!matchesPricing &&
    !!matchesBusinessType &&
    !!matchesLicense &&
    !!matchesInteroperability
  )
}
