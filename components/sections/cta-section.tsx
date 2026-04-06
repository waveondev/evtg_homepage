"use client"

import { ArrowRight, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Get Started
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              새로운 이동의 시작,
              <br />
              당신의 선택이 됩니다.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 text-pretty leading-relaxed">
              개인 라이더부터 배달 플랫폼, 물류 기업까지.
              모든 규모의 비즈니스를 위한 맞춤형 솔루션을 제공합니다.
              지속 가능한 미래로의 전환,<br/>함께 시작하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                asChild
                size="lg"
                className="hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-14"
              >
                <Link href="/vehicles">
                  제품 둘러보기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hidden border-border text-foreground hover:bg-secondary rounded-full px-8 h-14"
              >
                <Link href="/contact">기업 제휴 문의</Link>
              </Button>
            </div>

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="hidden w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className={"hidden"}>
                  <p className="text-xs text-muted-foreground">고객센터</p>
                  <p className="font-semibold text-foreground">1588-0000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">이메일</p>
                  <p className="font-semibold text-foreground">sales@ev-tago.kr</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
              <Image
                src="/images/cta-rider.jpg"
                alt="이브이타고 라이더"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>

            {/* Floating testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-6 shadow-xl border border-border max-w-xs"
            >
              <p className="text-sm text-muted-foreground mb-3 italic">
                {'"배터리 걱정 없이 하루 종일 배달할 수 있어서 수입이 30% 늘었어요."'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20" />
                <div>
                  <p className="text-sm font-semibold text-foreground">김OO</p>
                  <p className="text-xs text-muted-foreground">배달 라이더 3년차</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden mt-20 pt-12 border-t border-border"
        >
          <p className="text-sm text-muted-foreground text-center mb-8">
            국내 주요 기업들이 이브이타고와 함께합니다
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {["배달의민족", "쿠팡이츠", "요기요", "CJ대한통운", "롯데택배"].map(
              (company) => (
                <span
                  key={company}
                  className="text-base font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  {company}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
