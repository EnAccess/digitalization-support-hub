"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { MiniBubble } from "./support-bubble/mini-bubble" // <-- updated import
import { type BubbleState } from "./support-bubble/bubble"

interface SupportBubbleContextType {
  openSupportForm: () => void
  openMiniBubble: () => void
}

const SupportBubbleContext = createContext<
  SupportBubbleContextType | undefined
>(undefined)

export function useSupportBubble() {
  const context = useContext(SupportBubbleContext)
  if (!context) {
    throw new Error(
      "useSupportBubble must be used within a SupportBubbleProvider"
    )
  }
  return context
}

interface SupportBubbleProviderProps {
  children: ReactNode
}

export function SupportBubbleProvider({
  children,
}: SupportBubbleProviderProps) {
  const [, setBubbleState] = useState<BubbleState>("closed")

  const openSupportForm = () => {
    setBubbleState("prompt")
  }

  const openMiniBubble = () => {
    setBubbleState("prompt")
  }

  return (
    <SupportBubbleContext.Provider value={{ openSupportForm, openMiniBubble }}>
      {children}
      <MiniBubble /> {/* <-- use MiniBubble here */}
    </SupportBubbleContext.Provider>
  )
}
