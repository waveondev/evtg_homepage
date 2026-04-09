export default function PrivacyPage() {
    return (
        <article>
            <h1 className="text-4xl font-bold text-foreground mb-8">개인정보처리방침</h1>
            <p className="text-muted-foreground mb-8">공고일자: 2026년 4월 9일<br/>시행일자: 2026년 4월 9일</p>

            <section className="mb-8">
                <p className="text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">주식회사 이브이타고</span>
                    (이하 &ldquo;회사&rdquo;)는 이용자의 개인정보를 소중히 다루며,
                    개인정보 보호법, 위치정보의 보호 및 이용 등에 관한 법률 등 관련 법령을 준수합니다.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 1 조 (개인정보의 수집 및 이용목적)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회사는 개인정보를 회원관리, 서비스 제공 및 향상, 안전한 이용 환경 구축 등 다음의 목적을 위하여 수집하고 처리합니다.
                    또한 위치기반서비스를 제공하기 위하여 ‘위치기반서비스 이용약관’에서 정한 목적 범위 내에서 필요한 최소한의 기간 동안 개인위치정보를 수집, 보유, 이용합니다.
                </p>
                <br/>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li><span className="font-bold text-foreground">회원 관리 : </span> 회원 가입 및 탈퇴 의사 확인, 본인 확인, 약관 위반에 따른
                        이용 제한 등
                    </li>
                    <li><span className="font-bold text-foreground">서비스 제공 : 이브이타고(EVTAGO) </span>서비스 운영, 전기이륜차 및 배터리 상태
                        관제, 스테이션 안내
                    </li>
                    <li><span className="font-bold text-foreground">결제 및 정산 : </span>유료 서비스 이용요금 결제 및 환불, 미납금 회수 등</li>
                    <li><span className="font-bold text-foreground">마케팅 및 홍보 :</span>이벤트 정보 제공, 광고성 정보 전송 (동의 시)</li>
                    <li><span className="font-bold text-foreground">안전 및 사고 대응 : </span>전기이륜차 위치 조회를 통한 사고 대응 및 도난 방지
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 2 조 (수집하는 개인정보의 항목)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회사는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다.
                </p>
                <br/>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <span className="font-bold text-foreground">1. 회원가입 시 : </span> 성명, 생년월일, 성별, 휴대전화번호, 이메일주소,
                    CI/DI(본인인증정보)<br/>
                    <span className="font-bold text-foreground">2. 모빌리티 이용/계약 시 : </span> 주소, 면허번호(면허 확인용), 기기(이륜차) 식별
                    정보, 배터리 정보, 전기이륜차 실시간 위치 정보<br/>
                    <span className="font-bold text-foreground">3. 결제 시 : <br/></span>
                    <span className="ml-4"> {/* ml-4로 적절한 간격을 띕니다 */}
                        ◎ 신용카드 : 카드번호(일부), 카드사명</span><br/>
                    <span className="ml-4"> {/* ml-4로 적절한 간격을 띕니다 */}
                        ◎ 계좌이체 : 예금주명, 계좌번호, 은행명</span><br/>
                    <span className="font-bold text-foreground">4. 자동 수집 항목 : </span> 단말기 정보(OS, 모델명), IP주소, 쿠키, 방문 일시,
                    서비스 이용 기록, 부정이용 기록<br/>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 3 조 (개인정보의 보유 및 이용 기간)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    ① 회사는 원칙적으로 회원이 자격을 유지하고 있는 동안 개인정보를 보유하며, 탈퇴 시 지체 없이 파기합니다.<br />
                    ② 단, 관련 법령 및 내부 방침에 따라 일정 기간 보존이 필요한 경우 다음과 같이 보관합니다.
                </p>
                <br />
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li><span className="font-bold text-foreground">전자상거래법 : </span> 대금결제 및 재화 공급 기록(5년), 소비자 불만 및 분쟁 처리(3년)</li>
                    <li><span className="font-bold text-foreground">통신비밀보호법 : </span>서비스 방문 기록(3개월)</li>
                    <li><span className="font-bold text-foreground">위치정보보호법 : </span>위치정보 이용·제공사실 확인자료(6개월)</li>
                    <li><span className="font-bold text-foreground">내부 방침 :</span>부정 이용 방지를 위한 기록(3년)</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 4 조 (동의 거부권 및 불이익)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회원은 개인정보 수집 및 이용에 동의를 거부할 권리가 있습니다. 단, 필수 항목에 대한 동의 거부 시 이브이타고 서비스 이용이 제한될 수 있습니다.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 5 조 (개인정보의 파기 절차 및 방법)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    ① 목적 달성 시 전자적 파일은 복원이 불가능한 기술적 방법으로 삭제하며, 종이 문서는 분쇄하거나 소각합니다.<br/>
                    ② 위치정보의 경우, 일회성 서비스는 즉시 파기하며 관제 목적의 정보는 법령에 따른 보존 기간 후 파기합니다.<br/>

                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 6 조 (이용자의 권리와 행사방법)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회원 및 법정대리인은 언제든지 본인의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 회사는 이에 대해 지체 없이 조치합니다.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 7 조 (광고 식별자 및 맞춤형 광고)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회사는 이용자에게 최적화된 서비스를 제공하기 위해 ADID/IDFA(광고 식별자)를 수집할 수 있으며, 이용자는 모바일 기기 설정을 통해 이를 거부할 수 있습니다.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 8 조 (개인정보의 제3자 제공)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회사는 이용자의 사전 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만, 결제 처리를 위한 금융사 제공이나 법령에 따른 수사기관의 요청이 있는 경우는 예외로 합니다.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 9 조 (개인정보처리의 위탁)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회사는 원활한 서비스 제공을 위해 다음과 같이 업무를 위탁하고 있습니다.
                </p>
                <br/>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li><span className="font-bold text-foreground">수탁업체 : </span> AWS, 알리고, 토스 페이먼츠
                    </li>
                    <li><span className="font-bold text-foreground">위탁업무  : </span>데이터 보관 및 시스템 운영, 알림톡 발송, PG 결제 대응
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 10 조 (개인정보의 안전성 확보 조치)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회사는 개인정보를 암호화하여 저장·통신하며, 해킹 방지를 위한 보안 솔루션 적용, 취급자 최소화 및 교육 등 관리적·기술적 대책을 강구하고 있습니다.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 11 조 (8세 이하의 아동 등의 보호의무자 권리)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    회사는 8세 이하 아동 등의 생명 또는 신체 보호를 위하여 보호의무자가 개인위치정보 이용에 서면 동의하는 경우 본인의 동의가 있는 것으로 간주하며, 보호의무자는 모든 이용자의 권리를 행사할 수 있습니다.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">제 12 조 (고지 의무)</h2>
                <p className="text-muted-foreground leading-relaxed">
                    본 방침의 내용 추가, 삭제 및 수정이 있을 시에는 시행 최소 7일 전(중요 변경 시 30일 전)에 공지사항을 통해 고지합니다.
                </p>
            </section>

        </article>
    )
}
