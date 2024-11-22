"use client"
import React, { useState } from "react"
import QuestionaireFilter from "./components/Questionairefilter"
import ToolMapButton from "./components/Button"
import { Modal } from "antd"
import EnAccessToolMap from "./components/Home"
export default function page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      <ToolMapButton onClick={() => setIsModalOpen(true)} />
      <EnAccessToolMap />

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
