import Hero from "./components/Hero"
import Context from "./components/Context"
import Challenges from "./components/Challenges"
import Solutions from "./components/Solutions"
import Impact from "./components/Impact"
import Participation from "./components/Participation"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Context />
      <Challenges />
      <Solutions />
      <Impact />
    </main>
  )
}
