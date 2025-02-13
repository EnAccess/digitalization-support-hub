import { MapPin, Users } from "lucide-react"
const solutions = [
  {
    icon: MapPin,
    title: "Interactive Digital Tools Map",
    description:
      "An intuitive, user-friendly interactive map of digital tools for DRE companies featuring a built-in wizard to assist businesses in selecting the most suitable tools for their needs.",
    badge: "Launch in April 2025",
  },
  {
    icon: Users,
    title: "Hands-On Support",
    description:
      "Hands-on tailored digitalization support to 6–10 SHS, Mini-grid, and Clean Cooking companies to help them overcome key internal and external barriers with their digitization process",
  },
]

export default function Solutions() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#E6E6E6]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#009563]">
          How We Help
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <solution.icon className="h-8 w-8 text-[#009563] mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">{solution.title}</h3>
                {solution.badge && (
                  <span className="bg-[#27AE60] text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {solution.badge}
                  </span>
                )}
              </div>
              <p className="text-[#1D1D1D]">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
