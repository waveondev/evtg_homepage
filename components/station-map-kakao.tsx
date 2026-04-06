"use client"

import { useEffect, useRef } from "react"

// 전역 Window 객체에 kakao 타입 선언
declare global {
    interface Window {
        kakao: any
    }
}

// 부모 컴포넌트(StationsPage)에서 전달받을 데이터 타입 정의
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

export function StationMapKakao({ stations, selectedStation, onSelectStation }: StationMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<any>(null)
    const markersRef = useRef<any[]>([])

    // 1. 카카오맵 스크립트 로드 및 지도 초기화
    useEffect(() => {
        // 환경 변수에서 키 가져오기
        const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY

        if (!kakaoAppKey) {
            console.error("카카오맵 API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.")
            return
        }

        // 이미 스크립트가 로드되어 있다면 지도만 초기화
        if (window.kakao && window.kakao.maps) {
            initMap()
            return
        }

        const script = document.createElement("script")
        // 환경 변수 적용
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&autoload=false`
        script.async = true
        document.head.appendChild(script)

        script.onload = () => {
            window.kakao.maps.load(() => {
                initMap()
            })
        }

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거 (선택적)
            // document.head.removeChild(script)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const initMap = () => {
        if (!mapContainer.current || !window.kakao) return

        // 💡 초기 중심 좌표 설정: 선택된 지점이 있으면 그 좌표를, 없으면 대한민국 중심 사용
        const initialLat = selectedStation ? selectedStation.lat : 36.5;
        const initialLng = selectedStation ? selectedStation.lng : 127.5;

        // 선택된 지점이 있으면 줌 레벨을 4(확대)로, 없으면 12(전국 단위)로 설정
        const initialLevel = selectedStation ? 7 : 12;

        const options = {
            center: new window.kakao.maps.LatLng(initialLat, initialLng),
            level: initialLevel,
        }

        // 지도 인스턴스 생성
        mapInstance.current = new window.kakao.maps.Map(mapContainer.current, options)

        // 초기 마커 그리기
        drawMarkers()
    }

    // 💡 2. 커스텀 마커 이미지 설정 (이미지 경로 및 크기 조절)
    const createMarkerImage = (isInfowindow: boolean) => {
        if (!window.kakao) return null;

        // 이미지 파일 경로 (public 폴더 기준)
        const imageSrc = isInfowindow
            ? '/images/icon_marker_bg.png' // 선택된 마커 이미지
            : '/images/icon_marker_bg.png';  // 일반 마커 이미지

        // 이미지 크기 (width, height) - 실제 이미지 크기에 맞게 조절하세요.
        const imageSize = isInfowindow
            ? new window.kakao.maps.Size(40, 48) // 선택된 마커를 조금 더 크게
            : new window.kakao.maps.Size(32, 38);

        // 마커 이미지 옵션 (마커의 좌표가 이미지의 어디에 위치할지 설정)
        const imageOption = {
            offset: isInfowindow
                ? new window.kakao.maps.Point(20, 48) // 이미지 중앙 하단이 마커 좌표가 되도록
                : new window.kakao.maps.Point(16, 38)
        };

        return new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    }

    // 3. 마커 그리기 로직 (커스텀 이미지 적용)
    const drawMarkers = () => {
        if (!mapInstance.current || !window.kakao) return

        // 기존 마커 초기화
        markersRef.current.forEach((marker) => marker.setMap(null))
        markersRef.current = []

        // 커스텀 마커 이미지 생성
        const defaultMarkerImage = createMarkerImage(false);
        const selectedMarkerImage = createMarkerImage(true);

        // 새로운 마커 생성
        stations.forEach((station) => {
            const markerPosition = new window.kakao.maps.LatLng(station.lat, station.lng)

            // 💡 현재 스테이션이 선택된 스테이션인지 확인하여 마커 이미지 설정
            const isSelected = selectedStation?.id === station.id;
            const markerImage = isSelected ? selectedMarkerImage : defaultMarkerImage;

            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImage, // 커스텀 이미지 적용
                zIndex: isSelected ? 10 : 1 // 선택된 마커를 가장 위에 표시
            })

            marker.setMap(mapInstance.current)
            markersRef.current.push(marker)

            // 마커 클릭 이벤트 설정
            window.kakao.maps.event.addListener(marker, "click", () => {
                onSelectStation(station)
            })
        })
    }

    // stations 데이터가 변경될 때마다 마커 다시 그리기
    useEffect(() => {
        if (mapInstance.current) {
            drawMarkers()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stations])

    // 💡 4. 선택된 스테이션이 바뀔 때 마커 이미지 업데이트 및 지도의 중심 좌표 이동
    useEffect(() => {
        if (mapInstance.current && window.kakao) {
            // 마커 이미지를 업데이트하기 위해 다시 그리기 (drawMarkers 함수 내부에서 선택 여부 판단)
            drawMarkers();

            if (selectedStation) {
                const moveLatLon = new window.kakao.maps.LatLng(selectedStation.lat, selectedStation.lng)
                mapInstance.current.panTo(moveLatLon)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStation])

    return <div ref={mapContainer} className="w-full h-full bg-muted/20" />
}
