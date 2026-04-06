"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    category: "스테이션 이용 및 설치",
    questions: [
      {
        q: "배터리 교환 스테이션 위치는 어떻게 알 수 있나요?",
        a: "이브이타고 홈페이지 또는 App(앱스토어 및 플레이스토어에서 이브이타고 검색)을 통해 실시간 위치 및 정보를 확인 가능합니다."
      },
      {
        q: "배터리 교환 스테이션 사용 시 배터리팩 삽입 방향이 정해져 있나요?",
        a: "방향 상관없이 삽입 및 교환이 가능하도록 설계되어 있어 편리하게 이용하실 수 있습니다."
      },
      {
        q: "배터리 교환 스테이션 이용시간은 어떻게 운영되나요?",
        a: "고객님들의 편의를 위해 365일 24시간 연중무휴로 운영됩니다."
      },
      {
        q: "이브이타고 배터리 교환 스테이션은 48V / 72V 배터리팩 호환 가능한가요?",
        a: "네. 스테이션은 48V와 72V 배터리팩의 충전 및 교환을 모두 지원합니다."
      },
      {
        q: "이브이타고 배터리 교환 스테이션 설치지역은 어디인가요?",
        a: "서비스 초기인 현재 서울을 시작으로 주요 광역시 및 수도권으로 단계별 확장을 계획하고 있습니다."
      },
    ]
  },
  {
    category: "구독 요금제 운영",
    questions: [
      {
        q: "어떤 구독요금제가 있나요?",
        a: "차량을 구매하신 후 배터리 교환 서비스를 구독하여 이용하실 수 있습니다.\n요금제는 고객님들의 주행 패턴에 맞게 일일 요금제부터 무제한 요금제까지 다양하게 준비되어 있습니다.\n자세한 요금제 종류는 홈페이지나 앱에서 확인하시기 바랍니다."
      },
      {
        q: "구독요금제 해지 시 유의사항이 있나요?",
        a: "보조금을 지원받아 차량을 구입하신 경우, 관련 규정에 따라 구독요금제 해지 및 차량 운행에 대한\n의무 보유/운행 기간 등의 제한이 있을 수 있으니 상세 요건을 확인하시기 바랍니다."
      },
      {
        q: "구독요금제 해지 및 회원탈퇴 시 잔여 교체 횟수는 어떻게 처리되나요?",
        a: "구독요금제 해지 및 회원탈퇴 시 미사용한 잔여 교체 횟수는 자동으로 소멸되며 환불되지 않습니다.\n또한, 재가입하더라도 소멸된 교체 횟수는 복구되지 않으므로 유의하시기 바랍니다."
      },
      {
        q: "배터리 교체 횟수를 당월 사용하지 못할 경우 이월되나요?",
        a: "배터리 구독 요금제의 교체 횟수는 해당 월에만 사용 가능한 소멸성으로, 미사용 횟수는 다음 달로 이월되지 않습니다."
      },
    ]
  },
  {
    category: "배터리팩 관련",
    questions: [
      {
        q: "배터리팩은 기본으로 제공되나요?",
        a: "신규 전기이륜차 출고 시 배터리팩이 함께 제공되지만, 제공되는 배터리팩은 당사의 자산입니다.\n따라서 구독요금제를 더 이상 이용하지 않으실 경우 배터리팩을 반드시 반환해야 하며,\n미반납 시 불이익이 발생할 수 있습니다."
      },
      {
        q: "구독요금제 해지 시 배터리팩 반납은 어떻게 진행하나요?",
        a: "배터리 구독요금제 해지 시 의무 반납 규정에 따라 지정된 이브이타고 협력센터에 배터리팩을 반납해주시면 됩니다.\n(회수 서비스 등 상세 절차는 고객 안내 채널 참조)"
      },
      {
        q: "배터리팩 반납 장소 안내",
        a: "지정 반납처: 서울시 송파구 송이로 158"
      },
    ]
  },
  {
    category: "기타 안내",
    questions: [
      {
        q: "어떤 보험을 가입하면 되나요?",
        a: "이륜차의 규격 및 용도에 맞는 보험에 가입하셔야 합니다.\n상세한 보험 가입 기준 및 가이드에 대해서는 관련 전문 상담 채널을 활용하시기 바랍니다."
      },
      {
        q: "구매 보조금 신청 및 이용 중 문제 해결은 어떻게 하나요?",
        a: "보조금 관련 정보 및 스테이션 이용 중 발생하는 다양한 상황에 대한 해결 방법은\n이브이타고 홈페이지 FAQ, 챗봇, 또는 앱 내 1:1 문의 등 공식 고객 소통 채널을 통해 원활한 지원을 받으실 수 있습니다."
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
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{answer}</p>
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
      <section className="hidden py-16 px-6 lg:px-8 bg-card">
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
