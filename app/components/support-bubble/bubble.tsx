"use client"

import { useState } from "react"
import { X } from "lucide-react"
import  {SupportForm}  from "./support-form"
import { ThankYouMessage } from "./thank-you-message"
import { SupportPrompt } from "./support-prompt"

export type BubbleState = "closed" | "prompt" | "form" | "thanks"

interface SupportBubbleProps {
  initialState?: BubbleState
}

export function SupportBubble({ initialState = "closed" }: SupportBubbleProps) {
  const [state, setState] = useState<BubbleState>(initialState)

  if (state === "closed") {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setState("prompt")}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#004d2c] text-white shadow-lg hover:bg-[#00613a] transition-all"
          aria-label="Open support bubble"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-help-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </button>
      </div>
    )
  }

  if (state === "prompt") {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setState("closed")
          }
        }}
      >
        <div className="absolute bottom-6 right-6 w-[400px] max-w-[90vw]">
          <SupportPrompt
            onClose={() => setState("closed")}
            onApplySupport={() => setState("form")}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setState("closed")
        }
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white shadow-xl rounded-lg animate-in fade-in zoom-in duration-300">
        <button
          onClick={() => setState("closed")}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="max-h-[90vh] overflow-y-auto scrollbar-hide">
          {state === "form" ? (
            <SupportForm onSubmitSuccess={() => setState("thanks")} />
          ) : (
            <ThankYouMessage onClose={() => setState("closed")} />
          )}
        </div>
      </div>
    </div>
  )
}
