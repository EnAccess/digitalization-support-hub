import { X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function SuggestionBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-[#0D261A] font-medium text-medium p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>Know of a relevant tool that&apos;s not listed?</span>
        <Link
          target="_blank"
          href="https://enaccess.typeform.com/new-tool"
          className="underline hover:text-[#07140e]"
        >
          Send us your suggestions
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="hover:text-[#0D261A]"
      >
        <X size={24} />
      </button>
    </div>
  )
}
