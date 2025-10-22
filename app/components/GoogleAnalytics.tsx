"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { useCookieConsent } from "./CookieBanner"

const GA_TRACKING_ID = "G-90PN28ZXNP"

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent()
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    setIsEnabled(consent === "all")
  }, [consent])

  if (!isEnabled) return null

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
