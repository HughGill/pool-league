/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/server-api/:path*", // Requests to /api/*
        destination: "http://localhost:5000/server-api/:path*", // Proxies to Flask
      },
    ];
  },
};

export default nextConfig;
