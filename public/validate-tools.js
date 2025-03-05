import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import Ajv from "ajv";
import schema from "./tools-schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ajv = new Ajv();
const validate = ajv.compile(schema);

const toolsDir = path.join(__dirname, '..', 'public', 'tools');
const yamlFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.yaml'));

let hasErrors = false;

yamlFiles.forEach(file => {
  try {
    const filePath = path.join(toolsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(content);
    
    const valid = validate(data);
    
    if (!valid) {
      console.error(`Validation failed for ${file}:`);
      console.error(validate.errors);
      hasErrors = true;
    } else {
      console.log(`${file}: Valid`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
    hasErrors = true;
  }
});

if (hasErrors) {
  process.exit(1);
}