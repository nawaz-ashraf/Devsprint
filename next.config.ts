import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/Devsprint",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei", "gsap"],
  },
};

export default nextConfig;
