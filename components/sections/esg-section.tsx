"use client"

import { TreePine, Wind, Recycle, TrendingDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const esgStats = [
  {
    icon: TrendingDown,
    value: "12,847",
    unit: "톤",
    label: "연간 탄소 감축량",
    description: "휘발유 이륜차 대비",
  },
  {
    icon: TreePine,
    value: "192,000",
    unit: "그루",
    label: "나무 심기 효과",
    description: "30년 기준 환산",
  },
  {
    icon: Wind,
    value: "95",
    unit: "%",
    label: "재생 에너지",
    description: "스테이션 운영",
  },
  {
    icon: Recycle,
    value: "100",
    unit: "%",
    label: "배터리 재활용",
    description: "도시 광산 프로젝트",
  },
]

export function ESGSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-primary text-sm font-semibold tracking-wider uppercase mb-4"
            >
              Our Commitment
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              매 순간의 선택이
              <br />
              <span className="text-primary">미래를 바꿉니다.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty"
            >
              탄소 중립은 먼 미래의 이야기가 아닙니다.
              이브이타고는 오늘의 모빌리티가 내일의 환경을 결정한다고 믿습니다.
              배터리 하나, 주행 한 번이 모여 만드는 변화를 함께 경험하세요.
            </motion.p>

            {/* ESG Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {["Environmental", "Social", "Governance"].map((pillar, index) => (
                <span
                  key={pillar}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {pillar}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
              >
                <Link href="/esg">
                  ESG 리포트 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right - Image with Stats overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-accent to-secondary">
              <Image
                src="/images/esg-nature.jpg"
                alt="지속 가능한 미래"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-8 -left-8 -right-8 lg:-left-12 lg:-right-12">
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {esgStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-background rounded-2xl p-4 lg:p-5 shadow-xl border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">{stat.description}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl lg:text-3xl font-bold text-foreground">
                        {stat.value}
                      </span>
                      <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carbon Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-32 lg:mt-40"
        >
          <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  2035 탄소중립 로드맵
                </h3>
                <p className="text-muted-foreground">
                  이브이타고는 2035년까지 완전한 탄소중립을 달성합니다
                </p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold text-primary">35%</span>
                <p className="text-sm text-muted-foreground">목표 달성률</p>
              </div>
            </div>

            <div className="relative h-4 bg-secondary rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "35%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>2026년 현재</span>
              <span>2035년 목표</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
