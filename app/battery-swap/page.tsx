"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  Battery, 
  Clock, 
  Zap, 
  Shield, 
  Recycle, 
  Smartphone,
  ArrowRight,
  Check
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const steps = [
  {
    step: "01",
    title: "스테이션 도착",
    description: "앱에서 가까운 스테이션을 찾아 방문합니다.",
  },
  {
    step: "02",
    title: "배터리 반납",
    description: "방전된 배터리를 스테이션에 반납합니다.",
  },
  {
    step: "03",
    title: "새 배터리 수령",
    description: "완충된 새 배터리를 받아 장착합니다.",
  },
  {
    step: "04",
    title: "바로 출발",
    description: "30초 만에 풀충전 상태로 출발합니다.",
  },
]

const features = [
  {
    icon: Clock,
    title: "30초 초고속 교환",
    description: "충전 대기 없이 배터리를 교환하고 바로 출발하세요.",
  },
  {
    icon: Battery,
    title: "항상 완충 배터리",
    description: "스테이션에서 항상 완충된 배터리를 제공합니다.",
  },
  {
    icon: Shield,
    title: "안전한 배터리 관리",
    description: "전문 관리 시스템으로 배터리 상태를 최적으로 유지합니다.",
  },
  {
    icon: Recycle,
    title: "100% 재활용",
    description: "수명이 다한 배터리는 100% 친환경 재활용됩니다.",
  },
  {
    icon: Smartphone,
    title: "스마트 앱 연동",
    description: "앱으로 스테이션 위치, 배터리 현황을 실시간 확인하세요.",
  },
  {
    icon: Zap,
    title: "저렴한 비용",
    description: "구독형 요금제로 경제적으로 이용할 수 있습니다.",
  },
]

const plans = [
  {
    name: "베이직",
    price: "59,000",
    period: "월",
    description: "가끔 이용하는 라이더를 위한 플랜",
    features: [
      "월 30회 배터리 스왑",
      "기본 고객 지원",
      "앱 기본 기능",
      "전국 스테이션 이용",
    ],
    popular: false,
  },
  {
    name: "프로",
    price: "99,000",
    period: "월",
    description: "배달 라이더를 위한 인기 플랜",
    features: [
      "무제한 배터리 스왑",
      "24시간 우선 고객 지원",
      "프리미엄 앱 기능",
      "전국 스테이션 이용",
      "배터리 우선 예약",
    ],
    popular: true,
  },
  {
    name: "비즈니스",
    price: "협의",
    period: "",
    description: "기업 고객을 위한 맞춤 플랜",
    features: [
      "무제한 배터리 스왑",
      "전담 매니저 배정",
      "기업 전용 대시보드",
      "전국 스테이션 이용",
      "전용 스테이션 설치 가능",
      "실시간 차량 관리",
    ],
    popular: false,
  },
]

export default function BatterySwapPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
              Battery Swap Service
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              30초 배터리 스왑
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              충전 대기 시간은 이제 그만. 
              30초 만에 배터리를 교환하고 바로 출발하세요.
            </p>
          </motion.div>

          {/* Large battery visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
              <Image
                src="/images/battery-swap-hero.jpg"
                alt="배터리 스왑 스테이션"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-1">30초</div>
                    <p className="text-muted-foreground">배터리 교환 완료</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Battery className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              이용 방법
            </h2>
            <p className="text-muted-foreground">
              간단한 4단계로 배터리를 교환하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-8 rounded-2xl bg-background border border-border h-full">
                  <span className="text-4xl font-bold text-primary/20 mb-4 block">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              서비스 특징
            </h2>
            <p className="text-muted-foreground">
              이브이타고 배터리 스왑의 특별함
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              요금제
            </h2>
            <p className="text-muted-foreground">
              나에게 맞는 플랜을 선택하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border ${
                  plan.popular
                    ? "bg-primary/5 border-primary"
                    : "bg-background border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    가장 인기
                  </span>
                )}
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">
                      원/{plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.price === "협의" ? "문의하기" : "시작하기"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            지금 바로 시작하세요
          </h2>
          <p className="text-muted-foreground text-lg mb-8 text-pretty">
            가까운 스테이션에서 배터리 스왑 서비스를 체험해보세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/stations">
                가까운 스테이션 찾기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
