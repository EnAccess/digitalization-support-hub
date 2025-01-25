import { AlertCircle, DollarSign, HelpCircle } from "lucide-react"

export default function Challenges() {
  const challenges = [
    { icon: HelpCircle, text: "Lack of awareness" },
    { icon: AlertCircle, text: "Limited adoption" },
    { icon: DollarSign, text: "Cost barriers" },
  ]

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Challenges SMEs Face</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <challenge.icon className="w-16 h-16 text-blue-500 mb-4" />
              <p className="text-xl">{challenge.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

