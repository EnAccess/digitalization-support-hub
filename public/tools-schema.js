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
    license: { type: "string" },
    user_type: {
      type: "array",
      items: { type: "string" },
    },
    pricing: { type: "string" },
    free_demo_available: { type: "boolean" },
    interoperatibility: {
      type: "array",
      items: { type: "string" },
    },
    interoperatibility_pricing: { type: "string" },
    documentation: {
      type: "array",
      items: { type: "string" },
    },
    offline_functionality: { type: "string" },
    business_type: {
      type: "array",
      items: { type: "string" },
    },
  },
}

export default schema
