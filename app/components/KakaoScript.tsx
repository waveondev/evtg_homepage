'use client'; // 클라이언트 컴포넌트임을 명시

import Script from 'next/script';

declare global {
    interface Window {
        Kakao: any;
    }
}

export default function KakaoScript() {
    return (
        <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
            onLoad={() => {
                if (window.Kakao && !window.Kakao.isInitialized()) {
                    // 여기에 발급받은 JavaScript 키를 넣으세요
                    window.Kakao.init('YOUR_JAVASCRIPT_KEY');
                    console.log('261e3df2406131b677dab299a8410896');
                }
            }}
        />
    );
}
