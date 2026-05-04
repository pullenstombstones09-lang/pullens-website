import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    localPatterns: [{ pathname: "/catalogue/**" }, { pathname: "/images/**" }],
    qualities: [75, 85],
  },
};

export default nextConfig;
