"use client"
import { Timeline } from "antd"
import Image from "next/image"

export default function TimelineComponent() {
  const steps = [
    {
      number: 1,
      title: "Ideation",
      description:
        "SHS companies' journey and digital options were identified. TA needs to be defined, and EnAccess will be appointed to lead the process.",
      imageUrl: "/image1.png",
    },
    {
      number: 2,
      title: "Validation and refinement",
      description:
        "Surveys and interviews with ~30 SMEs performed, funding committed by Good Energies",
      imageUrl: "/image2.png",
    },
    {
      number: 3,
      title: "Collaboration/No duplicated efforts",
      description: "Outreach and exchange with GOGLA, GDC, EnDev, and RLI",
      imageUrl: "/image3.png",
    },
    {
      number: 4,
      title: "Research and Design",
      description:
        "Information on tools is being gathered, merged, and validated, interoperability is being assessed, Designing and testing of tools map and Wizard",
      imageUrl: "/image4.png",
    },
    {
      number: 5,
      title: "Scoping",
      description:
        "Based on exchanges with stakeholders, hands-on support is being shaped",
      imageUrl: "/image4.png",
    },
    {
      number: 6,
      title: "Outcome",
      description:
        "Digital tools map to be launched and accompanying hands-on support provided to selected companies",
      imageUrl: "/banner.png",
    },
    {
      number: 7,
      title: "Outlook",
      description:
        "Tools map will be a dynamic, evolving resource. Hands-on support shall be replicated and scaled based on the learnings. Funders are being approached.",
      imageUrl: "/image5.png",
    },
  ]

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#174569]">
          How It Works
        </h2>
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Timeline mode="alternate">
            {steps.map((step, index) => (
              <Timeline.Item key={index} label={step.title}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white border-4 border-[#28AAE1] rounded-full flex items-center justify-center z-10 mb-4">
                    <span className="text-[#28AAE1] font-bold">
                      {step.number}
                    </span>
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-xl font-bold text-[#174569] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="mt-4">
                    <Image
                      src={step.imageUrl || "/placeholder.svg"}
                      alt={`Step ${step.number} illustration`}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  )
}
