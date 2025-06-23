/** @type {import('next').NextConfig} */
const nextConfig = {
 
  images: { unoptimized: true },

  output: 'standalone', 
  trailingSlash: true,
  basePath: '/ChestXray-Diagnosis',
  assetPrefix: '/ChestXray-Diagnosis/',
};

export default nextConfig;
