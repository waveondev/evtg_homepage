"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  Leaf,
  TreePine,
  Wind,
  Recycle,
  TrendingDown,
  Globe,
  Target,
  Users,
  Building,
  ArrowRight,
  Check
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const esgPillars = [
  // {
  //   icon: Leaf,
  //   title: "Environmental",
  //   subtitle: "환경",
  //   description: "탄소 배출 감소, 배터리 재활용, 재생 에너지 사용으로 환경 보호에 앞장섭니다.",
  //   stats: [
  //     { value: "12,000톤", label: "연간 탄소 감축" },
  //     { value: "70%", label: "배터리 재활용률" },
  //     { value: "60%", label: "재생 에너지 사용" },
  //   ],
  // },
  // {
  //   icon: Users,
  //   title: "Social",
  //   subtitle: "사회",
  //   description: "지역사회와의 상생, 안전한 근무환경, 다양성 존중을 통해 사회적 가치를 창출합니다.",
  //   stats: [
  //     { value: "50+", label: "일자리 창출" },
  //     { value: "93%", label: "직원 만족도" },
  //     { value: "30%", label: "여성 임원 비율" },
  //   ],
  // },
  // {
  //   icon: Building,
  //   title: "Governance",
  //   subtitle: "지배구조",
  //   description: "투명한 경영, 윤리적 기업 문화, 이해관계자 소통을 통해 신뢰를 구축합니다.",
  //   stats: [
  //     { value: "100%", label: "이사회 독립성" },
  //     { value: "A등급", label: "ESG 평가" },
  //     { value: "0건", label: "컴플라이언스 위반" },
  //   ],
  // },
  {
    icon: Leaf,
    title: "Environmental",
    subtitle: "환경",
    description: "내연기관의 전동화 전환을 돕고, 배터리 생애주기를 꼼꼼히 관리하여 진정한 자원 순환을 실천합니다.",
    stats: [
      { value: "100%", label: "사용 후 배터리 안전 회수" },
      { value: "System", label: "주행 기반 탄소 감축량 측정" },
      { value: "Zero", label: "사내 일회용품 제로 웨이스트" },
    ],
  },
  {
    icon: Users,
    title: "Social",
    subtitle: "사회",
    description: "수평적인 소통, 유연한 근무 환경, 구성원의 안전을 최우선으로 하여 함께 성장하는 문화를 만듭니다.",
    stats: [
      { value: "100%", label: "유연근무제 및 안전 교육" },
      { value: "월 1회", label: "전사 타운홀 미팅(소통)" },
      { value: "연 2회", label: "지역사회 연대 활동" },
    ],
  },
  {
    icon: Building,
    title: "Governance",
    subtitle: "지배구조",
    description: "투명한 정보 공유와 윤리 경영 가이드라인 수립을 통해 내부 구성원과 고객의 신뢰를 쌓아갑니다.",
    stats: [
      { value: "100%", label: "임직원 윤리 강령 서약" },
      { value: "월 1회", label: "경영 지표 전사 투명 공유" },
      { value: "0건", label: "보안 및 개인정보 침해" },
    ],
  }
]

const carbonGoals = [
  {
    year: "2026",
    goal: "16,000톤",
    current: "5,600톤",
    percentage: 35,
    status: "진행 중",
  },
  {
    year: "2030",
    goal: "25,000톤",
    current: "0톤",
    percentage: 0,
    status: "예정",
  },
  {
    year: "2035",
    goal: "100,000톤",
    current: "0톤",
    percentage: 0,
    status: "장기 목표",
  },
]

