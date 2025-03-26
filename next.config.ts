import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['momentum.redberryinternship.ge']
  },
  // axiosit ro moqachavt dagchirdebat
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://momentum.redberryinternship.ge/api/:path*'
      }
    ]
  }
}

export default nextConfig
