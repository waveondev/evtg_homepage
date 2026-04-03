"use client"

import Link from "next/link"
import { Leaf } from "lucide-react"

const footerLinks = {
  services: [
    // { href: "/vehicles", label: "전기이륜차" },
    // { href: "/battery-swap", label: "배터리 스왑" },
    { href: "/stations", label: "충전 스테이션" },
    // { href: "/business", label: "기업 제휴" },
  ],
  company: [
    { href: "/about", label: "회사 소개" },
    { href: "/esg", label: "ESG 경영" },
    // { href: "/careers", label: "채용" },
    // { href: "/news", label: "뉴스룸" },
  ],
  support: [
    { href: "/faq", label: "자주 묻는 질문" },
    { href: "/contact", label: "고객센터" },
    // { href: "/download", label: "앱 다운로드" },
    // { href: "/guide", label: "이용 가이드" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Main Footer */}
      <div className="max-w-[980px] mx-auto px-6 py-5">
        {/* Link Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3">서비스</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3">회사</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3">고객 지원</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Bottom Section */}
      <div className="max-w-[980px] mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                이브이타고
              </span>
            </Link>
            <span className="text-xs text-muted-foreground">
              Copyright © {new Date().getFullYear()} 이브이타고 Inc. All rights reserved.
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              개인정보처리방침
            </Link>
            <span className="text-muted-foreground/50">|</span>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              이용약관
            </Link>
            {/*<span className="text-muted-foreground/50">|</span>*/}
            {/*<span className="text-xs text-muted-foreground">*/}
            {/*  고객센터 1588-0000*/}
            {/*</span>*/}
          </div>
        </div>
      </div>
    </footer>
  )
}
