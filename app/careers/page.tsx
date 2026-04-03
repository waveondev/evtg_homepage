import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Heart, Zap, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const benefits = [
  { icon: Heart, title: "건강 지원", desc: "종합건강검진, 의료비 지원" },
  { icon: Zap, title: "성장 지원", desc: "교육비, 컨퍼런스 참가 지원" },
  { icon: Globe, title: "유연 근무", desc: "재택근무, 유연출퇴근" },
  { icon: Briefcase, title: "복지 포인트", desc: "연간 200만원 복지포인트" },
]

const openings = [
  { team: "제품개발", title: "전기 파워트레인 엔지니어", type: "정규직", location: "서울" },
  { team: "제품개발", title: "배터리 시스템 엔지니어", type: "정규직", location: "서울" },
  { team: "소프트웨어", title: "iOS 앱 개발자", type: "정규직", location: "서울" },
  { team: "소프트웨어", title: "백엔드 개발자 (Node.js)", type: "정규직", location: "서울" },
  { team: "운영", title: "스테이션 운영 매니저", type: "정규직", location: "전국" },
  { team: "마케팅", title: "브랜드 마케팅 담당자", type: "정규직", location: "서울" },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                Careers
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                미래를 함께
                <br />
                만들어갈 동료를 찾습니다
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                이브이타고에서 지속 가능한 미래를 위한 도전에 동참하세요.
                당신의 아이디어가 내일의 모빌리티를 바꿉니다.
              </p>
              <Button asChild size="lg" className="bg-foreground text-background rounded-full px-8 h-14">
                <a href="#openings">
                  채용 공고 보기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
              <Image
                src="/images/careers-hero.jpg"
                alt="이브이타고 팀"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            이브이타고와 함께하는 이유
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-background rounded-2xl p-6 border border-border text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            채용 중인 포지션
          </h2>
          <div className="space-y-4">
            {openings.map((job, index) => (
              <Link
                key={index}
                href="/contact"
                className="flex items-center justify-between p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all group"
              >
                <div>
                  <p className="text-sm text-primary font-medium mb-1">{job.team}</p>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-muted-foreground">{job.type}</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
