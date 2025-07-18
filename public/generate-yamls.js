import fs  from 'fs'; 
import path from 'path';
import { google } from 'googleapis';
import yaml from 'js-yaml';
import dotenv from 'dotenv';
dotenv.config();

// Configuration - Update these values or use environment variables
const CONFIG = {
  // Google Sheets configuration
  SPREADSHEET_ID: process.env.GOOGLE_SPREADSHEET_ID || 'your-spreadsheet-id',
  RANGE: process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:Z',
  
  // Output directory for YAML files
  OUTPUT_DIR: process.env.OUTPUT_DIRECTORY || './public/tools',
  
  // Google Service Account credentials file path
  CREDENTIALS_PATH: process.env.CREDENTIALS_FILE || '../service-account-key.json',
  
  // Column mapping - adjust these based on your Google Sheets structure
  COLUMN_MAPPING: {
    id: 'A',
    name: 'A',
    company: 'B',
    summary: 'C',
    link: 'D',
    categories: 'E', // Comma-separated values
    license: 'AD',
    user_type: 'AG', // Comma-separated values
    pricing_title: 'AP', // Comma-separated values
    pricing_description: 'AU',
    free_demo_available: 'AW', // true/false
    is_free: 'AV', // true/false
    interoperatibility: 'AY', // Comma-separated values
    interoperatibility_pricing: 'AV',
    documentation: 'AZ', // Comma-separated values
    offline_functionality: 'BB',
    business_type: 'BN', // Comma-separated values
  }
};

class GoogleSheetsToYAML {
  constructor() {
    this.auth = null;
    this.sheets = null;
  }

  async initialize() {
    try {
      // Load service account credentials
      const credentials = JSON.parse(fs.readFileSync(CONFIG.CREDENTIALS_PATH));
      
      // Create JWT client
      this.auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/spreadsheets.readonly']
      );

      // Initialize Google Sheets API
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      
      console.log('✅ Google Sheets API initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Google Sheets API:', error.message);
      throw error;
    }
  }

  async fetchSheetData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: CONFIG.SPREADSHEET_ID,
        range: CONFIG.RANGE,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        console.log('No data found in the sheet');
        return [];
      }

      console.log(`✅ Fetched ${rows.length} rows from Google Sheets`);
      return rows;
    } catch (error) {
      console.error('❌ Error fetching sheet data:', error.message);
      throw error;
    }
  }

  parseValue(value, type = 'string') {
    if (!value || value.trim() === '') return null;
    
    switch (type) {
      case 'boolean':
        return value.toLowerCase() === 'true';
      case 'array':
        return value.split(',').map(item => item.trim()).filter(item => item);
      case 'string':
      default:
        return value.trim();
    }
  }

  convertRowToTool(row, headers) {
    const tool = {};
    
    // Map each column to tool properties
    Object.entries(CONFIG.COLUMN_MAPPING).forEach(([key, columnLetter]) => {
      const columnIndex = this.columnLetterToIndex(columnLetter);
      const value = row[columnIndex];
      
      switch (key) {
        case 'categories':
        case 'user_type':
        case 'documentation':
        case 'business_type':
        case 'interoperatibility':
          tool[key] = this.parseValue(value, 'array');
          break;
        
        case 'pricing_title':
          const pricingTitles = this.parseValue(value, 'array');
          if (pricingTitles && pricingTitles.length > 0) {
            tool.pricing = { title: pricingTitles };
          }
          break;
        
        case 'pricing_description':
          if (tool.pricing) {
            tool.pricing.description = this.parseValue(value);
          }
          break;
        
        case 'free_demo_available':
        case 'is_free':
          tool[key] = this.parseValue(value, 'boolean');
          break;
        
        default:
          tool[key] = this.parseValue(value);
      }
    });

    return tool;
  }

  columnLetterToIndex(letter) {
    let index = 0;
    for (let i = 0; i < letter.length; i++) {
      index = index * 26 + (letter.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return index - 1;
  }

  generateYAMLContent(tool) {
    // Create a clean object without null values
    const cleanTool = {};
    
    Object.entries(tool).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        cleanTool[key] = value;
      }
    });

    return yaml.dump(cleanTool, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    });
  }

  async saveYAMLFile(tool, yamlContent) {
    const filename = `${tool.id}.yaml`;
    const filepath = path.join(CONFIG.OUTPUT_DIR, filename);
    
    try {
      // Ensure output directory exists
      if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
        fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
      }
      
      fs.writeFileSync(filepath, yamlContent, 'utf8');
      console.log(`✅ Created: ${filename}`);
    } catch (error) {
      console.error(`❌ Error saving ${filename}:`, error.message);
    }
  }

  async processTools() {
    try {
      const rows = await this.fetchSheetData();
      
      if (rows.length === 0) {
        console.log('No data to process');
        return;
      }

      // Skip header row (index 0) and process data rows
      const dataRows = rows.slice(1);
      let processedCount = 0;
      let errorCount = 0;

      console.log(`\n📝 Processing ${dataRows.length} tools...`);

      for (const row of dataRows) {
        try {
          // Skip empty rows
          if (!row || row.every(cell => !cell || cell.trim() === '')) {
            continue;
          }

          const tool = this.convertRowToTool(row);
          
          // Validate required fields
          if (!tool.id || !tool.name) {
            console.warn(`⚠️ Skipping row: Missing required fields (id or name)`);
            continue;
          }

          const yamlContent = this.generateYAMLContent(tool);
          await this.saveYAMLFile(tool, yamlContent);
          processedCount++;
          
        } catch (error) {
          console.error(`❌ Error processing row:`, error.message);
          errorCount++;
        }
      }

      console.log(`\n📊 Processing complete:`);
      console.log(`   ✅ Successfully processed: ${processedCount} tools`);
      console.log(`   ❌ Errors: ${errorCount}`);
      console.log(`   📁 Output directory: ${CONFIG.OUTPUT_DIR}`);
      
    } catch (error) {
      console.error('❌ Error in processTools:', error.message);
      throw error;
    }
  }

  async run() {
    try {
      console.log('🚀 Starting Google Sheets to YAML conversion...\n');
      
      await this.initialize();
      await this.processTools();
      
      console.log('\n🎉 Conversion completed successfully!');
    } catch (error) {
      console.error('\n💥 Conversion failed:', error.message);
      process.exit(1);
    }
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {

  const converter = new GoogleSheetsToYAML();
  converter.run();
}

export default GoogleSheetsToYAML;
