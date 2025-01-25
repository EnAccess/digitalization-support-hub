import Header from "./components/Header"
import Hero from "./components/Hero"
import Context from "./components/Context"
import Challenges from "./components/Challenges"
import Solutions from "./components/Solutions"
import Impact from "./components/Impact"
import Participation from "./components/Participation"
import Timeline from "./components/Timeline"
import Footer from "./components/Footer"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Hero />
      <Context />
      <Challenges />
      <Solutions />
      <Impact />
      <Participation />
      <Timeline />
      <Footer />
    </main>
  )
}
