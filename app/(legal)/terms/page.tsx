export default function TermsPage() {
    return (
        // 전체 페이지의 높이를 가변적으로 잡기 위해 min-h-screen 추가
        <article className="min-h-screen w-full bg-background">
            <div className="privacy-container p-6 md:p-10 bg-background max-w-4xl mx-auto">
                {/* 제목 섹션 */}
                <h1 className="text-2xl font-bold text-foreground mb-6 border-b pb-4">
                    위치기반서비스 이용약관
                </h1>

                {/* 제1조 목적 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">제1조 (목적)</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        본 약관은 회원(이하 &ldquo;회원&rdquo;)이 <span className="font-bold text-foreground">주식회사 이브이타고</span>(이하 &ldquo;회사&rdquo;)가 제공하는 &ldquo;이브이타고(EVTAGO) 스테이션 위치 안내 및 전기이륜차 관제 서비스&rdquo;(이하 &ldquo;서비스&rdquo;)를 이용함에 있어 회사와 회원의 권리·의무 및 기타 필요한 사항을 규정함을 목적으로 합니다[cite: 589].
                    </p>
                </section>

                {/* 제4조 서비스의 내용 - 테이블 구조 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">제2조 (서비스의 내용 및 보유기간)</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                        회사가 제공하는 위치기반서비스 및 개인위치정보의 보유목적과 기간은 아래와 같습니다[cite: 598].
                    </p>
                    <div className="overflow-x-auto border rounded-lg shadow-sm">
                        <table className="min-w-full divide-y divide-muted">
                            <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-bold text-foreground">서비스 명</th>
                                <th className="px-4 py-2 text-left text-sm font-bold text-foreground">내용 및 목적</th>
                                <th className="px-4 py-2 text-left text-sm font-bold text-foreground">보유 기간</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-muted text-sm text-muted-foreground">
                            <tr>
                                <td className="px-4 py-3 font-semibold text-foreground">스테이션 위치</td>
                                <td className="px-4 py-3">이용자의 현재 위치 기준 가까운 배터리 교환 스테이션 안내 [cite: 599]</td>
                                <td className="px-4 py-3">서비스 제공 후 즉시 파기 (단, 이용사실 확인자료 제외) [cite: 599]</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-semibold text-foreground">전기이륜차 관제</td>
                                <td className="px-4 py-3">전기이륜차 GPS 기반 실시간 위치확인 및 운행 경로 리포트 제공 [cite: 599]</td>
                                <td className="px-4 py-3">수집일로부터 6개월 보관 (또는 회원 탈퇴 시까지) [cite: 599]</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        ※ 회사는 「위치정보의 보호 및 이용 등에 관한 법률」 제16조 제2항에 따라 위치정보 이용·제공사실 확인자료를 자동 기록·보존하며, 해당 자료는 6개월간 보관합니다.
                    </p>
                </section>

                {/* 제5조 이용요금 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">제3조 (서비스 이용요금)</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        위치기반서비스는 기본적으로 <span className="font-bold text-foreground">무료</span>입니다. 단, 이브이타고 서비스 자체의 이용약관에 따라 별도의 유료 구독료나 대여료가 발생할 수 있습니다[cite: 603].
                    </p>
                </section>

                {/* 제8조 이용자의 권리 */}
                <section className="mb-12">
                    <h2 className="text-xl font-semibold text-foreground mb-4">제4조 (개인위치정보주체의 권리)</h2>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                        <li>회원은 회사에 대하여 언제든지 동의의 전부 또는 일부를 <span className="font-bold text-foreground">철회</span>할 수 있습니다[cite: 611].</li>
                        <li>회원은 개인위치정보의 이용 또는 제공의 <span className="font-bold text-foreground">일시적인 중지</span>를 요구할 수 있습니다[cite: 612].</li>
                        <li>회원은 본인에 대한 위치정보 이용·제공사실 확인자료 및 제3자 제공 내역에 대한 <span className="font-bold text-foreground">열람 또는 고지</span>를 요구할 수 있으며, 오류가 있는 경우 <span className="font-bold text-foreground">정정</span>을 요구할 수 있습니다[cite: 613].</li>
                    </ul>
                </section>

                {/* 제9조 법정대리인 등의 보호 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">제5조 (법정대리인 및 8세 이하 아동 등의 보호)</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        만 14세 미만의 아동의 경우 법정대리인의 동의를 얻어야 하며 [cite: 615], 8세 이하의 아동 등의 생명 또는 신체보호를 위하여 보호의무자가 서면으로 동의하는 경우 본인의 동의가 있는 것으로 간주합니다[cite: 616].
                    </p>
                </section>

                {/* 제11조 손해배상 및 분쟁 조정 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">제6조 (손해배상 및 분쟁 조정)</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        회사가 관련 법령을 위반하여 회원에게 손해가 발생한 경우 고의 또는 과실이 없음을 입증하지 못하는 한 손해배상 책임을 집니다[cite: 620]. 분쟁 발생 시 방송통신위원회 재정 또는 개인정보분쟁조정위원회에 조 조정을 신청할 수 있습니다[cite: 621].
                    </p>
                </section>

                {/* 제12조 회사의 연락처 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">제7조 (회사의 연락처)</h2>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><span className="font-bold text-foreground">상 호 :</span> 주식회사 이브이타고</li>
                        <li><span className="font-bold text-foreground">대 표 자 :</span> 전 병 용</li>
                        <li><span className="font-bold text-foreground">주 소 :</span> 대구광역시 동구 동구대로 465, 대구스케일업허브 308호</li>
                        <li><span className="font-bold text-foreground">대표전화 :</span> 070-4139-5201</li>
                    </ul>
                </section>

                {/* 부칙 */}
                <footer className="pt-8 border-t border-muted text-sm text-muted-foreground">
                    <p className="font-bold text-foreground mb-2">부 칙</p>
                    <p>제1조 (시행일) 이 약관은 2026년 4월 8일부터 시행합니다.</p>
                    <p className="mt-2">제2조 (위치정보관리책임자) 성명 : 박 현 우 (070-4139-5201)</p>
                </footer>
            </div>
        </article>
    );
}
