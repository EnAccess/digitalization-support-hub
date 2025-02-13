import { Users, HelpCircle, Wifi, DollarSign, EyeOff } from "lucide-react"

export default function Challenges() {
  const challenges = [
    { icon: DollarSign, text: "Cost barriers" },
    { icon: HelpCircle, text: "Uncertainty which tool to use" },
    { icon: Users, text: "Lack of staff adoption" },
    { icon: EyeOff, text: "Lack of awareness" },
    { icon: Wifi, text: "Connectivity issues" },
  ]

  return (
      <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#009563]">Barriers of Adoption</h2>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.slice(0, 3).map((challenge, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <challenge.icon className="h-12 w-12 text-[#fcac04] mb-4" />
                <p className="text-lg font-semibold text-[#1D1D1D]">{challenge.text}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-24">
            {challenges.slice(3).map((challenge, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <challenge.icon className="h-12 w-12 text-[#fcac04] mb-4" />
                <p className="text-lg font-semibold text-[#1D1D1D]">{challenge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
