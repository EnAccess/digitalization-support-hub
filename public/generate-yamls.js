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

  // Column mapping for simple fields
  COLUMN_MAPPING: {
    id: "A",
    name: "A",
    company: "B",
    summary: "C",
    link: "D",
    license: "AD",
    pricing_description: "AU",
    free_demo_available: "AW", // true/false
    is_free: "AV", // true/false
    offline_functionality: "BB",
  },

  // Multi-column field mappings
  MULTI_COLUMN_MAPPINGS: {
    // Categories spread across columns E-Y
    categories: {
      startColumn: "E",
      endColumn: "Y",
      categoryNames: [
        "Bookkeeping & Accounting",
        "Customer Finance",
        "Customer Vetting",
        "Company Set Up",
        "CRM",
        "E-Waste Management",
        "HR Management",
        "Impact Measurements & Performance",
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
        "Other",
      ],
    },

    // Business types in columns BN-BO
    business_type: {
      startColumn: "BN",
      endColumn: "BO",
      categoryNames: ["Mini-Grids", "SHS"],
    },

    // User types in columns AG-AN
    user_type: {
      startColumn: "AG",
      endColumn: "AN",
      categoryNames: ["Basic digital literacy", "Basic IoT know-how", "Other"],
    },

    // Licensing/Highlights in columns AD-AF
    license: {
      startColumn: "AD",
      endColumn: "AF",
      categoryNames: [
        "Fully Open Source",
        "Partially Open Source",
        "Fully Proprietary",
        "Other",
      ],
    },

    // Pricing in columns AO-AR
    pricing_title: {
      startColumn: "AO",
      endColumn: "AR",
      categoryNames: [
        "100% free",
        "By user numbers",
        "By time based license",
        "By data volume",
      ],
    },

    // Interoperability in columns AY-AZ
    interoperatibility: {
      startColumn: "AY",
      endColumn: "AZ",
      categoryNames: [
        "Data export is possible via file download (CSV/XLSX/...)",
        "We provide uni-directional data export via API",
        "We provide bi-directional data exchange via API. It is possible to export data via API and import data via API",
        "Our tool offers automatic data exchange with selected tools",
      ],
    },

    // Documentation in columns AZ-BB
    documentation: {
      startColumn: "AZ",
      endColumn: "BB",
      categoryNames: [
        "Documentation available",
        "Training available",
        "Support available",
      ],
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
        case "is_free":
          tool[key] = this.parseValue(value, "boolean")
          break

        default:
          tool[key] = this.parseValue(value)
      }
    })

    // Handle multi-column fields (categories, business types, etc.)
    Object.entries(CONFIG.MULTI_COLUMN_MAPPINGS).forEach(
      ([fieldName, config]) => {
        const selectedValues = this.parseMultiColumnField(row, config)
        if (selectedValues && selectedValues.length > 0) {
          tool[fieldName] = selectedValues
        }
      }
    )

    // Handle pricing specially
    if (tool.pricing_title && tool.pricing_title.length > 0) {
      tool.pricing = { title: tool.pricing_title }
      delete tool.pricing_title
    }

    return tool
  }

  parseMultiColumnField(row, config) {
    const selectedValues = []
    const startIndex = this.columnLetterToIndex(config.startColumn)
    const endIndex = this.columnLetterToIndex(config.endColumn)

    for (let i = startIndex; i <= endIndex && i < row.length; i++) {
      const value = row[i]
      const categoryIndex = i - startIndex

      // Check if there's an X mark in this column
      if (
        value &&
        (value.trim().toUpperCase() === "X" ||
          value.trim().toUpperCase() === "TRUE")
      ) {
        if (config.categoryNames[categoryIndex]) {
          selectedValues.push(config.categoryNames[categoryIndex])
        }
      }
    }

    return selectedValues
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
