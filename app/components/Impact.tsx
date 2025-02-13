import { PieChart, BarChart3 } from "lucide-react"

const stats = [
  { icon: PieChart, value: "60%", description: "of SMEs are dissatisfied with current digitalization" },
  { icon: BarChart3, value: "40%", description: "are not using digital tools beyond spreadsheets" },
]

export default function Impact() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-raleway text-3xl font-bold mb-8 text-center text-[#009563]">Lack of Adoption</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-40">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <stat.icon className="h-12 w-12 text-[#27AE60] mb-4" />
              <p className="font-raleway text-4xl font-bold text-[#009563] mb-2">{stat.value}</p>
              <p className="text-lg text-[#1D1D1D]">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

