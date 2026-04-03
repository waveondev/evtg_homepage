import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Smartphone, MapPin, QrCode, Battery, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    step: "01",
    icon: Smartphone,
    title: "앱 다운로드",
    description: "App Store 또는 Google Play에서 이브이타고 앱을 다운로드하고 회원가입을 완료하세요."
  },
  {
    step: "02",
    icon: MapPin,
    title: "스테이션 찾기",
    description: "앱에서 현재 위치 기반으로 가장 가까운 배터리 스왑 스테이션을 찾으세요."
  },
  {
    step: "03",
    icon: QrCode,
    title: "QR 스캔",
    description: "스테이션에 도착하면 앱으로 QR 코드를 스캔하여 배터리 교환을 시작하세요."
  },
  {
    step: "04",
    icon: Battery,
    title: "배터리 교환",
    description: "방전된 배터리를 반납하고 완충된 새 배터리를 수령하세요. 단 30초면 완료!"
  },
]

const tips = [
  "배터리 잔량이 20% 이하일 때 교환하면 효율적입니다",
  "앱에서 스테이션별 대기 배터리 현황을 미리 확인하세요",
  "정기 구독권을 이용하면 더 저렴하게 서비스를 이용할 수 있습니다",
  "차량 이상 시 앱 내 긴급 출동 서비스를 이용하세요",
]

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            User Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            이용 가이드
          </h1>
          <p className="text-xl text-muted-foreground">
            이브이타고 서비스를 쉽고 빠르게 이용하는 방법을 알려드립니다
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            배터리 스왑 이용 방법
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="relative bg-card rounded-3xl p-8 border border-border">
                <span className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {item.step}
                </span>
                <div className="pt-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            영상으로 보기
          </h2>
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
            <Image
              src="/images/guide-video-thumbnail.jpg"
              alt="이용 가이드 영상"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-l-[16px] border-l-primary-foreground border-y-[10px] border-y-transparent ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            알아두면 좋은 팁
          </h2>
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-accent rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
