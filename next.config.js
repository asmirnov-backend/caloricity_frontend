/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  cleanDistDir: true,
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
