"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"
import { useCookieConsent } from "./CookieBanner"

const GA_TRACKING_ID = "G-90PN28ZXNP"

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
export default function GoogleAnalytics() {
  const { consent } = useCookieConsent()
  const consentInitialized = useRef(false)

  // Initialize consent mode BEFORE GA loads
  useEffect(() => {
    if (consentInitialized.current) return

    window.dataLayer = window.dataLayer || []
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args)
    }

    // Set default consent to denied (privacy-first)
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500, // Wait 500ms for consent update
    })

    consentInitialized.current = true
  }, [])

  // Update consent when user makes a choice
  useEffect(() => {
    if (!consent || !window.gtag) return

    const consentState = consent === "all" ? "granted" : "denied"

    window.gtag("consent", "update", {
      analytics_storage: consentState,
      ad_storage: consentState,
      ad_user_data: consentState,
      ad_personalization: consentState,
    })
  }, [consent])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}
