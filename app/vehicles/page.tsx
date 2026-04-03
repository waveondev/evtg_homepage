"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Zap, Gauge, Battery, Shield, Clock, Leaf, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const vehicles = [
  {
    id: "gr-x1-pro",
    name: "GR-X1 Pro",
    category: "배달용",
    tagline: "도심 배달의 새로운 기준",
    description: "최대 적재량과 긴 주행거리를 자랑하는 배달 전문 모델. 배달 라이더들의 필수 선택입니다.",
    specs: {
      range: "100km",
      speed: "80km/h",
      charge: "30초 스왑",
      weight: "85kg",
    },
    features: [
      "대용량 배터리 스왑 지원",
      "방수 등급 IP67",
      "스마트 대시보드",
      "실시간 GPS 추적",
    ],
    price: "3,900,000원",
    badge: "Best Seller",
  },
  {
    id: "gr-c1",
    name: "GR-C1",
    category: "출퇴근용",
    tagline: "스마트한 일상의 시작",
    description: "가볍고 민첩한 도심형 전기이륜차. 출퇴근과 근거리 이동에 최적화되어 있습니다.",
    specs: {
      range: "100km",
      speed: "60km/h",
      charge: "30초 스왑",
      weight: "65kg",
    },
    features: [
      "초경량 프레임 설계",
      "스마트폰 연동",
      "자동 주차 보조",
      "LED 헤드라이트",
    ],
    price: "2,500,000원",
    badge: "New",
  },
  {
    id: "gr-s1",
    name: "GR-S1",
    category: "스포츠",
    tagline: "짜릿한 라이딩의 완성",
    description: "스포티한 디자인과 강력한 성능을 갖춘 퍼포먼스 모델. 역동적인 라이딩을 원하는 당신을 위해.",
    specs: {
      range: "120km",
      speed: "100km/h",
      charge: "30초 스왑",
      weight: "75kg",
    },
    features: [
      "스포츠 서스펜션",
      "디스크 브레이크",
      "스포츠 모드",
      "프리미엄 시트",
    ],
    price: "4,500,000원",
    badge: "Premium",
  },
]

const highlights = [
  {
    icon: Zap,
    title: "30초 배터리 스왑",
    description: "충전 대기 없이 즉시 출발",
  },
  {
    icon: Gauge,
    title: "최대 150km 주행",
    description: "넉넉한 주행거리",
  },
  {
    icon: Shield,
    title: "5년 품질 보증",
    description: "믿을 수 있는 A/S",
  },
  {
    icon: Leaf,
    title: "친환경 인증",
    description: "탄소 배출 제로",
  },
]

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
              Electric Vehicles
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              혁신적인 전기 이륜차
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              배달, 출퇴근, 스포츠까지. 모든 용도에 맞는
              이브이타고의 전기 이륜차 라인업을 만나보세요.
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vehicle Lineup */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              라인업
            </h2>
            <p className="text-muted-foreground">
              당신의 라이프스타일에 맞는 모델을 선택하세요
            </p>
          </div>

          <Tabs defaultValue={vehicles[0].id} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-secondary">
              {vehicles.map((vehicle) => (
                <TabsTrigger
                  key={vehicle.id}
                  value={vehicle.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {vehicle.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {vehicles.map((vehicle) => (
              <TabsContent key={vehicle.id} value={vehicle.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Product Visual */}
                  <div className="relative">
                    <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary to-muted overflow-hidden">
                      <Image
                        src={`/images/vehicle-${vehicle.id}.jpg`}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                    </div>
                    {vehicle.badge && (
                      <span className="absolute top-6 right-6 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                        {vehicle.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                      {vehicle.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {vehicle.name}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-8">
                      {vehicle.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Battery className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">주행거리</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground">
                          {vehicle.specs.range}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Gauge className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">최고속도</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground">
                          {vehicle.specs.speed}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">충전시간</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground">
                          {vehicle.specs.charge}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">차량중량</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground">
                          {vehicle.specs.weight}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-foreground mb-4">주요 기능</h4>
                      <ul className="grid grid-cols-2 gap-3">
                        {vehicle.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-8 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">가격</p>
                        <p className="text-2xl font-bold text-foreground">
                          {vehicle.price}
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        구매 문의
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            시승 예약
          </h2>
          <p className="text-muted-foreground text-lg mb-8 text-pretty">
            직접 타보고 결정하세요. 가까운 전시장에서 시승이 가능합니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              시승 예약하기
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary"
            >
              <Link href="/stations">가까운 전시장 찾기</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
