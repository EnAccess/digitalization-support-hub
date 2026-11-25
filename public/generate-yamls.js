import fs from "fs"
import path from "path"
import { google } from "googleapis"
import yaml from "js-yaml"
import dotenv from "dotenv"
dotenv.config()

// Configuration - Update these values or use environment variables
const CONFIG = {
  // Google Sheets configuration
  SPREADSHEET_ID:
    process.env.GOOGLE_SPREADSHEET_ID ||
    "1O4TnPEkM8v3wXiKjB0wmjmrPoFTrnZlTL3YdqkJ0HM0",
  RANGE:
    process.env.GOOGLE_SHEETS_RANGE || "'Master List- source of truth'!A:BP",

  // Output directory for YAML files - Smart path resolution
  OUTPUT_DIR: (() => {
    const outputDir = process.env.OUTPUT_DIRECTORY || "./public/tools"

    // If we're already in the public directory, just use ./tools
    if (process.cwd().endsWith("/public")) {
      return path.resolve("./tools")
    }

    // Otherwise use the full path
    return path.resolve(outputDir)
  })(),

  // Google Service Account credentials file path
  CREDENTIALS_PATH: process.env.CREDENTIALS_FILE || "service-account-key.json",

  // Column mapping for simple fields.
  // Layout follows the sheet's second header row (the sub-labels under each group in row 1).
  COLUMN_MAPPING: {
    id: "A",
    name: "A",
    company: "B",
    summary: "C",
    link: "D",
    pricing_description: "AS", // Pricing details
    free_demo_available: "AT", // "Do you have a free demo/trial version?" (X)
    offline_functionality: "BL", // "Does your tool or any parts of it have an offline feature?"
  },

  // Multi-column field mappings: an "X" in a column selects the name at the same position.
  // A null name skips that column (free-text "Other" columns).
  // Names match the values the app filters on (app/components/categories-drawer.tsx, FilterDrawer.tsx).
  MULTI_COLUMN_MAPPINGS: {
    // Category tags
    categories: {
      startColumn: "E",
      endColumn: "AA",
      categoryNames: [
        "Bookkeeping & Accounting",
        "Customer Finance",
        "Customer Vetting",
        "Company Set Up",
        "CRM",
        "E-Waste Management",
        "Fundraising",
        "HR Management",
        "Impact Measurements & Performance",
        "Market Analysis",
        "Marketing",
        "Payment Collections",
        "Personal Training",
        "Portfolio Analysis & Management",
        "Product Logistics & Procurement",
        "Repair, Refurbishment Facilitation",
        "Repossession & Reverse logistics",
        "Sales & Contract Management",
        "Service Calls",
        "Stock Management",
        "Tech Response",
        "Upselling",
        null, // Other
      ],
    },

    // Licensing (Highlights)
    license: {
      startColumn: "AC",
      endColumn: "AF",
      singleValue: true,
      categoryNames: [
        "Fully Open Source",
        "Partially Open Source",
        "Fully Proprietary",
        null, // Other
      ],
    },

    // User types
    user_type: {
      startColumn: "AG",
      endColumn: "AN",
      categoryNames: [
        "Basic digital literacy",
        "Basic IoT know-how",
        "Basic programming know-how is required",
        "Basic data management know-how is required",
        "Advanced programming know-how is required",
        "Advanced data management know-how is required",
        "Advanced Internet of Things know-how is required",
        null, // Other
      ],
    },

    // Pricing model
    pricing_title: {
      startColumn: "AO",
      endColumn: "AR",
      categoryNames: [
        "100% free",
        "By user number",
        "By time based license",
        "By data volume",
      ],
    },

    // Interoperability
    interoperatibility: {
      startColumn: "AW",
      endColumn: "AZ",
      categoryNames: [
        "Data export is possible via file download (CSV/XLSX/...)",
        "We provide uni-directional data export via API",
        "We provide bi-directional data exchange via API. It is possible to export data via API and import data via API",
        "Our tool offers automatic data exchange with selected tools",
      ],
    },

    // Documentation
    documentation: {
      startColumn: "BD",
      endColumn: "BE",
      categoryNames: [
        "High-level documentation",
        "Technical documentation (like OpenAPI)",
      ],
    },

    // Data exchange costs
    interoperatibility_pricing: {
      startColumn: "BG",
      endColumn: "BI",
      singleValue: true,
      categoryNames: [
        "Yes, is it a usage-based fee",
        "Yes, additional subscription/feature fee",
        "No, there are no (extra) costs associated with data exchange for cross-platform integrations.",
      ],
    },

    // Business types
    business_type: {
      startColumn: "BN",
      endColumn: "BP",
      categoryNames: ["Mini Grids", "SHS", "Clean Cooking"],
    },
  },
}

