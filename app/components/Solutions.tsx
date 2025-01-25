import { MapPin, Users } from "lucide-react"

export default function Solutions() {
  const solutions = [
    {
      icon: MapPin,
      title: "Interactive Digital Tools Map",
      description: "Helping SMEs select tools tailored to their needs.",
    },
    {
      icon: Users,
      title: "Pilot Hands-On Support",
      description:
        "Tailored assistance for selected companies to overcome barriers.",
    },
  ]

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How We Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <solution.icon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
              <p>{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
