"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { href: "/", label: "홈" },
  // { href: "/vehicles", label: "전기이륜차" },
  // { href: "/battery-swap", label: "배터리 스왑" },
  // { href: "/stations", label: "스테이션" },
  { href: "/about", label: "회사소개" },
  { href: "/esg", label: "ESG" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            {/*<Link href="/" className="flex items-center gap-2.5">*/}
            {/*  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">*/}
            {/*    <Leaf className="w-5 h-5 text-primary-foreground" />*/}
            {/*  </div>*/}
            {/*  <span className="text-lg font-bold tracking-tight text-foreground">*/}
            {/*    이브이타고1*/}
            {/*  </span>*/}
            {/*</Link>*/}

            <Link href="/" className="flex items-center gap-2.5">
              {/*<div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">*/}
              {/*  <Leaf className="w-5 h-5 text-primary-foreground" />*/}
              {/*</div>*/}
              {/* 아래 부분을 수정했습니다. */}
              <Image
                  src="/images/evtago_logo.png" // 실제 로고 이미지 파일 경로를 입력하세요 (예: /public/logo.png).
                  alt="이브이타고 로고" // 접근성을 위한 대체 텍스트
                  width={128} // 로고의 너비 (픽셀 단위)를 입력하세요.
                  height={25} // 로고의 높이 (픽셀 단위)를 입력하세요.
                  priority // 페이지 로드 시 우선적으로 로딩 (선택 사항)
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                asChild
                size="sm"
                className="hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-5"
              >
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground rounded-full hover:bg-secondary transition-colors"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-all duration-300 lg:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            size="lg"
            className="mt-6 bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
          >
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              문의하기
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
