/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  cleanDistDir: true,
  output: "export",
  basePath: "caloricity_frontend",
};

module.exports = nextConfig;
