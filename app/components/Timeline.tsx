export default function Timeline() {
  const steps = [
    "Ideation",
    "Validation",
    "Collaboration",
    "Research",
    "Scoping",
    "Outcomes",
    "Outlook",
  ]

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"></div>
          {steps.map((step, index) => (
            <div key={index} className="relative mb-8">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-6">
                  {index % 2 === 0 && (
                    <p className="text-lg font-semibold">{step}</p>
                  )}
                </div>
                <div className="w-6 h-6 bg-blue-500 rounded-full z-10"></div>
                <div className="flex-1 pl-6">
                  {index % 2 !== 0 && (
                    <p className="text-lg font-semibold">{step}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
