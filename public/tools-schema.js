const schema = {
  type: "object",
  required: ["name", "summary", "logo", "link"], // Removed categories from required
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    company: { type: "string" },
    summary: { type: "string" },
    logo: { type: "string" },
    link: { type: "string" },
    categories: {
      type: ["array", "null"], // Can be array or null
      items: { type: "string" },
      default: null, // Defaults to null if not provided
    },
    license: {
      type: ["string", "null"],
      default: null,
    },
    user_type: {
      type: ["array", "null"],
      items: { type: "string" },
      default: null,
    },
    is_free: {
      type: ["boolean", "null"], // Can be boolean or null
      default: null,
    },
    pricing: {
      type: ["object", "null"],
      default: null,
      properties: {
        titles: {
          type: "array",
          items: { type: "string" },
        },
        description: { type: "string" },
      },
    },
    free_demo_available: {
      type: ["boolean", "null"], // Can be boolean or null
      default: null,
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
