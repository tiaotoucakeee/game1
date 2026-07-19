import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
};

// Netlify 使用 OpenNext 适配器；standalone 仅用于 Docker / 自托管
if (!process.env.NETLIFY) {
  nextConfig.output = "standalone";
}

export default nextConfig;
