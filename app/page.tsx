"use client"
import React, { useState } from "react"
import QuestionaireFilter from "./components/Questionairefilter"
import { Modal } from "antd"
import EnAccessToolMap from "./components/Home"
export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModalOpen = (value: boolean) => {
    setIsModalOpen(value)
  }
  return (
    <div>
      <EnAccessToolMap setIsModalOpen={handleModalOpen} />

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
    </div>
  )
}
