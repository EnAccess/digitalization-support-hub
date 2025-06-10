"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import Home from "../components/Home"
import { StatisticCard } from "../components/StatisticCard"
import { BarrierCard } from "../components/BarrierCard"
import { FaYoutube, FaLinkedinIn, FaGithub } from "react-icons/fa"
import { Modal } from "antd"
import QuestionaireFilter from "../components/Questionairefilter"
import { ToolCategoriesDrawer } from "../components/categories-drawer"
import { useMobile } from "../hooks/use-mobile"
import { Tool } from "../types"

// Remove the local Tool interface since we're now importing it

export default function Landing() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [, setTools] = useState<Tool[]>([]) // Explicitly type the state
  const { isDesktop } = useMobile()

  const [, setAnswers] = useState<Record<string, string[]>>({})
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<
    Record<string, string[]>
  >({})

  const handleModalOpen = (value: boolean) => {
    setIsModalOpen(value)
  }

  const handleCategorySelect = (categories: string[]) => {
    // Update the selected categories state
    setSelectedCategories(categories)
  }

  // Get tools from Home component
  const handleToolsLoaded = (loadedTools: Tool[]) => {
    setTools(loadedTools)
  }

  const handleModalClose = () => setIsModalOpen(false)

  const handleQuestionnaireComplete = (
    categories: string[],
    questionnaireAnswers: Record<string, string[]>
  ) => {
    setSelectedCategories(categories)
    setAnswers(questionnaireAnswers)
    setQuestionnaireAnswers(questionnaireAnswers)
    setIsModalOpen(false)

    // Open drawer on mobile, scroll on desktop
    if (!isDesktop) {
      setIsDrawerOpen(true) // Open the mobile drawer
    } else {
      document.getElementById("tool-map-section")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="">
        {/* Hero Section */}
        <section className="bg-[#E2F6DF] mt-8 px-4 sm:px-8 max-w-6xl py-8 lg:rounded-lg mx-auto font-raleway">
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-8 sm:gap-0">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#161D1A] mb-4 max-w-4xl">
                Digital Solutions for Distributed Renewable Energy Businesses
              </h1>
              <p className="text-[#1E1F1E] text-sm sm:text-md lg:text-lg font-normal mb-8">
                Explore the tools that can support you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <Button
                  className="bg-[#17412C] font-bold text-white rounded-full 
            w-full max-w-[328px] min-w-[200px] h-[44px] 
            px-4 py-2 hover:opacity-90 text-md"
                  onClick={() => setIsModalOpen(true)}
                >
                  Tool Finder Wizard
                </Button>
                {/* Only show this button on mobile or tablet */}
                {!isDesktop && (
                  <Button
                    variant="outline"
                    className="border-[#17412C] text-[#0D261A] font-bold rounded-full 
              w-full max-w-[328px] min-w-[200px] h-[44px] 
              px-4 py-2 text-md"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    View tool categories
                  </Button>
                )}
              </div>
            </div>
            <Link href="/" className="sm:ml-8">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={38}
                className="object-contain w-[100px] sm:w-[150px]"
              />
            </Link>
          </div>
        </section>
      </div>

      {/* Only show tool map section on desktop */}
      {isDesktop && (
        <section id="tool-map-section" className="py-8 mt-auto bg-[#F9FBFA]">
          <div className="max-w-6xl mx-auto">
            <Home
              setIsModalOpen={setIsModalOpen} // Pass the modal control function
              selectedCategories={selectedCategories}
              onToolsLoaded={handleToolsLoaded}
            />
          </div>
        </section>
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        width="90vw"
        footer={null}
        className="max-w-7xl"
      >
        <QuestionaireFilter
          onComplete={handleQuestionnaireComplete}
          onClose={handleModalClose}
        />
      </Modal>

      {/* Tool Categories Drawer for Mobile/Tablet */}
      <ToolCategoriesDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onCategorySelect={handleCategorySelect}
        selectedCategories={selectedCategories}
        questionnaireAnswers={questionnaireAnswers} // Add this
      />

      {/* Empowering SMEs Section */}
      <section className="pb-4 px-4 bg-[#F9FBFA] py-8 text-center">
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
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <p className="text-base text-[#0D261A] font-bold pb-8 ">
                Made by
              </p>
              <div className="h-12 relative">
                <Image
                  src="/supporter1.png"
                  alt="ENACCESS Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="">
              <p className="text-base text-[#0D261A] font-bold pb-8">
                Supported by
              </p>
              <div className="h-12 relative">
                <Image
                  src="/get.png"
                  alt="Open Energies Logo"
                  width={180}
                  height={58}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="">
              <p className="text-base text-[#0D261A] font-bold pb-8">
                Funded by
              </p>
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

          <div className="mb-8 pt-8">
            <p className="text-base text-[#0D261A] font-bold mb-8">
              Connect with us
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.youtube.com/@EnAccessFoundation"
                className="text-white bg-[#17412C] p-2 rounded-lg"
              >
                <FaYoutube size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/enaccess/"
                className="text-white bg-[#17412C] p-2 rounded-lg"
              >
                <FaLinkedinIn size={24} />
              </Link>
              <Link
                href="https://github.com/EnAccess"
                className="text-white bg-[#17412C] p-2 rounded-lg"
              >
                <FaGithub size={24} />
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-4 text-sm text-[#091A12]  underline font-bold">
            <Link href="#">Imprint</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
