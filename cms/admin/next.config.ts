/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Disable image optimization for local development with external images
  images: {
    unoptimized: true,
  },

  // Transpile packages if needed
  transpilePackages: [],
};

export default nextConfig;
