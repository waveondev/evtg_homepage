/** @type {import('next').NextConfig} */
const nextConfig = {
  // 여기에 바로 넣으세요 (experimental 안이 아닙니다!)
  allowedDevOrigins: ['192.168.0.42'],

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
