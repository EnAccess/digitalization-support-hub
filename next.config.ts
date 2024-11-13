import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/digitalization-support-hub" : "",
  basePath:
    process.env.NODE_ENV === "production" ? "/digitalization-support-hub" : "",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
