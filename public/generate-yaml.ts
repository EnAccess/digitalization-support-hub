import { google } from "googleapis"
import fs from "fs-extra"
import path from "path"
import yaml from "yaml"

const SHEET_ID = "YOUR_SPREADSHEET_ID"
const RANGE = "Sheet1!A1:Z"
const OUTPUT_DIR = "./tools"

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })

  const sheets = google.sheets({ version: "v4", auth })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  })

  const rows = res.data.values
  if (!rows || rows.length < 2) {
    console.error("No data found.")
    return
  }

  const headers = rows[0]
  const tools = rows.slice(1).map((row) =>
    headers.reduce(
      (obj, key, i) => {
        obj[key] = row[i] || ""
        return obj
      },
      {} as Record<string, string>
    )
  )

  await fs.ensureDir(OUTPUT_DIR)
  const existingFiles = new Set(
    (await fs.readdir(OUTPUT_DIR)).map((f) =>
      f.replace(".yaml", "").toLowerCase()
    )
  )

  for (const tool of tools) {
    const name = tool["Tool Name"]?.toLowerCase().replace(/\s+/g, "-")
    if (!name) continue

    if (existingFiles.has(name)) {
      console.log(`⚠️ Tool "${name}" already exists. Skipping.`)
      continue
    }

    const filePath = path.join(OUTPUT_DIR, `${name}.yaml`)
    const yamlContent = yaml.stringify(tool)
    await fs.writeFile(filePath, yamlContent)
    console.log(`✅ Created: ${name}.yaml`)
  }
}

main().catch(console.error)
