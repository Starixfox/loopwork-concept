import Navbar from './components/Navbar'
import VideoBackground from './components/VideoBackground'
import HeroSection from './components/HeroSection'
import SolutionSection from './components/SolutionSection'
import MethodologySection from './components/MethodologySection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-flux-bg text-flux-text font-sans">
      {/* Scroll-scrubbed video background — full viewport, z-0 */}
      <VideoBackground />

      {/* Subtle dark vignette overlay for text readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.55)_78%,rgba(10,10,10,0.9)_100%)]"
      />

      {/* Fixed glassmorphism navbar */}
      <Navbar />

      {/* Main content wrapper — z-10 */}
      <main className="relative z-10">
        <section id="philosophy" aria-label="Hero">
          <HeroSection />
        </section>

        {/* Spacer: lets the user scroll through the chaos → order transition */}
        <div aria-hidden="true" className="h-[80vh]" />

        <section id="workflows" aria-label="Solution">
          <SolutionSection />
        </section>

        <section id="results" aria-label="Methodology">
          <MethodologySection />
        </section>
      </main>

      <Footer />
    </div>
  )
}
