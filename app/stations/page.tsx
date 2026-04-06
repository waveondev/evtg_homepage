"use client"

import {Navigation} from "@/components/navigation"
// import {StationMap} from "@/components/station-map"
import {StationMapKakao} from "@/components/station-map-kakao"
import {motion, AnimatePresence} from "framer-motion"
import {Clock, Battery, Search, ChevronLeft, ChevronRight} from "lucide-react"
import {useState} from "react"
import {Button} from "@/components/ui/button"

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
        batteries: 8,
        available: 4,
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
        batteries: 8,
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
        available: 6,
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
        batteries: 8,
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
        batteries: 8,
        available: 2,
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
        available: 6,
        hours: "24시간",
        phone: "031-234-5678",
    },
]

export default function StationsPage() {
    const [selectedRegion, setSelectedRegion] = useState("전체")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(stations[0])
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const filteredStations = stations.filter((station) => {
        const matchesRegion = selectedRegion === "전체" || station.region === selectedRegion
        const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            station.address.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesRegion && matchesSearch
    })

    // Framer Motion 애니메이션 설정 (사이드바와 버튼 동기화용)
    const springTransition = {type: "spring", damping: 25, stiffness: 200}
    const sidebarWidth = 380

    return (
        <main className="relative w-full h-screen overflow-hidden bg-background">
            {/* 네비게이션바 (지도 위에 플로팅되도록 z-index 설정) */}
            <div className="absolute top-0 left-0 w-full z-40">
                <Navigation/>
            </div>

            {/* 카카오 지도 영역 - 화면 전체(100%)를 덮음 */}
            <div className="absolute inset-0 z-0">
                <StationMapKakao
                    stations={filteredStations}
                    selectedStation={selectedStation}
                    onSelectStation={setSelectedStation}
                />
            </div>

            {/* 좌측 사이드바 패널 */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.div
                        key="station-sidebar" // exit 애니메이션을 위한 필수 key
                        initial={{x: "-100%"}}
                        animate={{x: 0}}
                        exit={{x: "-100%"}}
                        //transition={springTransition}
                        className="absolute left-0 top-0 bottom-0 z-30 w-full max-w-[380px] pt-16 bg-card/95 backdrop-blur-md border-r border-border shadow-2xl flex flex-col"
                    >
                        {/* 검색 & 필터 헤더 */}
                        <div className="p-6 space-y-4 border-b border-border shrink-0">
                            <h2 className="text-xl font-bold text-foreground">스테이션 찾기</h2>
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                                <input
                                    type="text"
                                    placeholder="지점명 또는 주소 검색"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                                {regions.map((region) => (
                                    <button
                                        key={region}
                                        onClick={() => setSelectedRegion(region)}
                                        className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                                            selectedRegion === region
                                                ? "bg-primary text-primary-foreground font-medium"
                                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                        }`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 스테이션 리스트 */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {filteredStations.map((station) => (
                                <div
                                    key={station.id}
                                    onClick={() => setSelectedStation(station)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                        selectedStation?.id === station.id
                                            ? "bg-primary/5 border-primary shadow-sm"
                                            : "bg-background border-border hover:border-primary/30"
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-foreground">{station.name}</h3>
                                        <span
                                            className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {station.region}
                    </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                                        {station.address}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-xs font-medium text-primary">
                                            <Battery className="w-3.5 h-3.5"/>
                                            <span>{station.available}개 가능</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="w-3.5 h-3.5"/>
                                            <span>{station.hours}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 사이드바 토글 버튼 (motion.button으로 사이드바와 완벽하게 동기화) */}
            <motion.button
                initial={false}
                animate={{x: isSidebarOpen ? sidebarWidth : 0}}
                // transition={springTransition}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-16 bg-card border border-border border-l-0 rounded-r-xl shadow-md hover:text-primary transition-colors focus:outline-none"
            >
                {isSidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
            </motion.button>

            {/* 선택된 스테이션 상세 정보 카드 (지도 하단 중앙 플로팅) */}
            <AnimatePresence>
                {selectedStation && (
                    <motion.div
                        key="detail-card"
                        initial={{y: 50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: 50, opacity: 0}}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md p-5 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-2xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">{selectedStation.name}</h3>
                                <p className="text-sm text-muted-foreground">{selectedStation.address}</p>
                            </div>
                            <Button size="sm" className="rounded-full px-5">길찾기</Button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 rounded-xl bg-muted/50 text-center">
                                <p className="text-[10px] text-muted-foreground mb-1 uppercase">Batteries</p>
                                <p className="font-bold text-primary">{selectedStation.available}/{selectedStation.batteries}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-muted/50 text-center">
                                <p className="text-[10px] text-muted-foreground mb-1 uppercase">Hours</p>
                                <p className="font-bold text-foreground text-[11px]">{selectedStation.hours}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-muted/50 text-center">
                                <p className="text-[10px] text-muted-foreground mb-1 uppercase">Contact</p>
                                <p className="font-bold text-foreground text-[11px] truncate">{selectedStation.phone}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
