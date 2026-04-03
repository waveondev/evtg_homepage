import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

const news = [
  {
    date: "2024.03.15",
    category: "보도자료",
    title: "이브이타고, 2030 탄소중립 로드맵 발표",
    excerpt: "전기이륜차 배터리 100% 재활용 시스템 구축 및 재생에너지 전환 가속화 계획 공개",
    image: "/images/news-1.jpg"
  },
  {
    date: "2024.03.10",
    category: "파트너십",
    title: "CJ대한통운과 친환경 물류 협약 체결",
    excerpt: "라스트마일 배송 전기이륜차 1,000대 도입으로 연간 2,000톤 탄소 감축 목표",
    image: "/images/news-2.jpg"
  },
  {
    date: "2024.02.28",
    category: "제품",
    title: "차세대 전기이륜차 GR-X2 출시 예정",
    excerpt: "주행거리 200km, 급속충전 지원 등 혁신적 성능 탑재한 신모델 4월 출시",
    image: "/images/news-3.jpg"
  },
  {
    date: "2024.02.15",
    category: "인프라",
    title: "전국 500번째 스테이션 오픈",
    excerpt: "부산 해운대구에 500번째 배터리 스왑 스테이션 개소, 전국 네트워크 확대 지속",
    image: "/images/news-4.jpg"
  },
]

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Newsroom
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            뉴스룸
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            이브이타고의 최신 소식을 만나보세요
          </p>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <Link 
                key={index} 
                href="#"
                className="group bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary to-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {item.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
