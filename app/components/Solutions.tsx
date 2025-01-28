import { MapPin, Users } from "lucide-react"

export default function Solutions() {
  const solutions = [
    {
      icon: MapPin,
      title: "Interactive Digital Tools Map",
      description:
        "An intuitive, user-friendly interactive map of digital tools for DRE companies featuring a built-in wizard to assist businesses in selecting the most suitable tools for their needs.",
    },
    {
      icon: Users,
      title: "Pilot Hands-On Support",
      description:
        "Pilot hands-on tailored digitalization support to 6–10 SHS, Mini-grid, and Clean Cooking companies to help them overcome key internal and external barriers in digitalization.",
    },
  ]

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#174569]">
          How We Help
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <solution.icon className="w-12 h-12 text-[#28AAE1] mb-4" />
              <h3 className="text-xl font-semibold mb-2 ">{solution.title}</h3>
              <p>{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
