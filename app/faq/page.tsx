"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    category: "제품",
    questions: [
      {
        q: "전기이륜차의 최대 주행거리는 얼마인가요?",
        a: "이브이타고 전기이륜차는 모델에 따라 1회 충전으로 최대 150km까지 주행이 가능합니다. 실제 주행거리는 주행 환경, 속도, 탑승자 무게 등에 따라 달라질 수 있습니다."
      },
      {
        q: "배터리 수명은 얼마나 되나요?",
        a: "배터리는 약 1,500회 충전 사이클을 기준으로 설계되었으며, 일반적인 사용 환경에서 5년 이상 사용 가능합니다. 배터리 성능이 80% 이하로 저하될 경우 무상 교체해 드립니다."
      },
      {
        q: "AS는 어떻게 받을 수 있나요?",
        a: "전국 50개 이상의 공식 서비스센터에서 AS를 받으실 수 있습니다. 고객센터(1588-0000)로 연락하시면 가까운 서비스센터를 안내해 드립니다."
      },
    ]
  },
  {
    category: "배터리 스왑",
    questions: [
      {
        q: "배터리 교환은 어떻게 하나요?",
        a: "가까운 스테이션을 방문하여 앱으로 인증 후, 기존 배터리를 반납하고 완충된 새 배터리를 수령하면 됩니다. 전체 과정은 약 30초가 소요됩니다."
      },
      {
        q: "배터리가 완전히 방전되면 어떻게 하나요?",
        a: "배터리가 완전 방전되어도 스테이션에서 정상적으로 교환 가능합니다. 주행 중 방전될 경우 고객센터로 연락주시면 긴급 출동 서비스를 제공합니다."
      },
      {
        q: "이용 요금은 어떻게 되나요?",
        a: "베이직(월 49,000원), 프로(월 89,000원), 비즈니스(별도 협의) 요금제를 제공합니다. 사용량에 따라 최적의 요금제를 선택하실 수 있습니다."
      },
    ]
  },
  {
    category: "스테이션",
    questions: [
      {
        q: "가까운 스테이션은 어떻게 찾나요?",
        a: "이브이타고 앱 또는 홈페이지의 '스테이션 찾기' 메뉴에서 현재 위치 기반으로 가까운 스테이션을 확인할 수 있습니다."
      },
      {
        q: "스테이션 운영 시간은 어떻게 되나요?",
        a: "대부분의 스테이션은 24시간 운영됩니다. 일부 매장 내 설치된 스테이션은 해당 매장의 영업시간에 따릅니다."
      },
    ]
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown className={cn(
          "w-5 h-5 text-muted-foreground transition-transform shrink-0",
          isOpen && "rotate-180"
        )} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96 pb-6" : "max-h-0"
      )}>
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            FAQ
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            자주 묻는 질문
          </h1>
          <p className="text-xl text-muted-foreground">
            궁금하신 내용을 빠르게 찾아보세요
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {faqs.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b-2 border-primary">
                {category.category}
              </h2>
              <div>
                {category.questions.map((faq, index) => (
                  <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 lg:px-8 bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            원하는 답변을 찾지 못하셨나요?
          </h2>
          <p className="text-muted-foreground mb-8">
            고객센터로 문의주시면 친절하게 안내해 드리겠습니다.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium transition-colors"
          >
            문의하기
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
