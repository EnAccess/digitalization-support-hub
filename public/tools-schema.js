const schema = {
  type: "object",
  required: ["name", "summary", "logo", "link", "categories"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    company: { type: "string" },
    summary: { type: "string" },
    logo: { type: "string" },
    link: { type: "string" },
    categories: {
      type: "array",
      items: { type: "string" },
    },
    license: {
      type: ["string", "null"], // Allows string or null
      default: null, // Optional default
    },
    user_type: {
      type: ["array", "null"],
      items: { type: "string" },
      default: null,
    },
    pricing: {
      type: ["string", "null"], // Allows string or null/empty
      default: null,
    },
    free_demo_available: {
      type: "boolean",
      default: false, // Optional default
    },
    interoperatibility: {
      type: ["array", "null"],
      items: { type: "string" },
      default: null,
    },
    interoperatibility_pricing: {
      type: ["string", "null"],
      default: null,
    },
    documentation: {
      type: ["array", "null"],
      items: { type: "string" },
      default: null,
    },
    offline_functionality: {
      type: ["string", "null"],
      default: null,
    },
    business_type: {
      type: ["array", "null"],
      items: { type: "string" },
      default: null,
    },
  },
  additionalProperties: false,
}

export default schema
