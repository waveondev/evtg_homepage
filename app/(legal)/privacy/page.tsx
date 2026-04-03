export default function PrivacyPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-foreground mb-8">개인정보처리방침</h1>
      <p className="text-muted-foreground mb-8">최종 업데이트: 2024년 1월 1일</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">1. 개인정보의 수집 및 이용 목적</h2>
        <p className="text-muted-foreground leading-relaxed">
          이브이타고(이하 &ldquo;회사&rdquo;)는 다음의 목적을 위하여 개인정보를 수집 및 이용합니다.
          수집한 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
          별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">2. 수집하는 개인정보 항목</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>필수항목: 이름, 연락처, 이메일 주소</li>
          <li>선택항목: 회사명, 직책</li>
          <li>자동 수집 항목: 접속 로그, 쿠키, 접속 IP 정보</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">3. 개인정보의 보유 및 이용기간</h2>
        <p className="text-muted-foreground leading-relaxed">
          회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 
          개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">4. 개인정보의 파기</h2>
        <p className="text-muted-foreground leading-relaxed">
          회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
          지체 없이 해당 개인정보를 파기합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">5. 문의처</h2>
        <p className="text-muted-foreground leading-relaxed">
          개인정보 관련 문의: privacy@greenride.kr<br />
          고객센터: 1588-0000
        </p>
      </section>
    </article>
  )
}
