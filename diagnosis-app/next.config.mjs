/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  basePath: process.env.NODE_ENV === "production" ? "/ChestXray-Diagnosis" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/ChestXray-Diagnosis" : "",
};

export default nextConfig;
