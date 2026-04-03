"use client"

import { Bike, Battery, MapPin, Leaf, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const services = [
  {
    icon: Bike,
    title: "전기 이륜차",
    subtitle: "Electric Vehicles",
    description: "도심을 누비는 가장 깨끗한 방법. 제로 배출, 제로 타협.",
    // href: "/vehicles",
    href: "/",
    stats: "최대 100km",
    image: "/images/bike.png",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Battery,
    title: "배터리 스왑",
    subtitle: "Battery Swap",
    description: "충전을 기다리지 마세요. 교환하세요. 30초면 충분합니다.",
    //href: "/battery-swap",
    href: "/",
    stats: "30초 완료",
    image: "/images/battery-swap.jpg",
    color: "from-sky-500/20 to-blue-500/20",
  },
  {
    icon: MapPin,
    title: "스테이션 네트워크",
    subtitle: "Station Network",
    description: "전국 어디서나 가까운 곳에. 당신의 일상이 곧 충전 루트입니다.",
    href: "/stations",
    stats: "편리한 접근",
    image: "/images/station-store.png",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Leaf,
    title: "ESG 경영",
    subtitle: "Sustainability",
    description: "지속 가능한 미래는 선택이 아닌 책임. 우리의 모든 결정 기준입니다.",
    href: "/esg",
    stats: "탄소중립 2030",
    image: "/images/esg-hero.jpg",
    color: "from-lime-500/20 to-green-500/20",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            순환하는 에너지,
            <br />
            순환하는 가치.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty"
          >
            배터리의 여정은 끝이 없습니다. 충전, 사용, 교환, 그리고 재활용.
            이브이타고는 모빌리티의 완전한 순환을 실현합니다.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href} className="group block h-full">
                <div className="relative h-full rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Image area */}
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`} />
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                    {/* Stats badge */}
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-sm font-semibold text-foreground">{service.stats}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{service.subtitle}</p>
                          <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
