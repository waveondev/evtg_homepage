export default function TermsPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-foreground mb-8">이용약관</h1>
      <p className="text-muted-foreground mb-8">최종 업데이트: 2024년 1월 1일</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">제1조 (목적)</h2>
        <p className="text-muted-foreground leading-relaxed">
          본 약관은 이브이타고(이하 &ldquo;회사&rdquo;)가 제공하는 전기이륜차 및 배터리 스왑 서비스의 
          이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">제2조 (정의)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>&ldquo;서비스&rdquo;란 회사가 제공하는 전기이륜차 판매, 배터리 스왑 및 관련 부가서비스를 말합니다.</li>
          <li>&ldquo;이용자&rdquo;란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
          <li>&ldquo;스테이션&rdquo;이란 배터리 교환이 가능한 회사의 충전 시설을 말합니다.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">제3조 (서비스의 제공)</h2>
        <p className="text-muted-foreground leading-relaxed">
          회사는 다음과 같은 서비스를 제공합니다:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
          <li>전기이륜차 판매 및 AS</li>
          <li>배터리 스왑 서비스</li>
          <li>충전 스테이션 운영</li>
          <li>모바일 앱 서비스</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">제4조 (이용자의 의무)</h2>
        <p className="text-muted-foreground leading-relaxed">
          이용자는 서비스 이용 시 관련 법령, 본 약관의 규정, 이용안내 및 주의사항 등 
          회사가 통지하는 사항을 준수하여야 합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">제5조 (문의처)</h2>
        <p className="text-muted-foreground leading-relaxed">
          서비스 이용 관련 문의: support@greenride.kr<br />
          고객센터: 1588-0000
        </p>
      </section>
    </article>
  )
}
