"use client"

import { useCookieConsent } from "./CookieBanner"
import { Button } from "@/components/ui/button"

interface YouTubeEmbedProps {
  videoId: string
  className?: string
}

export default function YouTubeEmbed({
  videoId,
  className = "",
}: YouTubeEmbedProps) {
  const { consent, setConsent } = useCookieConsent()

  // if consent not granted, show placeholder with an Accept button that sets consent and immediately loads the video
  if (consent !== "all") {
    return (
      <div className={`bg-gray-50 rounded-lg p-6 text-center ${className}`}>
        <p className="text-[#1E1F1E] mb-4">
          This content is currently not available due to your cookie
          preferences.
        </p>

        <div className="flex justify-center gap-3">
          <Button
            onClick={() => setConsent("all")}
            className="bg-[#2D6A4F] text-white rounded-full"
          >
            Accept cookies and show video
          </Button>

          <Button
            onClick={() => setConsent("none")}
            variant="outline"
            className="border-[#17412C] text-[#0D261A] rounded-full"
          >
            Reject
          </Button>
        </div>
      </div>
    )
  }

  // consent === "all" -> render iframe immediately (no refresh needed)
  return (
    <div
      className={`aspect-video rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
