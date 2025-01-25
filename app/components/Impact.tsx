import { PieChart, BarChart, LineChart } from "lucide-react"

export default function Impact() {
  const stats = [
    {
      icon: PieChart,
      value: "60%",
      text: "of SMEs are dissatisfied with current digitalization",
    },
    { icon: BarChart, value: "75%", text: "see value in an interactive guide" },
    {
      icon: LineChart,
      value: "40%",
      text: "are not using digital tools beyond spreadsheets",
    },
  ]

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#174569]">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <stat.icon className="w-16 h-16 text-[#28AAE1] mb-4" />
              <p className="text-4xl font-bold text-[#1B75BA] mb-2">
                {stat.value}
              </p>
              <p className="text-lg">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
