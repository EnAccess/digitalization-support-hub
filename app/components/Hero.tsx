import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-[#1B75BA] to-[#1B75BA] text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center  ">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Empowering Domestic SMEs in the Renewable Energy Sector Through
              Digitalization
            </h1>
            <p className="text-xl mb-6">
              Join the Digitalization Support Hub – Innovating Operations,
              Driving Growth
            </p>
            <button className="bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded-md inline-flex items-center hover:bg-yellow-300 transition duration-300">
              Learn More
              <ArrowRight className="ml-2" />
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/banner.png?height=500&width=500"
              alt="Digital tools and collaboration in renewable energy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
