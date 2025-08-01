import fs from "fs"
import path from "path"
import { google } from "googleapis"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

async function detailedAuthTest() {
  console.log("🔍 Detailed Authentication Diagnostics\n")

  // Check environment variables
  console.log("📋 Environment Variables:")
  console.log(`   GOOGLE_SPREADSHEET_ID: ${process.env.GOOGLE_SPREADSHEET_ID || 'NOT SET'}`)
  console.log(`   GOOGLE_SHEETS_RANGE: ${process.env.GOOGLE_SHEETS_RANGE || 'NOT SET'}`)
  console.log(`   CREDENTIALS_FILE: ${process.env.CREDENTIALS_FILE || 'NOT SET'}`)
  console.log(`   OUTPUT_DIRECTORY: ${process.env.OUTPUT_DIRECTORY || 'NOT SET'}\n`)

  // Check .env file location
  const envPath = path.resolve('.env')
  console.log(`📁 Looking for .env file at: ${envPath}`)
  if (fs.existsSync(envPath)) {
    console.log("✅ .env file found")
    const envContent = fs.readFileSync(envPath, 'utf8')
    console.log("📄 .env file content preview:")
    envContent.split('\n').forEach((line, index) => {
      if (line.trim() && !line.startsWith('#')) {
        const [key] = line.split('=')
        console.log(`   Line ${index + 1}: ${key}=...`)
      }
    })
  } else {
    console.log("❌ .env file not found")
    return
  }
  console.log()

  // Check credentials file
  const credentialsPath = process.env.CREDENTIALS_FILE || "./service-account-key.json"
  const fullCredentialsPath = path.resolve(credentialsPath)
  console.log(`🔐 Looking for credentials file at: ${fullCredentialsPath}`)
  
  if (!fs.existsSync(fullCredentialsPath)) {
    console.log("❌ Credentials file not found")
    console.log("🔧 Please ensure your service account JSON file is at the correct location")
    return
  }
  
  console.log("✅ Credentials file found")
  
  try {
    const credentials = JSON.parse(fs.readFileSync(fullCredentialsPath, 'utf8'))
    console.log("✅ Credentials file is valid JSON")
    console.log(`📧 Service account email: ${credentials.client_email}`)
    console.log(`🆔 Project ID: ${credentials.project_id}`)
    console.log(`🔑 Private key starts with: ${credentials.private_key?.substring(0, 50)}...`)
    console.log(`🔑 Private key length: ${credentials.private_key?.length} characters`)
    
    // Validate required fields
    const requiredFields = ['client_email', 'private_key', 'project_id']
    const missingFields = requiredFields.filter(field => !credentials[field])
    
    if (missingFields.length > 0) {
      console.log(`❌ Missing required fields in credentials: ${missingFields.join(', ')}`)
      return
    }
    console.log("✅ All required credential fields present\n")

    // Test Google Auth
    console.log("🔐 Testing Google Authentication...")
    
    // Clean and format the private key
    let privateKey = credentials.private_key
    if (typeof privateKey === 'string') {
      // Replace literal \n with actual newlines
      privateKey = privateKey.replace(/\\n/g, '\n')
    }
    
    console.log(`🔍 Private key format check:`)
    console.log(`   Starts with: ${privateKey.substring(0, 27)}`)
    console.log(`   Contains newlines: ${privateKey.includes('\n')}`)
    console.log(`   Contains \\n: ${privateKey.includes('\\n')}`)
    
    // Try different approaches to create JWT auth
    let auth
    try {
      // Method 1: Direct credentials object
      auth = new google.auth.JWT({
        email: credentials.client_email,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
      })
      console.log("✅ JWT created using credentials object")
    } catch (error) {
      console.log("❌ Method 1 failed:", error.message)
      
      try {
        // Method 2: Individual parameters
        auth = new google.auth.JWT(
          credentials.client_email,
          null,
          privateKey,
          ["https://www.googleapis.com/auth/spreadsheets.readonly"]
        )
        console.log("✅ JWT created using individual parameters")
      } catch (error2) {
        console.log("❌ Method 2 failed:", error2.message)
        
        try {
          // Method 3: Using GoogleAuth with credentials
          auth = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
          })
          console.log("✅ GoogleAuth created successfully")
        } catch (error3) {
          console.log("❌ Method 3 failed:", error3.message)
          throw new Error("All authentication methods failed")
        }
      }
    }

    try {
      await auth.authorize()
      console.log("✅ Google authentication successful!\n")
    } catch (authError) {
      console.log("❌ Authorization failed:", authError.message)
      return
    }

    // Test spreadsheet access if ID is provided
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
    if (!spreadsheetId) {
      console.log("⚠️ GOOGLE_SPREADSHEET_ID not set - skipping sheet access test")
      console.log("🔧 Please add your spreadsheet ID to the .env file")
      return
    }

    console.log(`📊 Testing access to spreadsheet: ${spreadsheetId}`)
    const sheets = google.sheets({ version: "v4", auth })
    
    try {
      const response = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId
      })

      console.log("✅ Spreadsheet access successful!")
      console.log(`📋 Sheet title: ${response.data.properties.title}`)
      console.log(`📄 Number of sheets: ${response.data.sheets.length}`)
      
      // List sheet names
      console.log("📄 Available sheets:")
      response.data.sheets.forEach((sheet, index) => {
        console.log(`   ${index + 1}. ${sheet.properties.title}`)
      })

      // Test data access
      console.log("\n📊 Testing data access...")
      const dataResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: "A1:E5"
      })

      if (dataResponse.data.values && dataResponse.data.values.length > 0) {
        console.log("✅ Data access successful!")
        console.log("📊 Sample data (first 3 rows):")
        dataResponse.data.values.slice(0, 3).forEach((row, index) => {
          console.log(`   Row ${index + 1}: ${row.slice(0, 3).join(' | ')}...`)
        })
      } else {
        console.log("⚠️ No data found in the specified range")
      }

    } catch (error) {
      console.error("❌ Spreadsheet access failed:", error.message)
      
      if (error.code === 404) {
        console.error("🔧 This usually means:")
        console.error("   - The spreadsheet ID is incorrect")
        console.error("   - The spreadsheet doesn't exist")
        console.error("   - The sheet is not shared with your service account")
      } else if (error.code === 403) {
        console.error("🔧 This usually means:")
        console.error("   - The sheet is not shared with your service account email")
        console.error("   - Your service account doesn't have the required permissions")
        console.error(`   - Please share the sheet with: ${credentials.client_email}`)
      }
    }

  } catch (error) {
    if (error.message.includes('Unexpected token')) {
      console.log("❌ Credentials file contains invalid JSON")
    } else {
      console.error("❌ Error testing authentication:", error.message)
    }
  }
}

// Run the test
detailedAuthTest().catch(console.error)