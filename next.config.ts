import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    localPatterns: [{ pathname: "/catalogue/**" }],
  },
};

export default nextConfig;
