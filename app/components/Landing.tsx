"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import EnAccessToolMap from "../components/Home"
import { StatisticCard } from "../components/StatisticCard"
import { BarrierCard } from "../components/BarrierCard"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Modal } from "antd"
import QuestionaireFilter from "../components/Questionairefilter"
export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModalOpen = (value: boolean) => {
    setIsModalOpen(value)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#E2F6DF] p-8 md:p-16 ">
        <div className="max-w-6xl mx-auto">
          <div className="uppercase text-[#0D261A] text-sm lg:text-md  font-bold mb-4">
            DIGITALIZATION SUPPORT HUB
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#161D1A] mb-4">
            Digital Solutions for Distributed
            <br />
            Renewable Energy Businesses
          </h1>
          <p className="text-[#1E1F1E] text-md lg:text-lg font-normal mb-8">
            Explore the tools that can support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-[#17412C] font-bold text-white rounded-full 
                w-full max-w-[328px] min-w-[288px] h-[44px] 
                px-4 py-2 lg:w-[324px] hover:opacity-200 text-md"
              onClick={() => setIsModalOpen(true)}
            >
              Tool Finder Wizard
            </Button>
            <Button
              variant="outline"
              className="border-[#17412C] text-[#0D261A] font-bold rounded-full  w-full max-w-[328px] min-w-[288px] h-[44px] 
                px-4 py-2 lg:w-[324px] text-md"
            >
              View tool categories
            </Button>
          </div>
        </div>
      </section>

      <section className=" py-8 mt-auto bg-[#F9FBFA]">
        <div className="max-w-6xl mx-auto">
          <EnAccessToolMap setIsModalOpen={handleModalOpen} />
        </div>
      </section>

      <Modal
        title="Tool Finder"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width="90vw"
        footer={null}
        className="max-w-7xl"
      >
        <QuestionaireFilter />
      </Modal>

      {/* Empowering SMEs Section */}
      <section className="py-12 px-4 bg-[#F9FBFA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            <span className="text-[#43BC80]">Empowering</span>{" "}
            <span className="text-[#161D1A]">
              domestic SMEs in the distributed renewable energy sector through
              digitalization
            </span>
          </h2>
        </div>
      </section>

      {/* Why Digitalization Matters Section */}
      <section className="bg-[#1B4332] text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Why digitalization matters
          </h2>
          <p className="text-sm md:text-base">
            Digital tools are key to operational efficiency, scalability, and
            access to financing for SMEs in the Distributed Renewable Energy
            (DRE) sector. However, the current situation shows limited adoption.
          </p>
        </div>
      </section>

      {/* Lack of Adoption Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Lack of adoption</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <StatisticCard
              percentage="60%"
              description="of SMEs in the sector are dissatisfied with their current level of digitalization"
            />
            <StatisticCard
              percentage="40%"
              description="of SMEs are not using any digital tool beyond spreadsheets"
            />
          </div>
        </div>
      </section>

      {/* Barriers to Adoption Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Barriers to adoption</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <BarrierCard icon="connectivity" title="Connectivity Issues" />
            <BarrierCard icon="awareness" title="Lack of awareness" />
            <BarrierCard icon="cost" title="Cost Issues" />
            <BarrierCard icon="staff" title="Lack of staff adoption" />
            <BarrierCard icon="tool" title="Unsure which is right tool" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#E2F6DF] py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Made by</p>
              <div className="h-12 relative">
                <Image
                  src="/supporter1.png"
                  alt="ENACCESS Logo"
                  width={150}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Funded by</p>
              <div className="h-12 relative">
                <Image
                  src="/GoodEnergiesFoundation.png"
                  alt="Open Energies Logo"
                  width={150}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-2">Connect with us</p>
            <div className="flex gap-4">
              <Link href="#" className="text-[#1B4332]">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="text-[#1B4332]">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="text-[#1B4332]">
                <Linkedin size={24} />
              </Link>
              <Link href="#" className="text-[#1B4332]">
                <Instagram size={24} />
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-4 text-xs text-gray-600">
            <Link href="#">Imprint</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
