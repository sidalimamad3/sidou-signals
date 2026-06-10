import Navbar from '../components/common/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Stats from '../components/landing/Stats'
import Pricing from '../components/landing/Pricing'
import FAQ from '../components/landing/FAQ'
import Contact from '../components/landing/Contact'
import Footer from '../components/common/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
