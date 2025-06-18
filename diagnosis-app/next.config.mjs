/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: '/ChestXray-Diagnosis',
  assetPrefix: '/ChestXray-Diagnosis',
};

export default nextConfig;
