import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import "./globals.css"
import "@ant-design/v5-patch-for-react-19"
import { SupportBubbleProvider } from "./components/support-bubble-provider"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Digitalization Support Hub - Proof of Concept",
  description: "Digitalization Support Hub - Proof of Concept",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${raleway.variable} `}>
      <body className={raleway.className}>
        <SupportBubbleProvider>{children}</SupportBubbleProvider>
      </body>
    </html>
  )
}
