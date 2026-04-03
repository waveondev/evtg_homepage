"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              문의하기
            </h1>
            <p className="text-xl text-muted-foreground">
              궁금한 점이 있으시면 언제든 연락주세요.
              빠르고 친절하게 답변드리겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">메시지 보내기</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">이름</label>
                    <Input placeholder="홍길동" className="h-12 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">연락처</label>
                    <Input placeholder="010-0000-0000" className="h-12 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">이메일</label>
                  <Input type="email" placeholder="example@email.com" className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">문의 유형</label>
                  <select className="w-full h-12 rounded-xl bg-input border border-border px-4 text-foreground">
                    <option>제품 문의</option>
                    <option>서비스 문의</option>
                    <option>기업 제휴</option>
                    <option>채용 문의</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">문의 내용</label>
                  <Textarea
                    placeholder="문의하실 내용을 자세히 적어주세요."
                    className="min-h-[150px] rounded-xl"
                  />
                </div>
                <Button className="w-full h-14 rounded-full bg-foreground text-background hover:bg-foreground/90 text-base">
                  문의 보내기
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">연락처 정보</h2>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "고객센터", info: "1588-0000", sub: "평일 09:00 - 18:00" },
                  { icon: Mail, title: "이메일", info: "sales@ev-tago.kr", sub: "24시간 접수 가능" },
                  { icon: MapPin, title: "본사 주소", info: "서울특별시 강남구 테헤란로 123", sub: "이브이타고 빌딩 5층" },
                  { icon: Clock, title: "운영 시간", info: "평일 09:00 - 18:00", sub: "주말 및 공휴일 휴무" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                      <p className="font-semibold text-foreground">{item.info}</p>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Link */}
              <div className="mt-10 p-6 rounded-2xl bg-accent">
                <h3 className="font-semibold text-accent-foreground mb-2">자주 묻는 질문</h3>
                <p className="text-sm text-accent-foreground/80 mb-4">
                  많은 분들이 궁금해하시는 질문들을 모았습니다.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <a href="/faq">FAQ 바로가기</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
