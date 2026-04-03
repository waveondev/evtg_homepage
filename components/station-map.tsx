"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, ZoomIn, ZoomOut, Locate } from "lucide-react"

interface Station {
  id: number
  name: string
  address: string
  region: string
  lat: number
  lng: number
  batteries: number
  available: number
  hours: string
  phone: string
}

interface StationMapProps {
  stations: Station[]
  selectedStation: Station | null
  onSelectStation: (station: Station) => void
}

// Korea map boundaries
const KOREA_BOUNDS = {
  minLat: 33.0,
  maxLat: 38.6,
  minLng: 124.5,
  maxLng: 132.0,
}

export function StationMap({ stations, selectedStation, onSelectStation }: StationMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 100, height: 100 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Convert lat/lng to SVG coordinates
  const latLngToSvg = (lat: number, lng: number) => {
    const x = ((lng - KOREA_BOUNDS.minLng) / (KOREA_BOUNDS.maxLng - KOREA_BOUNDS.minLng)) * 100
    const y = ((KOREA_BOUNDS.maxLat - lat) / (KOREA_BOUNDS.maxLat - KOREA_BOUNDS.minLat)) * 100
    return { x, y }
  }

  const handleZoomIn = () => {
    if (zoom < 3) {
      const newZoom = zoom * 1.5
      setZoom(newZoom)
      const centerX = viewBox.x + viewBox.width / 2
      const centerY = viewBox.y + viewBox.height / 2
      const newWidth = 100 / newZoom
      const newHeight = 100 / newZoom
      setViewBox({
        x: centerX - newWidth / 2,
        y: centerY - newHeight / 2,
        width: newWidth,
        height: newHeight,
      })
    }
  }

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      const newZoom = zoom / 1.5
      setZoom(newZoom)
      const centerX = viewBox.x + viewBox.width / 2
      const centerY = viewBox.y + viewBox.height / 2
      const newWidth = 100 / newZoom
      const newHeight = 100 / newZoom
      setViewBox({
        x: Math.max(0, Math.min(100 - newWidth, centerX - newWidth / 2)),
        y: Math.max(0, Math.min(100 - newHeight, centerY - newHeight / 2)),
        width: newWidth,
        height: newHeight,
      })
    }
  }

  const handleReset = () => {
    setZoom(1)
    setViewBox({ x: 0, y: 0, width: 100, height: 100 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !svgRef.current) return
    
    const rect = svgRef.current.getBoundingClientRect()
    const dx = ((e.clientX - dragStart.x) / rect.width) * viewBox.width
    const dy = ((e.clientY - dragStart.y) / rect.height) * viewBox.height
    
    setViewBox(prev => ({
      ...prev,
      x: Math.max(0, Math.min(100 - prev.width, prev.x - dx)),
      y: Math.max(0, Math.min(100 - prev.height, prev.y - dy)),
    }))
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Focus on selected station
  useEffect(() => {
    if (selectedStation) {
      const { x, y } = latLngToSvg(selectedStation.lat, selectedStation.lng)
      const newWidth = 100 / zoom
      const newHeight = 100 / zoom
      setViewBox({
        x: Math.max(0, Math.min(100 - newWidth, x - newWidth / 2)),
        y: Math.max(0, Math.min(100 - newHeight, y - newHeight / 2)),
        width: newWidth,
        height: newHeight,
      })
    }
  }, [selectedStation, zoom])

  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-video rounded-2xl bg-card border border-border overflow-hidden">
      {/* SVG Map */}
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" fill="var(--background)" />
        
        {/* Korea outline - simplified SVG path */}
        <path
          d="M45 15 L55 12 L62 18 L65 28 L70 35 L68 42 L72 50 L70 58 L65 65 L60 75 L55 82 L50 88 L45 85 L40 78 L38 70 L35 62 L32 55 L30 48 L32 40 L35 32 L38 25 L42 18 Z"
          fill="var(--secondary)"
          stroke="var(--border)"
          strokeWidth="0.5"
        />

        {/* Major cities - reference points */}
        <circle cx="48" cy="28" r="0.8" fill="var(--muted-foreground)" opacity="0.3" />
        <circle cx="65" cy="72" r="0.6" fill="var(--muted-foreground)" opacity="0.3" />
        <circle cx="60" cy="58" r="0.5" fill="var(--muted-foreground)" opacity="0.3" />
        
        {/* Station markers */}
        {stations.map((station) => {
          const { x, y } = latLngToSvg(station.lat, station.lng)
          const isSelected = selectedStation?.id === station.id
          const markerSize = isSelected ? 2.5 : 2
          
          return (
            <g
              key={station.id}
              onClick={() => onSelectStation(station)}
              className="cursor-pointer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {/* Pulse animation for selected */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r={markerSize * 2}
                  fill="var(--primary)"
                  opacity="0.2"
                  className="animate-ping"
                />
              )}
              
              {/* Outer glow */}
              <circle
                cx={x}
                cy={y}
                r={markerSize + 0.5}
                fill={isSelected ? "var(--primary)" : "var(--primary)"}
                opacity={isSelected ? 0.3 : 0.2}
              />
              
              {/* Main marker */}
              <circle
                cx={x}
                cy={y}
                r={markerSize}
                fill={isSelected ? "var(--primary)" : "var(--primary)"}
                stroke="var(--background)"
                strokeWidth="0.3"
              />
              
              {/* Inner dot */}
              <circle
                cx={x}
                cy={y}
                r={markerSize * 0.4}
                fill="var(--background)"
              />
            </g>
          )
        })}
      </svg>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          aria-label="확대"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          aria-label="축소"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          aria-label="초기화"
        >
          <Locate className="w-5 h-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg bg-card/90 backdrop-blur-sm border border-border">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">충전 스테이션</span>
          <span className="text-foreground font-medium ml-2">{stations.length}개</span>
        </div>
      </div>

      {/* No stations message */}
      {stations.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">해당 지역에 스테이션이 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  )
}