const initiatives = [
  {
    icon: TreePine,
    title: "도심 녹화 프로젝트",
    description: "전국 충전 스테이션 주변에 나무를 심어 도시 환경을 개선합니다.",
    impact: "연간 10,000그루 식수",
  },
  {
    icon: Recycle,
    title: "배터리 재활용 프로그램",
    description: "수명이 다한 배터리를 70% 재활용하여 자원 순환에 기여합니다.",
    impact: "70% 재활용률 달성",
  },
  {
    icon: Wind,
    title: "재생 에너지 전환",
    description: "모든 충전 스테이션을 태양광, 풍력 등 재생 에너지로 운영합니다.",
    impact: "2030년까지 60% 전환",
  },
  {
    icon: Globe,
    title: "탄소 발자국 공개",
    description: "서비스 전 과정의 탄소 배출량을 투명하게 공개합니다.",
    impact: "분기별 보고서 발행",
  },
]

const certifications = [
  "ISO 14001 환경경영시스템",
  "ISO 45001 안전보건경영시스템",
  "K-ESG A등급 획득",
  "탄소중립 인증 기업",
  "녹색기업 지정",
]

export default function ESGPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                ESG 경영 선도 기업
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              탄소 중립에 <br />
              <span className="text-primary">진심인 기업</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              이브이타고는 전기이륜차와 BSS 서비스를 통해<br/>
              실질적인 탄소 감축을 실현하는 ESG 선도 기업입니다.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-accent to-secondary">
              <Image
                src="/images/esg-company.jpg"
                alt="이브이타고 ESG 경영"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
          >
            <div className="p-6 rounded-2xl bg-card border border-border text-center">
              <TrendingDown className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">12,000+</div>
              <div className="text-sm text-muted-foreground">톤 탄소 감축</div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border text-center">
              <TreePine className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">180,000+</div>
              <div className="text-sm text-muted-foreground">그루 나무 효과</div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border text-center">
              <Recycle className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">70%</div>
              <div className="text-sm text-muted-foreground">배터리 재활용</div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border text-center">
              <Wind className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">60%</div>
              <div className="text-sm text-muted-foreground">재생 에너지</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ESG Pillars */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ESG 경영 철학
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              환경, 사회, 지배구조의 세 가지 축을 중심으로
              지속 가능한 기업으로 성장해 나갑니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {esgPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <pillar.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {pillar.subtitle}
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">
                  {pillar.description}
                </p>

                <div className="space-y-4 pt-6 border-t border-border">
                  {pillar.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-lg font-semibold text-primary">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carbon Goals */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Target className="w-12 h-12 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  탄소 감축 목표
                </h2>
                <p className="text-muted-foreground text-lg mb-8 text-pretty">
                  이브이타고는 2035년까지 연간 100,000톤의 탄소를
                  감축하는 것을<br/>목표로 하고 있습니다.
                  <br/>매년 더 많은 전기이륜차와 충전 스테이션을 보급하여<br/>실질적인 환경 개선을 이루어 나갑니다.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="hidden bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/contact">
                    파트너십 문의
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="space-y-6">
              {carbonGoals.map((goal, index) => (
                <motion.div
                  key={goal.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        {goal.year}년
                      </span>
                      <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
                        goal.status === "진행 중" 
                          ? "bg-primary/10 text-primary" 
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {goal.goal}
                    </span>
                  </div>

                  <div className="relative h-3 bg-secondary rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goal.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      현재: {goal.current}
                    </span>
                    <span className="text-primary font-medium">
                      {goal.percentage}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              환경 보호 활동
            </h2>
            <p className="text-muted-foreground">
              탄소 감축을 넘어 적극적인 환경 보호 활동을 펼치고 있습니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <initiative.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {initiative.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {initiative.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                      <Check className="w-4 h-4" />
                      {initiative.impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="hidden py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            인증 및 수상
          </h2>
          <p className="text-muted-foreground mb-12">
            이브이타고의 ESG 경영은 국내외에서 인정받고 있습니다
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {certifications.map((cert) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="px-6 py-3 rounded-full bg-card border border-border text-foreground"
              >
                {cert}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary"
            >
              <Link href="/reports/esg-2024.pdf">
                2024 ESG 보고서 다운로드
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
