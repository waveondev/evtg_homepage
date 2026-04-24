'use client';

import React from 'react';

export default function KakaoChatButton() {
    const handleChat = () => {
        if (window.Kakao && window.Kakao.Channel) {
            window.Kakao.Channel.chat({
                channelPublicId: '_mDixhX', // 👈 카카오톡 채널 ID (예: _xxxx) 입력
            });
        } else {
            // SDK가 로드되지 않았을 경우를 대비한 기본 링크 연결
            window.open('https://pf.kakao.com/_mDixhX/chat', '_blank');
        }
    };

    return (
        <div
            onClick={handleChat}
            style={{
                position: 'fixed',
                bottom: '30px',     // 하단에서 30px 띄움
                right: '30px',      // 우측에서 30px 띄움
                zIndex: 9999,       // 다른 요소들보다 항상 위에 표시
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                backgroundColor: '#FEE500', // 카카오 노란색
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            {/* 카카오톡 아이콘 (SVG 직접 삽입) */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 3C6.477 3 2 6.48 2 10.791c0 2.763 1.833 5.187 4.59 6.611l-.914 3.37c-.12.443.344.823.727.568l4.037-2.686c.51.05 1.03.076 1.56.076 5.523 0 10-3.48 10-7.791S17.523 3 12 3z" fill="#3C1E1E"/>
            </svg>
        </div>
    );
}
