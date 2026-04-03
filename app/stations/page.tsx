"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StationMap } from "@/components/station-map"
import { motion } from "framer-motion"
import { MapPin, Clock, Battery, Phone, Search, Filter } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const regions = ["전체", "서울", "경기", "인천", "부산", "대구", "대전", "광주"]

// Sample station data
const stations = [
  {
    id: 1,
    name: "강남역점",
    address: "서울특별시 강남구 강남대로 396",
    region: "서울",
    lat: 37.498,
    lng: 127.028,
    batteries: 8,
    available: 6,
    hours: "24시간",
    phone: "02-1234-5678",
  },
  {
    id: 2,
    name: "홍대입구역점",
    address: "서울특별시 마포구 양화로 188",
    region: "서울",
    lat: 37.557,
    lng: 126.925,
    batteries: 6,
    available: 4,
    hours: "06:00 - 24:00",
    phone: "02-2345-6789",
  },
  {
    id: 3,
    name: "판교테크노밸리점",
    address: "경기도 성남시 분당구 판교로 256",
    region: "경기",
    lat: 37.395,
    lng: 127.111,
    batteries: 10,
    available: 8,
    hours: "24시간",
    phone: "031-123-4567",
  },
  {
    id: 4,
    name: "부산서면점",
    address: "부산광역시 부산진구 서면로 68",
    region: "부산",
    lat: 35.158,
    lng: 129.060,
    batteries: 8,
    available: 5,
    hours: "24시간",
    phone: "051-234-5678",
  },
  {
    id: 5,
    name: "대구동성로점",
    address: "대구광역시 중구 동성로 123",
    region: "대구",
    lat: 35.868,
    lng: 128.595,
    batteries: 6,
    available: 3,
    hours: "07:00 - 23:00",
    phone: "053-345-6789",
  },
  {
    id: 6,
    name: "인천송도점",
    address: "인천광역시 연수구 송도과학로 123",
    region: "인천",
    lat: 37.389,
    lng: 126.640,
    batteries: 8,
    available: 7,
    hours: "24시간",
    phone: "032-456-7890",
  },
  {
    id: 7,
    name: "대전둔산점",
    address: "대전광역시 서구 둔산로 100",
    region: "대전",
    lat: 36.351,
    lng: 127.378,
    batteries: 6,
    available: 4,
    hours: "06:00 - 24:00",
    phone: "042-567-8901",
  },
  {
    id: 8,
    name: "광주충장로점",
    address: "광주광역시 동구 충장로 50",
    region: "광주",
    lat: 35.149,
    lng: 126.917,
    batteries: 6,
    available: 5,
    hours: "24시간",
    phone: "062-678-9012",
  },
  {
    id: 9,
    name: "잠실역점",
    address: "서울특별시 송파구 올림픽로 300",
    region: "서울",
    lat: 37.513,
    lng: 127.100,
    batteries: 8,
    available: 6,
    hours: "24시간",
    phone: "02-3456-7890",
  },
  {
    id: 10,
    name: "수원역점",
    address: "경기도 수원시 팔달구 덕영대로 924",
    region: "경기",
    lat: 37.266,
    lng: 127.000,
    batteries: 8,
    available: 5,
    hours: "24시간",
    phone: "031-234-5678",
  },
]

export default function StationsPage() {
  const [selectedRegion, setSelectedRegion] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(null)

  const filteredStations = stations.filter((station) => {
    const matchesRegion = selectedRegion === "전체" || station.region === selectedRegion
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          station.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesSearch
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-10 lg:pt-40 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
              Charging Stations
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              충전 스테이션
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              전국 500개 이상의 스테이션에서 
              언제든지 배터리를 교환할 수 있습니다.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
              <Image
                src="/images/stations-hero.jpg"
                alt="이브이타고 충전 스테이션"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-10"
          >
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground mt-1">스테이션</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">운영</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="text-3xl font-bold text-primary">30초</div>
              <div className="text-sm text-muted-foreground mt-1">교환 시간</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar - Station List */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              {/* Search & Filter */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="스테이션 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                        selectedRegion === region
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* Station List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredStations.map((station) => (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedStation?.id === station.id
                        ? "bg-primary/10 border-primary"
                        : "bg-card border-border hover:border-primary/30"
                    }`}
                    onClick={() => setSelectedStation(station)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">
                        {station.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {station.region}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {station.address}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-primary">
                        <Battery className="w-4 h-4" />
                        <span>{station.available}/{station.batteries}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{station.hours}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredStations.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="sticky top-24">
                <StationMap 
                  stations={filteredStations} 
                  selectedStation={selectedStation}
                  onSelectStation={setSelectedStation}
                />

                {/* Selected Station Detail */}
                {selectedStation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 rounded-2xl bg-card border border-border"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {selectedStation.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedStation.address}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        길찾기
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Battery className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">배터리</span>
                        </div>
                        <span className="text-lg font-semibold text-foreground">
                          {selectedStation.available}/{selectedStation.batteries}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">운영시간</span>
                        </div>
                        <span className="text-lg font-semibold text-foreground">
                          {selectedStation.hours}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">연락처</span>
                        </div>
                        <span className="text-lg font-semibold text-foreground">
                          {selectedStation.phone}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
