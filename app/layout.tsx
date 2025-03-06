import type { Metadata } from "next"
import { Raleway, Merriweather } from "next/font/google"
import "./globals.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import "@ant-design/v5-patch-for-react-19"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
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
    <html lang="en" className={`${raleway.variable} ${merriweather.variable}`}>
      <body className={merriweather.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
