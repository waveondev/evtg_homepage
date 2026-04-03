import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { ESGSection } from "@/components/sections/esg-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProductShowcase />
      <ESGSection />
      <CTASection />
      <Footer />
    </main>
  )
}
