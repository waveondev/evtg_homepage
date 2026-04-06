"use client"

import { ArrowRight, Zap, Gauge, Shield, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const features = [
  {
    icon: Zap,
    title: "초고속 교환",
    description: "30초 배터리 스왑으로 대기 시간 제로",
  },
  {
    icon: Gauge,
    title: "100km 주행",
    description: "한 번 충전으로 도심 배달 완벽 커버",
  },
  {
    icon: Shield,
    title: "품질 보증",
    description: "믿을 수 있는 A/S",
  },
  {
    icon: Leaf,
    title: "탄소 제로",
    description: "주행부터 재활용까지 완전한 친환경",
  },
]

export function ProductShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Our Products
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            당신의 여정에
            <br />
            책임을 더합니다.
          </motion.h2>
        </div>

        {/* Product Images Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Main Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-card to-muted">
              <Image
                src="/images/evtg-bike.png"
                alt="이브이타고 iVAN 전기 오토바이"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />

              {/* Product badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Standard Model</p>
                      <h3 className="text-xl font-bold text-foreground">iVAN</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-lg font-bold text-primary">1,690,000원</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Images */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-card to-muted"
            >
              <Image
                src="/images/evtg_battery.png"
                alt="이브이타고 배터리 팩"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-background text-sm font-medium">Battery Pack</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-card to-muted"
            >
              <Image
                src="/images/station.png"
                alt="이브이타고 충전 스테이션"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-background text-sm font-medium">Swap Station</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-2 relative aspect-[2/1] rounded-2xl overflow-hidden bg-gradient-to-br from-card to-muted"
            >
              <Image
                src="/images/full-lineup.png"
                alt="이브이타고 전체 라인업"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-background text-sm font-medium">Full Lineup</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="p-6 rounded-2xl bg-background border border-border text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-14"
          >
            <Link href="/vehicles">
              전체 라인업 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
