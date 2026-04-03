import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Smartphone, MapPin, Battery, Bell, QrCode } from "lucide-react"
import Image from "next/image"

const features = [
  { icon: MapPin, title: "스테이션 찾기", desc: "현재 위치 기반으로 가장 가까운 스테이션을 찾아보세요" },
  { icon: Battery, title: "배터리 상태", desc: "실시간으로 배터리 잔량과 주행 가능 거리를 확인하세요" },
  { icon: Bell, title: "스마트 알림", desc: "배터리 부족, 정비 알림 등 중요한 정보를 받아보세요" },
  { icon: QrCode, title: "간편 교환", desc: "QR 스캔 한 번으로 30초 만에 배터리를 교환하세요" },
]

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                Mobile App
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                이브이타고
                <br />
                앱 다운로드
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                스테이션 찾기, 배터리 교환, 주행 기록까지
                모든 기능을 앱 하나로 관리하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-foreground text-background rounded-xl px-8 h-14">
                  <Smartphone className="mr-2 h-5 w-5" />
                  App Store
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl px-8 h-14">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-[3rem] overflow-hidden bg-gradient-to-br from-secondary to-muted border-8 border-foreground/10">
                <Image
                  src="/images/app-screenshot.jpg"
                  alt="이브이타고 앱 스크린샷"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            주요 기능
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-background rounded-2xl p-6 border border-border text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