class GoogleSheetsToYAML {
  constructor() {
    this.auth = null
    this.sheets = null
  }

  async initialize() {
    try {
      // Validate credentials file exists
      if (!fs.existsSync(CONFIG.CREDENTIALS_PATH)) {
        throw new Error(
          `Credentials file not found at: ${CONFIG.CREDENTIALS_PATH}`
        )
      }

      // Load service account credentials
      const credentials = JSON.parse(fs.readFileSync(CONFIG.CREDENTIALS_PATH))

      // Validate required credential fields
      if (!credentials.client_email || !credentials.private_key) {
        throw new Error(
          "Invalid credentials file: missing client_email or private_key"
        )
      }

      console.log(`📧 Using service account: ${credentials.client_email}`)

      // Use GoogleAuth (this is what worked in the inspector)
      this.auth = new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      })

      // Test authentication
      await this.auth.getAccessToken()
      console.log("🔐 GoogleAuth authentication successful")

      // Initialize Google Sheets API
      this.sheets = google.sheets({ version: "v4", auth: this.auth })

      console.log("✅ Google Sheets API initialized successfully")
      console.log(`📁 Output directory: ${CONFIG.OUTPUT_DIR}`)
    } catch (error) {
      console.error("❌ Error initializing Google Sheets API:", error.message)
      throw error
    }
  }

  async fetchSheetData() {
    try {
      console.log(`📊 Fetching data from spreadsheet: ${CONFIG.SPREADSHEET_ID}`)
      console.log(`📄 Range: ${CONFIG.RANGE}`)

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: CONFIG.SPREADSHEET_ID,
        range: CONFIG.RANGE,
      })

      const rows = response.data.values
      if (!rows || rows.length === 0) {
        console.log("No data found in the sheet")
        return []
      }

      console.log(`✅ Fetched ${rows.length} rows from Google Sheets`)
      return rows
    } catch (error) {
      console.error("❌ Error fetching sheet data:", error.message)
      throw error
    }
  }

  parseValue(value, type = "string") {
    if (!value || value.trim() === "") return null

    switch (type) {
      case "boolean":
        return value.toLowerCase() === "true"
      case "array":
        return value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
      case "string":
      default:
        return value.trim()
    }
  }

  convertRowToTool(row, headers) {
    const tool = {}

    // Map simple columns to tool properties
    Object.entries(CONFIG.COLUMN_MAPPING).forEach(([key, columnLetter]) => {
      const columnIndex = this.columnLetterToIndex(columnLetter)
      const value = row[columnIndex]

      switch (key) {
        case "free_demo_available":
          tool[key] = this.isChecked(value) ? true : null
          break

        default:
          tool[key] = this.parseValue(value)
      }
    })

    // The schema requires a logo; use the same placeholder pattern as the existing files
    if (tool.id) {
      tool.logo = `/path/to/${tool.id.toLowerCase().replace(/\s+/g, "-")}-logo.png`
    }

    // Handle multi-column fields (categories, business types, etc.)
    Object.entries(CONFIG.MULTI_COLUMN_MAPPINGS).forEach(
      ([fieldName, config]) => {
        const selectedValues = this.parseMultiColumnField(row, config)
        if (selectedValues.length > 0) {
          tool[fieldName] = config.singleValue
            ? selectedValues[0]
            : selectedValues
        }
      }
    )

    // Handle pricing specially
    if (tool.pricing_title || tool.pricing_description) {
      tool.pricing = {
        title: tool.pricing_title ?? null,
        description: tool.pricing_description ?? null,
      }
    }
    if (tool.pricing_title?.includes("100% free")) {
      tool.is_free = true
    }
    delete tool.pricing_title
    delete tool.pricing_description

    return tool
  }

  parseMultiColumnField(row, config) {
    const selectedValues = []
    const startIndex = this.columnLetterToIndex(config.startColumn)
    const endIndex = this.columnLetterToIndex(config.endColumn)

    for (let i = startIndex; i <= endIndex && i < row.length; i++) {
      const value = row[i]
      const categoryIndex = i - startIndex

      if (this.isChecked(value)) {
        if (config.categoryNames[categoryIndex]) {
          selectedValues.push(config.categoryNames[categoryIndex])
        }
      }
    }

    return selectedValues
  }

  isChecked(value) {
    const v = value?.trim().toUpperCase()
    return v === "X" || v === "TRUE"
  }

  columnLetterToIndex(letter) {
    let index = 0
    for (let i = 0; i < letter.length; i++) {
      index = index * 26 + (letter.charCodeAt(i) - "A".charCodeAt(0) + 1)
    }
    return index - 1
  }

  generateYAMLContent(tool) {
    // Create a clean object without null values
    const cleanTool = {}

    Object.entries(tool).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        cleanTool[key] = value
      }
    })

    return yaml.dump(cleanTool, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    })
  }

  // Fixed method to ensure proper directory handling
  async ensureOutputDirectory() {
    try {
      if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
        fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true })
        console.log(`📁 Created output directory: ${CONFIG.OUTPUT_DIR}`)
      } else {
        console.log(`📁 Using existing directory: ${CONFIG.OUTPUT_DIR}`)
      }
    } catch (error) {
      console.error(`❌ Error creating output directory: ${error.message}`)
      throw error
    }
  }

  async saveYAMLFile(tool, yamlContent) {
    // Normalize filename to lowercase to avoid case conflicts
    const normalizedId = tool.id.toLowerCase()
    const filename = `${normalizedId}.yaml`
    const filepath = path.join(CONFIG.OUTPUT_DIR, filename)

    try {
      fs.writeFileSync(filepath, yamlContent, "utf8")
      console.log(`✅ Created: ${filename}`)
    } catch (error) {
      console.error(`❌ Error saving ${filename}:`, error.message)
      throw error
    }
  }

  // Get list of existing YAML files in the output directory
  getExistingTools() {
    if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
      return { toolIds: new Set(), fileMapping: new Map() }
    }

    const existingFiles = fs.readdirSync(CONFIG.OUTPUT_DIR)
    const yamlFiles = existingFiles.filter((file) => file.endsWith(".yaml"))

    const toolIds = new Set()
    const fileMapping = new Map() // Maps normalized tool ID to actual filename

    yamlFiles.forEach((file) => {
      const toolId = file.replace(".yaml", "")
      const normalizedId = toolId.toLowerCase()
      toolIds.add(normalizedId)
      fileMapping.set(normalizedId, file)
    })

    return { toolIds, fileMapping }
  }

  async processTools() {
    try {
      // Ensure output directory exists
      await this.ensureOutputDirectory()

      const rows = await this.fetchSheetData()

      if (rows.length === 0) {
        console.log("No data to process")
        return
      }

      // Get existing tools to avoid regenerating ANY existing ones
      const { toolIds: existingTools } = this.getExistingTools()
      console.log(
        `📂 Found ${existingTools.size} existing tools in ${CONFIG.OUTPUT_DIR}`
      )

      // Skip header row (index 0) and process data rows
      const dataRows = rows.slice(1)
      let newToolsCount = 0
      let skippedExistingCount = 0
      let errorCount = 0

      console.log(`\n📝 Processing ${dataRows.length} tools...`)
      console.log(
        `🎯 Mode: Only creating NEW tools (no updates to existing ones)`
      )

      for (const row of dataRows) {
        try {
          // Skip empty rows
          if (!row || row.every((cell) => !cell || cell.trim() === "")) {
            continue
          }

          const tool = this.convertRowToTool(row)

          // Validate required fields
          if (!tool.id || !tool.name) {
            console.warn(
              `⚠️ Skipping row: Missing required fields (id or name)`
            )
            continue
          }

          // Check if this tool already exists (case-insensitive)
          const normalizedId = tool.id.toLowerCase()
          const toolExists = existingTools.has(normalizedId)

          if (toolExists) {
            console.log(`⏭️ Skipping existing tool: ${tool.name} (${tool.id})`)
            skippedExistingCount++
            continue
          }

          // This is a genuinely new tool - create it
          console.log(`🆕 Creating new tool: ${tool.name} (${tool.id})`)
          const yamlContent = this.generateYAMLContent(tool)
          await this.saveYAMLFile(tool, yamlContent)
          newToolsCount++
        } catch (error) {
          console.error(`❌ Error processing row:`, error.message)
          errorCount++
        }
      }

      console.log(`\n📊 Processing complete:`)
      console.log(`   🆕 New tools created: ${newToolsCount}`)
      console.log(`   ⏭️ Existing tools skipped: ${skippedExistingCount}`)
      console.log(`   ❌ Errors: ${errorCount}`)
      console.log(`   📁 Output directory: ${CONFIG.OUTPUT_DIR}`)

      if (newToolsCount === 0 && skippedExistingCount > 0) {
        console.log(
          `\n✨ No new tools found - all tools from spreadsheet already exist!`
        )
      }
    } catch (error) {
      console.error("❌ Error in processTools:", error.message)
      throw error
    }
  }

  async run() {
    try {
      console.log("🚀 Starting Google Sheets to YAML conversion...")
      console.log("🎯 Mode: NEW TOOLS ONLY (no updates to existing files)\n")

      await this.initialize()
      await this.processTools()

      console.log("\n🎉 Conversion completed successfully!")
    } catch (error) {
      console.error("\n💥 Conversion failed:", error.message)
      process.exit(1)
    }
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const converter = new GoogleSheetsToYAML()
  converter.run()
}

export default GoogleSheetsToYAML
