import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Leaf, Users, Target, Award } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              더 깨끗한 이동을 위한
              <br />
              우리의 여정
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              이브이타고는 2023년, 탄소 중립 모빌리티의 미래를 꿈꾸며 시작되었습니다.
              전기 이륜차와 배터리 스왑 인프라를 통해 도시의 이동 방식을 바꾸고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Image */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
            <video
                src="/videos/about-hero.mp4" // 실제 영상 파일이 위치한 경로로 수정하세요
                autoPlay
                loop
                muted
                playsInline
                // 좌우 100px씩 잘라내기 위한 Tailwind 클래스 적용
                className="absolute top-0 -left-[10px] w-[calc(100%+20px)] h-full max-w-none object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">우리의 미션</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                모빌리티 산업에서 발생하는 탄소 배출을 제로로 만드는 것.<br/>
                이것이 이브이타고가 존재하는 이유입니다.
                우리는 기술 혁신과 인프라 구축을 통해<br/>
                누구나 쉽게 친환경 이동 수단을 선택할 수 있는 세상을 만듭니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Leaf, title: "환경 우선", desc: "모든 의사결정의 기준" },
                { icon: Users, title: "함께 성장", desc: "파트너와의 상생" },
                { icon: Target, title: "혁신 추구", desc: "끊임없는 기술 발전" },
                { icon: Award, title: "신뢰 구축", desc: "투명한 ESG 경영" },
              ].map((value) => (
                <div key={value.title} className="p-6 rounded-2xl bg-background border border-border">
                  <value.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">우리의 발자취</h2>
          <div className="space-y-8">
            {[
              { year: "2023", title: "이브이타고 설립", desc: "친환경 모빌리티의 시작" },
              { year: "2025", title: "배터리 스왑 서비스 구축", desc: "충전스테이션, 배터리, 전기 이륜차" },
              { year: "2026", title: "배터리 스왑 서비스 시작", desc: "전국 충전 스테이션 구축 예정" },
              { year: "2028", title: "탄소 거래 플랫폼 오픈", desc: "전기 이륜차, 전기 중장비, 실버 카트 확대" },
              { year: "2030", title: "ESG 경영 선언", desc: "2030 탄소중립 로드맵 발표" },
            ].map((item, index) => (
              <div key={item.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {item.year.slice(2)}
                  </div>
                  {index < 4 && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <p className="text-sm text-primary font-medium">{item.year}</p>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
