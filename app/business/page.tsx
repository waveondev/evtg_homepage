import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Truck, ShoppingBag, Building2, CheckCircle2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const solutions = [
  {
    icon: ShoppingBag,
    title: "배달 플랫폼",
    description: "배달의민족, 쿠팡이츠 등 주요 배달 플랫폼과 함께하고 있습니다.",
    benefits: ["라이더 수입 증가", "배달 효율 향상", "ESG 브랜딩"]
  },
  {
    icon: Truck,
    title: "물류 기업",
    description: "라스트마일 배송의 탄소발자국을 제로로 만듭니다.",
    benefits: ["운영 비용 절감", "탄소 배출 감소", "규제 대응"]
  },
  {
    icon: Building2,
    title: "공공기관",
    description: "지자체 및 공공기관의 친환경 전환을 지원합니다.",
    benefits: ["정책 목표 달성", "시민 편의 증진", "예산 효율화"]
  },
]

const stats = [
  { value: "50+", label: "기업 파트너" },
  { value: "12,000+", label: "누적 탄소 감축(톤)" },
  { value: "30%", label: "평균 비용 절감" },
  { value: "98%", label: "파트너 만족도" },
]

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                Business Partnership
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                비즈니스의 미래를
                <br />
                함께 만들어갑니다
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                이브이타고는 기업 파트너와 함께 지속 가능한 모빌리티 생태계를 구축합니다.
                맞춤형 솔루션으로 귀사의 ESG 목표 달성을 지원합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-foreground text-background rounded-full px-8 h-14">
                  <Link href="/contact">
                    제휴 문의하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
              <Image
                src="/images/business-hero.jpg"
                alt="비즈니스 파트너십"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              맞춤형 솔루션
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              업종별 특성에 맞는 최적의 친환경 모빌리티 솔루션을 제공합니다
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div key={solution.title} className="bg-card rounded-3xl p-8 border border-border">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <solution.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{solution.title}</h3>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <ul className="space-y-3">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-background/70 text-lg mb-8">
            전담 매니저가 귀사에 최적화된 솔루션을 제안해 드립니다
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-8 h-14">
            <Link href="/contact">제휴 문의하기</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
