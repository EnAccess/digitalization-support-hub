"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"

const COOKIE_KEY = "dsh_cookie_consent"
const COOKIE_MAX_DAYS = 365

export function useCookieConsent() {
  const [consent, setConsentState] = useState<"all" | "none" | null>(() => {
    if (typeof window === "undefined") return null
    return (Cookies.get(COOKIE_KEY) as "all" | "none") ?? null
  })

  useEffect(() => {
    const onStorage = () => {
      setConsentState((Cookies.get(COOKIE_KEY) as "all" | "none") ?? null)
    }
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail as "all" | "none"
      setConsentState(
        detail ?? (Cookies.get(COOKIE_KEY) as "all" | "none") ?? null
      )
    }

    window.addEventListener("storage", onStorage)
    window.addEventListener("dsh_cookie_consent", onCustom as EventListener)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(
        "dsh_cookie_consent",
        onCustom as EventListener
      )
    }
  }, [])

  const setConsent = useCallback((value: "all" | "none") => {
    Cookies.set(COOKIE_KEY, value, {
      expires: COOKIE_MAX_DAYS,
      sameSite: "Lax",
    })
    try {
      // trigger storage event in other tabs
      localStorage.setItem(COOKIE_KEY, value)
      localStorage.removeItem(COOKIE_KEY)
    } catch {
      /* ignore */
    }
    // notify same-tab listeners
    window.dispatchEvent(
      new CustomEvent("dsh_cookie_consent", { detail: value })
    )
    setConsentState(value)
  }, [])

  return { consent, setConsent }
}

export default function CookieBanner() {
  const { consent, setConsent } = useCookieConsent()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (consent === null) setIsVisible(true)
    }, 700)
    return () => clearTimeout(timer)
  }, [consent])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slideUp">
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-base text-[#1E1F1E] mb-2">
                We use cookies to improve your browsing experience and to
                display embedded YouTube videos. Some cookies are set by third
                parties such as Google (Analytics and YouTube).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Button
                onClick={() => {
                  setConsent("all")
                  setIsVisible(false)
                }}
                className="bg-[#2D6A4F] text-white hover:bg-[#1D593F] rounded-full w-full sm:w-auto"
              >
                Accept all
              </Button>

              <Button
                onClick={() => {
                  setConsent("none")
                  setIsVisible(false)
                }}
                variant="outline"
                className="border-[#17412C] text-[#0D261A] rounded-full w-full sm:w-auto"
              >
                Reject all
              </Button>

              <Link
                href="/cookies"
                className="text-[#0D6E4B] underline text-sm"
              >
                More information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
