import type { NextConfig } from "next";

const isProd = true;

const nextConfig: NextConfig = {
  output: "export",

  basePath: isProd ? "/Devsprint" : "",
  assetPrefix: isProd ? "/Devsprint/" : "",

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },

  trailingSlash: true,
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei", "gsap"],
  },
};

export default nextConfig;
