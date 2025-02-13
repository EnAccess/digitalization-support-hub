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
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#009563]">
          Barriers of adoption
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <challenge.icon className="w-16 h-16 text-[#fcac04] mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                {challenge.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
