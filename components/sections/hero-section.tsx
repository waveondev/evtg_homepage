"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Hero Main Content */}
      <div className="flex-1 flex items-center relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">
                  Carbon Neutral Mobility
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6"
              >
                <span className="block text-balance">움직임의 미래,</span>
                <span className="block text-primary mt-2">
                  지구의 내일.
                </span>
              </motion.h1>

              {/* Subheading - ESG style message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed text-pretty"
              >
                우리는 모빌리티의 탄소 발자국을 지웁니다.
                전기 이륜차와 배터리 스왑 인프라로 구현하는 순환 경제,
                그것이 이브이타고의 약속입니다.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="hidden bg-foreground text-background hover:bg-foreground/90 px-8 h-14 text-base rounded-full"
                >
                  <Link href="/vehicles">
                    제품 살펴보기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-secondary px-8 h-14 text-base rounded-full"
                >
                  <Link href="/esg">
                    ESG 비전 보기
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
                {/* Placeholder for hero image - Electric motorcycle */}
                <Image
                  src="/images/evtg-motorcycle.png"
                  alt="이브이타고 전기 오토바이"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Fallback gradient if image not loaded */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/30" />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-5 shadow-xl border border-border"
              >
                <div className="text-3xl font-bold text-primary">12,000+</div>
                <div className="text-sm text-muted-foreground">톤 탄소 감축</div>
              </motion.div>

              {/* Another floating card */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full px-5 py-3 shadow-lg"
              >
                <span className="text-sm font-medium">30초 배터리 교환</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">48V / 72V</div>
              <div className="text-sm text-muted-foreground mt-1">공용 충전 스테이션</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">100km</div>
              <div className="text-sm text-muted-foreground mt-1">1회 충전 주행</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground mt-1">재생에너지 사용</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground mt-1">배터리 재활용</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden lg:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  )
}
