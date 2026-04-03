import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-neutral">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  )
}
